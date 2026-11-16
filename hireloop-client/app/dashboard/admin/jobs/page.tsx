import type { Metadata } from "next"

import { AdminJobsTable } from "@/app/dashboard/admin/jobs/_components/admin-jobs-table"

export const metadata: Metadata = {
  title: "Manage Jobs",
}

export default function AdminJobsPage() {
  return <AdminJobsTable />
}
