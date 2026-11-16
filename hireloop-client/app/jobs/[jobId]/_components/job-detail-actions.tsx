"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Bookmark, Check, LoaderCircle } from "lucide-react"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { useSavedJobs } from "@/hooks/use-saved-jobs"
import { ApiError } from "@/lib/api/auth"
import { applyToJob } from "@/lib/api/jobs"
import { cn } from "@/lib/utils"

type JobDetailActionsProps = {
  jobId: string
  jobTitle: string
  hasApplied: boolean
}

export function JobDetailActions({
  jobId,
  jobTitle,
  hasApplied,
}: JobDetailActionsProps) {
  const router = useRouter()
  const { user, status } = useAuth()
  const { isSaved, toggleSaved } = useSavedJobs()
  const [applied, setApplied] = useState(hasApplied)
  const [isApplying, setIsApplying] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [tone, setTone] = useState<"success" | "error">("success")
  const saved = isSaved(jobId)

  async function handleApply() {
    setMessage(null)

    if (status === "loading") {
      return
    }

    if (!user) {
      router.push(`/sign-in?next=${encodeURIComponent(`/jobs/${jobId}`)}`)
      return
    }

    setIsApplying(true)

    try {
      await applyToJob(jobId)
      setApplied(true)
      setTone("success")
      setMessage("Application submitted. Track it from your dashboard.")
    } catch (error) {
      if (error instanceof ApiError && error.code === "ALREADY_APPLIED") {
        setApplied(true)
        setTone("success")
        setMessage("You already applied to this role.")
      } else if (error instanceof ApiError && error.status === 401) {
        router.push(`/sign-in?next=${encodeURIComponent(`/jobs/${jobId}`)}`)
      } else {
        setTone("error")
        setMessage(
          error instanceof ApiError
            ? error.message
            : "Could not submit your application. Please try again."
        )
      }
    } finally {
      setIsApplying(false)
    }
  }

  return (
    <div className="flex flex-col items-end gap-2">
      <div className="flex items-center gap-2.5">
        <button
          type="button"
          onClick={() => toggleSaved(jobId)}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${jobTitle} from saved jobs` : `Save ${jobTitle}`}
          className={cn(
            "flex size-10 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.025] text-[#8f8f99] transition-colors hover:border-white/15 hover:bg-white/[0.06] hover:text-white",
            saved && "border-[#5c53fe]/30 bg-[#5c53fe]/10 text-[#c9c4ff]"
          )}
        >
          <Bookmark
            className={cn("size-[17px]", saved && "fill-current")}
            strokeWidth={1.7}
          />
        </button>

        <Button
          type="button"
          onClick={() => void handleApply()}
          disabled={isApplying || applied}
          className={cn(
            "h-10 min-w-[118px] rounded-lg text-[13.5px] font-medium",
            applied
              ? "border border-[#22c55e]/25 bg-[#22c55e]/10 text-[#4ade80] hover:bg-[#22c55e]/10"
              : "bg-white text-[#0b0b0c] hover:bg-white/90"
          )}
        >
          {isApplying ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : applied ? (
            <Check className="size-4" />
          ) : null}
          {isApplying ? "Applying..." : applied ? "Applied" : "Apply Now"}
        </Button>
      </div>

      {message ? (
        <p
          role="status"
          className={cn(
            "max-w-[280px] text-right text-[11.5px] leading-relaxed",
            tone === "success" ? "text-[#4ade80]" : "text-[#f87171]"
          )}
        >
          {message}
        </p>
      ) : null}
    </div>
  )
}
