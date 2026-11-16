import type { Metadata } from "next"

import { JobForm } from "@/app/dashboard/recruiter/jobs/_components/job-form"

export const metadata: Metadata = {
  title: "Create Job",
}

export default function AdminNewJobPage() {
  return (
    <JobForm
      mode="create"
      redirectTo="/dashboard/admin/jobs"
      breadcrumbRoot="Manage Jobs"
    />
  )
}
