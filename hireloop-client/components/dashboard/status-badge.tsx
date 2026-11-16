import { cn } from "@/lib/utils"

const tones: Record<string, string> = {
  active: "bg-[#22c55e]/10 text-[#4ade80] ring-[#22c55e]/20",
  paid: "bg-[#22c55e]/10 text-[#4ade80] ring-[#22c55e]/20",
  success: "bg-[#22c55e]/10 text-[#4ade80] ring-[#22c55e]/20",
  offered: "bg-[#22c55e]/10 text-[#4ade80] ring-[#22c55e]/20",
  hired: "bg-[#22c55e]/10 text-[#4ade80] ring-[#22c55e]/20",
  applied: "bg-[#5c53fe]/12 text-[#b9b3ff] ring-[#5c53fe]/25",
  new: "bg-[#0ea5e9]/10 text-[#7dd3fc] ring-[#0ea5e9]/20",
  shortlisted: "bg-[#a855f7]/10 text-[#d8b4fe] ring-[#a855f7]/20",
  interview: "bg-[#f59e0b]/10 text-[#fbbf24] ring-[#f59e0b]/20",
  interviewing: "bg-[#f59e0b]/10 text-[#fbbf24] ring-[#f59e0b]/20",
  pending: "bg-[#f59e0b]/10 text-[#fbbf24] ring-[#f59e0b]/20",
  review: "bg-[#f59e0b]/10 text-[#fbbf24] ring-[#f59e0b]/20",
  reviewing: "bg-[#f59e0b]/10 text-[#fbbf24] ring-[#f59e0b]/20",
  rejected: "bg-[#ef4444]/10 text-[#f87171] ring-[#ef4444]/20",
  failed: "bg-[#ef4444]/10 text-[#f87171] ring-[#ef4444]/20",
  suspended: "bg-[#ef4444]/10 text-[#f87171] ring-[#ef4444]/20",
  expired: "bg-white/[0.06] text-white/45 ring-white/10",
  closed: "bg-white/[0.06] text-white/45 ring-white/10",
}

type StatusBadgeProps = {
  status: string
  dot?: boolean
  className?: string
}

export function StatusBadge({ status, dot = true, className }: StatusBadgeProps) {
  const tone = tones[status.toLowerCase()] ?? tones.expired

  return (
    <span
      className={cn(
        "inline-flex h-[21px] items-center gap-1.5 rounded-full px-2 text-[9.5px] font-medium ring-1 ring-inset",
        tone,
        className
      )}
    >
      {dot ? <span className="size-1.5 rounded-full bg-current" /> : null}
      {status}
    </span>
  )
}
