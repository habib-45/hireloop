import type { Metadata } from "next"

import { AdminUsersTable } from "@/app/dashboard/admin/users/_components/admin-users-table"

export const metadata: Metadata = {
  title: "User Management",
}

export default function AdminUsersPage() {
  return <AdminUsersTable />
}
