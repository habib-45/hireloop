import type { Metadata } from "next"
import Link from "next/link"
import {
  BriefcaseBusiness,
  Building2,
  DollarSign,
  UserRoundCheck,
  Users,
} from "lucide-react"

import {
  CardHeader,
  DashboardCard,
  TableHead,
  TableShell,
  Td,
  Th,
} from "@/components/dashboard/primitives"
import { PrintButton } from "@/components/dashboard/print-button"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { adminStats, adminTransactions } from "@/lib/dashboard-data"

export const metadata: Metadata = {
  title: "Admin Dashboard",
}

const statIcons = [Users, UserRoundCheck, Building2, BriefcaseBusiness, DollarSign]

const avatarColors = [
  "#5c53fe",
  "#0ea5e9",
  "#f59e0b",
  "#ef4444",
  "#22c55e",
]

export default function AdminDashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[25px] leading-tight font-semibold tracking-[-0.03em] text-white">
            Dashboard Overview
          </h1>
          <p className="mt-1.5 text-[11.5px] text-white/35">
            Real-time platform performance and growth metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="relative">
            <span className="sr-only">Date range</span>
            <select className="h-[30px] appearance-none rounded-[6px] border border-white/[0.08] bg-[#101013] pr-7 pl-3 text-[10px] text-white/60 outline-none">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
              <option>This Quarter</option>
              <option>This Year</option>
            </select>
            <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[8px] text-white/25">
              ▼
            </span>
          </label>
          <PrintButton
            label="Export Report"
            className="h-[30px] rounded-[6px] bg-white px-3 text-[10px] font-semibold text-[#0a0a0b] hover:bg-white/90"
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-5">
        {adminStats.map((stat, index) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={statIcons[index] ?? Users}
            trend={stat.trend}
            tone={stat.tone}
            className="bg-[linear-gradient(160deg,#111114_0%,#0b0b0d_100%)]"
          />
        ))}
      </div>

      <DashboardCard className="mt-4">
        <CardHeader
          title="Recent Subscription Transactions"
          action={
            <Link
              href="/dashboard/admin/payments"
              className="text-[10.5px] font-medium text-white/38 transition-colors hover:text-white/70"
            >
              View All Activity
            </Link>
          }
        />

        <TableShell>
          <TableHead>
            <Th className="pl-5">User / Client</Th>
            <Th>Plan Type</Th>
            <Th>Transaction ID</Th>
            <Th>Amount</Th>
            <Th>Date</Th>
            <Th>Status</Th>
          </TableHead>
          <tbody>
            {adminTransactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className="transition-colors hover:bg-white/[0.018]"
              >
                <Td className="pl-5">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="flex size-7 shrink-0 items-center justify-center rounded-full text-[9px] font-semibold text-white ring-1 ring-white/15"
                      style={{
                        backgroundColor:
                          avatarColors[index % avatarColors.length],
                      }}
                    >
                      {transaction.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-[11px] font-medium text-white/80">
                        {transaction.email}
                      </p>
                      <p className="mt-0.5 text-[9px] text-white/25">
                        {transaction.name}
                      </p>
                    </div>
                  </div>
                </Td>
                <Td className="whitespace-nowrap">{transaction.plan}</Td>
                <Td className="font-mono text-[10px] text-white/35">
                  {transaction.transactionId}
                </Td>
                <Td className="font-medium text-white/75">
                  {transaction.amount}
                </Td>
                <Td className="whitespace-nowrap">{transaction.date}</Td>
                <Td>
                  <StatusBadge status={transaction.status} />
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </DashboardCard>
    </div>
  )
}
