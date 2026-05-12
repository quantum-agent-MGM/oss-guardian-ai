import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

/**
 * GitHub App webhook endpoint
 * Receives PR events and triggers AI review
 * Supports both GitHub App and personal repo webhooks
 */

// Verify GitHub webhook signature (HMAC-SHA256)
function verifySignature(
  payload: string,
  signature: string | null,
  secret: string
): boolean {
  if (!signature || !secret) return false;
  try {
    const sigParts = signature.split("=");
    if (sigParts.length !== 2 || sigParts[0] !== "sha256") return false;
    const computed = createHmac("sha256", secret)
      .update(payload, "utf8")
      .digest("hex");
    const expected = Buffer.from(sigParts[1], "hex");
    const actual = Buffer.from(computed, "hex");
    return (
      expected.length === actual.length &&
      timingSafeEqual(expected, actual)
    );
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const event = request.headers.get("x-github-event");
    const deliveryId = request.headers.get("x-github-delivery");
    const signature = request.headers.get("x-hub-signature-256");

    // Read raw body for signature verification
    const rawBody = await request.text();
    let body: Record<string, unknown>;
    try {
      body = JSON.parse(rawBody);
    } catch {
      return NextResponse.json({ error: "invalid JSON body" }, { status: 400 });
    }

    // Verify webhook signature if secret is configured
    const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;
    if (webhookSecret) {
      if (!verifySignature(rawBody, signature, webhookSecret)) {
        console.warn(
          `[webhook] invalid signature delivery=${deliveryId}`
        );
        return NextResponse.json({ error: "invalid signature" }, { status: 401 });
      }
    } else {
      console.warn(
        `[webhook] WARNING: no GITHUB_WEBHOOK_SECRET configured — accepting unsigned requests`
      );
    }

    console.log(`[webhook] event=${event} delivery=${deliveryId}`);

    // Handle ping (webhook verification)
    if (event === "ping") {
      return NextResponse.json({ message: "pong", zen: body.zen });
    }

    // Handle pull request events
    if (event === "pull_request") {
      const payload = body as {
        action?: string;
        pull_request?: {
          number: number;
          title: string;
          diff_url: string;
          head?: { sha: string };
        };
        repository?: {
          owner?: { login: string };
          name: string;
        };
      };
      const action = payload.action;
      const pr = payload.pull_request;

      if (!pr) {
        return NextResponse.json({ error: "no pull_request in payload" }, { status: 400 });
      }

      // Only review on opened, synchronize (new commits), or reopened
      if (["opened", "synchronize", "reopened"].includes(action || "")) {
        const owner = payload.repository?.owner?.login;
        const repo = payload.repository?.name;
        if (!owner || !repo || !pr) {
          return NextResponse.json(
            { error: "incomplete payload" },
            { status: 400 }
          );
        }

        console.log(
          `[webhook] PR #${pr.number} ${action} (${owner}/${repo}) — queuing review`
        );

        // Trigger async review (don't block webhook response)
        const reviewUrl = new URL("/api/review", request.url);
        fetch(reviewUrl.toString(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            owner,
            repo,
            prNumber: pr.number,
            title: pr.title || "",
            diffUrl: pr.diff_url || "",
            headSha: pr.head?.sha || "",
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
