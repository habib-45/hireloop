const API_URL = (
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000"
).replace(/\/$/, "")

export type ApiErrorPayload = {
  error?: {
    code?: string
    message?: string
    field?: string
  }
}

type ApiErrorOptions = {
  status: number
  code?: string
  field?: string
}

export class ApiError extends Error {
  status: number
  code?: string
  field?: string

  constructor(message: string, options: ApiErrorOptions) {
    super(message)
    this.name = "ApiError"
    this.status = options.status
    this.code = options.code
    this.field = options.field
  }
}

export async function apiRequest<T>(
  path: string,
  init?: RequestInit
): Promise<T> {
  const headers = new Headers(init?.headers)

  if (init?.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  let response: Response

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...init,
      headers,
      credentials: "include",
      cache: "no-store",
    })
  } catch {
    throw new ApiError(
      "Unable to reach the server. Make sure the API is running.",
      { status: 0, code: "NETWORK_ERROR" }
    )
  }

  const contentType = response.headers.get("content-type") ?? ""
  const payload = contentType.includes("application/json")
    ? ((await response.json().catch(() => null)) as
        | (T & ApiErrorPayload)
        | null)
    : null

  if (!response.ok) {
    const error = payload?.error

    throw new ApiError(
      error?.message ?? "Something went wrong. Please try again.",
      {
        status: response.status,
        code: error?.code,
        field: error?.field,
      }
    )
  }

  return payload as T
}
