import Link from "next/link";
import { ArrowRight, Shield, Activity, FileText, Zap } from "lucide-react";
import { GithubIcon } from "@/components/ui/github-icon";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-16">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="mt-1 text-zinc-400">
              Manage your repositories and review settings.
            </p>
          </div>
          <Button
            asChild
            className="bg-emerald-500 text-black hover:bg-emerald-400 gap-2"
          >
            <Link href="/dashboard/connect">
              <GithubIcon className="h-4 w-4" />
              Connect Repository
            </Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: Shield,
              label: "PRs Reviewed",
              value: "0",
              color: "text-blue-400",
              bg: "bg-blue-500/10",
            },
            {
              icon: Activity,
              label: "Issues Found",
              value: "0",
              color: "text-amber-400",
              bg: "bg-amber-500/10",
            },
            {
              icon: FileText,
              label: "Health Score",
              value: "—",
              color: "text-emerald-400",
              bg: "bg-emerald-500/10",
            },
            {
              icon: Zap,
              label: "Active Repos",
              value: "0",
              color: "text-purple-400",
              bg: "bg-purple-500/10",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6"
            >
              <div
                className={`inline-flex rounded-lg ${stat.bg} p-2 ${stat.color}`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-sm text-zinc-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Empty state */}
        <div className="mt-12 rounded-2xl border border-dashed border-zinc-700 bg-zinc-900/30 p-12 text-center">
          <GithubIcon className="mx-auto h-12 w-12 text-zinc-600" />
          <h3 className="mt-4 text-lg font-semibold">
            No repositories connected yet
          </h3>
          <p className="mt-2 text-sm text-zinc-500 max-w-md mx-auto">
            Connect your first GitHub repository to start getting AI-powered PR
            reviews, security scanning, and health metrics.
          </p>
          <Button
            asChild
            className="mt-6 bg-emerald-500 text-black hover:bg-emerald-400 gap-2"
          >
            <Link href="/dashboard/connect">
              Connect your first repo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
