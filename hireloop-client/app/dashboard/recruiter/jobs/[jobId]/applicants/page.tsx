import type { Metadata } from "next"

import { JobApplicantsTable } from "@/app/dashboard/recruiter/jobs/[jobId]/applicants/_components/job-applicants-table"
import { recruiterJobs } from "@/lib/dashboard-data"

export const metadata: Metadata = {
  title: "Job Applicants",
}

type JobApplicantsPageProps = {
  params: Promise<{ jobId: string }>
}

export default async function JobApplicantsPage({
  params,
}: JobApplicantsPageProps) {
  const { jobId } = await params
  const job = recruiterJobs.find((item) => item.id === jobId) ?? recruiterJobs[0]

  return <JobApplicantsTable job={job} />
}
