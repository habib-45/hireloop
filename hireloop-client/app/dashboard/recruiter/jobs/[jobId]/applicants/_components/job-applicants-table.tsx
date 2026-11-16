"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Filter, MapPin, Users } from "lucide-react"

import {
  DashboardCard,
  TableHead,
  TableShell,
  Td,
  Th,
} from "@/components/dashboard/primitives"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { cn } from "@/lib/utils"
import {
  recentApplicants,
  type ApplicantStatus,
  type RecruiterJobRow,
} from "@/lib/dashboard-data"

const filters: ("All" | ApplicantStatus)[] = [
  "All",
  "New",
  "Reviewing",
  "Interviewing",
  "Offered",
  "Rejected",
]

export function JobApplicantsTable({ job }: { job: RecruiterJobRow }) {
  const [statuses, setStatuses] = useState<Record<string, ApplicantStatus>>(
    Object.fromEntries(
      recentApplicants.map((applicant) => [applicant.id, applicant.status])
    )
  )
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")

  const rows = useMemo(
    () =>
      recentApplicants.filter((applicant) =>
        filter === "All" ? true : statuses[applicant.id] === filter
      ),
    [filter, statuses]
  )

  const interviewing = Object.values(statuses).filter(
    (status) => status === "Interviewing"
  ).length
  const hired = Object.values(statuses).filter(
    (status) => status === "Offered"
  ).length

  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <nav
        aria-label="Breadcrumb"
        className="mb-3 flex flex-wrap items-center gap-1.5 text-[9.5px] text-white/25"
      >
        <Link
          href="/dashboard/recruiter/jobs"
          className="transition-colors hover:text-white/60"
        >
          Manage Jobs
        </Link>
        <span>/</span>
        <span className="max-w-[240px] truncate">{job.title}</span>
        <span>/</span>
        <span className="text-white/50">Applicants</span>
      </nav>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[25px] leading-tight font-semibold tracking-[-0.03em] text-white">
            Applicants
          </h1>
          <p className="mt-1.5 max-w-[520px] text-[11.5px] leading-relaxed text-white/35">
            Review candidates who applied for this role and move them through
            your pipeline.
          </p>
        </div>
        <Link
          href="/dashboard/recruiter/jobs"
          className="inline-flex h-[30px] items-center gap-1.5 rounded-[6px] border border-white/[0.09] bg-transparent px-3 text-[10.5px] font-medium text-white/60 transition-colors hover:bg-white/[0.05] hover:text-white"
        >
          <ArrowLeft className="size-3.5" />
          All job posts
        </Link>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3 rounded-[9px] border border-white/[0.06] bg-[#0d0d10] p-4">
        <span className="relative size-10 shrink-0 overflow-hidden rounded-[8px] border border-white/[0.08] bg-[#151518]">
          <Image src={job.logo} alt="" fill sizes="40px" className="object-cover" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[14px] font-medium text-white/90">{job.title}</p>
            <StatusBadge status={job.status} />
          </div>
          <p className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[10px] text-white/32">
            <span>{job.company}</span>
            <span aria-hidden>·</span>
            <span>{job.department}</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1">
              <MapPin className="size-3" />
              {job.location}
            </span>
          </p>
        </div>
        <span className="text-[10px] text-white/30">
          Deadline {job.deadline}
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        <StatCard
          label="Total Applicants"
          value={String(job.applicants)}
          icon={Users}
          className="bg-[linear-gradient(160deg,#111114_0%,#0b0b0d_100%)]"
        />
        <StatCard
          label="In Review"
          value="6"
          icon={Filter}
          className="bg-[linear-gradient(160deg,#111114_0%,#0b0b0d_100%)]"
        />
        <StatCard
          label="Interviewing"
          value={String(interviewing)}
          icon={Filter}
          className="bg-[linear-gradient(160deg,#111114_0%,#0b0b0d_100%)]"
        />
        <StatCard
          label="Hired"
          value={String(hired)}
          icon={CheckCircle2}
          className="bg-[linear-gradient(160deg,#111114_0%,#0b0b0d_100%)]"
        />
      </div>

      <DashboardCard className="mt-4">
        <div className="flex flex-wrap items-center gap-1.5 border-b border-white/[0.055] px-4 py-3">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={cn(
                "h-[27px] rounded-[5px] px-2.5 text-[10px] font-medium transition-colors",
                filter === item
                  ? "bg-[#17171b] text-white ring-1 ring-white/[0.08]"
                  : "text-white/35 hover:bg-white/[0.04] hover:text-white/60"
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <TableShell>
          <TableHead>
            <Th className="pl-5">Candidate</Th>
            <Th>Applied</Th>
            <Th>Experience</Th>
            <Th>Status</Th>
            <Th className="text-right">Actions</Th>
          </TableHead>
          <tbody>
            {rows.map((applicant) => (
              <tr
                key={applicant.id}
                className="transition-colors hover:bg-white/[0.018]"
              >
                <Td className="pl-5">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex size-7 shrink-0 items-center justify-center rounded-full text-[9.5px] font-semibold text-white ring-1 ring-white/15"
                      style={{ backgroundColor: applicant.color }}
                    >
                      {applicant.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                    <div>
                      <p className="text-[11.5px] font-medium text-white/85">
                        {applicant.name}
                      </p>
                      <p className="mt-0.5 text-[9px] text-white/25">
                        {applicant.email}
                      </p>
                    </div>
                  </div>
                </Td>
                <Td>{applicant.applied}</Td>
                <Td>{applicant.experience}</Td>
                <Td>
                  <StatusBadge status={statuses[applicant.id]} />
                </Td>
                <Td className="text-right">
                  <select
                    aria-label={`Update status for ${applicant.name}`}
                    value={statuses[applicant.id]}
                    onChange={(event) =>
                      setStatuses((current) => ({
                        ...current,
                        [applicant.id]: event.target.value as ApplicantStatus,
                      }))
                    }
                    className="h-[26px] rounded-[5px] border border-white/[0.07] bg-[#111114] px-2 text-[9.5px] text-white/55 outline-none transition-colors hover:border-white/[0.14] focus:border-[#5c53fe]/50"
                  >
                    <option value="New">New</option>
                    <option value="Reviewing">Reviewing</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offered">Offered</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>

        {rows.length === 0 ? (
          <p className="py-12 text-center text-[11px] text-white/30">
            No candidates with this status yet.
          </p>
        ) : (
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-[9.5px] text-white/25">
              Showing {rows.length} of {job.applicants} applicants
            </p>
            <span className="text-[9.5px] text-white/25">
              Updated just now
            </span>
          </div>
        )}
      </DashboardCard>
    </div>
  )
}
