import Link from "next/link"

import { Button } from "@/components/ui/button"
import { WireGlobe } from "@/components/shared/wire-globe"

export function CtaSection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative bg-[#050506] pt-[150px] sm:pt-[165px] lg:pt-[198px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-[332px] left-1/2 h-[1166px] w-[2072px] -translate-x-1/2 sm:-bottom-[332px]"
      >
        <WireGlobe className="size-full" />
      </div>

      <div className="relative z-10 container-page pb-36 text-center lg:pb-[113px]">
        <h2
          id="cta-heading"
          className="mx-auto max-w-[820px] text-[2.5rem] leading-[1.06] font-semibold tracking-[-0.065em] text-balance text-white sm:text-[3.4rem] lg:text-[66px]"
        >
          Your next role is
          <br className="hidden sm:block" /> already looking for you
        </h2>

        <p className="mx-auto mt-5 max-w-[680px] text-[15px] leading-[1.6] text-pretty text-white/52 sm:text-[16px]">
          Build a profile in three minutes. The matches start arriving tomorrow
          morning.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-[42px] sm:flex-row sm:gap-4">
          <Button
            nativeButton={false}
            render={<Link href="/sign-up" />}
            className="h-[48px] w-full rounded-[12px] bg-white px-6 text-[14px] font-medium text-[#09090a] shadow-[0_18px_50px_-18px_rgba(255,255,255,0.35)] transition-colors hover:bg-white/90 sm:h-[58px] sm:w-[236px] sm:px-0 sm:text-[14.5px]"
          >
            Create a free account
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/pricing" />}
            variant="outline"
            className="h-[48px] w-full rounded-[12px] border-white/14 bg-[#0c0c0e]/70 px-6 text-[14px] font-medium text-white backdrop-blur-sm transition-colors hover:border-white/25 hover:bg-white/[0.06] sm:h-[58px] sm:w-[146px] sm:px-0 sm:text-[14.5px]"
          >
            View pricing
          </Button>
        </div>
      </div>
    </section>
  )
}
