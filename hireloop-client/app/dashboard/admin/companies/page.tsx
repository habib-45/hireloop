import type { Metadata } from "next"

import { AdminCompaniesTable } from "@/app/dashboard/admin/companies/_components/admin-companies-table"

export const metadata: Metadata = {
  title: "Companies",
}

export default function AdminCompaniesPage() {
  return <AdminCompaniesTable />
}
