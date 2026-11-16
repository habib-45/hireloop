import type { Metadata } from "next"
import Link from "next/link"
import {
  Bookmark,
  CalendarClock,
  Mail,
  Plus,
  RefreshCw,
  Send,
  Sparkles,
  Trophy,
} from "lucide-react"

import {
  CardHeader,
  DashboardCard,
  Td,
  TableHead,
  TableShell,
  Th,
} from "@/components/dashboard/primitives"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusBadge } from "@/components/dashboard/status-badge"
import {
  applications,
  seekerActivity,
  seekerStats,
} from "@/lib/dashboard-data"

export const metadata: Metadata = {
  title: "Seeker Dashboard",
}

const statIcons = [Bookmark, Send, CalendarClock, Trophy]

const activityIcons = {
  status: RefreshCw,
  match: Sparkles,
  message: Mail,
}

const activityTones = {
  status: "bg-[#5c53fe]/10 text-[#a8a1ff] ring-[#5c53fe]/20",
  match: "bg-[#22c55e]/10 text-[#4ade80] ring-[#22c55e]/20",
  message: "bg-[#0ea5e9]/10 text-[#7dd3fc] ring-[#0ea5e9]/20",
}

export default function SeekerDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {seekerStats.map((stat, index) => {
          const Icon = statIcons[index] ?? Bookmark

          return (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              icon={Icon}
              className="bg-[linear-gradient(160deg,#111114_0%,#0b0b0d_100%)] p-4 sm:p-[18px]"
            />
          )
        })}
      </div>

      <DashboardCard className="mt-4">
        <CardHeader
          title="Recent Activity"
          action={
            <Link
              href="/dashboard/seeker/applications"
              className="text-[10.5px] font-medium text-white/38 transition-colors hover:text-white/70"
            >
              View All Activity
            </Link>
          }
        />

        <ul className="px-3 pb-2 sm:px-4">
          {seekerActivity.map((activity) => {
            const Icon = activityIcons[activity.kind]

            return (
              <li
                key={activity.id}
                className="flex items-center gap-3 rounded-[7px] px-2 py-2.5 transition-colors hover:bg-white/[0.025]"
              >
                <span
                  className={`flex size-7 shrink-0 items-center justify-center rounded-full ring-1 ${activityTones[activity.kind]}`}
                >
                  <Icon aria-hidden className="size-3.5" strokeWidth={1.8} />
                </span>
                <p className="min-w-0 flex-1 text-[11.5px] leading-relaxed text-white/55">
                  {activity.text}
                  {activity.highlight ? (
                    <span className="ml-1.5 rounded-full bg-[#f59e0b]/10 px-1.5 py-0.5 text-[9.5px] font-medium text-[#fbbf24]">
                      {activity.highlight}
                    </span>
                  ) : null}
                </p>
                <span className="shrink-0 text-[9.5px] whitespace-nowrap text-white/28">
                  {activity.time}
                </span>
              </li>
            )
          })}
        </ul>
      </DashboardCard>

      <DashboardCard className="mt-4">
        <CardHeader
          title="Latest applications"
          action={
            <Link
              href="/dashboard/seeker/applications"
              className="text-[10.5px] font-medium text-white/38 transition-colors hover:text-white/70"
            >
              View all
            </Link>
          }
        />
        <TableShell>
          <TableHead>
            <Th>Role</Th>
            <Th>Company</Th>
            <Th>Applied</Th>
            <Th>Status</Th>
          </TableHead>
          <tbody>
            {applications.slice(0, 4).map((application) => (
              <tr key={application.id}>
                <Td className="font-medium text-white/75">
                  {application.title}
                </Td>
                <Td>{application.company}</Td>
                <Td>{application.applied}</Td>
                <Td>
                  <StatusBadge status={application.status} />
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </DashboardCard>

      <Link
        href="/dashboard/seeker/settings"
        aria-label="Update your profile and resume"
        className="fixed right-5 bottom-5 z-30 flex size-11 items-center justify-center rounded-full bg-white text-[#0a0a0b] shadow-[0_14px_40px_-12px_rgba(0,0,0,0.9)] transition-transform hover:scale-105 sm:right-7 sm:bottom-7"
      >
        <Plus className="size-5" strokeWidth={2} />
      </Link>
    </div>
  )
}
