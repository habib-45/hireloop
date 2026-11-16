"use client"

import { useMemo, useState } from "react"
import { Building2, CheckCircle2, Search, ShieldAlert, Users } from "lucide-react"

import {
  DashboardCard,
  TableHead,
  TableShell,
  Td,
  Th,
} from "@/components/dashboard/primitives"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { adminCompanies } from "@/lib/dashboard-data"

type CompanyStatus = "Active" | "Pending" | "Suspended"

const statIcons = [Building2, Users, ShieldAlert, CheckCircle2]

export function AdminCompaniesTable() {
  const [companies, setCompanies] = useState(adminCompanies)
  const [query, setQuery] = useState("")

  const rows = useMemo(() => {
    const needle = query.trim().toLowerCase()

    if (!needle) {
      return companies
    }

    return companies.filter((company) =>
      [company.name, company.industry, company.location]
        .join(" ")
        .toLowerCase()
        .includes(needle)
    )
  }, [companies, query])

  function updateStatus(id: string, status: CompanyStatus) {
    setCompanies((current) =>
      current.map((company) =>
        company.id === id ? { ...company, status } : company
      )
    )
  }

  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[25px] leading-tight font-semibold tracking-[-0.03em] text-white">
            Companies
          </h1>
          <p className="mt-1.5 max-w-[520px] text-[11.5px] leading-relaxed text-white/35">
            Review company registrations, approve new organizations and monitor
            hiring activity.
          </p>
        </div>
        <button
          type="button"
          className="inline-flex h-[30px] items-center gap-1.5 rounded-[6px] bg-[#5c53fe] px-3 text-[10.5px] font-medium text-white shadow-[0_0_22px_-6px_rgba(92,83,254,0.8)] hover:bg-[#6d65ff]"
        >
          <Building2 className="size-3.5" />
          Add Company
        </button>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {[
          { label: "Total Companies", value: "4,281", hint: "+8% this month" },
          { label: "Active Hiring", value: "3,942", hint: "92% of companies" },
          { label: "Pending Approval", value: "18", hint: "Needs review" },
          { label: "Suspended", value: "6", hint: "0.1% of total" },
        ].map((stat, index) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={statIcons[index] ?? Building2}
            hint={stat.hint}
            tone={index === 2 ? "warning" : "positive"}
            className="bg-[linear-gradient(160deg,#111114_0%,#0b0b0d_100%)]"
          />
        ))}
      </div>

      <DashboardCard className="mt-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.055] px-4 py-3">
          <h2 className="text-[12px] font-semibold text-white/80">
            Company Directory
          </h2>
          <label className="flex h-[28px] w-full max-w-[240px] items-center gap-2 rounded-[5px] border border-white/[0.07] bg-[#101013] px-2.5">
            <Search className="size-3 text-white/25" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search companies..."
              aria-label="Search companies"
              className="h-full min-w-0 flex-1 bg-transparent text-[10px] text-white outline-none placeholder:text-white/25"
            />
          </label>
        </div>

        <TableShell>
          <TableHead>
            <Th className="pl-5">Company</Th>
            <Th>Industry</Th>
            <Th>Location</Th>
            <Th>Employees</Th>
            <Th>Open Jobs</Th>
            <Th>Status</Th>
            <Th className="text-right">Actions</Th>
          </TableHead>
          <tbody>
            {rows.map((company) => (
              <tr
                key={company.id}
                className="transition-colors hover:bg-white/[0.018]"
              >
                <Td className="pl-5">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-[6px] bg-[#1b1a2b] text-[9.5px] font-semibold text-[#b9b3ff] ring-1 ring-[#5c53fe]/20">
                      {company.name.charAt(0)}
                    </span>
                    <span className="text-[11.5px] font-medium text-white/80">
                      {company.name}
                    </span>
                  </div>
                </Td>
                <Td>{company.industry}</Td>
                <Td>{company.location}</Td>
                <Td>{company.employees}</Td>
                <Td>{company.jobs} live</Td>
                <Td>
                  <StatusBadge status={company.status} />
                </Td>
                <Td className="text-right">
                  <div className="flex items-center justify-end gap-3 text-[9.5px] font-medium">
                    {company.status === "Pending" ? (
                      <button
                        type="button"
                        onClick={() => updateStatus(company.id, "Active")}
                        className="text-[#4ade80] hover:text-[#86efac]"
                      >
                        Approve
                      </button>
                    ) : null}
                    {company.status === "Suspended" ? (
                      <button
                        type="button"
                        onClick={() => updateStatus(company.id, "Active")}
                        className="text-[#4ade80] hover:text-[#86efac]"
                      >
                        Restore
                      </button>
                    ) : null}
                    {company.status !== "Suspended" ? (
                      <button
                        type="button"
                        onClick={() => updateStatus(company.id, "Suspended")}
                        className="text-[#f87171] hover:text-[#fca5a5]"
                      >
                        Suspend
                      </button>
                    ) : null}
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>

        {rows.length === 0 ? (
          <p className="py-12 text-center text-[11px] text-white/30">
            No companies match that search.
          </p>
        ) : (
          <div className="flex items-center justify-between px-4 py-3">
            <p className="text-[9.5px] text-white/25">
              Showing {rows.length} of 4,281 companies
            </p>
            <div className="flex items-center gap-1">
              <span className="rounded-[4px] bg-white/[0.09] px-2 py-1 text-[9.5px] text-white">
                1
              </span>
              <span className="px-2 py-1 text-[9.5px] text-white/30">2</span>
              <span className="px-2 py-1 text-[9.5px] text-white/30">3</span>
              <span className="px-1 text-[9.5px] text-white/20">…</span>
            </div>
          </div>
        )}
      </DashboardCard>
    </div>
  )
}
