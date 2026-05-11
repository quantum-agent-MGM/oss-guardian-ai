import Link from "next/link";
import { Github, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 sm:px-8 lg:px-12">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span className="text-emerald-400">OSS</span>
          <span>Guardian AI</span>
        </Link>

        <div className="hidden items-center gap-1 sm:flex">
          <Button variant="ghost" asChild>
            <Link href="#features">Features</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="#pricing">Pricing</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link
              href="https://github.com/quantum-agent-MGM/oss-guardian-ai"
              target="_blank"
            >
              <Github className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            className="ml-4 bg-emerald-500 text-black hover:bg-emerald-400"
          >
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </div>

        <Button variant="ghost" size="icon" className="sm:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
    </nav>
  );
}
