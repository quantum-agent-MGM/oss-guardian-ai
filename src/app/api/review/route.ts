import { NextRequest, NextResponse } from "next/server";

/**
 * AI PR Review endpoint — multi-provider
 * Supports: Anthropic Claude, OpenCodeGo, any OpenAI-compatible API
 * Falls back to pattern-based template review if no API key configured
 */
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

    // Fetch the PR diff
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

    // Truncate diff if too large (~8K chars for AI context)
    const truncatedDiff =
      diff.length > 8000 ? diff.slice(0, 8000) + "\n... (truncated)" : diff;

    // Generate review
    const review = await generateReview(title, truncatedDiff, owner, repo);

    console.log(
      `[review] Generated review for ${owner}/${repo}#${prNumber}: ${review.summary.slice(0,80)}`
    );

    return NextResponse.json({
      success: true,
      review: {
        summary: review.summary,
        comments: review.comments,
        securityIssues: review.securityIssues,
        suggestions: review.suggestions,
      },
      pr: { owner, repo, number: prNumber, headSha },
    });
  } catch (error) {
    console.error("[review] error:", error);
    return NextResponse.json(
      { error: "review generation failed" },
      { status: 500 }
    );
  }
}

async function generateReview(
  title: string,
  diff: string,
  owner: string,
  repo: string
) {
  const aiProvider = process.env.AI_PROVIDER || "template";
  const apiKey = process.env.AI_API_KEY;
  const apiBase = process.env.AI_API_BASE || "https://api.anthropic.com/v1";
  const aiModel = process.env.AI_MODEL || "claude-sonnet-4-20250514";

  // Try AI provider if configured
  if (apiKey && aiProvider !== "template") {
    try {
      if (aiProvider === "anthropic") {
        return await anthropicReview(title, diff, owner, repo, apiKey, aiModel);
      }
      // OpenAI-compatible (OpenCodeGo, Groq, etc.)
      return await openaiCompatibleReview(title, diff, owner, repo, apiKey, apiBase, aiModel);
    } catch (error) {
      console.error(`[review] AI provider failed, falling back to template:`, error);
    }
  }

  // Fallback: pattern-based template review (always works, no API key needed)
  return templateReview(title, diff);
}

async function openaiCompatibleReview(
  title: string,
  diff: string,
  owner: string,
  repo: string,
  apiKey: string,
  apiBase: string,
  model: string
) {
  const response = await fetch(`${apiBase}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 1500,
      temperature: 0.3,
      messages: [
        {
          role: "system",
          content:
            "You are a senior software engineer doing a code review. Your tone is professional, direct, and helpful — like a respected colleague, never robotic. Rules: (1) ONLY flag real issues — if the code is fine, say so briefly and move on. Never invent problems. (2) For each real issue, mention the exact file and line, explain WHY it matters, and suggest the fix with a code snippet. (3) If there are no real issues, respond with: '{ \"summary\": \"LGTM — no issues found.\", \"comments\": [], \"securityIssues\": [], \"suggestions\": [] }'. (4) Prioritize: security > correctness > performance > style. (5) Output ONLY valid JSON with keys: summary (1-2 sentences max), comments (array of {body, path, line}), securityIssues (array of {severity: low|medium|high|critical, description}), suggestions (array of {description}). (6) Be concise — no fluff, no compliments, no \"great job on...\". Just the facts.",
        },
        {
          role: "user",
          content: `Review this PR for ${owner}/${repo}:\n\nTitle: ${title}\n\nDiff:\n${diff}\n\nRespond with valid JSON only.`,
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
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    // fall through
  }

  return {
    summary: text.slice(0, 200),
    comments: [],
    securityIssues: [],
    suggestions: [],
  };
}

async function anthropicReview(
  title: string,
  diff: string,
  owner: string,
  repo: string,
  apiKey: string,
  model: string
) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      max_tokens: 1500,
      system:
        "You are a senior engineer reviewing code. Be direct and helpful. Only flag real issues — skip style nits. For each issue: file+line, why it matters, suggested fix. If code is clean, say 'LGTM — no issues found.' Output JSON with: summary, comments (array of {body, path, line}), securityIssues (array of {severity, description}), suggestions (array of {description}). Be concise. No fluff.",
      messages: [
        {
          role: "user",
          content: `Review this PR for ${owner}/${repo}:\n\nTitle: ${title}\n\nDiff:\n${diff}\n\nBe concise. If nothing to flag, just say LGTM. JSON only.`,
        },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`Anthropic returned ${response.status}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text || "";

  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch {
    // fall through
  }

  return {
    summary: text.slice(0, 200),
    comments: [],
    securityIssues: [],
    suggestions: [],
  };
}

function templateReview(title: string, diff: string) {
  const comments: { body: string; path: string; line: number }[] = [];
  const securityIssues: { severity: string; description: string }[] = [];
  const suggestions: { description: string }[] = [];

  const diffLower = diff.toLowerCase();

  // SQL injection detection
  if (diff.includes("sql") && diffLower.includes("select") && !diffLower.includes("parameterized")) {
    securityIssues.push({
      severity: "high",
      description: "Potential SQL injection: verify query uses parameterized statements or ORM",
    });
  }

  // XSS detection
  if (diffLower.includes("innerhtml") || diffLower.includes("dangerouslysetinnerhtml")) {
    securityIssues.push({
      severity: "high",
      description: "XSS risk: direct HTML injection detected — sanitize input with DOMPurify or use textContent",
    });
  }

  // Password handling
  if (diffLower.includes("password") && !diffLower.includes("hash") && !diffLower.includes("bcrypt") && !diffLower.includes("argon")) {
    securityIssues.push({
      severity: "medium",
      description: "Password handling detected — ensure hashing with bcrypt/argon2 before storage",
    });
  }

  // Exposed secrets
  if (diffLower.includes("api_key") || diffLower.includes("apikey") || diffLower.includes("secret")) {
    securityIssues.push({
      severity: "critical",
      description: "Possible exposed secret or API key in code — use environment variables instead",
    });
  }

  // Debug statements
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

  // Error handling
  if ((diffLower.includes("try") && !diffLower.includes("catch")) || diffLower.includes(".catch(")) {
    suggestions.push({
      description: "Error handling pattern detected — ensure all error paths are properly handled and logged",
    });
  }

  // Hardcoded values
  const hardcodedMatch = diff.match(/https?:\/\/[^\s"'{},]+/g);
  if (hardcodedMatch && hardcodedMatch.length > 3) {
    suggestions.push({
      description: "Multiple hardcoded URLs detected — consider moving to configuration/environment variables",
    });
  }

  return {
    summary: securityIssues.length > 0 || suggestions.length > 0
      ? `Found ${securityIssues.length} security issue${securityIssues.length !== 1 ? "s" : ""} and ${suggestions.length} suggestion${suggestions.length !== 1 ? "s" : ""}.`
      : "LGTM — no issues found.",
    comments,
    securityIssues,
    suggestions,
  };
}

export const runtime = "nodejs";
export const maxDuration = 60;
