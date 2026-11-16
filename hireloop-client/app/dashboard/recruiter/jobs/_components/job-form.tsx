"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  ArrowUpRight,
  Building2,
  CalendarDays,
  Check,
  CircleDollarSign,
  MapPin,
  MonitorSmartphone,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import type { RecruiterJobRow } from "@/lib/dashboard-data"

const jobTypes = ["Full-time", "Part-time", "Contract", "Internship"] as const

const categories = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Sales",
  "Operations",
  "Finance",
]

type JobFormProps = {
  mode: "create" | "edit"
  job?: RecruiterJobRow
  redirectTo?: string
  breadcrumbRoot?: string
}

export function JobForm({
  mode,
  job,
  redirectTo = "/dashboard/recruiter/jobs",
  breadcrumbRoot = "Manage Jobs",
}: JobFormProps) {
  const router = useRouter()
  const [jobType, setJobType] = useState<(typeof jobTypes)[number]>(
    (job?.type as (typeof jobTypes)[number]) ?? "Full-time"
  )
  const [remote, setRemote] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (saving) {
      return
    }

    const data = new FormData(event.currentTarget)
    const title = String(data.get("title") ?? "").trim()
    const company = String(data.get("company") ?? "").trim()
    const location = String(data.get("location") ?? "").trim()
    const deadline = String(data.get("deadline") ?? "").trim()

    if (!title || !company || !location || !deadline) {
      setError("Fill in the job title, company, location and deadline.")
      return
    }

    setError(null)
    setSaving(true)
    setSaved(true)

    window.setTimeout(() => {
      router.push(redirectTo)
    }, 850)
  }

  return (
    <div className="mx-auto w-full max-w-[1040px]">
      <div className="mb-4 flex items-center gap-1.5 text-[9.5px] text-white/25">
        <span>{breadcrumbRoot}</span>
        <span className="text-white/15">›</span>
        <span className="text-white/50">
          {mode === "create" ? "Create New Listing" : "Update Job Post"}
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[25px] leading-tight font-semibold tracking-[-0.03em] text-white">
              {mode === "create" ? "Post a New Job" : "Update Job Post"}
            </h1>
            <p className="mt-1.5 max-w-[560px] text-[11.5px] leading-relaxed text-white/35">
              {mode === "create"
                ? "Fill in the position specifications to attract qualified talent across our network."
                : "Modify position specifications, compensation range, and candidate requirements for this listing."}
            </p>
          </div>
          <Button
            type="submit"
            disabled={saving}
            className="h-[32px] shrink-0 rounded-[6px] bg-[#5c53fe] px-3.5 text-[10.5px] font-medium text-white shadow-[0_0_22px_-6px_rgba(92,83,254,0.8)] hover:bg-[#6d65ff]"
          >
            {saved ? (
              <>
                <Check className="size-3.5" />
                Published
              </>
            ) : (
              <>
                {mode === "create" ? "Publish Job" : "Update Job"}
                <ArrowUpRight className="size-3.5" />
              </>
            )}
          </Button>
        </div>

        <div className="mt-7 space-y-7 rounded-[10px] border border-white/[0.06] bg-[#0b0b0d] p-5 sm:p-7">
          <section>
            <div className="flex items-center gap-2">
              <span className="flex size-4 items-center justify-center rounded-full border border-[#5c53fe]/40 text-[8px] text-[#b9b3ff]">
                1
              </span>
              <h2 className="text-[12.5px] font-semibold text-white/85">
                Basic Information
              </h2>
            </div>

            <div className="mt-4 space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="job-title"
                  className="text-[9.5px] font-medium text-white/40"
                >
                  Job Title <span className="text-[#f87171]">*</span>
                </Label>
                <Input
                  id="job-title"
                  name="title"
                  defaultValue={job?.title ?? "Frontend Developer"}
                  placeholder="e.g. Senior Product Designer"
                  className="h-[38px] rounded-[6px] border-white/[0.08] bg-[#101013] text-[11.5px] text-white placeholder:text-white/22 focus-visible:border-[#5c53fe]/60 focus-visible:ring-[#5c53fe]/15"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="job-company"
                    className="text-[9.5px] font-medium text-white/40"
                  >
                    Company Name <span className="text-[#f87171]">*</span>
                  </Label>
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-white/25" />
                    <Input
                      id="job-company"
                      name="company"
                      defaultValue={job?.company ?? "HireFlow Network"}
                      className="h-[38px] rounded-[6px] border-white/[0.08] bg-[#101013] pl-9 text-[11.5px] text-white focus-visible:border-[#5c53fe]/60 focus-visible:ring-[#5c53fe]/15"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="job-category"
                    className="text-[9.5px] font-medium text-white/40"
                  >
                    Job Category <span className="text-[#f87171]">*</span>
                  </Label>
                  <div className="relative">
                    <select
                      id="job-category"
                      name="category"
                      defaultValue={job?.department ?? "Engineering & Tech"}
                      className="h-[38px] w-full appearance-none rounded-[6px] border border-white/[0.08] bg-[#101013] px-3 pr-8 text-[11.5px] text-white/80 outline-none focus:border-[#5c53fe]/60 focus:ring-2 focus:ring-[#5c53fe]/15"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[8px] text-white/25">
                      ▼
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[9.5px] font-medium text-white/40">
                  Job Type <span className="text-[#f87171]">*</span>
                </p>
                <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {jobTypes.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setJobType(type)}
                      className={cn(
                        "h-[34px] rounded-[6px] border text-[10.5px] font-medium transition-colors",
                        jobType === type
                          ? "border-[#5c53fe]/60 bg-[#5c53fe]/10 text-white"
                          : "border-white/[0.07] bg-[#0e0e11] text-white/38 hover:border-white/15 hover:text-white/65"
                      )}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="h-px bg-white/[0.055]" />

          <section>
            <div className="flex items-center gap-2">
              <span className="flex size-4 items-center justify-center rounded-full border border-[#5c53fe]/40 text-[8px] text-[#b9b3ff]">
                2
              </span>
              <h2 className="text-[12.5px] font-semibold text-white/85">
                Location, Compensation &amp; Timeline
              </h2>
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between gap-4 rounded-[7px] border border-white/[0.07] bg-[#0e0e11] px-3.5 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-7 items-center justify-center rounded-[6px] border border-white/[0.07] bg-white/[0.035]">
                    <MonitorSmartphone className="size-3.5 text-[#a49dff]" />
                  </span>
                  <div>
                    <p className="text-[11px] font-medium text-white/80">
                      Remote Work Allowed
                      <span className="ml-1.5 text-[9px] font-normal text-[#fbbf24]">
                        (optional)
                      </span>
                    </p>
                    <p className="mt-0.5 text-[9px] text-white/28">
                      Enable worldwide or distributed candidate applications.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={remote}
                  onClick={() => setRemote((current) => !current)}
                  className={cn(
                    "relative h-[18px] w-[32px] shrink-0 rounded-full border transition-colors",
                    remote
                      ? "border-[#5c53fe] bg-[#5c53fe]"
                      : "border-white/15 bg-white/[0.05]"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-1/2 size-[12px] -translate-y-1/2 rounded-full transition-all",
                      remote
                        ? "right-[3px] bg-white"
                        : "left-[3px] bg-white/40"
                    )}
                  />
                </button>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="job-location"
                    className="text-[9.5px] font-medium text-white/40"
                  >
                    Job Location <span className="text-[#f87171]">*</span>
                  </Label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-white/25" />
                    <Input
                      id="job-location"
                      name="location"
                      defaultValue={
                        remote ? "Remote" : (job?.location ?? "New York, USA")
                      }
                      className="h-[38px] rounded-[6px] border-white/[0.08] bg-[#101013] pl-9 text-[11.5px] text-white focus-visible:border-[#5c53fe]/60 focus-visible:ring-[#5c53fe]/15"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="job-deadline"
                    className="text-[9.5px] font-medium text-white/40"
                  >
                    Application Deadline{" "}
                    <span className="text-[#f87171]">*</span>
                  </Label>
                  <div className="relative">
                    <CalendarDays className="pointer-events-none absolute top-1/2 left-3 z-10 size-3.5 -translate-y-1/2 text-white/25" />
                    <Input
                      id="job-deadline"
                      name="deadline"
                      type="date"
                      defaultValue="2026-05-30"
                      className="h-[38px] rounded-[6px] border-white/[0.08] bg-[#101013] pl-9 text-[11.5px] text-white focus-visible:border-[#5c53fe]/60 focus-visible:ring-[#5c53fe]/15"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1.5">
                  <Label
                    htmlFor="job-min"
                    className="text-[9.5px] font-medium text-white/40"
                  >
                    Min Salary / Rate
                  </Label>
                  <div className="relative">
                    <CircleDollarSign className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-white/25" />
                    <Input
                      id="job-min"
                      name="minSalary"
                      type="number"
                      min={0}
                      defaultValue={job?.compensation.match(/[\d]+/)?.[0] ?? "25"}
                      className="h-[38px] rounded-[6px] border-white/[0.08] bg-[#101013] pl-9 text-[11.5px] text-white focus-visible:border-[#5c53fe]/60 focus-visible:ring-[#5c53fe]/15"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="job-max"
                    className="text-[9.5px] font-medium text-white/40"
                  >
                    Max Salary / Rate
                  </Label>
                  <div className="relative">
                    <CircleDollarSign className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-white/25" />
                    <Input
                      id="job-max"
                      name="maxSalary"
                      type="number"
                      min={0}
                      defaultValue={
                        job?.compensation.match(/[\d]+/g)?.[1] ?? "40"
                      }
                      className="h-[38px] rounded-[6px] border-white/[0.08] bg-[#101013] pl-9 text-[11.5px] text-white focus-visible:border-[#5c53fe]/60 focus-visible:ring-[#5c53fe]/15"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="job-frequency"
                    className="text-[9.5px] font-medium text-white/40"
                  >
                    Frequency
                  </Label>
                  <div className="relative">
                    <select
                      id="job-frequency"
                      name="frequency"
                      className="h-[38px] w-full appearance-none rounded-[6px] border border-white/[0.08] bg-[#101013] px-3 pr-8 text-[11.5px] text-white/80 outline-none focus:border-[#5c53fe]/60 focus:ring-2 focus:ring-[#5c53fe]/15"
                    >
                      <option>per hour</option>
                      <option>per month</option>
                      <option>per year</option>
                    </select>
                    <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[8px] text-white/25">
                      ▼
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="h-px bg-white/[0.055]" />

          <section>
            <div className="flex items-center gap-2">
              <span className="flex size-4 items-center justify-center rounded-full border border-[#5c53fe]/40 text-[8px] text-[#b9b3ff]">
                3
              </span>
              <h2 className="text-[12.5px] font-semibold text-white/85">
                Responsibilities &amp; Requirements
              </h2>
            </div>

            <div className="mt-4 space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="job-responsibilities"
                  className="text-[9.5px] font-medium text-white/40"
                >
                  Key Responsibilities <span className="text-[#f87171]">*</span>
                </Label>
                <textarea
                  id="job-responsibilities"
                  name="responsibilities"
                  rows={4}
                  defaultValue={
                    job
                      ? "Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                      : ""
                  }
                  placeholder="Describe the day-to-day responsibilities of this role..."
                  className="w-full resize-none rounded-[6px] border border-white/[0.08] bg-[#101013] px-3 py-2.5 text-[11.5px] leading-relaxed text-white outline-none placeholder:text-white/20 focus:border-[#5c53fe]/60 focus:ring-2 focus:ring-[#5c53fe]/15"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="job-qualifications"
                  className="text-[9.5px] font-medium text-white/40"
                >
                  Qualifications &amp; Requirements{" "}
                  <span className="text-[#f87171]">*</span>
                </Label>
                <textarea
                  id="job-qualifications"
                  name="qualifications"
                  rows={4}
                  defaultValue={
                    job
                      ? "• 3+ years of experience with React, TypeScript, and modern state architectures\n• Solid understanding of DOM performance and component-driven designs\n• Experience partnering closely with product teams and UI/UX designers"
                      : ""
                  }
                  placeholder="List the skills, experience and qualifications required..."
                  className="w-full resize-none rounded-[6px] border border-white/[0.08] bg-[#101013] px-3 py-2.5 text-[11.5px] leading-relaxed text-white outline-none placeholder:text-white/20 focus:border-[#5c53fe]/60 focus:ring-2 focus:ring-[#5c53fe]/15"
                />
              </div>
            </div>
          </section>

          {error ? (
            <p
              role="alert"
              className="rounded-[6px] border border-red-400/20 bg-red-400/[0.07] px-3 py-2.5 text-[10.5px] text-red-200"
            >
              {error}
            </p>
          ) : null}

          <div className="flex justify-end border-t border-white/[0.055] pt-5">
            <Button
              type="submit"
              disabled={saving}
              className="h-[34px] rounded-[6px] bg-[#5c53fe] px-4 text-[10.5px] font-medium text-white shadow-[0_0_22px_-6px_rgba(92,83,254,0.8)] hover:bg-[#6d65ff]"
            >
              {saved
                ? "Saved"
                : mode === "create"
                  ? "Publish Job"
                  : "Update Job"}
              {saved ? (
                <Check className="size-3.5" />
              ) : (
                <ArrowUpRight className="size-3.5" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
