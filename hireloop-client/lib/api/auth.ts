import { apiRequest } from "@/lib/api/client"
import type { AuthResponse } from "@/lib/types/auth"

export { ApiError } from "@/lib/api/client"

export function signUp(input: {
  name: string
  email: string
  password: string
}) {
  return apiRequest<AuthResponse>("/api/auth/sign-up", {
    method: "POST",
    body: JSON.stringify(input),
  })
}

export function signIn(input: { email: string; password: string }) {
  return apiRequest<AuthResponse>("/api/auth/sign-in", {
    method: "POST",
    body: JSON.stringify(input),
  })
}

export function signOut() {
  return apiRequest<{ ok: boolean }>("/api/auth/sign-out", {
    method: "POST",
  })
}

export function getCurrentUser() {
  return apiRequest<AuthResponse>("/api/auth/me")
}
