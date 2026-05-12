import { auth, signOut } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut, Activity, Shield, Star, GitPullRequest, ClipboardCheck, AlertTriangle, CheckCircle, Wrench, Gift, Zap } from "lucide-react";
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

        {/* Referral Program Banner */}
        <div className="mt-8 rounded-2xl border border-violet-500/15 bg-gradient-to-r from-violet-500/[0.06] to-transparent px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
              <Gift className="h-5 w-5 text-violet-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-violet-300">Refer a friend → both get 1 month free</p>
              <p className="text-xs text-zinc-500">Share your referral link. When they subscribe, you both get Pro free for 30 days.</p>
            </div>
          </div>
          <Button className="glass-btn border-violet-500/20 text-violet-400 hover:bg-violet-500/10 rounded-xl text-sm font-medium gap-2 px-5">
            <Gift className="h-4 w-4" />
            Copy Referral Link
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
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

        {/* Auto-Fix Suggestions */}
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-4">
            <Wrench className="h-5 w-5 text-rose-400" />
            <h2 className="text-lg font-semibold">Auto-Fix Suggestions</h2>
            <span className="text-xs px-2 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400">
              Pro
            </span>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="glass-card p-6 flex flex-col items-center justify-center text-center">
              <Zap className="h-8 w-8 text-rose-400 mb-4" />
              <p className="text-sm text-zinc-400">One-Click Apply Fix</p>
              <p className="text-xs text-zinc-500 mt-2">Review a PR to see auto-generated patches ready for commit.</p>
              <Button disabled className="mt-4 w-full glass-btn border-rose-500/20 text-rose-400 hover:bg-rose-500/10 rounded-xl text-sm font-medium gap-2">
                <Zap className="h-4 w-4" />
                Apply Fix
              </Button>
            </div>
            <div className="glass-card p-6 flex flex-col">
              <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider">Patch Preview</p>
              <div className="flex-1 rounded-lg bg-black/30 border border-white/[0.04] p-3 font-mono text-xs text-zinc-400 overflow-auto">
                <p className="text-zinc-600">// Patches appear here after your first review</p>
                <p className="text-emerald-400 mt-1">+ import DOMPurify from &apos;dompurify&apos;;</p>
                <p className="text-rose-400">- element.innerHTML = userInput;</p>
                <p className="text-emerald-400">+ element.textContent = DOMPurify.sanitize(userInput);</p>
              </div>
              <Button disabled className="mt-4 w-full glass-btn border-zinc-700 text-zinc-400 rounded-xl text-sm font-medium gap-2">
                Copy Patch
              </Button>
            </div>
            <div className="glass-card p-6">
              <p className="text-xs text-zinc-500 mb-3 uppercase tracking-wider">Auto-Fix Stats</p>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Fixes applied</span>
                  <span className="text-zinc-300 font-semibold">0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Time saved</span>
                  <span className="text-zinc-300 font-semibold">0 min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-zinc-400">Avg patch size</span>
                  <span className="text-zinc-300 font-semibold">—</span>
                </div>
              </div>
              <p className="text-xs text-zinc-600 mt-4">Upgrade to Pro to unlock unlimited One-Click Apply Fix.</p>
            </div>
          </div>
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
              <div className="relative w-36 h-36 mb-4">
                <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 140 140">
                  <circle cx="70" cy="70" r="60" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-800" />
                  {/* Background track */}
                  <circle cx="70" cy="70" r="60" fill="none" stroke="currentColor" strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 60}`} strokeDashoffset="0" strokeLinecap="round"
                    className="text-zinc-700/50" />
                </svg>
                <span className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-zinc-500">—</span>
                  <span className="text-xs text-zinc-600 mt-1">no data</span>
                </span>
              </div>
              <div className="flex gap-2 text-xs">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500" /> 80-100</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500" /> 60-79</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500" /> 0-59</span>
              </div>
              <p className="text-sm text-zinc-400 mt-3">Connect a repo with Spec Kit to see your compliance score.</p>
            </div>

            {/* Drift Flags + Generate Spec Update */}
            <div className="glass-card p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-4 w-4 text-amber-400" />
                <h3 className="font-semibold text-sm">Drift Flags</h3>
              </div>
              <div className="space-y-3 flex-1">
                <div className="rounded-lg bg-white/[0.02] border border-white/[0.04] p-3">
                  <p className="text-xs text-zinc-500">
                    No drift flags yet. Connect a repository using Spec Kit to detect spec deviations automatically.
                  </p>
                </div>
              </div>
              <Button
                disabled
                className="mt-4 w-full glass-btn border-indigo-500/20 text-indigo-400 hover:bg-indigo-500/10 rounded-xl text-sm font-medium gap-2"
              >
                <ClipboardCheck className="h-4 w-4" />
                Generate Spec Update
              </Button>
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
                <div className="flex items-center gap-2 text-sm text-zinc-500">
                  <span className="w-4 h-4 rounded border border-zinc-700 flex-shrink-0" />
                  <span>Add `.guardian.yaml` for custom rules</span>
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
