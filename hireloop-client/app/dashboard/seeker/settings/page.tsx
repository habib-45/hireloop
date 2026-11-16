import type { Metadata } from "next"

import { SeekerSettingsForm } from "@/app/dashboard/seeker/settings/_components/seeker-settings-form"

export const metadata: Metadata = {
  title: "Seeker Settings",
}

export default function SeekerSettingsPage() {
  return <SeekerSettingsForm />
}
