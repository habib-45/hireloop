"use client"

import Image from "next/image"
import Link from "next/link"
import {
  Bookmark,
  BriefcaseBusiness,
  CircleDollarSign,
  Flame,
  MapPin,
  Sparkles,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useSavedJobs } from "@/hooks/use-saved-jobs"
import type { JobSummary } from "@/lib/types/jobs"

type JobListCardProps = {
  job: JobSummary
  href?: string
  className?: string
}

export function JobListCard({ job, href, className }: JobListCardProps) {
  const { isSaved, toggleSaved } = useSavedJobs()
  const saved = isSaved(job.id)

  return (
    <article
      className={cn(
        "group relative rounded-[14px] border border-white/[0.06] bg-[#0c0c0e] p-5 transition-colors hover:border-white/[0.12] hover:bg-[#0f0f11] sm:p-6",
        className
      )}
    >
      <div className="flex items-start gap-4 sm:gap-5">
        <Link
          href={href ?? `/jobs/${job.id}`}
          className="relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-[10px] border border-white/[0.08] bg-[#151518] sm:size-[54px]"
        >
          <Image
            src={job.company.logo}
            alt={`${job.company.name} logo`}
            fill
            sizes="54px"
            className="object-cover"
          />
        </Link>

        <div className="min-w-0 flex-1">
          <Link
            href={href ?? `/jobs/${job.id}`}
            className="block w-fit max-w-full"
          >
            <h3 className="truncate text-[20px] leading-tight font-medium tracking-[-0.035em] text-[#ededef] transition-colors group-hover:text-white sm:text-[22px]">
              {job.title}
            </h3>
          </Link>
          <p className="mt-1.5 truncate text-[14px] text-[#8f8f99] sm:text-[15.5px]">
            {job.company.name}
            <span className="mx-1.5 text-[#55555d]">•</span>
            {job.location}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-5">
            <Badge
              variant="outline"
              className="h-[30px] gap-1.5 rounded-full border-white/[0.07] bg-white/[0.025] px-3 text-[12px] font-medium text-[#cfcfd4]"
            >
              <CircleDollarSign className="size-3.5 text-[#9b95ff]" />
              {job.salaryLabel}
            </Badge>
            <Badge
              variant="outline"
              className="h-[30px] gap-2 rounded-full border-white/[0.07] bg-white/[0.025] px-3 text-[12px] font-medium text-[#cfcfd4]"
            >
              <BriefcaseBusiness className="size-3.5 text-[#9b95ff]" />
              {job.typeLabel}
            </Badge>
            <Badge
              variant="outline"
              className="h-[30px] gap-1.5 rounded-full border-white/[0.07] bg-white/[0.025] px-3 text-[12px] font-medium text-[#cfcfd4]"
            >
              <MapPin className="size-3.5 text-[#9b95ff]" />
              {job.workplaceLabel}
            </Badge>
            {job.easyApply ? (
              <span className="inline-flex h-[30px] items-center gap-1.5 rounded-full bg-[#22c55e]/10 px-3 text-[12px] font-medium text-[#22c55e] ring-1 ring-[#22c55e]/15">
                <Sparkles className="size-3.5" />
                Easy Apply
              </span>
            ) : null}
            {job.hot ? (
              <span className="inline-flex h-[30px] items-center gap-1.5 rounded-full bg-[#f59e0b]/10 px-3 text-[12px] font-medium text-[#f59e0b] ring-1 ring-[#f59e0b]/15">
                <Flame className="size-3.5" />
                Hot Job
              </span>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          onClick={() => toggleSaved(job.id)}
          aria-label={saved ? `Remove ${job.title} from saved jobs` : `Save ${job.title}`}
          aria-pressed={saved}
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg text-[#6e6e78] transition-colors hover:bg-white/[0.05] hover:text-white",
            saved && "text-[#c9c4ff]"
          )}
        >
          <Bookmark
            className={cn("size-[18px]", saved && "fill-current")}
            strokeWidth={1.7}
          />
        </button>
      </div>
    </article>
  )
}
