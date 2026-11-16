"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react"

import { getCurrentUser, signOut as signOutRequest } from "@/lib/api/auth"
import type { AuthUser } from "@/lib/types/auth"

type AuthStatus = "loading" | "authenticated" | "unauthenticated"

type AuthContextValue = {
  user: AuthUser | null
  status: AuthStatus
  setUser: (user: AuthUser) => void
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<AuthUser | null>(null)
  const [status, setStatus] = useState<AuthStatus>("loading")
  const authEpoch = useRef(0)

  useEffect(() => {
    let cancelled = false
    const epoch = authEpoch.current

    getCurrentUser()
      .then(({ user: currentUser }) => {
        if (cancelled || authEpoch.current !== epoch) {
          return
        }

        setUserState(currentUser)
        setStatus("authenticated")
      })
      .catch(() => {
        if (cancelled || authEpoch.current !== epoch) {
          return
        }

        setUserState(null)
        setStatus("unauthenticated")
      })

    return () => {
      cancelled = true
    }
  }, [])

  const setUser = useCallback((nextUser: AuthUser) => {
    authEpoch.current += 1
    setUserState(nextUser)
    setStatus("authenticated")
  }, [])

  const signOut = useCallback(async () => {
    authEpoch.current += 1
    setUserState(null)
    setStatus("unauthenticated")

    try {
      await signOutRequest()
    } catch {
      // Keep the local session consistent even if the network request fails.
    }
  }, [])

  const value = useMemo(
    () => ({ user, status, setUser, signOut }),
    [user, status, setUser, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.")
  }

  return context
}
