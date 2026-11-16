import type { Metadata } from "next"

import { JobForm } from "@/app/dashboard/recruiter/jobs/_components/job-form"
import { recruiterJobs } from "@/lib/dashboard-data"

export const metadata: Metadata = {
  title: "Update Job Post",
}

type EditJobPageProps = {
  params: Promise<{ jobId: string }>
}

export default async function EditJobPage({ params }: EditJobPageProps) {
  const { jobId } = await params
  const job = recruiterJobs.find((item) => item.id === jobId) ?? recruiterJobs[0]

  return <JobForm mode="edit" job={job} />
}
