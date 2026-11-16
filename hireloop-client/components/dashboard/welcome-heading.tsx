"use client"

import { useAuth } from "@/components/auth-provider"

export function WelcomeHeading({
  fallbackName = "Alex Sterling",
  subtitle = "Here is what is happening across your hiring pipeline today.",
}: {
  fallbackName?: string
  subtitle?: string
}) {
  const { user } = useAuth()
  const firstName = user?.name?.trim().split(/\s+/)[0] || fallbackName

  return (
    <div>
      <h1 className="text-[22px] leading-tight font-semibold tracking-[-0.03em] text-white sm:text-[24px]">
        Welcome back, {firstName}
      </h1>
      <p className="mt-1.5 text-[11px] text-white/35">{subtitle}</p>
    </div>
  )
}
