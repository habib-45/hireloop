"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Bookmark,
  CalendarClock,
  ChevronDown,
  CircleDollarSign,
  MapPin,
  Trash2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { SavedJobRow } from "@/lib/dashboard-data"

type SavedJobsListProps = {
  initialJobs: SavedJobRow[]
}

type Filter = "all" | "design" | "engineering" | "product"
type Sort = "recent" | "deadline" | "salary"

function categoryOf(job: SavedJobRow): Filter {
  const title = job.title.toLowerCase()

  if (title.includes("engineer") && !title.includes("design systems")) {
    return "engineering"
  }

  if (title.includes("product designer")) {
    return "design"
  }

  if (title.includes("researcher") || title.includes("design")) {
    return "design"
  }

  return "product"
}

export function SavedJobsList({ initialJobs }: SavedJobsListProps) {
  const [jobs, setJobs] = useState(initialJobs)
  const [filter, setFilter] = useState<Filter>("all")
  const [sort, setSort] = useState<Sort>("recent")

  const counts = useMemo(() => {
    return {
      all: 24,
      design: 18,
      engineering: 12,
      product: 14,
    }
  }, [])

  const visible = useMemo(() => {
    const filtered =
      filter === "all" ? jobs : jobs.filter((job) => categoryOf(job) === filter)

    return [...filtered].sort((a, b) => {
      if (sort === "deadline") {
        const aClosing = a.deadline ? 1 : 0
        const bClosing = b.deadline ? 1 : 0
        return bClosing - aClosing
      }

      if (sort === "salary") {
        const value = (salary: string) =>
          Number(salary.replace(/[^0-9]/g, "").slice(0, 3))
        return value(b.salary) - value(a.salary)
      }

      return 0
    })
  }, [filter, jobs, sort])

  function removeJob(id: string) {
    setJobs((current) => current.filter((job) => job.id !== id))
  }

  const tabs: { value: Filter; label: string }[] = [
    { value: "all", label: "All Saved" },
    { value: "design", label: "Design" },
    { value: "engineering", label: "Engineering" },
    { value: "product", label: "Product" },
  ]

  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[25px] leading-tight font-semibold tracking-[-0.03em] text-white">
            Saved Jobs
          </h1>
          <p className="mt-1.5 max-w-[430px] text-[11.5px] leading-relaxed text-white/35">
            Manage and track your bookmarked opportunities.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="flex w-[150px] items-center gap-3 rounded-[9px] border border-white/[0.06] bg-[#111114] px-3.5 py-3">
            <span className="flex size-7 items-center justify-center rounded-[6px] bg-[#5c53fe]/12 ring-1 ring-[#5c53fe]/20">
              <Bookmark className="size-3.5 text-[#b9b3ff]" />
            </span>
            <div>
              <p className="text-[15px] leading-none font-semibold text-white">
                {counts.all}
              </p>
              <p className="mt-1 text-[9px] text-white/32">Saved</p>
            </div>
          </div>
          <div className="flex w-[150px] items-center gap-3 rounded-[9px] border border-white/[0.06] bg-[#111114] px-3.5 py-3">
            <span className="flex size-7 items-center justify-center rounded-[6px] bg-[#f59e0b]/10 ring-1 ring-[#f59e0b]/20">
              <CalendarClock className="size-3.5 text-[#fbbf24]" />
            </span>
            <div>
              <p className="text-[15px] leading-none font-semibold text-white">
                3
              </p>
              <p className="mt-1 text-[9px] text-white/32">Closing Soon</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.055] pb-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setFilter(tab.value)}
              className={cn(
                "flex h-[28px] items-center gap-1.5 rounded-[6px] px-2.5 text-[10.5px] font-medium transition-colors",
                filter === tab.value
                  ? "bg-[#17171b] text-white ring-1 ring-white/[0.08]"
                  : "text-white/38 hover:bg-white/[0.04] hover:text-white/65"
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "font-mono text-[8.5px]",
                  filter === tab.value ? "text-white/45" : "text-white/22"
                )}
              >
                {counts[tab.value]}
              </span>
            </button>
          ))}
        </div>

        <label className="flex items-center gap-2 text-[10px] text-white/30">
          Sort by:
          <span className="relative">
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as Sort)}
              className="h-[28px] appearance-none rounded-[6px] border border-white/[0.07] bg-[#0e0e11] pr-7 pl-2.5 text-[10px] text-white/65 outline-none"
            >
              <option value="recent">Recently Saved</option>
              <option value="deadline">Closing Soon</option>
              <option value="salary">Highest Salary</option>
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-2 size-3 -translate-y-1/2 text-white/30" />
          </span>
        </label>
      </div>

      <div className="mt-3 space-y-2">
        {visible.map((job) => (
          <article
            key={job.id}
            className={cn(
              "group relative flex flex-col gap-4 rounded-[9px] border border-white/[0.055] bg-[#0c0c0e] p-4 transition-colors hover:border-white/[0.1] sm:flex-row sm:items-center",
              job.closed && "opacity-65"
            )}
          >
            <Link
              href={`/jobs/${job.id}`}
              className="relative size-10 shrink-0 overflow-hidden rounded-[8px] border border-white/[0.08] bg-[#151518]"
            >
              <Image
                src={job.logo}
                alt={`${job.company} logo`}
                fill
                sizes="40px"
                className="object-cover"
              />
            </Link>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/jobs/${job.id}`}
                  className="text-[14px] font-medium tracking-[-0.01em] text-white/90 transition-colors hover:text-white"
                >
                  {job.title}
                </Link>
                <span className="rounded-full border border-white/[0.08] px-1.5 py-0.5 font-mono text-[7.5px] tracking-[0.1em] text-white/32 uppercase">
                  {job.level}
                </span>
              </div>

              <div className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-1.5 text-[10px] text-white/38">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="size-3 text-white/25" />
                  {job.location}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CircleDollarSign className="size-3 text-white/25" />
                  {job.salary}
                </span>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-5 sm:flex-col sm:items-end sm:gap-1.5">
              <span className="text-[9.5px] text-white/28">{job.saved}</span>
              {job.deadline ? (
                <span
                  className={cn(
                    "text-[9px] font-medium",
                    job.closed ? "text-[#f87171]" : "text-[#fbbf24]"
                  )}
                >
                  {job.closed ? "Closed yesterday" : job.deadline}
                </span>
              ) : null}
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {job.closed ? (
                <button
                  type="button"
                  onClick={() => removeJob(job.id)}
                  className="inline-flex items-center gap-1.5 text-[10.5px] font-medium text-[#f87171] transition-colors hover:text-[#fca5a5]"
                >
                  <Trash2 className="size-3" />
                  Remove from list
                </button>
              ) : job.draft ? (
                <span className="inline-flex h-[29px] items-center rounded-[6px] border border-[#f59e0b]/20 bg-[#f59e0b]/8 px-3 text-[10px] font-medium text-[#fbbf24]">
                  Draft Started
                </span>
              ) : (
                <Button
                  nativeButton={false}
                  render={<Link href={`/jobs/${job.id}`} />}
                  className="h-[29px] rounded-[6px] bg-white px-3 text-[10.5px] font-medium text-[#0a0a0b] hover:bg-white/90"
                >
                  Apply Now
                </Button>
              )}

              <button
                type="button"
                onClick={() => removeJob(job.id)}
                aria-label={`Remove ${job.title} from saved jobs`}
                className="flex size-7 items-center justify-center rounded-[6px] text-white/22 transition-colors hover:bg-white/[0.05] hover:text-white/60"
              >
                <Bookmark className="size-3.5 fill-current" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {visible.length === 0 ? (
        <div className="mt-6 rounded-[10px] border border-dashed border-white/[0.08] py-14 text-center">
          <Bookmark className="mx-auto size-5 text-white/20" />
          <p className="mt-3 text-[12px] text-white/40">
            No saved jobs in this category yet.
          </p>
          <Link
            href="/jobs"
            className="mt-3 inline-block text-[11px] font-medium text-[#a8a1ff] hover:text-white"
          >
            Browse open roles
          </Link>
        </div>
      ) : null}

      <div className="mt-5 flex justify-center">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 text-[10.5px] text-white/35 transition-colors hover:text-white/65"
        >
          Load More
          <ChevronDown className="size-3" />
        </button>
      </div>
    </div>
  )
}
