import type { LucideIcon } from "lucide-react"

import { cn } from "@/lib/utils"

type StatCardProps = {
  label: string
  value: string
  icon: LucideIcon
  trend?: string
  tone?: "positive" | "negative" | "neutral" | "warning"
  hint?: string
  className?: string
}

const trendTones = {
  positive: "text-[#4ade80] bg-[#22c55e]/10",
  negative: "text-[#f87171] bg-[#ef4444]/10",
  neutral: "text-white/38 bg-white/[0.05]",
  warning: "text-[#fbbf24] bg-[#f59e0b]/10",
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  tone = "positive",
  hint,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-[10px] border border-white/[0.06] bg-[linear-gradient(160deg,#0f0f12_0%,#0a0a0c_100%)] p-4",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-[7px] border border-white/[0.07] bg-white/[0.035]">
          <Icon
            aria-hidden
            className="size-[15px] text-[#a49dff]"
            strokeWidth={1.7}
          />
        </span>
        {trend ? (
          <span
            className={cn(
              "rounded-full px-1.5 py-0.5 font-mono text-[9.5px] font-medium",
              trendTones[tone]
            )}
          >
            {trend}
          </span>
        ) : null}
      </div>

      <p className="mt-4 text-[10.5px] font-medium tracking-[0.02em] text-white/38">
        {label}
      </p>
      <p className="mt-1 text-[23px] leading-none font-semibold tracking-[-0.035em] text-white">
        {value}
      </p>
      {hint ? (
        <p
          className={cn(
            "mt-2 text-[10px]",
            tone === "positive"
              ? "text-[#4ade80]"
              : tone === "warning"
                ? "text-[#fbbf24]"
                : "text-white/30"
          )}
        >
          {hint}
        </p>
      ) : null}
    </div>
  )
}
