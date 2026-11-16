"use client"

import { useState } from "react"
import Link from "next/link"
import { LogOut } from "lucide-react"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

type UserMenuProps = {
  variant?: "desktop" | "mobile"
  onSignOut?: () => void
  className?: string
}

export function UserMenu({
  variant = "desktop",
  onSignOut,
  className,
}: UserMenuProps) {
  const { user, signOut } = useAuth()
  const [isSigningOut, setIsSigningOut] = useState(false)

  if (!user) {
    return null
  }

  async function handleSignOut() {
    setIsSigningOut(true)

    try {
      await signOut()
      onSignOut?.()
    } finally {
      setIsSigningOut(false)
    }
  }

  if (variant === "mobile") {
    return (
      <div className={cn("flex flex-col gap-3", className)}>
        <Link
          href="/dashboard/seeker"
          onClick={onSignOut}
          className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.03] px-4 py-3 transition-colors hover:border-white/[0.14] hover:bg-white/[0.05]"
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#5c53fe]/15 text-[13px] font-semibold text-[#b9b3ff] ring-1 ring-[#7c6cf6]/25">
            {getInitials(user.name)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[14px] font-medium text-white">
              {user.name}
            </p>
            <p className="truncate text-[12px] text-white/40">{user.email}</p>
          </div>
        </Link>
        <Button
          type="button"
          variant="outline"
          disabled={isSigningOut}
          onClick={() => void handleSignOut()}
          className="h-12 rounded-xl border-white/10 bg-transparent text-[15px] text-white hover:bg-white/5"
        >
          <LogOut className="size-4" />
          {isSigningOut ? "Signing out..." : "Sign out"}
        </Button>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Link
        href="/dashboard/seeker"
        title="Open dashboard"
        className="flex items-center gap-2.5 rounded-full border border-white/8 bg-white/[0.035] py-1.5 pr-3 pl-1.5 transition-colors hover:border-white/[0.16] hover:bg-white/[0.06]"
      >
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#5c53fe]/15 text-[10px] font-semibold text-[#b9b3ff] ring-1 ring-[#7c6cf6]/25">
          {getInitials(user.name)}
        </span>
        <span className="max-w-[96px] truncate text-[13px] font-medium text-white/80">
          {user.name.split(/\s+/)[0]}
        </span>
      </Link>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        disabled={isSigningOut}
        onClick={() => void handleSignOut()}
        aria-label="Sign out"
        title="Sign out"
        className="size-9 rounded-full text-white/45 hover:bg-white/8 hover:text-white"
      >
        <LogOut className="size-4" />
      </Button>
    </div>
  )
}
