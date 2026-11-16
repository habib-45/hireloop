import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Eye, MoreVertical, Pencil, Plus } from "lucide-react"

import {
  DashboardCard,
  TableHead,
  TableShell,
  Td,
  Th,
} from "@/components/dashboard/primitives"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Button } from "@/components/ui/button"
import { recruiterJobs } from "@/lib/dashboard-data"

export const metadata: Metadata = {
  title: "Manage Job Posts",
}

export default function RecruiterJobsPage() {
  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <nav
        aria-label="Breadcrumb"
        className="mb-3 flex items-center gap-1.5 text-[9.5px] text-white/25"
      >
        <span>Manage Jobs</span>
        <ChevronRight className="size-2.5" />
        <span className="text-white/50">Job Listings &amp; Postings</span>
      </nav>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[25px] leading-tight font-semibold tracking-[-0.03em] text-white">
            Manage Job Posts
          </h1>
          <p className="mt-1.5 max-w-[520px] text-[11.5px] leading-relaxed text-white/35">
            Review live listings, monitor applicants, and update job details
            across your organization.
          </p>
        </div>
        <Button
          nativeButton={false}
          render={<Link href="/dashboard/recruiter/jobs/new" />}
          className="h-[32px] rounded-[6px] bg-[#5c53fe] px-3 text-[10.5px] font-medium text-white shadow-[0_0_22px_-6px_rgba(92,83,254,0.8)] hover:bg-[#6d65ff]"
        >
          <Plus className="size-3.5" />
          Create New Job
        </Button>
      </div>

      <DashboardCard className="mt-5 overflow-hidden">
        <TableShell>
          <TableHead>
            <Th className="pl-5">Job Title &amp; Dept</Th>
            <Th>Company &amp; Location</Th>
            <Th>Type</Th>
            <Th>Compensation</Th>
            <Th>Applicants</Th>
            <Th>Status</Th>
            <Th>Deadline</Th>
            <Th className="text-right">Actions</Th>
          </TableHead>
          <tbody>
            {recruiterJobs.map((job) => (
              <tr
                key={job.id}
                className="transition-colors hover:bg-white/[0.018]"
              >
                <Td className="pl-5">
                  <div className="flex items-center gap-2.5">
                    <span className="relative size-7 shrink-0 overflow-hidden rounded-[6px] border border-white/[0.08] bg-[#151518]">
                      <Image
                        src={job.logo}
                        alt=""
                        fill
                        sizes="28px"
                        className="object-cover"
                      />
                    </span>
                    <div>
                      <p className="text-[11.5px] font-medium text-white/85">
                        {job.title}
                      </p>
                      <p className="mt-0.5 text-[9px] text-white/28">
                        {job.department}
                      </p>
                    </div>
                  </div>
                </Td>
                <Td>
                  <p className="text-[10.5px] text-white/60">{job.company}</p>
                  <p className="mt-0.5 text-[9px] text-white/26">
                    {job.location}
                  </p>
                </Td>
                <Td>{job.type}</Td>
                <Td className="whitespace-nowrap">{job.compensation}</Td>
                <Td>
                  <span className="inline-flex items-center gap-1 text-[10.5px] text-white/50">
                    <span className="text-[9px]">👤</span>
                    {job.applicants} Candidates
                  </span>
                </Td>
                <Td>
                  <StatusBadge status={job.status} />
                </Td>
                <Td className="whitespace-nowrap">{job.deadline}</Td>
                <Td className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/dashboard/recruiter/jobs/${job.id}/edit`}
                      aria-label={`Edit ${job.title}`}
                      className="flex size-6 items-center justify-center rounded-[5px] bg-[#5c53fe]/10 text-[#a8a1ff] transition-colors hover:bg-[#5c53fe]/20 hover:text-white"
                    >
                      <Pencil className="size-3" />
                    </Link>
                    <Link
                      href={`/dashboard/recruiter/jobs/${job.id}/applicants`}
                      aria-label={`View applicants for ${job.title}`}
                      className="flex size-6 items-center justify-center rounded-[5px] text-white/28 transition-colors hover:bg-white/[0.05] hover:text-white/70"
                    >
                      <Eye className="size-3.5" />
                    </Link>
                    <button
                      type="button"
                      aria-label={`More actions for ${job.title}`}
                      className="flex size-6 items-center justify-center rounded-[5px] text-white/28 transition-colors hover:bg-white/[0.05] hover:text-white/70"
                    >
                      <MoreVertical className="size-3.5" />
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>

        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-[9.5px] text-white/25">
            Showing {recruiterJobs.length} of 48 job posts
          </p>
          <div className="flex items-center gap-1">
            <span className="rounded-[4px] bg-white/[0.09] px-2 py-1 text-[9.5px] text-white">
              1
            </span>
            <span className="px-2 py-1 text-[9.5px] text-white/30">2</span>
            <span className="px-2 py-1 text-[9.5px] text-white/30">3</span>
            <span className="px-1 text-[9.5px] text-white/20">…</span>
          </div>
        </div>
      </DashboardCard>
    </div>
  )
}
