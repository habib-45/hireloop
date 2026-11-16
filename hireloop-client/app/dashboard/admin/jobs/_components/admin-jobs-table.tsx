"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import {
  ArrowDownRight,
  ArrowUpRight,
  Clock3,
  Eye,
  EyeOff,
  Mail,
  Plus,
  TrendingUp,
  Trash2,
} from "lucide-react"

import {
  DashboardCard,
  TableHead,
  TableShell,
  Td,
  Th,
} from "@/components/dashboard/primitives"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { adminJobs } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

type Tab = "Active" | "Closed"

const categories = ["All Categories", "Design", "Engineering", "Marketing"]

export function AdminJobsTable() {
  const [jobs, setJobs] = useState(adminJobs)
  const [tab, setTab] = useState<Tab>("Active")
  const [category, setCategory] = useState("All Categories")

  const rows = useMemo(() => {
    return jobs.filter((job) => {
      if (job.status !== tab) {
        return false
      }

      if (category !== "All Categories" && job.category !== category) {
        return false
      }

      return true
    })
  }, [category, jobs, tab])

  const activeCount = jobs.filter((job) => job.status === "Active").length
  const closedCount = jobs.filter((job) => job.status === "Closed").length

  function toggleStatus(id: string) {
    setJobs((current) =>
      current.map((job) =>
        job.id === id
          ? {
              ...job,
              status: job.status === "Active" ? "Closed" : "Active",
            }
          : job
      )
    )
  }

  function removeJob(id: string) {
    setJobs((current) => current.filter((job) => job.id !== id))
  }

  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[25px] leading-tight font-semibold tracking-[-0.03em] text-white">
            Manage Jobs
          </h1>
          <p className="mt-1.5 max-w-[520px] text-[11.5px] leading-relaxed text-white/35">
            Oversee all active listings and historical job posts across the
            platform.
          </p>
        </div>
        <Link
          href="/dashboard/admin/jobs/new"
          className="inline-flex h-[30px] items-center gap-1.5 rounded-[6px] bg-white px-3 text-[10.5px] font-semibold text-[#0a0a0b] transition-colors hover:bg-white/90"
        >
          <Plus className="size-3.5" />
          Create Job
        </Link>
      </div>

      <DashboardCard className="mt-5">
        <div className="flex flex-wrap items-center gap-2 border-b border-white/[0.055] px-4 py-3">
          <label className="relative">
            <span className="sr-only">Filter by status</span>
            <select
              value={tab}
              onChange={(event) => setTab(event.target.value as Tab)}
              className="h-[28px] appearance-none rounded-[5px] border border-white/[0.07] bg-[#101013] pr-6 pl-2.5 text-[10px] text-white/55 outline-none"
            >
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
            <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[7px] text-white/25">
              ▼
            </span>
          </label>

          <label className="relative">
            <span className="sr-only">Filter by category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-[28px] appearance-none rounded-[5px] border border-white/[0.07] bg-[#101013] pr-6 pl-2.5 text-[10px] text-white/55 outline-none"
            >
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 text-[7px] text-white/25">
              ▼
            </span>
          </label>

          <div className="ml-auto flex items-center gap-1">
            {(
              [
                { value: "Active", label: "Active", count: activeCount },
                { value: "Closed", label: "Closed", count: closedCount },
              ] as const
            ).map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setTab(item.value)}
                className={cn(
                  "h-[26px] rounded-[5px] px-2.5 text-[9.5px] font-medium transition-colors",
                  tab === item.value
                    ? "bg-white/[0.09] text-white"
                    : "text-white/32 hover:text-white/60"
                )}
              >
                {item.label} ({item.count})
              </button>
            ))}
          </div>
        </div>

        <TableShell>
          <TableHead>
            <Th className="pl-5">Title</Th>
            <Th>Company</Th>
            <Th>Category</Th>
            <Th>Type</Th>
            <Th>Date Posted</Th>
            <Th>Status</Th>
            <Th className="text-right">Actions</Th>
          </TableHead>
          <tbody>
            {rows.map((job) => (
              <tr
                key={job.id}
                className="transition-colors hover:bg-white/[0.018]"
              >
                <Td className="pl-5">
                  <p className="text-[11.5px] font-medium text-white/80">
                    {job.title}
                  </p>
                  <p className="mt-0.5 font-mono text-[8.5px] text-white/22">
                    REF-{job.id.replace("job-", "100")}
                  </p>
                </Td>
                <Td>
                  <div className="flex items-center gap-2">
                    <span className="flex size-6 shrink-0 items-center justify-center rounded-[5px] bg-[#17171b] text-[9px] font-semibold text-white/45 ring-1 ring-white/[0.06]">
                      {job.company.charAt(0)}
                    </span>
                    {job.company}
                  </div>
                </Td>
                <Td>{job.category}</Td>
                <Td>{job.type}</Td>
                <Td className="whitespace-nowrap">{job.posted}</Td>
                <Td>
                  <StatusBadge status={job.status} />
                </Td>
                <Td className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => toggleStatus(job.id)}
                      aria-label={
                        job.status === "Active"
                          ? `Close ${job.title}`
                          : `Publish ${job.title}`
                      }
                      className="flex size-6 items-center justify-center rounded-[5px] text-white/28 transition-colors hover:bg-white/[0.05] hover:text-white/70"
                    >
                      {job.status === "Active" ? (
                        <Eye className="size-3.5" />
                      ) : (
                        <EyeOff className="size-3.5" />
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeJob(job.id)}
                      aria-label={`Delete ${job.title}`}
                      className="flex size-6 items-center justify-center rounded-[5px] text-white/22 transition-colors hover:bg-[#ef4444]/10 hover:text-[#f87171]"
                    >
                      <Trash2 className="size-3" />
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>

        {rows.length === 0 ? (
          <p className="py-12 text-center text-[11px] text-white/30">
            No jobs in this view.
          </p>
        ) : (
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-[9.5px] text-white/25">
              Showing {rows.length} of {tab === "Active" ? "328" : "143"} jobs
            </p>
            <div className="flex items-center gap-1">
              <span className="rounded-[4px] bg-white/[0.09] px-2 py-1 text-[9.5px] text-white">
                1
              </span>
              <span className="px-2 py-1 text-[9.5px] text-white/30">2</span>
              <span className="px-2 py-1 text-[9.5px] text-white/30">3</span>
              <span className="px-1 text-[9.5px] text-white/20">…</span>
            </div>
          </div>
        )}
      </DashboardCard>

      <div className="mt-3 grid gap-2.5 md:grid-cols-3">
        {[
          {
            label: "Engagement Rate",
            value: "82.4%",
            hint: "+1.2% from last month",
            positive: true,
            icon: TrendingUp,
          },
          {
            label: "Avg. Time to Fill",
            value: "14 Days",
            hint: "Stable performance",
            positive: true,
            icon: Clock3,
          },
          {
            label: "Total Applications",
            value: "12,840",
            hint: "-2.1% across Niche sectors",
            positive: false,
            icon: Mail,
          },
        ].map((metric) => {
          const Icon = metric.icon

          return (
            <div
              key={metric.label}
              className="rounded-[10px] border border-white/[0.06] bg-[linear-gradient(160deg,#0f0f12_0%,#0a0a0c_100%)] p-4"
            >
              <div className="flex items-center gap-2.5">
                <span className="flex size-7 items-center justify-center rounded-[6px] border border-white/[0.07] bg-white/[0.035]">
                  <Icon className="size-3.5 text-[#a49dff]" />
                </span>
                <p className="text-[10.5px] text-white/38">{metric.label}</p>
              </div>
              <p className="mt-3 text-[22px] leading-none font-semibold tracking-[-0.03em] text-white">
                {metric.value}
              </p>
              <p
                className={cn(
                  "mt-2 inline-flex items-center gap-1 text-[9.5px]",
                  metric.positive ? "text-[#4ade80]" : "text-[#f87171]"
                )}
              >
                {metric.positive ? (
                  <ArrowUpRight className="size-2.5" />
                ) : (
                  <ArrowDownRight className="size-2.5" />
                )}
                {metric.hint}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
