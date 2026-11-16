import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Logo } from "@/components/logo"
import { StarField } from "@/components/shared/star-field"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-[#050506]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,#232325_0%,#131315_24%,#08080a_48%,#050506_72%)]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <StarField count={80} className="opacity-70" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[46%] left-1/2 h-[900px] w-[1400px] -translate-x-1/2 rounded-[100%] bg-[#5c53fe]/10 blur-[140px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-[#050506] to-transparent"
      />

      <header className="relative z-10 mx-auto flex w-full max-w-[1248px] items-center justify-between px-5 py-6 sm:px-8 sm:py-8">
        <Logo className="text-[34px] sm:text-[36px]" />
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.035] px-4 py-2 text-[12.5px] font-medium text-white/55 backdrop-blur-sm transition-colors hover:border-white/15 hover:text-white"
        >
          <ArrowLeft className="size-3.5" />
          Back to home
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center justify-center px-5 py-10 sm:py-14">
        {children}
      </main>

      <footer className="relative z-10 pb-6 text-center text-[11.5px] text-white/25 sm:pb-8">
        Copyright 2024 — HireLoop. Built for people who take their work
        seriously.
      </footer>
    </div>
  )
}
