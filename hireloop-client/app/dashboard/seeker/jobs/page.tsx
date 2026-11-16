import type { Metadata } from "next"

import { JobsBrowser } from "@/app/jobs/_components/jobs-browser"
import { fetchJobs } from "@/lib/api/server"
import { getLocalJobs } from "@/lib/data/catalog"
import type { JobSort, JobType } from "@/lib/types/jobs"

export const metadata: Metadata = {
  title: "Find Jobs",
}

const validTypes: JobType[] = ["full-time", "contract", "freelance"]
const validSorts: JobSort[] = ["recent", "salary-desc", "salary-asc", "title"]

type SeekerJobsPageProps = {
  searchParams: Promise<{
    q?: string | string[]
    types?: string | string[]
    sort?: string | string[]
    page?: string | string[]
  }>
}

function first(value?: string | string[]) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "")
}

export default async function SeekerJobsPage({
  searchParams,
}: SeekerJobsPageProps) {
  const params = await searchParams
  const q = first(params.q).slice(0, 120)
  const page = Math.max(Number.parseInt(first(params.page), 10) || 1, 1)

  const types = (Array.isArray(params.types) ? params.types : [params.types])
    .flatMap((value) => (value ?? "").split(","))
    .map((value) => value.trim())
    .filter((value): value is JobType =>
      validTypes.includes(value as JobType)
    )

  const sortValue = first(params.sort)
  const sort: JobSort = validSorts.includes(sortValue as JobSort)
    ? (sortValue as JobSort)
    : "recent"

  const remote = await fetchJobs({ q, types, sort, page, limit: 4 })
  const data = remote ?? getLocalJobs({ q, types, sort, page, limit: 4 })

  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <div className="mb-5">
        <h1 className="text-[25px] leading-tight font-semibold tracking-[-0.03em] text-white">
          Find Jobs
        </h1>
        <p className="mt-1.5 text-[11.5px] text-white/35">
          Search the full HireLoop catalogue and apply without leaving your
          workspace.
        </p>
      </div>
      <JobsBrowser
        data={data}
        query={q}
        types={types}
        sort={sort}
        basePath="/dashboard/seeker/jobs"
      />
    </div>
  )
}
