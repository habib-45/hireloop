"use client"

import { useState, useTransition } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
} from "lucide-react"

import { JobListCard } from "@/components/public/job-list-card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { JobsResponse, JobSort, JobType } from "@/lib/types/jobs"

type JobsBrowserProps = {
  data: JobsResponse
  query: string
  types: JobType[]
  sort: JobSort
  basePath?: string
}

const sortOptions: { value: JobSort; label: string }[] = [
  { value: "recent", label: "Most Recent" },
  { value: "salary-desc", label: "Highest Salary" },
  { value: "salary-asc", label: "Lowest Salary" },
  { value: "title", label: "Job Title" },
]

export function JobsBrowser({
  data,
  query,
  types,
  sort,
  basePath = "/jobs",
}: JobsBrowserProps) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [search, setSearch] = useState(query)

  function buildUrl(next: {
    q?: string
    types?: JobType[]
    sort?: JobSort
    page?: number
  }) {
    const params = new URLSearchParams()

    const nextQuery = next.q ?? search
    const nextTypes = next.types ?? types
    const nextSort = next.sort ?? sort
    const nextPage = next.page ?? 1

    if (nextQuery.trim()) params.set("q", nextQuery.trim())
    if (nextTypes.length) params.set("types", nextTypes.join(","))
    if (nextSort !== "recent") params.set("sort", nextSort)
    if (nextPage > 1) params.set("page", String(nextPage))

    const searchString = params.toString()
    return `${basePath}${searchString ? `?${searchString}` : ""}`
  }

  function navigate(url: string) {
    startTransition(() => router.push(url))
  }

  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    navigate(buildUrl({ q: search, page: 1 }))
  }

  function toggleType(type: JobType) {
    const nextTypes = types.includes(type)
      ? types.filter((item) => item !== type)
      : [...types, type]

    navigate(buildUrl({ types: nextTypes, page: 1 }))
  }

  const firstResult =
    data.pagination.total === 0
      ? 0
      : (data.pagination.page - 1) * data.pagination.limit + 1
  const lastResult = Math.min(
    data.pagination.page * data.pagination.limit,
    data.pagination.total
  )

  return (
    <div className={cn("transition-opacity", isPending && "opacity-60")}>
      <form
        onSubmit={handleSearch}
        className="flex h-[60px] items-center gap-3 rounded-[10px] border border-white/[0.07] bg-[#0b0b0d] py-1.5 pr-1.5 pl-5 shadow-[0_18px_60px_-40px_rgba(0,0,0,0.9)] sm:h-[64px]"
      >
        <Search className="size-[18px] shrink-0 text-[#6e6e78]" strokeWidth={1.8} />
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by job title, keywords..."
          aria-label="Search jobs"
          className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#ededef] outline-none placeholder:text-[#6e6e78]"
        />
        <Button
          type="submit"
          className="h-full shrink-0 rounded-[8px] bg-white px-5 text-[13.5px] font-medium text-[#0b0b0d] hover:bg-white/90 sm:px-7 sm:text-[14.5px]"
        >
          Search Jobs
        </Button>
      </form>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[244px_minmax(0,1fr)]">
        <aside className="rounded-[12px] border border-white/[0.06] bg-[#0a0a0c] p-5">
          <div className="flex items-center gap-2.5">
            <SlidersHorizontal className="size-4 text-[#a0a0ab]" />
            <h2 className="text-[17px] font-medium tracking-[-0.02em] text-[#ededef]">
              Filters
            </h2>
          </div>

          <div className="mt-6">
            <h3 className="text-[13.5px] font-medium text-[#ededef]">
              Job Type
            </h3>
            <div className="mt-3 space-y-1.5">
              {data.filters.types.map((option) => {
                const checked = types.includes(option.value)

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => toggleType(option.value)}
                    aria-pressed={checked}
                    className="flex w-full items-center gap-2.5 rounded-md px-1 py-1.5 text-left transition-colors hover:bg-white/[0.03]"
                  >
                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center rounded-[4px] border transition-colors",
                        checked
                          ? "border-white bg-white text-[#0b0b0d]"
                          : "border-white/20 bg-white/[0.03] text-transparent"
                      )}
                    >
                      <Check className="size-3" strokeWidth={3} />
                    </span>
                    <span className="flex-1 text-[13px] text-[#a0a0ab]">
                      {option.label}
                    </span>
                    <span className="font-mono text-[11.5px] text-[#57575f]">
                      {option.count > 999
                        ? `${(option.count / 1000).toFixed(1)}k`
                        : option.count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        <div>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-[18px] font-medium tracking-[-0.03em] text-[#ededef] sm:text-[20px]">
              Found {data.pagination.total.toLocaleString()} Professional Jobs
            </h1>

            <label className="relative flex items-center gap-2 text-[12.5px] text-[#6e6e78]">
              <span className="whitespace-nowrap">Sort by:</span>
              <span className="relative">
                <select
                  value={sort}
                  onChange={(event) =>
                    navigate(
                      buildUrl({
                        sort: event.target.value as JobSort,
                        page: 1,
                      })
                    )
                  }
                  aria-label="Sort jobs"
                  className="h-9 appearance-none rounded-lg border border-white/[0.07] bg-[#0c0c0e] pr-8 pl-3 text-[12.5px] text-[#ededef] outline-none transition-colors hover:border-white/15"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-[#6e6e78]" />
              </span>
            </label>
          </div>

          {data.jobs.length > 0 ? (
            <div className="mt-4 space-y-3">
              {data.jobs.map((job) => (
                <JobListCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="mt-4 flex min-h-[320px] flex-col items-center justify-center rounded-[14px] border border-white/[0.06] bg-[#0a0a0c] px-6 text-center">
              <Search className="size-8 text-[#3f3f46]" strokeWidth={1.5} />
              <h2 className="mt-4 text-[18px] font-medium text-[#ededef]">
                No jobs found
              </h2>
              <p className="mt-2 max-w-[340px] text-[13.5px] leading-relaxed text-[#8f8f99]">
                Try a different keyword or remove the job type filters to see
                more openings.
              </p>
              <Button
                type="button"
                onClick={() => {
                  setSearch("")
                  navigate("/jobs")
                }}
                variant="outline"
                className="mt-5 h-10 rounded-lg border-white/10 bg-white/[0.04] px-4 text-[13px] text-white hover:bg-white/[0.08]"
              >
                Clear filters
              </Button>
            </div>
          )}

          {data.pagination.total > 0 ? (
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[12.5px] text-[#6e6e78]">
                Showing {firstResult}–{lastResult} of {data.pagination.total}{" "}
                jobs
              </p>

              <nav
                aria-label="Job results pages"
                className="flex items-center gap-1"
              >
                <PageArrow
                  href={buildUrl({ page: data.pagination.page - 1 })}
                  disabled={!data.pagination.hasPrev}
                  label="Previous page"
                  onNavigate={navigate}
                >
                  <ChevronLeft className="size-4" />
                </PageArrow>

                {getPageNumbers(
                  data.pagination.page,
                  data.pagination.totalPages
                ).map((page, index) =>
                  page === "ellipsis" ? (
                    <span
                      key={`gap-${index}`}
                      className="flex size-8 items-center justify-center text-[12px] text-[#57575f]"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      type="button"
                      onClick={() => navigate(buildUrl({ page }))}
                      aria-current={
                        page === data.pagination.page ? "page" : undefined
                      }
                      className={cn(
                        "flex size-8 items-center justify-center rounded-md text-[12.5px] transition-colors",
                        page === data.pagination.page
                          ? "bg-white font-medium text-[#0b0b0d]"
                          : "text-[#8f8f99] hover:bg-white/[0.05] hover:text-white"
                      )}
                    >
                      {page}
                    </button>
                  )
                )}

                <PageArrow
                  href={buildUrl({ page: data.pagination.page + 1 })}
                  disabled={!data.pagination.hasNext}
                  label="Next page"
                  onNavigate={navigate}
                >
                  <ChevronRight className="size-4" />
                </PageArrow>
              </nav>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  )
}

function getPageNumbers(current: number, total: number) {
  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const pages: (number | "ellipsis")[] = [1]

  if (current > 4) pages.push("ellipsis")

  for (
    let page = Math.max(2, current - 1);
    page <= Math.min(total - 1, current + 1);
    page += 1
  ) {
    pages.push(page)
  }

  if (current < total - 3) pages.push("ellipsis")

  pages.push(total)

  return pages
}

function PageArrow({
  href,
  disabled,
  label,
  onNavigate,
  children,
}: {
  href: string
  disabled: boolean
  label: string
  onNavigate: (href: string) => void
  children: React.ReactNode
}) {
  if (disabled) {
    return (
      <span
        aria-disabled
        className="flex size-8 items-center justify-center rounded-md text-[#3f3f46]"
      >
        {children}
      </span>
    )
  }

  return (
    <Link
      href={href}
      aria-label={label}
      onClick={(event) => {
        event.preventDefault()
        onNavigate(href)
      }}
      className="flex size-8 items-center justify-center rounded-md text-[#8f8f99] transition-colors hover:bg-white/[0.05] hover:text-white"
    >
      {children}
    </Link>
  )
}
