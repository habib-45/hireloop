import type { Feature } from "@/lib/types/site"

export function FeatureItem({ feature }: { feature: Feature }) {
  const Icon = feature.icon

  return (
    <div className="group flex items-start gap-5 lg:gap-[38px]">
      <div className="relative flex size-[48px] shrink-0 items-center justify-center rounded-[10px] bg-[linear-gradient(180deg,#1b1b1e_0%,#0c0c0e_100%)] ring-1 ring-white/[0.1] shadow-[inset_0_1px_0_rgba(255,255,255,0.07)] transition-colors duration-300 group-hover:ring-white/20 sm:size-[56px]">
        <span
          aria-hidden
          className="absolute inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
        <Icon
          aria-hidden
          className="size-[21px] text-[#efa7f8] drop-shadow-[0_0_10px_rgba(232,121,249,0.3)] transition-transform duration-300 group-hover:-translate-y-0.5 sm:size-[24px]"
          strokeWidth={1.5}
        />
      </div>

      <div className="min-w-0 pt-0.5">
        <h3 className="text-[16px] leading-tight font-medium tracking-[-0.015em] text-white lg:text-[18px]">
          {feature.title}
        </h3>
        <p className="mt-2 max-w-[210px] text-[13.5px] leading-[1.55] text-white/55 lg:text-[14.5px]">
          {feature.description}
        </p>
      </div>
    </div>
  )
}
