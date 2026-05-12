import { NextRequest, NextResponse } from "next/server";

/**
 * AI PR Review endpoint — multi-provider with Spec Compliance Guard
 * Detects Spec Kit (.specify/, spec.md, plan.md) and validates PR diffs against specs.
 * Falls back to pattern-based template review if no API key configured.
 */

interface ReviewResult {
  summary: string;
  comments: { body: string; path: string; line: number }[];
  securityIssues: { severity: string; description: string }[];
  suggestions: { description: string }[];
  specCompliance?: {
    detected: boolean;
    score?: number;
    driftFlags?: string[];
    checklist?: string[];
    specFiles?: string[];
  };
}

export async function POST(request: NextRequest) {
  try {
    const { owner, repo, prNumber, title, diffUrl, headSha } =
      await request.json();

    if (!owner || !repo || !prNumber || !diffUrl) {
      return NextResponse.json(
        { error: "missing required fields: owner, repo, prNumber, diffUrl" },
        { status: 400 }
      );
    }

    console.log(`[review] Fetching diff for ${owner}/${repo}#${prNumber}`);

    // 1. Fetch the PR diff
    const diffResponse = await fetch(diffUrl, {
      headers: { Accept: "application/vnd.github.v3.diff" },
    });

    if (!diffResponse.ok) {
      return NextResponse.json(
        { error: "failed to fetch diff" },
        { status: 502 }
      );
    }

    const diff = await diffResponse.text();

    if (!diff || diff.length < 10) {
      return NextResponse.json({ message: "empty diff, skipping review" });
    }

    // 2. Detect Spec Kit files
    const specContext = await detectSpecKit(owner, repo);

    // 3. Truncate diff if too large (~8K chars for AI context)
    const truncatedDiff =
      diff.length > 8000 ? diff.slice(0, 8000) + "\n... (truncated)" : diff;

    // 4. Generate review
    const review = await generateReview(title, truncatedDiff, owner, repo, specContext);

    console.log(
      `[review] Generated review for ${owner}/${repo}#${prNumber}: ${review.summary.slice(0, 80)}` +
      (review.specCompliance?.detected ? ` [spec: ${review.specCompliance.score}%]` : "")
    );

    const response: Record<string, unknown> = {
      success: true,
      review: {
        summary: review.summary,
        comments: review.comments,
        securityIssues: review.securityIssues,
        suggestions: review.suggestions,
      },
      pr: { owner, repo, number: prNumber, headSha },
    };

    if (review.specCompliance?.detected) {
      (response.review as Record<string, unknown>).specCompliance = review.specCompliance;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("[review] error:", error);
    return NextResponse.json(
      { error: "review generation failed" },
      { status: 500 }
    );
  }
}

// ── Spec Kit Detection ──

interface SpecContext {
  detected: boolean;
  files: { path: string; content: string }[];
}

async function detectSpecKit(owner: string, repo: string): Promise<SpecContext> {
  const specFiles: { path: string; content: string }[] = [];
  const pathsToCheck = [
    ".specify/memory/constitution.md",
    ".specify/templates/spec-template.md",
    ".specify/templates/plan-template.md",
    "spec.md",
    "plan.md",
    ".specify/",
  ];

  for (const path of pathsToCheck) {
    try {
      const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/${path}`;
      const res = await fetch(url, {
        headers: { Accept: "text/plain" },
        signal: AbortSignal.timeout(5000),
      });

      if (res.ok) {
        const content = await res.text();
        if (content.length > 10) {
          specFiles.push({
            path,
            content: content.slice(0, 3000), // Limit spec content size
          });
        }
      }
    } catch {
      // Spec file not found — continue
    }
  }

  return {
    detected: specFiles.length > 0,
    files: specFiles,
  };
}

// ── Review Generation ──

async function generateReview(
  title: string,
  diff: string,
  owner: string,
  repo: string,
  specContext: SpecContext
): Promise<ReviewResult> {
  const aiProvider = process.env.AI_PROVIDER || "template";
  const apiKey = process.env.AI_API_KEY;
  const apiBase = process.env.AI_API_BASE || "https://api.anthropic.com/v1";
  const aiModel = process.env.AI_MODEL || "deepseek-v4-pro";

  // Try AI provider if configured
  if (apiKey && aiProvider !== "template") {
    try {
      if (aiProvider === "anthropic") {
        return await anthropicReview(title, diff, owner, repo, apiKey, aiModel, specContext);
      }
      return await openaiCompatibleReview(title, diff, owner, repo, apiKey, apiBase, aiModel, specContext);
    } catch (error) {
      console.error(`[review] AI provider failed, falling back to template:`, error);
    }
  }

  // Fallback: pattern-based template review
  return templateReview(title, diff, specContext);
}

// ── Build Spec Context for Prompt ──

function buildSpecPrompt(specContext: SpecContext): string {
  if (!specContext.detected) return "";

  let prompt = "\n\n## Spec Kit Context\nThis project uses Spec Kit. ";
  prompt += "The following spec files were detected in the repository:\n\n";

  for (const file of specContext.files) {
    prompt += `### ${file.path}\n\`\`\`\n${file.content.slice(0, 1500)}\n\`\`\`\n\n`;
  }

  prompt += `\n## Spec Compliance Instructions
As part of your review, ALSO check if the PR diff complies with the project specs above.
Look for:
1. **Drift**: Does the code implement what the spec specifies? Flag any gaps.
2. **Missing implementation**: Spec mentions features/tasks not addressed in the PR.
3. **Contradictions**: Code that conflicts with spec decisions.

After your main review, add a SEPARATE section starting with "### Spec Compliance Score: XX%":
- Score 0-100% based on how well the PR aligns with the spec.
- List specific drift flags (what's missing or divergent).
- Suggest spec updates if the code intentionally differs from spec.
- Generate a checklist of remaining tasks based on spec gaps.
Format this section exactly as shown, with the percentage on its own line after the heading.`;

  return prompt;
}

function parseSpecCompliance(text: string): ReviewResult["specCompliance"] | undefined {
  const match = text.match(/###\s*Spec Compliance Score:\s*(\d+)%?\s*\n?([\s\S]*?)(?=\n\n##|\n\n\*\*|$)/i);
  if (!match) return undefined;

  const score = parseInt(match[1], 10);
  const body = match[2] || "";

  // Extract drift flags (lines starting with - or *)
  const driftFlags: string[] = [];
  const checklist: string[] = [];
  const driftMatch = body.match(/(?:drift|gap|missing|flag)[\s\S]*?((?:^[-*]\s+.+\n?)+)/im);
  const checklistMatch = body.match(/(?:checklist|tasks|remaining)[\s\S]*?((?:^[-*]\s+.+\n?)+)/im);

  if (driftMatch) {
    driftFlags.push(
      ...driftMatch[1].split("\n")
        .map((l: string) => l.replace(/^[-*]\s+/, "").trim())
        .filter(Boolean)
    );
  }

  const allLines = body.split("\n")
    .filter((l: string) => l.trim().startsWith("-") || l.trim().startsWith("*"))
    .map((l: string) => l.replace(/^[-*]\s+/, "").trim())
    .filter(Boolean);

  return {
    detected: true,
    score: isNaN(score) ? undefined : score,
    driftFlags: driftFlags.length > 0 ? driftFlags : allLines.slice(0, 5),
    checklist: allLines.slice(0, 8),
    specFiles: [],
  };
}

// ── OpenAI Compatible Review ──

async function openaiCompatibleReview(
  title: string,
  diff: string,
  owner: string,
  repo: string,
  apiKey: string,
  apiBase: string,
  model: string,
  specContext: SpecContext
): Promise<ReviewResult> {
  const specPrompt = buildSpecPrompt(specContext);

  const response = await fetch(`${apiBase}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: specContext.detected ? 2500 : 1500,
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are a senior software engineer doing a code review. Your tone is professional, direct, and helpful — like a respected colleague, never robotic. Rules: (1) ONLY flag real issues — if the code is fine, say so briefly and move on. Never invent problems. (2) For each real issue, mention the exact file and line, explain WHY it matters, and suggest the fix with a code snippet. (3) If there are no real issues, respond with: '{ \"summary\": \"LGTM — no issues found.\", \"comments\": [], \"securityIssues\": [], \"suggestions\": [] }'. (4) Prioritize: security > correctness > spec-compliance > performance > style. (5) Output ONLY valid JSON with keys: summary (1-2 sentences max), comments (array of {body, path, line}), securityIssues (array of {severity: low|medium|high|critical, description}), suggestions (array of {description}). (6) Be concise — no fluff, no compliments, no \"great job on...\". Just the facts." +
            (specContext.detected ? " (7) After the main JSON review, add a SECOND JSON block for spec compliance: { \"specCompliance\": { \"score\": number 0-100, \"driftFlags\": string[], \"checklist\": string[] } }." : ""),
        },
        {
          role: "user",
          content: `Review this PR for ${owner}/${repo}:\n\nTitle: ${title}\n\nDiff:\n${diff}${specPrompt}\n\nRespond with valid JSON only.${specContext.detected ? ' If spec context was provided, include a second JSON block with specCompliance.' : ''}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`API returned ${response.status}`);
  }

  const data = await response.json();
  const text = data.choices?.[0]?.message?.content || "";

  // Parse JSON from response
  let result: ReviewResult = {
    summary: text.slice(0, 200),
    comments: [],
    securityIssues: [],
    suggestions: [],
  };

  try {
    // Try to parse the main review JSON
    const jsonMatch = text.match(/\{[\s\S]*?"summary"[\s\S]*?\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      result = {
        summary: parsed.summary || result.summary,
        comments: parsed.comments || [],
        securityIssues: parsed.securityIssues || [],
        suggestions: parsed.suggestions || [],
      };
    }
  } catch {
    // fall through
  }

  // Parse spec compliance
  if (specContext.detected) {
    const specMatch = text.match(/###\s*Spec Compliance Score:\s*(\d+)%?\s*\n?([\s\S]*?)$/i);
    if (specMatch) {
      result.specCompliance = parseSpecCompliance(text);
    } else {
      // Try second JSON block approach
      try {
        const specJsonMatch = text.match(/"specCompliance"\s*:\s*(\{[\s\S]*?\})\s*\}/);
        if (specJsonMatch) {
          const specData = JSON.parse(specJsonMatch[1]);
          result.specCompliance = {
            detected: true,
            score: specData.score,
            driftFlags: specData.driftFlags || [],
            checklist: specData.checklist || [],
          };
        }
      } catch {
        result.specCompliance = { detected: true, score: 0 };
      }
    }
  }

  return result;
}

// ── Anthropic Review ──

async function anthropicReview(
  title: string,
  diff: string,
  owner: string,
  repo: string,
  apiKey: string,
  model: string,
  specContext: SpecContext
): Promise<ReviewResult> {
  const specPrompt = buildSpecPrompt(specContext);
  
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: specContext.detected ? 2500 : 1500,
      system:
        "You are a senior engineer reviewing code. Be direct and helpful. Only flag real issues — skip style nits. For each issue: file+line, why it matters, suggested fix. If code is clean, say 'LGTM — no issues found.' Output JSON with: summary, comments (array of {body, path, line}), securityIssues (array of {severity, description}), suggestions (array of {description}). Be concise. No fluff." +
        (specContext.detected ? " ALSO check spec compliance: after the main JSON, add a ### Spec Compliance Score section with score 0-100, drift flags, and task checklist." : ""),
      messages: [
        {
          role: "user",
          content: `Review this PR for ${owner}/${repo}:\n\nTitle: ${title}\n\nDiff:\n${diff}${specPrompt}\n\nBe concise. If nothing to flag, just say LGTM. JSON only.${specContext.detected ? ' Add spec compliance section after JSON.' : ''}`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic returned ${response.status}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text || "";

  let result: ReviewResult = {
    summary: text.slice(0, 200),
    comments: [],
    securityIssues: [],
    suggestions: [],
  };

  try {
    const jsonMatch = text.match(/\{[\s\S]*?"summary"[\s\S]*?\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      result = {
        summary: parsed.summary || result.summary,
        comments: parsed.comments || [],
        securityIssues: parsed.securityIssues || [],
        suggestions: parsed.suggestions || [],
      };
    }
  } catch {
    // fall through
  }

  if (specContext.detected) {
    result.specCompliance = parseSpecCompliance(text);
  }

  return result;
}

// ── Template Review (Fallback) ──

function templateReview(title: string, diff: string, specContext: SpecContext): ReviewResult {
  const comments: { body: string; path: string; line: number }[] = [];
  const securityIssues: { severity: string; description: string }[] = [];
  const suggestions: { description: string }[] = [];

  const diffLower = diff.toLowerCase();

  // SQL injection
  if (diff.includes("sql") && diffLower.includes("select") && !diffLower.includes("parameterized")) {
    securityIssues.push({
      severity: "high",
      description: "Potential SQL injection: verify query uses parameterized statements or ORM",
    });
  }

  // XSS
  if (diffLower.includes("innerhtml") || diffLower.includes("dangerouslysetinnerhtml")) {
    securityIssues.push({
      severity: "high",
      description: "XSS risk: direct HTML injection detected — sanitize input with DOMPurify or use textContent",
    });
  }

  // Password
  if (diffLower.includes("password") && !diffLower.includes("hash") && !diffLower.includes("bcrypt")) {
    securityIssues.push({
      severity: "medium",
      description: "Password handling detected — ensure hashing with bcrypt/argon2 before storage",
    });
  }

  // Secrets
  if (diffLower.includes("api_key") || diffLower.includes("apikey") || diffLower.includes("secret")) {
    securityIssues.push({
      severity: "critical",
      description: "Possible exposed secret or API key in code — use environment variables instead",
    });
  }

  // Debug
  if (diffLower.includes("console.log") || diffLower.includes("console.debug") || diffLower.includes("print(")) {
    suggestions.push({
      description: "Remove debug console statements before merging to production",
    });
  }

  // TODO/FIXME
  if (diffLower.includes("todo") || diffLower.includes("fixme") || diffLower.includes("hack")) {
    suggestions.push({
      description: "TODO/FIXME/HACK comments found — address before merge or create follow-up issues",
    });
  }

  const result: ReviewResult = {
    summary: securityIssues.length > 0 || suggestions.length > 0
      ? `Found ${securityIssues.length} security issue${securityIssues.length !== 1 ? "s" : ""} and ${suggestions.length} suggestion${suggestions.length !== 1 ? "s" : ""}.`
      : "LGTM — no issues found.",
    comments,
    securityIssues,
    suggestions,
  };

  // Spec compliance in template mode (basic check)
  if (specContext.detected) {
    const specDriftFlags: string[] = [];
    const specChecklist: string[] = [];

    // Check if diff mentions spec files
    if (diffLower.includes(".specify") || diffLower.includes("spec.md") || diffLower.includes("plan.md")) {
      specChecklist.push("Verify spec.md/plan.md consistency with PR changes");
    }

    // Check for task list markers
    if (diffLower.includes("[ ]") || diffLower.includes("[x]")) {
      specChecklist.push("Review task completion status in spec checklist");
    }

    result.specCompliance = {
      detected: true,
      score: specDriftFlags.length === 0 ? 100 : Math.max(30, 100 - specDriftFlags.length * 25),
      driftFlags: specDriftFlags,
      checklist: specChecklist.length > 0 ? specChecklist : ["Spec Kit detected — enable AI provider for deep spec analysis"],
    };
  }

  return result;
}

export const runtime = "nodejs";
export const maxDuration = 60;
