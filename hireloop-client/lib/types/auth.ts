export type AuthUser = {
  id: string
  name: string
  email: string
  createdAt: string
}

export type AuthResponse = {
  user: AuthUser
}

export type AuthErrorPayload = {
  error?: {
    code?: string
    message?: string
    field?: string
  }
}
