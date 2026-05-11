import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950 px-6 py-12 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="font-bold">
              <span className="text-emerald-400">OSS</span> Guardian AI
            </h3>
            <p className="mt-2 text-sm text-zinc-500">
              AI-powered maintenance for open source projects.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-zinc-300">Product</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-500">
              <li><Link href="#features" className="hover:text-zinc-300">Features</Link></li>
              <li><Link href="#pricing" className="hover:text-zinc-300">Pricing</Link></li>
              <li><Link href="/dashboard" className="hover:text-zinc-300">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-sm text-zinc-300">Company</h4>
            <ul className="mt-3 space-y-2 text-sm text-zinc-500">
              <li>
                <Link
                  href="https://github.com/quantum-agent-MGM/oss-guardian-ai"
                  target="_blank"
                  className="hover:text-zinc-300"
                >
                  GitHub
                </Link>
              </li>
              <li><Link href="mailto:hello@oss-guardian.ai" className="hover:text-zinc-300">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-zinc-300">Privacy</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-zinc-800 pt-8 text-center text-sm text-zinc-600">
          &copy; {new Date().getFullYear()} OSS Guardian AI. Built with ❤️ for the open source community.
        </div>
      </div>
    </footer>
  );
}
