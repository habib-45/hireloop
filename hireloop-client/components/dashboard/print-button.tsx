"use client"

import { Download } from "lucide-react"

import { cn } from "@/lib/utils"

export function PrintButton({
  label = "Export PDF",
  className,
}: {
  label?: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={cn(
        "inline-flex items-center gap-1.5 text-[10.5px] font-medium text-white/45 transition-colors hover:text-white",
        className
      )}
    >
      <Download className="size-3" />
      {label}
    </button>
  )
}
