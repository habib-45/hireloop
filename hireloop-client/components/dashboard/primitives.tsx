import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

export function DashboardCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "rounded-[10px] border border-white/[0.06] bg-[#0b0b0d]",
        className
      )}
    >
      {children}
    </section>
  )
}

export function CardHeader({
  title,
  action,
  className,
}: {
  title: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5",
        className
      )}
    >
      <h2 className="text-[13px] font-semibold text-white/85">{title}</h2>
      {action}
    </div>
  )
}

export function PageHeader({
  title,
  description,
  eyebrow,
  actions,
  className,
}: {
  title: string
  description?: string
  eyebrow?: ReactNode
  actions?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
        className
      )}
    >
      <div className="min-w-0">
        {eyebrow ? <div className="mb-2">{eyebrow}</div> : null}
        <h1 className="text-[22px] leading-tight font-semibold tracking-[-0.03em] text-white sm:text-[25px]">
          {title}
        </h1>
        {description ? (
          <p className="mt-1.5 max-w-[560px] text-[11.5px] leading-relaxed text-white/35">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 items-center gap-2">{actions}</div>
      ) : null}
    </div>
  )
}

export function TableShell({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] border-collapse text-left">
        {children}
      </table>
    </div>
  )
}

export function TableHead({ children }: { children: ReactNode }) {
  return (
    <thead>
      <tr className="border-b border-white/[0.06] text-[9px] tracking-[0.12em] text-white/28 uppercase">
        {children}
      </tr>
    </thead>
  )
}

export function Th({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <th
      className={cn(
        "px-4 py-3 font-medium whitespace-nowrap sm:px-5",
        className
      )}
    >
      {children}
    </th>
  )
}

export function Td({
  children,
  className,
}: {
  children?: ReactNode
  className?: string
}) {
  return (
    <td
      className={cn(
        "border-b border-white/[0.04] px-4 py-3 text-[11.5px] text-white/55 sm:px-5",
        className
      )}
    >
      {children}
    </td>
  )
}
