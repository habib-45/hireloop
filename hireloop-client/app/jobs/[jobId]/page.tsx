import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import {
  BarChart3,
  BriefcaseBusiness,
  Check,
  CircleDollarSign,
  Globe,
  MapPin,
  Plus,
  Sparkles,
  Star,
} from "lucide-react"

import { JobDetailActions } from "@/app/jobs/[jobId]/_components/job-detail-actions"
import { JobListCard } from "@/components/public/job-list-card"
import { SiteFooter } from "@/components/site-footer"
import { SiteNavbar } from "@/components/site-navbar"
import { Button } from "@/components/ui/button"
import { fetchJob } from "@/lib/api/server"
import { getLocalJob, getLocalRelatedJobs } from "@/lib/data/catalog"

type JobPageProps = {
  params: Promise<{ jobId: string }>
}

export async function generateMetadata({
  params,
}: JobPageProps): Promise<Metadata> {
  const { jobId } = await params
  const remote = await fetchJob(jobId)
  const job = remote?.job ?? getLocalJob(jobId)

  if (!job) {
    return { title: "Job not found" }
  }

  return {
    title: `${job.title} at ${job.company.name}`,
    description: job.summary,
  }
}

export default async function JobDetailPage({ params }: JobPageProps) {
  const { jobId } = await params
  const remote = await fetchJob(jobId)
  const job = remote?.job ?? getLocalJob(jobId)

  if (!job) {
    notFound()
  }

  const similarJobs = remote?.similarJobs ?? getLocalRelatedJobs(job, 3)
  const hasApplied = remote?.hasApplied ?? false

  return (
    <div className="relative min-h-svh overflow-x-clip bg-[#050506]">
      <SiteNavbar compact />

      <main className="pt-[104px] pb-24">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6">
          <header className="rounded-[14px] border border-white/[0.07] bg-[#0c0c0e] p-5 sm:p-7">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4 sm:gap-5">
                <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-white/[0.09] bg-[#151518] sm:size-[64px]">
                  <Image
                    src={job.company.logo}
                    alt={`${job.company.name} logo`}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div>
                  <h1 className="text-[26px] leading-[1.12] font-medium tracking-[-0.045em] text-[#ededef] sm:text-[32px]">
                    {job.title}
                  </h1>
                  <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-2">
                    <span className="text-[16px] font-medium text-[#a0a0ab] sm:text-[18px]">
                      {job.company.name}
                    </span>
                    {job.company.verified ? (
                      <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[#22c55e]">
                        <Check className="size-3.5" strokeWidth={2.5} />
                        Verified Employer
                      </span>
                    ) : null}
                  </div>
                </div>
              </div>

              <JobDetailActions
                jobId={job.id}
                jobTitle={job.title}
                hasApplied={hasApplied}
              />
            </div>
          </header>

          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <InfoTile
              icon={CircleDollarSign}
              label="Salary range"
              value={job.salaryLabel}
            />
            <InfoTile
              icon={MapPin}
              label="Location"
              value={job.location}
            />
            <InfoTile
              icon={BriefcaseBusiness}
              label="Job type"
              value={job.typeLabel}
            />
            <InfoTile
              icon={BarChart3}
              label="Experience"
              value={job.experience}
            />
          </div>

          <div className="mt-4 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_348px]">
            <div className="space-y-4">
              <section className="rounded-[14px] border border-white/[0.07] bg-[#0b0b0d] p-6 sm:p-7">
                <h2 className="text-[19px] font-medium tracking-[-0.03em] text-[#ededef]">
                  Job Description
                </h2>
                <p className="mt-4 text-[13.5px] leading-[1.72] text-[#a0a0ab]">
                  {job.description}
                </p>
              </section>

              <section className="rounded-[14px] border border-white/[0.07] bg-[#0b0b0d] p-6 sm:p-7">
                <h2 className="text-[19px] font-medium tracking-[-0.03em] text-[#ededef]">
                  Responsibilities
                </h2>
                <ul className="mt-4 space-y-3">
                  {job.responsibilities.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[13.5px] leading-[1.65] text-[#a0a0ab]"
                    >
                      <span className="mt-[7px] size-1 shrink-0 rounded-full bg-[#6e6e78]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-[14px] border border-white/[0.07] bg-[#0b0b0d] p-6 sm:p-7">
                <h2 className="text-[19px] font-medium tracking-[-0.03em] text-[#ededef]">
                  Requirements
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  {job.requirements.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex h-[30px] items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 text-[12px] font-medium text-[#d7d7dc]"
                    >
                      <Plus className="size-3 text-[#8b85ff]" />
                      {skill}
                    </span>
                  ))}
                </div>

                <ul className="mt-5 space-y-2.5">
                  {job.requirements.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-[13.5px] leading-[1.65] text-[#a0a0ab]"
                    >
                      <span className="mt-[7px] size-1 shrink-0 rounded-full bg-[#6e6e78]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-[14px] border border-white/[0.07] bg-[#0b0b0d] p-6 sm:p-7">
                <h2 className="text-[19px] font-medium tracking-[-0.03em] text-[#ededef]">
                  Benefits
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {job.benefits.map((benefit) => (
                    <div
                      key={benefit}
                      className="flex items-center gap-3 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-[13px] text-[#d7d7dc]"
                    >
                      <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-[#5c53fe]/10 text-[#a7a1ff]">
                        <Star className="size-3.5" strokeWidth={1.8} />
                      </span>
                      {benefit}
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="lg:sticky lg:top-[104px]">
              <div className="rounded-[14px] border border-white/[0.07] bg-[#0b0b0d] p-5">
                <h2 className="text-[19px] font-medium tracking-[-0.03em] text-[#ededef]">
                  Company Overview
                </h2>

                <div className="relative mt-4 h-[180px] overflow-hidden rounded-[10px] border border-white/[0.06] bg-[radial-gradient(circle_at_30%_20%,#252554_0%,#14141f_45%,#0a0a0c_100%)]">
                  {job.company.coverImage ? (
                    <Image
                      src={job.company.coverImage}
                      alt={`${job.company.name} cover`}
                      fill
                      sizes="348px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[52px] font-semibold tracking-[-0.06em] text-white/20">
                        {job.company.name
                          .split(/\s+/)
                          .slice(0, 2)
                          .map((word) => word[0])
                          .join("")}
                      </span>
                    </div>
                  )}
                </div>

                <dl className="mt-5 space-y-4">
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.16em] text-[#6e6e78] uppercase">
                      Size
                    </dt>
                    <dd className="mt-1.5 text-[14px] text-[#d7d7dc]">
                      {job.company.size}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.16em] text-[#6e6e78] uppercase">
                      Industry
                    </dt>
                    <dd className="mt-1.5 text-[14px] text-[#d7d7dc]">
                      {job.company.industry}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] tracking-[0.16em] text-[#6e6e78] uppercase">
                      About
                    </dt>
                    <dd className="mt-1.5 text-[13px] leading-[1.65] text-[#a0a0ab]">
                      {job.company.about}
                    </dd>
                  </div>
                </dl>

                <Button
                  nativeButton={false}
                  render={
                    <a
                      href={job.company.website}
                      target="_blank"
                      rel="noreferrer"
                    />
                  }
                  variant="outline"
                  className="mt-5 h-10 w-full rounded-lg border-white/[0.09] bg-white/[0.03] text-[12.5px] font-medium text-[#ededef] hover:bg-white/[0.06]"
                >
                  <Globe className="size-3.5" />
                  Visit Website
                </Button>
              </div>
            </aside>
          </div>

          {similarJobs.length > 0 ? (
            <section className="mt-14" aria-labelledby="similar-jobs-heading">
              <div className="flex items-center gap-2.5">
                <Sparkles className="size-4 text-[#8b85ff]" />
                <h2
                  id="similar-jobs-heading"
                  className="text-[22px] font-medium tracking-[-0.035em] text-[#ededef]"
                >
                  Similar jobs you may like
                </h2>
              </div>
              <div className="mt-5 grid gap-3 xl:grid-cols-3">
                {similarJobs.map((similar) => (
                  <JobListCard key={similar.id} job={similar} />
                ))}
              </div>
              <div className="mt-7 flex justify-center">
                <Button
                  nativeButton={false}
                  render={<Link href="/jobs" />}
                  variant="outline"
                  className="h-10 rounded-lg border-white/[0.09] bg-white/[0.03] px-5 text-[13px] text-[#ededef] hover:bg-white/[0.06]"
                >
                  Browse all jobs
                </Button>
              </div>
            </section>
          ) : null}
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin
  label: string
  value: string
}) {
  return (
    <div className="rounded-[12px] border border-white/[0.07] bg-[#0b0b0d] px-4 py-4 sm:px-5">
      <div className="flex items-center gap-2 text-[#6e6e78]">
        <Icon className="size-3.5" strokeWidth={1.8} />
        <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase">
          {label}
        </span>
      </div>
      <p className="mt-2 text-[14px] font-medium text-[#ededef]">{value}</p>
    </div>
  )
}
