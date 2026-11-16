"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Send,
} from "lucide-react"
import {
  DashboardCard,
  TableHead,
  TableShell,
  Td,
  Th,
} from "@/components/dashboard/primitives"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { cn } from "@/lib/utils"
import {
  applicationStats,
  applications,
} from "@/lib/dashboard-data"

type Tab = "active" | "archived"

const companyColors = [
  "bg-[#5c53fe]/15 text-[#b9b3ff]",
  "bg-[#0ea5e9]/15 text-[#7dd3fc]",
  "bg-[#a855f7]/15 text-[#d8b4fe]",
  "bg-[#ef4444]/15 text-[#fca5a5]",
  "bg-[#22c55e]/15 text-[#86efac]",
]

export function ApplicationsTable() {
  const [tab, setTab] = useState<Tab>("active")

  const rows = useMemo(() => {
    if (tab === "archived") {
      return applications.filter((row) => row.archived)
    }

    return applications.filter((row) => !row.archived)
  }, [tab])

  function exportPdf() {
    window.print()
  }

  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[25px] leading-tight font-semibold tracking-[-0.03em] text-white">
            My Applications
          </h1>
          <p className="mt-1.5 text-[11.5px] text-white/35">
            Track your job applications and interview progress in real-time.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex rounded-[6px] border border-white/[0.07] bg-[#0d0d10] p-0.5">
            {(["active", "archived"] as Tab[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setTab(value)}
                className={cn(
                  "h-[26px] rounded-[4px] px-2.5 text-[10px] font-medium capitalize transition-colors",
                  tab === value
                    ? "bg-white/[0.09] text-white"
                    : "text-white/35 hover:text-white/65"
                )}
              >
                {value}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={exportPdf}
            className="inline-flex h-[30px] items-center gap-1.5 rounded-[6px] bg-white px-3 text-[10.5px] font-semibold text-[#0a0a0b] transition-colors hover:bg-white/90"
          >
            <Download className="size-3" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {applicationStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[9px] border border-white/[0.06] bg-[#0d0d10] p-4"
          >
            <p className="text-[10px] text-white/32">{stat.label}</p>
            <p
              className={cn(
                "mt-2.5 text-[22px] leading-none font-semibold tracking-[-0.03em]",
                "accent" in stat && stat.accent
                  ? "text-[#4ade80]"
                  : "text-white"
              )}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <DashboardCard className="mt-4 overflow-hidden">
        <TableShell>
          <TableHead>
            <Th className="pl-5">Job Title</Th>
            <Th>Company</Th>
            <Th>Applied</Th>
            <Th>Status</Th>
            <Th className="text-right">Action</Th>
          </TableHead>
          <tbody>
            {rows.map((row, index) => (
              <ApplicationRowView
                key={row.id}
                row={row}
                color={companyColors[index % companyColors.length]}
              />
            ))}
          </tbody>
        </TableShell>

        {rows.length === 0 ? (
          <div className="py-14 text-center">
            <Send className="mx-auto size-5 text-white/20" />
            <p className="mt-3 text-[11.5px] text-white/35">
              Nothing in this view yet.
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row">
            <p className="text-[10px] text-white/28">
              Showing 1–{rows.length} of 24 applications
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                aria-label="Previous page"
                className="flex size-7 items-center justify-center rounded-[5px] text-white/25 transition-colors hover:bg-white/[0.05] hover:text-white/60"
              >
                <ChevronLeft className="size-3.5" />
              </button>
              {[1, 2, 3].map((page) => (
                <button
                  key={page}
                  type="button"
                  className={cn(
                    "size-7 rounded-[5px] text-[10.5px] font-medium transition-colors",
                    page === 1
                      ? "bg-white text-[#0a0a0b]"
                      : "text-white/35 hover:bg-white/[0.05] hover:text-white/70"
                  )}
                >
                  {page}
                </button>
              ))}
              <span className="px-1 text-[10px] text-white/22">…</span>
              <button
                type="button"
                className="size-7 rounded-[5px] text-[10.5px] font-medium text-white/35 transition-colors hover:bg-white/[0.05] hover:text-white/70"
              >
                5
              </button>
              <button
                type="button"
                aria-label="Next page"
                className="flex size-7 items-center justify-center rounded-[5px] text-white/40 transition-colors hover:bg-white/[0.05] hover:text-white/70"
              >
                <ChevronRight className="size-3.5" />
              </button>
            </div>
          </div>
        )}
      </DashboardCard>
    </div>
  )
}

function ApplicationRowView({
  row,
  color,
}: {
  row: (typeof applications)[number]
  color: string
}) {
  return (
    <tr className="transition-colors hover:bg-white/[0.018]">
      <Td className="pl-5">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "flex size-7 shrink-0 items-center justify-center rounded-[6px] text-[10px] font-semibold",
              color
            )}
          >
            {row.title.charAt(0)}
          </span>
          <div>
            <p className="text-[11.5px] font-medium text-white/85">
              {row.title}
            </p>
            <p className="mt-0.5 text-[9px] text-white/28">{row.type}</p>
          </div>
        </div>
      </Td>
      <Td>{row.company}</Td>
      <Td>{row.applied}</Td>
      <Td>
        <StatusBadge status={row.status} />
      </Td>
      <Td className="text-right">
        <Link
          href={`/jobs/${row.jobId}`}
          className="inline-flex items-center gap-1 text-[10.5px] font-medium text-white/50 transition-colors hover:text-white"
        >
          Details
          <ArrowUpRight className="size-3" />
        </Link>
      </Td>
    </tr>
  )
}
