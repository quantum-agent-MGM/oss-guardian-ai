import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GithubIcon } from "@/components/ui/github-icon";

export default async function ConnectPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-2xl px-6 py-8 sm:px-8 lg:px-12">
        <h1 className="text-2xl font-bold">Connect a Repository</h1>
        <p className="text-sm text-zinc-400 mt-2">
          Choose a GitHub repository to enable OSS Guardian AI reviews.
        </p>

        <div className="mt-8 space-y-6">
          {/* Option 1: GitHub App (recommended) */}
          <div className="glass-card p-6 border-emerald-500/20">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                Recommended
              </span>
            </div>
            <h3 className="text-lg font-semibold">
              Install GitHub App
            </h3>
            <p className="text-sm text-zinc-400 mt-2">
              The easiest way. Our GitHub App gets read-only access to your
              selected repos. Install once and every PR gets reviewed
              automatically.
            </p>
            <a
              href={`https://github.com/apps/oss-guardian-ai/installations/new?state=${session.user?.githubLogin || ""}`}
              className="mt-4 glass-btn glass-btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold"
            >
              <GithubIcon className="h-4 w-4" />
              Install GitHub App
            </a>
          </div>

          {/* Option 2: Manual webhook */}
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold">
              Manual Webhook Setup
            </h3>
            <p className="text-sm text-zinc-400 mt-2">
              For repos where you can&apos;t install apps. Add a webhook
              manually in your repo settings.
            </p>
            <div className="mt-3 rounded-lg bg-white/[0.03] p-4 text-sm font-mono text-zinc-300">
              Payload URL:{" "}
              <span className="text-emerald-400">
                https://oss-guardian-ai.vercel.app/api/webhook/github
              </span>
              <br />
              Content type: application/json
              <br />
              Events: Pull requests
            </div>
            <p className="mt-3 text-xs text-zinc-500">
              After setting up the webhook, open a PR to trigger your first
              review. Make sure to set <code>GITHUB_WEBHOOK_SECRET</code> in
              your environment for signature verification.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
