import type { Metadata } from "next"

import { SavedJobsList } from "@/app/dashboard/seeker/saved/_components/saved-jobs-list"
import { savedJobs } from "@/lib/dashboard-data"

export const metadata: Metadata = {
  title: "Saved Jobs",
}

export default function SavedJobsPage() {
  return <SavedJobsList initialJobs={savedJobs} />
}
