import { ArrowRight, Briefcase, CircleDollarSign, MapPin } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Job } from "@/lib/types/site"

export function JobCard({ job }: { job: Job }) {
  return (
    <Card className="group relative min-h-[360px] gap-0 overflow-hidden rounded-[18px] border-0 bg-[linear-gradient(160deg,#1b1b1e_0%,#121214_46%,#09090b_100%)] p-0 ring-1 ring-white/[0.09] transition-all duration-300 hover:-translate-y-1 hover:ring-white/16 hover:shadow-[0_30px_70px_-35px_rgba(0,0,0,0.95)]">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
      <div className="flex h-full flex-col p-6">
        <h3 className="text-[28px] leading-none font-medium tracking-[-0.03em] text-white sm:text-[30px]">
          {job.title}
        </h3>
        <p className="mt-4 max-w-[330px] text-[15px] leading-[1.6] text-white/50">
          {job.description}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className="h-[36px] gap-2 rounded-full border border-white/[0.055] bg-[#262628] px-3.5 text-[13px] font-medium text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <span className="relative flex size-4 items-center justify-center">
              <MapPin
                aria-hidden
                className="size-4 fill-[#e9a7f2] text-[#e9a7f2]"
                strokeWidth={1.4}
              />
              <span className="absolute size-[3.5px] rounded-full bg-white" />
            </span>
            {job.location}
          </Badge>
          <Badge
            variant="secondary"
            className="h-[36px] gap-2 rounded-full border border-white/[0.055] bg-[#262628] px-3.5 text-[13px] font-medium text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <Briefcase
              aria-hidden
              className="size-[15px] fill-[#e9a7f2] text-[#e9a7f2]"
              strokeWidth={1.4}
            />
            {job.workplace}
          </Badge>
          <Badge
            variant="secondary"
            className="h-[36px] gap-2 rounded-full border border-white/[0.055] bg-[#262628] px-3.5 text-[13px] font-medium text-white/85 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <CircleDollarSign
              aria-hidden
              className="size-4 text-[#e9a7f2]"
              strokeWidth={1.8}
            />
            {job.salary}
          </Badge>
        </div>

        <Button
          nativeButton={false}
          render={<a href="/sign-up" aria-label={`Apply for ${job.title}`} />}
          variant="ghost"
          className="mt-auto h-auto w-fit gap-2.5 self-start px-0 pt-10 text-[15px] font-medium text-white hover:bg-transparent hover:text-white/75"
        >
          Apply Now
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Button>
      </div>
    </Card>
  )
}
