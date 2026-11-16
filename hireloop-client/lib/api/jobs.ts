import { apiRequest } from "@/lib/api/client"
import type {
  AppliedJobResponse,
  JobDetailResponse,
  JobsResponse,
  JobSort,
  JobType,
} from "@/lib/types/jobs"

type GetJobsParams = {
  q?: string
  types?: JobType[]
  sort?: JobSort
  page?: number
  limit?: number
}

export function getJobs(params: GetJobsParams = {}) {
  const search = new URLSearchParams()

  const q = params.q?.trim()

  if (q) {
    search.set("q", q)
  }

  if (params.types?.length) {
    search.set("types", params.types.join(","))
  }

  if (params.sort) {
    search.set("sort", params.sort)
  }

  if (params.page) {
    search.set("page", String(params.page))
  }

  if (params.limit) {
    search.set("limit", String(params.limit))
  }

  const query = search.toString()

  return apiRequest<JobsResponse>(`/api/jobs${query ? `?${query}` : ""}`)
}

export function getJob(id: string) {
  return apiRequest<JobDetailResponse>(`/api/jobs/${encodeURIComponent(id)}`)
}

export function applyToJob(id: string) {
  return apiRequest<AppliedJobResponse>(
    `/api/jobs/${encodeURIComponent(id)}/apply`,
    {
      method: "POST",
    }
  )
}
