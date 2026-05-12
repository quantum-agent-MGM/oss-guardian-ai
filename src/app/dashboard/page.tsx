import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut, Activity, Shield, Star, GitPullRequest, ClipboardCheck, AlertTriangle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GithubIcon } from "@/components/ui/github-icon";

export default async function DashboardPage() {
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-6xl px-6 py-8 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {session.user?.image && (
              <img
                src={session.user.image}
                alt="Avatar"
                className="w-12 h-12 rounded-full border-2 border-emerald-500/20"
              />
            )}
            <div>
              <h1 className="text-2xl font-bold">
                Hey, {session.user?.githubLogin || session.user?.name} 👋
              </h1>
              <p className="text-sm text-zinc-400">
                Manage your OSS Guardian AI connected repositories.
              </p>
            </div>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/" });
            }}
          >
            <Button variant="outline" className="glass-btn gap-2 border-zinc-700 text-zinc-300">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </form>
        </div>

        {/* Stats */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { icon: GitPullRequest, label: "PRs Reviewed", value: "0", color: "text-blue-400" },
            { icon: Shield, label: "Issues Found", value: "0", color: "text-amber-400" },
            { icon: Activity, label: "Health Score", value: "—", color: "text-emerald-400" },
            { icon: ClipboardCheck, label: "Spec Compliance", value: "—", color: "text-indigo-400" },
            { icon: Star, label: "Active Repos", value: "0", color: "text-purple-400" },
          ].map((stat) => (
            <div key={stat.label} className="glass-card p-5">
              <stat.icon className={`h-5 w-5 ${stat.color} mb-3`} />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-zinc-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Spec Compliance Section */}
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardCheck className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-semibold">Spec Compliance</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              Powered by GitHub Spec Kit
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Score Card */}
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <p className="text-xs text-zinc-500 mb-4 uppercase tracking-wider">Latest Score</p>
              <div className="relative w-32 h-32 mb-4">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60" cy="60" r="52"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    className="text-zinc-800"
                  />
                  <circle
                    cx="60" cy="60" r="52"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 52}`}
                    strokeDashoffset={`${2 * Math.PI * 52 * (1 - 0)}`}
                    strokeLinecap="round"
                    className="text-zinc-700"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-zinc-500">—</span>
                </span>
              </div>
              <p className="text-sm text-zinc-400">Connect a repo with Spec Kit to see your compliance score.</p>
            </div>

            {/* Drift Flags */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <h3 className="font-semibold text-sm">Drift Flags</h3>
              </div>
              <div className="space-y-3">
                <div className="rounded-lg bg-white/[0.02] border border-white/[0.04] p-3">
                  <p className="text-xs text-zinc-500">
                    No drift flags yet. Connect a repository using Spec Kit to detect spec deviations automatically.
                  </p>
                </div>
              </div>
            </div>

            {/* Task Checklist */}
            <div className="glass-card p-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <h3 className="font-semibold text-sm">Task Checklist</h3>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <span className="w-4 h-4 rounded border border-zinc-700 flex-shrink-0" />
                  <span>Activate Spec Kit in your repo</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <span className="w-4 h-4 rounded border border-zinc-700 flex-shrink-0" />
                  <span>Connect repository to OSS Guardian AI</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <span className="w-4 h-4 rounded border border-zinc-700 flex-shrink-0" />
                  <span>Open a PR to trigger first review</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Connected Repos */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">Connected Repositories</h2>
          <div className="glass-card p-10 text-center">
            <GithubIcon className="mx-auto h-10 w-10 text-zinc-600 mb-4" />
            <h3 className="font-semibold text-zinc-300">No repositories connected yet</h3>
            <p className="text-sm text-zinc-500 mt-1 max-w-sm mx-auto">
              Connect a GitHub repository to start receiving AI-powered PR reviews,
              security scanning, Spec Compliance checks, and OSS Health Score.
            </p>
            <Button
              asChild
              className="mt-6 bg-emerald-500 text-black hover:bg-emerald-400 rounded-xl font-semibold"
            >
              <Link href="/dashboard/connect">
                <GithubIcon className="h-4 w-4 mr-2" />
                Connect Repository
              </Link>
            </Button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="glass-card p-8 text-center">
            <p className="text-sm text-zinc-500">
              Activity will appear here once you connect a repository and OSS Guardian AI reviews your first PR.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
