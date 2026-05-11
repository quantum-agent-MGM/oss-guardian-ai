import { NextRequest, NextResponse } from "next/server";

/**
 * AI PR Review endpoint
 * Analyzes PR diff and generates review comments
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
      console.error(`[review] Failed to fetch diff: ${diffResponse.status}`);
      return NextResponse.json(
        { error: "failed to fetch diff" },
        { status: 502 }
      );
    }

    const diff = await diffResponse.text();

    if (!diff || diff.length < 10) {
      return NextResponse.json({ message: "empty diff, skipping review" });
    }

    // Truncate diff if too large (max ~8K chars for AI)
    const truncatedDiff =
      diff.length > 8000 ? diff.slice(0, 8000) + "\n... (truncated)" : diff;

    // Generate AI review using Claude
    const review = await generateReview(title, truncatedDiff, owner, repo);

    console.log(
      `[review] Generated review for ${owner}/${repo}#${prNumber}: ${review.summary}`
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
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  if (!anthropicKey) {
    // Fallback: return template-based review
    return templateReview(title, diff);
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": anthropicKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 1500,
        system:
          "You are an expert code reviewer. Analyze the PR diff and provide: 1) Brief summary 2) Security issues found (if any) 3) Code quality suggestions 4) Specific line references. Be constructive and professional. Output format: JSON with keys: summary, comments (array), securityIssues (array), suggestions (array).",
        messages: [
          {
            role: "user",
            content: `Review this PR for ${owner}/${repo}:\n\nTitle: ${title}\n\nDiff:\n${diff}\n\nProvide your review as JSON.`,
          },
        ],
      }),
    });

    if (!response.ok) {
      console.error(`[anthropic] API error: ${response.status}`);
      return templateReview(title, diff);
    }

    const data = await response.json();
    const text = data.content?.[0]?.text || "";

    // Try to parse JSON from response
    try {
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch {
      // fall through to text parsing
    }

    return {
      summary: text.slice(0, 200),
      comments: [],
      securityIssues: [],
      suggestions: [],
    };
  } catch (error) {
    console.error("[anthropic] request failed:", error);
    return templateReview(title, diff);
  }
}

function templateReview(title: string, diff: string) {
  const comments: string[] = [];
  const securityIssues: string[] = [];
  const suggestions: string[] = [];

  // Basic pattern matching for common issues
  const diffLower = diff.toLowerCase();

  if (diff.includes("sql") && diffLower.includes("select")) {
    securityIssues.push(
      "Potential SQL injection: verify query uses parameterized statements"
    );
  }

  if (
    diffLower.includes("innerhtml") ||
    diffLower.includes("dangerouslysetinnerhtml")
  ) {
    securityIssues.push("XSS risk: direct HTML injection detected — sanitize input");
  }

  if (
    diffLower.includes("password") &&
    !diffLower.includes("hash") &&
    !diffLower.includes("bcrypt")
  ) {
    securityIssues.push("Password handling detected — ensure hashing with bcrypt/argon2");
  }

  if (diffLower.includes("console.log") || diffLower.includes("console.debug")) {
    suggestions.push("Remove debug console statements before merging");
  }

  if (
    diffLower.includes("todo") ||
    diffLower.includes("fixme") ||
    diffLower.includes("hack")
  ) {
    suggestions.push("TODO/FIXME comments found — address before merge or create follow-up issues");
  }

  return {
    summary: `Reviewed PR "${title}". Found ${securityIssues.length} potential security issues and ${suggestions.length} suggestions.`,
    comments: comments.map((c) => ({ body: c, path: "", line: 0 })),
    securityIssues: securityIssues.map((s) => ({ severity: "warning", description: s })),
    suggestions: suggestions.map((s) => ({ description: s })),
  };
}

export const runtime = "nodejs";
export const maxDuration = 60;
