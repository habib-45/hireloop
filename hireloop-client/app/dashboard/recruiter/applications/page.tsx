import type { Metadata } from "next"

import { RecruiterApplicationsTable } from "@/app/dashboard/recruiter/applications/_components/applications-table"

export const metadata: Metadata = {
  title: "Recruiter Applications",
}

export default function RecruiterApplicationsPage() {
  return <RecruiterApplicationsTable />
}
