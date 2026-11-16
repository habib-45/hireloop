import Link from "next/link"

import { cn } from "@/lib/utils"

type LogoProps = {
  className?: string
  href?: string
}

function LoopMark() {
  return (
    <span
      aria-hidden="true"
      className="relative mx-[0.015em] inline-flex translate-y-[0.045em] items-center"
    >
      <span className="relative inline-flex size-[0.62em] items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_30%_26%,#d8f6ff_0%,#5cc0ff_24%,#1483f5_56%,#0645a8_100%)] ring-[0.035em] ring-[#07101f]">
        <span className="absolute top-[9%] left-[-8%] h-[42%] w-[82%] rotate-[-24deg] rounded-full bg-[#e5f9ff]/75 blur-[0.012em]" />
        <span className="absolute right-[8%] bottom-[8%] size-[0.28em] rounded-full bg-[#081c3d]/70 blur-[0.01em]" />
      </span>
      <span className="relative -ml-[0.17em] inline-flex size-[0.62em] items-center justify-center overflow-hidden rounded-full bg-[radial-gradient(circle_at_66%_68%,#ffe8ab_0%,#ffb33a_22%,#ff7a00_54%,#c53c00_100%)] ring-[0.035em] ring-[#07101f]">
        <span className="absolute right-[4%] bottom-[-10%] h-[48%] w-[86%] rotate-[18deg] rounded-full bg-[#ffe6a3]/70 blur-[0.012em]" />
        <span className="absolute top-[8%] left-[8%] size-[0.28em] rounded-full bg-[#7a2a00]/40 blur-[0.01em]" />
      </span>
    </span>
  )
}

export function Logo({ className, href = "/" }: LogoProps) {
  return (
    <Link
      href={href}
      aria-label="HireLoop home"
      className={cn(
        "group inline-flex shrink-0 items-center text-[28px] leading-none font-black tracking-[-0.055em] select-none",
        className
      )}
    >
      <span className="bg-gradient-to-b from-[#3ab5ff] via-[#0087fe] to-[#0057e0] bg-clip-text text-transparent">
        hire
      </span>
      <span className="bg-gradient-to-b from-[#ffc45c] via-[#ff920f] to-[#f26300] bg-clip-text text-transparent">
        l
      </span>
      <LoopMark />
      <span className="bg-gradient-to-b from-[#ffc45c] via-[#ff920f] to-[#f26300] bg-clip-text pr-[0.02em] text-transparent">
        p
      </span>
    </Link>
  )
}
