import type { Metadata } from "next"

import { RecruiterSettingsForm } from "@/app/dashboard/recruiter/settings/_components/recruiter-settings-form"

export const metadata: Metadata = {
  title: "Recruiter Settings",
}

export default function RecruiterSettingsPage() {
  return <RecruiterSettingsForm />
}
