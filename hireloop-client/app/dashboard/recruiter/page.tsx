import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, FileText, Plus, Users, Zap } from "lucide-react"

import {
  CardHeader,
  DashboardCard,
  TableHead,
  TableShell,
  Td,
  Th,
} from "@/components/dashboard/primitives"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { WelcomeHeading } from "@/components/dashboard/welcome-heading"
import { recentApplicants, recruiterStats } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Recruiter Dashboard",
}

const icons = [FileText, Users, Zap, CheckCircle2]

export default function RecruiterDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <WelcomeHeading />

      <div className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {recruiterStats.map((stat, index) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={icons[index] ?? FileText}
            trend={stat.trend || undefined}
            tone={stat.tone}
            className="bg-[linear-gradient(160deg,#111114_0%,#0b0b0d_100%)]"
          />
        ))}
      </div>

      <DashboardCard className="mt-4">
        <CardHeader
          title="Recent Applications"
          action={
            <Link
              href="/dashboard/recruiter/applications"
              className="text-[10.5px] font-medium text-white/38 transition-colors hover:text-white/70"
            >
              View all
            </Link>
          }
        />

        <TableShell>
          <TableHead>
            <Th className="pl-5">Candidate Name</Th>
            <Th>Role</Th>
            <Th>Date Applied</Th>
            <Th>Experience</Th>
            <Th>Status</Th>
          </TableHead>
          <tbody>
            {recentApplicants.map((applicant) => (
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
                <Td>
                  <span
                    className={cn(
                      "text-[10.5px]",
                      applicant.experience === "6 years"
                        ? "text-white/70"
                        : "text-white/50"
                    )}
                  >
                    {applicant.experience}
                  </span>
                </Td>
                <Td>
                  <StatusBadge status={applicant.status} />
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </DashboardCard>

      <Link
        href="/dashboard/recruiter/jobs/new"
        aria-label="Post a new job"
        className="fixed right-5 bottom-5 z-30 flex size-11 items-center justify-center rounded-full bg-white text-[#0a0a0b] shadow-[0_14px_40px_-12px_rgba(0,0,0,0.9)] transition-transform hover:scale-105 sm:right-7 sm:bottom-7"
      >
        <Plus className="size-5" strokeWidth={2} />
      </Link>
    </div>
  )
}
