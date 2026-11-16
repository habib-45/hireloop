import type { ReactNode } from "react"

import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default function SeekerDashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return <DashboardShell role="seeker">{children}</DashboardShell>
}
