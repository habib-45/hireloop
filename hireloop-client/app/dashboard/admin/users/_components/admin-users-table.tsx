"use client"

import { useMemo, useState } from "react"
import { ShieldAlert, UserPlus, UserRoundCheck, Users } from "lucide-react"

import {
  DashboardCard,
  TableHead,
  TableShell,
  Td,
  Th,
} from "@/components/dashboard/primitives"
import { PrintButton } from "@/components/dashboard/print-button"
import { StatCard } from "@/components/dashboard/stat-card"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { adminUsers, adminUserStats } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

const avatarColors = [
  "#5c53fe",
  "#0ea5e9",
  "#f59e0b",
  "#ef4444",
  "#22c55e",
  "#a855f7",
]

const statIcons = [Users, UserRoundCheck, ShieldAlert, UserPlus]

export function AdminUsersTable() {
  const [users, setUsers] = useState(adminUsers)
  const [role, setRole] = useState<"all" | "Seeker" | "Recruiter">("all")

  const rows = useMemo(
    () => (role === "all" ? users : users.filter((user) => user.role === role)),
    [role, users]
  )

  function toggleRole(id: string) {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? {
              ...user,
              role: user.role === "Seeker" ? "Recruiter" : "Seeker",
            }
          : user
      )
    )
  }

  function toggleStatus(id: string) {
    setUsers((current) =>
      current.map((user) =>
        user.id === id
          ? {
              ...user,
              status: user.status === "Active" ? "Suspended" : "Active",
            }
          : user
      )
    )
  }

  function removeUser(id: string) {
    setUsers((current) => current.filter((user) => user.id !== id))
  }

  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[25px] leading-tight font-semibold tracking-[-0.03em] text-white">
            User Management
          </h1>
          <p className="mt-1.5 max-w-[520px] text-[11.5px] leading-relaxed text-white/35">
            Review, filter, and manage platform access for all users.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <label className="relative">
            <span className="sr-only">Filter by role</span>
            <select
              value={role}
              onChange={(event) => setRole(event.target.value as typeof role)}
              className="h-[30px] appearance-none rounded-[6px] border border-white/[0.08] bg-[#101013] pr-7 pl-3 text-[10px] text-white/60 outline-none"
            >
              <option value="all">All Roles</option>
              <option value="Seeker">Seekers</option>
              <option value="Recruiter">Recruiters</option>
            </select>
            <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-[8px] text-white/25">
              ▼
            </span>
          </label>
          <PrintButton
            label="Export List"
            className="h-[30px] rounded-[6px] bg-white px-3 text-[10px] font-semibold text-[#0a0a0b] hover:bg-white/90"
          />
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2.5 lg:grid-cols-4">
        {adminUserStats.map((stat, index) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={statIcons[index] ?? Users}
            hint={stat.hint}
            tone={stat.tone}
            className="bg-[linear-gradient(160deg,#111114_0%,#0b0b0d_100%)]"
          />
        ))}
      </div>

      <DashboardCard className="mt-4 overflow-hidden">
        <TableShell>
          <TableHead>
            <Th className="pl-5">User Name</Th>
            <Th>Email Address</Th>
            <Th>Role</Th>
            <Th>Join Date</Th>
            <Th>Status</Th>
            <Th className="text-right">Actions</Th>
          </TableHead>
          <tbody>
            {rows.map((user, index) => (
              <tr
                key={user.id}
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
                      {user.name
                        .split(" ")
                        .map((part) => part[0])
                        .join("")}
                    </span>
                    <span className="text-[11.5px] font-medium text-white/80">
                      {user.name}
                    </span>
                  </div>
                </Td>
                <Td>{user.email}</Td>
                <Td>
                  <span
                    className={cn(
                      "inline-flex h-[20px] items-center gap-1.5 rounded-full px-2 text-[9px] font-medium ring-1 ring-inset",
                      user.role === "Recruiter"
                        ? "bg-[#5c53fe]/10 text-[#b9b3ff] ring-[#5c53fe]/20"
                        : "bg-white/[0.05] text-white/45 ring-white/10"
                    )}
                  >
                    <span className="size-1.5 rounded-full bg-current" />
                    {user.role}
                  </span>
                </Td>
                <Td className="whitespace-nowrap">{user.joined}</Td>
                <Td>
                  <StatusBadge status={user.status} />
                </Td>
                <Td className="text-right">
                  <div className="flex items-center justify-end gap-3 text-[9.5px] font-medium">
                    <button
                      type="button"
                      onClick={() => toggleRole(user.id)}
                      className="text-[#a8a1ff] transition-colors hover:text-white"
                    >
                      {user.role === "Seeker"
                        ? "Make Recruiter"
                        : "Make Seeker"}
                    </button>
                    {user.status === "Suspended" ? (
                      <>
                        <button
                          type="button"
                          onClick={() => toggleStatus(user.id)}
                          className="text-[#4ade80] transition-colors hover:text-[#86efac]"
                        >
                          Activate
                        </button>
                        <button
                          type="button"
                          onClick={() => removeUser(user.id)}
                          className="text-[#f87171] transition-colors hover:text-[#fca5a5]"
                        >
                          Delete
                        </button>
                      </>
                    ) : (
                      <button
                        type="button"
                        onClick={() => toggleStatus(user.id)}
                        className="text-[#f87171] transition-colors hover:text-[#fca5a5]"
                      >
                        Suspend
                      </button>
                    )}
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>

        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-[9.5px] text-white/25">
            Showing {rows.length} of 12,842 active users
          </p>
          <div className="flex items-center gap-1">
            <span className="rounded-[4px] bg-white/[0.09] px-2 py-1 text-[9.5px] text-white">
              1
            </span>
            <span className="px-2 py-1 text-[9.5px] text-white/30">2</span>
            <span className="px-2 py-1 text-[9.5px] text-white/30">3</span>
            <span className="px-1 text-[9.5px] text-white/20">…</span>
            <span className="px-2 py-1 text-[9.5px] text-white/30">42</span>
          </div>
        </div>
      </DashboardCard>
    </div>
  )
}
