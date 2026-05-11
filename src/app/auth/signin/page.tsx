import { auth, signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { GithubIcon } from "@/components/ui/github-icon";

export default async function SignInPage() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="glass-card p-10 max-w-md w-full mx-6 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <GithubIcon className="h-8 w-8 text-emerald-400" />
          </div>
        </div>

        <h1 className="text-2xl font-bold">Sign in to OSS Guardian AI</h1>
        <p className="text-sm text-zinc-400 mt-2">
          Connect your GitHub account to start using AI-powered PR reviews.
        </p>

        <form
          action={async () => {
            "use server";
            await signIn("github", { redirectTo: "/dashboard" });
          }}
          className="mt-8"
        >
          <button
            type="submit"
            className="w-full glass-btn-primary inline-flex items-center justify-center gap-3 px-6 py-4 rounded-xl text-base font-semibold"
          >
            <GithubIcon className="h-5 w-5" />
            Continue with GitHub
          </button>
        </form>

        <p className="mt-6 text-xs text-zinc-600">
          We only request read access to your public repos. No code access.
        </p>
      </div>
    </div>
  );
}
