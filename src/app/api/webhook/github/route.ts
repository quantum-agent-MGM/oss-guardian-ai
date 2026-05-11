import { NextRequest, NextResponse } from "next/server";

/**
 * GitHub App webhook endpoint
 * Receives PR events and triggers AI review
 */
export async function POST(request: NextRequest) {
  try {
    const event = request.headers.get("x-github-event");
    const deliveryId = request.headers.get("x-github-delivery");
    const body = await request.json();

    console.log(`[webhook] event=${event} delivery=${deliveryId}`);

    // Handle ping (webhook verification)
    if (event === "ping") {
      return NextResponse.json({ message: "pong" });
    }

    // Handle pull request events
    if (event === "pull_request") {
      const action = body.action;
      const pr = body.pull_request;

      if (!pr) {
        return NextResponse.json({ error: "no pull_request in payload" }, { status: 400 });
      }

      // Only review on opened, synchronize (new commits), or reopened
      if (["opened", "synchronize", "reopened"].includes(action)) {
        console.log(`[webhook] PR #${pr.number} ${action} — queuing review`);

        // Trigger async review (don't block webhook response)
        const reviewUrl = new URL("/api/review", request.url);
        fetch(reviewUrl.toString(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            owner: body.repository.owner.login,
            repo: body.repository.name,
            prNumber: pr.number,
            title: pr.title,
            diffUrl: pr.diff_url,
            headSha: pr.head.sha,
          }),
        }).catch((err) => console.error("[webhook] review trigger failed:", err));
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("[webhook] error:", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}
