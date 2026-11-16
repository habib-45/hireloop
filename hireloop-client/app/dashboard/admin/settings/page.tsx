import type { Metadata } from "next"

import { AdminSettingsForm } from "@/app/dashboard/admin/settings/_components/admin-settings-form"

export const metadata: Metadata = {
  title: "Platform Settings",
}

export default function AdminSettingsPage() {
  return <AdminSettingsForm />
}
