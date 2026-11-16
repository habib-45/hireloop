import type { Metadata } from "next"

import { AdminPaymentsTable } from "@/app/dashboard/admin/payments/_components/admin-payments-table"

export const metadata: Metadata = {
  title: "Payments & Subscriptions",
}

export default function AdminPaymentsPage() {
  return <AdminPaymentsTable />
}
