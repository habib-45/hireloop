import { Card } from "@/components/ui/card"
import type { Stat } from "@/lib/types/site"

export function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon

  return (
    <Card className="group relative min-h-[210px] justify-between gap-0 rounded-[18px] border-0 bg-[linear-gradient(180deg,rgba(34,34,37,0.9)_0%,rgba(15,15,17,0.94)_42%,rgba(6,6,7,0.98)_100%)] p-5 ring-1 ring-white/[0.1] shadow-[0_20px_50px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md transition-colors duration-300 hover:ring-white/15 sm:min-h-[230px] sm:p-6 lg:min-h-[238px]">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
      <Icon
        aria-hidden
        className="size-5 text-white/70 transition-colors duration-300 group-hover:text-white/90 sm:size-6"
        strokeWidth={1.6}
      />
      <div className="mt-auto pt-10">
        <div className="text-[40px] leading-none font-normal tracking-[-0.04em] text-white sm:text-[48px] lg:text-[50px]">
          {stat.value}
        </div>
        <div className="mt-3 text-[13.5px] font-normal text-white/60 sm:text-[15.5px]">
          {stat.label}
        </div>
      </div>
    </Card>
  )
}
