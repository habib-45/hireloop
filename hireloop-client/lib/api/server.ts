import type {
  JobDetailResponse,
  JobsResponse,
  JobSort,
  JobType,
} from "@/lib/types/jobs"
import type { CheckoutSessionResponse, PlansResponse } from "@/lib/types/checkout"

const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"
).replace(/\/$/, "")

async function serverFetch<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      cache: "no-store",
      signal: AbortSignal.timeout(2500),
    })

    if (!response.ok) {
      return null
    }

    return (await response.json()) as T
  } catch {
    return null
  }
}

type JobsQuery = {
  q?: string
  types?: JobType[]
  sort?: JobSort
  page?: number
  limit?: number
}

export function fetchJobs(params: JobsQuery = {}) {
  const search = new URLSearchParams()

  if (params.q?.trim()) {
    search.set("q", params.q.trim())
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

  return serverFetch<JobsResponse>(`/api/jobs${query ? `?${query}` : ""}`)
}

export function fetchJob(id: string) {
  return serverFetch<JobDetailResponse>(`/api/jobs/${encodeURIComponent(id)}`)
}

export function fetchPlans() {
  return serverFetch<PlansResponse>("/api/plans")
}

export function fetchCheckoutSession(sessionId: string) {
  return serverFetch<CheckoutSessionResponse>(
    `/api/checkout/${encodeURIComponent(sessionId)}`
  )
}
