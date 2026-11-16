import type { Metadata } from "next"

import { JobsBrowser } from "@/app/jobs/_components/jobs-browser"
import { SiteFooter } from "@/components/site-footer"
import { SiteNavbar } from "@/components/site-navbar"
import { fetchJobs } from "@/lib/api/server"
import { getLocalJobs } from "@/lib/data/catalog"
import type { JobSort, JobType } from "@/lib/types/jobs"

export const metadata: Metadata = {
  title: "Browse Jobs",
  description:
    "Browse curated roles from world-class companies. Filter by job type, location, salary, and more on HireLoop.",
}

const validTypes: JobType[] = ["full-time", "contract", "freelance"]
const validSorts: JobSort[] = ["recent", "salary-desc", "salary-asc", "title"]

type JobsPageProps = {
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

export default async function JobsPage({ searchParams }: JobsPageProps) {
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
    <div className="relative min-h-svh overflow-x-clip bg-[#050506]">
      <SiteNavbar compact />
      <main className="pt-[104px] pb-24">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6">
          <JobsBrowser data={data} query={q} types={types} sort={sort} />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
