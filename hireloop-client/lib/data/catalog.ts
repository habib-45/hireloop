import catalog from "@/lib/data/catalog.json"

import type {
  JobCompany,
  JobDetail,
  JobSummary,
  JobType,
  JobsResponse,
  JobSort,
} from "@/lib/types/jobs"

type CatalogPlan = {
  id: string
  name: string
  shortName: string
  description: string
  interval: string
  priceUsd: number
  monthlyPriceUsd: number
  yearlyPriceUsd: number
  checkoutEnabled: boolean
  popular: boolean
  features: string[]
}

type Catalog = {
  companies: JobCompany[]
  jobs: JobDetail[]
  plans: CatalogPlan[]
  exchangeRate: number
}

const data = catalog as Catalog

export const companies = data.companies
export const catalogJobs = data.jobs
export const catalogPlans = data.plans
export const catalogExchangeRate = data.exchangeRate

export const companiesById = new Map(
  companies.map((company) => [company.id, company])
)

export const jobsById = new Map(catalogJobs.map((job) => [job.id, job]))

const jobTypeLabels: Record<JobType, string> = {
  "full-time": "Full-time",
  contract: "Contract",
  freelance: "Freelance",
}

export function toJobSummary(job: JobDetail): JobSummary {
  const { company, description, responsibilities, requirements, benefits, ...summary } =
    job

  void description
  void responsibilities
  void requirements
  void benefits

  return {
    ...summary,
    company: {
      id: company.id,
      name: company.name,
      logo: company.logo,
      verified: company.verified,
    },
  }
}

export function sortJobs(list: JobDetail[], sort: JobSort = "recent") {
  const sorted = [...list]

  if (sort === "salary-desc") {
    return sorted.sort((a, b) => b.salaryMax - a.salaryMax)
  }

  if (sort === "salary-asc") {
    return sorted.sort((a, b) => a.salaryMin - b.salaryMin)
  }

  if (sort === "title") {
    return sorted.sort((a, b) => a.title.localeCompare(b.title))
  }

  return sorted.sort(
    (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
  )
}

type LocalJobsQuery = {
  q?: string
  types?: JobType[]
  sort?: JobSort
  page?: number
  limit?: number
}

export function getLocalJobs({
  q = "",
  types = [],
  sort = "recent",
  page = 1,
  limit = 4,
}: LocalJobsQuery = {}): JobsResponse {
  const needle = q.trim().toLowerCase()

  let filtered = catalogJobs.filter((job) => {
    if (types.length > 0 && !types.includes(job.type)) {
      return false
    }

    if (!needle) {
      return true
    }

    const haystack = [
      job.title,
      job.company.name,
      job.company.industry,
      job.location,
      job.workplaceLabel,
      job.typeLabel,
      job.level,
      job.summary,
      job.description,
      ...job.cardTags,
      ...job.requirements.skills,
    ]
      .join(" ")
      .toLowerCase()

    return haystack.includes(needle)
  })

  filtered = sortJobs(filtered, sort)

  const total = filtered.length
  const totalPages = Math.max(1, Math.ceil(total / limit))
  const safePage = Math.min(Math.max(page, 1), totalPages)
  const start = (safePage - 1) * limit
  const pageJobs = filtered.slice(start, start + limit)

  const counts = (Object.keys(jobTypeLabels) as JobType[]).map((value) => ({
    value,
    label: jobTypeLabels[value],
    count: catalogJobs.filter((job) => job.type === value).length,
  }))

  return {
    jobs: pageJobs.map(toJobSummary),
    pagination: {
      page: safePage,
      limit,
      total,
      totalPages,
      hasPrev: safePage > 1,
      hasNext: safePage < totalPages,
    },
    filters: {
      types: counts,
      total: catalogJobs.length,
    },
  }
}

export function getLocalJob(id: string) {
  return jobsById.get(id) ?? null
}

export function getLocalRelatedJobs(job: JobDetail, limit = 3) {
  return catalogJobs
    .filter((candidate) => candidate.id !== job.id)
    .sort((a, b) => {
      const score = (candidate: JobDetail) =>
        (candidate.company.id === job.company.id ? 3 : 0) +
        (candidate.title === job.title ? 2 : 0) +
        (candidate.type === job.type ? 1 : 0)

      return score(b) - score(a)
    })
    .slice(0, limit)
}

export function getCompanyOpenings(companyId: string) {
  return catalogJobs.filter((job) => job.company.id === companyId)
}
