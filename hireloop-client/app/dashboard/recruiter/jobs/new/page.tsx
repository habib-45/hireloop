import type { Metadata } from "next"

import { JobForm } from "@/app/dashboard/recruiter/jobs/_components/job-form"

export const metadata: Metadata = {
  title: "Post a New Job",
}

export default function NewJobPage() {
  return <JobForm mode="create" />
}
