"use client"

import { useMemo, useState } from "react"
import {
  Building2,
  CalendarDays,
  CreditCard,
  Download,
  Filter,
  UserRoundCheck,
} from "lucide-react"

import {
  DashboardCard,
  TableHead,
  TableShell,
  Td,
  Th,
} from "@/components/dashboard/primitives"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { adminPaymentRows, adminPaymentStats } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

const statIcons = [CreditCard, CalendarDays, UserRoundCheck, Building2]

const avatarColors = ["#5c53fe", "#0ea5e9", "#f59e0b", "#ef4444"]

type PaymentFilter = "All" | "Success" | "Pending" | "Failed"

export function AdminPaymentsTable() {
  const [filter, setFilter] = useState<PaymentFilter>("All")
  const [showFilter, setShowFilter] = useState(false)

  const rows = useMemo(
    () =>
      filter === "All"
        ? adminPaymentRows
        : adminPaymentRows.filter((row) => row.status === filter),
    [filter]
  )

  function exportCsv() {
    const header = ["Email", "Client", "Plan", "Amount", "Date", "Transaction ID", "Status"]
    const lines = adminPaymentRows.map((row) =>
      [
        row.email,
        row.name,
        row.plan,
        row.amount,
        row.date,
        row.transactionId,
        row.status,
      ]
        .map((value) => `"${value.replaceAll('"', '""')}"`)
        .join(",")
    )
    const blob = new Blob([[header.join(","), ...lines].join("\n")], {
      type: "text/csv;charset=utf-8;",
    })
    const url = URL.createObjectURL(blob)
    const anchor = document.createElement("a")
    anchor.href = url
    anchor.download = "hireloop-payments.csv"
    anchor.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <div>
        <h1 className="text-[25px] leading-tight font-semibold tracking-[-0.03em] text-white">
          Payments &amp; Subscriptions
        </h1>
        <p className="mt-1.5 max-w-[560px] text-[11.5px] leading-relaxed text-white/35">
          Comprehensive overview of platform revenue and active subscriptions.
        </p>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {adminPaymentStats.map((stat, index) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={statIcons[index] ?? CreditCard}
            trend={stat.trend}
            className="bg-[linear-gradient(160deg,#111114_0%,#0b0b0d_100%)]"
          />
        ))}
      </div>

      <DashboardCard className="mt-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.055] px-4 py-3">
          <h2 className="text-[12px] font-semibold text-white/80">
            Recent Transactions
          </h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowFilter((current) => !current)}
              className={cn(
                "inline-flex h-[28px] items-center gap-1.5 rounded-[5px] border px-2.5 text-[10px] font-medium transition-colors",
                showFilter
                  ? "border-[#5c53fe]/40 bg-[#5c53fe]/10 text-[#b9b3ff]"
                  : "border-white/[0.08] text-white/45 hover:bg-white/[0.04] hover:text-white/70"
              )}
            >
              <Filter className="size-3" />
              Filter
            </button>
            <button
              type="button"
              onClick={exportCsv}
              className="inline-flex h-[28px] items-center gap-1.5 rounded-[5px] bg-white px-2.5 text-[10px] font-semibold text-[#0a0a0b] hover:bg-white/90"
            >
              <Download className="size-3" />
              Export CSV
            </button>
          </div>
        </div>

        {showFilter ? (
          <div className="flex flex-wrap items-center gap-1.5 border-b border-white/[0.045] px-4 py-2">
            {(["All", "Success", "Pending", "Failed"] as PaymentFilter[]).map(
              (item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                  className={cn(
                    "h-[24px] rounded-[4px] px-2 text-[9.5px] font-medium transition-colors",
                    filter === item
                      ? "bg-[#17171b] text-white ring-1 ring-white/[0.08]"
                      : "text-white/35 hover:text-white/65"
                  )}
                >
                  {item}
                </button>
              )
            )}
          </div>
        ) : null}

        <TableShell>
          <TableHead>
            <Th className="pl-5">User Email</Th>
            <Th>Plan</Th>
            <Th>Amount</Th>
            <Th>Date</Th>
            <Th>Transaction ID</Th>
            <Th>Status</Th>
          </TableHead>
          <tbody>
            {rows.map((payment, index) => (
              <tr
                key={payment.id}
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
                      {payment.name.charAt(0)}
                    </span>
                    <div>
                      <p className="text-[11px] font-medium text-white/80">
                        {payment.email}
                      </p>
                      <p className="mt-0.5 text-[9px] text-white/25">
                        {payment.name}
                      </p>
                    </div>
                  </div>
                </Td>
                <Td>
                  <span className="inline-flex items-center gap-1.5 rounded-[4px] border border-white/[0.07] bg-white/[0.025] px-1.5 py-0.5 text-[9px] text-white/55">
                    {payment.plan}
                  </span>
                </Td>
                <Td className="font-medium text-white/75">{payment.amount}</Td>
                <Td className="whitespace-nowrap">{payment.date}</Td>
                <Td className="font-mono text-[10px] text-white/35">
                  {payment.transactionId}
                </Td>
                <Td>
                  <StatusBadge status={payment.status} />
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>

        {rows.length === 0 ? (
          <p className="py-12 text-center text-[11px] text-white/30">
            No transactions with this status.
          </p>
        ) : (
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-[9.5px] text-white/25">
              Showing {rows.length} of 12,408 transactions
            </p>
            <p className="text-[9.5px] text-white/25">
              Updated just now
            </p>
          </div>
        )}
      </DashboardCard>
    </div>
  )
}
