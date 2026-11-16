"use client"

import { useMemo, useState } from "react"
import { Filter, Users } from "lucide-react"

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
  recruiterApplicationStats,
  type ApplicantStatus,
} from "@/lib/dashboard-data"

const filters: ("All" | ApplicantStatus)[] = [
  "All",
  "New",
  "Reviewing",
  "Interviewing",
  "Offered",
  "Rejected",
]

export function RecruiterApplicationsTable() {
  const [statuses, setStatuses] = useState<Record<string, ApplicantStatus>>(
    Object.fromEntries(
      recentApplicants.map((applicant) => [applicant.id, applicant.status])
    )
  )
  const [filter, setFilter] = useState<(typeof filters)[number]>("All")

  const rows = useMemo(() => {
    return recentApplicants.filter((applicant) =>
      filter === "All" ? true : statuses[applicant.id] === filter
    )
  }, [filter, statuses])

  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <div>
        <h1 className="text-[25px] leading-tight font-semibold tracking-[-0.03em] text-white">
          Applications
        </h1>
        <p className="mt-1.5 max-w-[520px] text-[11.5px] leading-relaxed text-white/35">
          Review incoming candidates, move them through your pipeline, and keep
          every role moving.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {recruiterApplicationStats.map((stat, index) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={[Users, Filter, Filter, Users][index] ?? Users}
            className="bg-[linear-gradient(160deg,#111114_0%,#0b0b0d_100%)]"
          />
        ))}
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
            <Th>Role</Th>
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
                <Td className="text-white/60">{applicant.role}</Td>
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
              Showing {rows.length} of {recruiterApplicationStats[0].value}{" "}
              candidates
            </p>
            <span className="text-[9.5px] text-white/25">
              48 applications this month
            </span>
          </div>
        )}
      </DashboardCard>
    </div>
  )
}
