export type JobType = "full-time" | "contract" | "freelance"

export type Workplace = "remote" | "hybrid" | "on-site"

export type JobCompanySummary = {
  id: string
  name: string
  logo: string
  verified: boolean
}

export type JobCompany = JobCompanySummary & {
  coverImage: string | null
  size: string
  industry: string
  location: string
  website: string
  about: string
}

export type JobSummary = {
  id: string
  title: string
  company: JobCompanySummary
  location: string
  workplace: Workplace
  workplaceLabel: string
  remote: boolean
  type: JobType
  typeLabel: string
  level: string
  experience: string
  salaryMin: number
  salaryMax: number
  salaryCurrency: string
  salaryPeriod: string
  salaryLabel: string
  postedAt: string
  easyApply: boolean
  hot: boolean
  cardTags: string[]
  summary: string
}

export type JobDetail = Omit<JobSummary, "company"> & {
  company: JobCompany
  description: string
  responsibilities: string[]
  requirements: {
    skills: string[]
    items: string[]
  }
  benefits: string[]
}

export type JobTypeFilter = {
  value: JobType
  label: string
  count: number
}

export type JobsResponse = {
  jobs: JobSummary[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
    hasPrev: boolean
    hasNext: boolean
  }
  filters: {
    types: JobTypeFilter[]
    total: number
  }
}

export type JobDetailResponse = {
  job: JobDetail
  similarJobs: JobSummary[]
  hasApplied: boolean
}

export type JobSort = "recent" | "salary-desc" | "salary-asc" | "title"

export type AppliedJobResponse = {
  application: {
    id: string
    jobId: string
    status: string
    createdAt: string
  }
}
