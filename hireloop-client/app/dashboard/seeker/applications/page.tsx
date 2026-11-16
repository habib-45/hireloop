import type { Metadata } from "next"

import { ApplicationsTable } from "@/app/dashboard/seeker/applications/_components/applications-table"

export const metadata: Metadata = {
  title: "My Applications",
}

export default function ApplicationsPage() {
  return <ApplicationsTable />
}
