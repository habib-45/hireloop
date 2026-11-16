import type { ReactNode } from "react"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default function RecruiterDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return <DashboardShell role="recruiter">{children}</DashboardShell>
}
