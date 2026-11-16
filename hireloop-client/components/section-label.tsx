import { cn } from "@/lib/utils"

type SectionLabelProps = {
  children: React.ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={cn(
        "flex items-center justify-center gap-3.5 font-mono text-[10.5px] font-medium tracking-[0.34em] text-[#c4c4c8] uppercase sm:text-[11.5px] sm:tracking-[0.38em]",
        className
      )}
    >
      <span
        aria-hidden
        className="size-[5px] rounded-[1px] bg-[#635bff] shadow-[0_0_10px_rgba(92,83,254,0.85)]"
      />
      <span>{children}</span>
      <span
        aria-hidden
        className="size-[5px] rounded-[1px] bg-[#635bff] shadow-[0_0_10px_rgba(92,83,254,0.85)]"
      />
    </p>
  )
}
