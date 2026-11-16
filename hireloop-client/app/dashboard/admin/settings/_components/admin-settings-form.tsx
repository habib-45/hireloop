"use client"

import { useState } from "react"
import { Check, Globe2, Mail, ShieldCheck } from "lucide-react"

import { DashboardCard } from "@/components/dashboard/primitives"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const plans = [
  { name: "Starter", price: "$0", interval: "Forever", status: "Active" },
  { name: "Growth", price: "$17", interval: "Monthly", status: "Active" },
  { name: "Pro", price: "$20", interval: "Monthly", status: "Active" },
  { name: "Premium", price: "$99", interval: "Monthly", status: "Active" },
]

function ToggleRow({
  title,
  description,
  checked,
  onChange,
}: {
  title: string
  description: string
  checked: boolean
  onChange: (value: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-white/[0.045] py-3 last:border-0 last:pb-0">
      <div>
        <p className="text-[11px] font-medium text-white/75">{title}</p>
        <p className="mt-0.5 text-[9.5px] leading-relaxed text-white/28">
          {description}
        </p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative mt-0.5 h-[18px] w-[32px] shrink-0 rounded-full border transition-colors",
          checked
            ? "border-[#5c53fe] bg-[#5c53fe]"
            : "border-white/15 bg-white/[0.05]"
        )}
      >
        <span
          className={cn(
            "absolute top-1/2 size-[12px] -translate-y-1/2 rounded-full transition-all",
            checked ? "right-[3px] bg-white" : "left-[3px] bg-white/40"
          )}
        />
      </button>
    </div>
  )
}

export function AdminSettingsForm() {
  const [saved, setSaved] = useState(false)
  const [security, setSecurity] = useState({
    twoFactor: true,
    emailAlerts: true,
    maintenance: false,
  })

  function handleSave() {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }

  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-[25px] leading-tight font-semibold tracking-[-0.03em] text-white">
            Platform Settings
          </h1>
          <p className="mt-1.5 text-[11.5px] text-white/35">
            Configure platform defaults, subscription plans and access policies.
          </p>
        </div>
        <Button
          type="button"
          onClick={handleSave}
          className="h-[32px] rounded-[6px] bg-white px-3.5 text-[10.5px] font-semibold text-[#0a0a0b] hover:bg-white/90"
        >
          {saved ? (
            <>
              <Check className="size-3" />
              Saved
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>

      <div className="mt-5 grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-3">
          <DashboardCard className="p-5">
            <h2 className="text-[14px] font-semibold text-white/90">
              General
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-white/40">
                  Platform Name
                </Label>
                <Input
                  defaultValue="HireLoop"
                  className="h-[38px] rounded-[6px] border-white/[0.08] bg-[#101013] text-[11.5px] text-white focus-visible:border-[#5c53fe]/60 focus-visible:ring-[#5c53fe]/15"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-white/40">
                  Support Email
                </Label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-white/25" />
                  <Input
                    defaultValue="support@hireloop.com"
                    className="h-[38px] rounded-[6px] border-white/[0.08] bg-[#101013] pl-9 text-[11.5px] text-white focus-visible:border-[#5c53fe]/60 focus-visible:ring-[#5c53fe]/15"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-white/40">
                  Default Currency
                </Label>
                <div className="relative">
                  <Globe2 className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-white/25" />
                  <select className="h-[38px] w-full appearance-none rounded-[6px] border border-white/[0.08] bg-[#101013] pl-9 text-[11.5px] text-white/80 outline-none focus:border-[#5c53fe]/60">
                    <option>USD — United States Dollar</option>
                    <option>BDT — Bangladeshi Taka</option>
                  </select>
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-white/40">
                  Currency Rate (USD → BDT)
                </Label>
                <Input
                  defaultValue="127.6665"
                  className="h-[38px] rounded-[6px] border-white/[0.08] bg-[#101013] text-[11.5px] text-white focus-visible:border-[#5c53fe]/60 focus-visible:ring-[#5c53fe]/15"
                />
              </div>
            </div>
          </DashboardCard>

          <DashboardCard className="p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[14px] font-semibold text-white/90">
                Subscription Plans
              </h2>
              <button
                type="button"
                className="text-[10px] font-medium text-[#a8a1ff] transition-colors hover:text-white"
              >
                + Add Plan
              </button>
            </div>

            <div className="mt-3 divide-y divide-white/[0.045]">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className="flex items-center justify-between gap-4 py-3"
                >
                  <div>
                    <p className="text-[11.5px] font-medium text-white/80">
                      {plan.name}
                    </p>
                    <p className="mt-0.5 text-[9px] text-white/25">
                      {plan.interval}
                    </p>
                  </div>
                  <div className="flex items-center gap-5">
                    <span className="text-[11px] font-medium text-white/60">
                      {plan.price}
                    </span>
                    <span className="rounded-full bg-[#22c55e]/10 px-2 py-0.5 text-[8.5px] font-medium text-[#4ade80] ring-1 ring-[#22c55e]/20">
                      {plan.status}
                    </span>
                    <button
                      type="button"
                      className="text-[9.5px] font-medium text-white/35 transition-colors hover:text-white/70"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </DashboardCard>
        </div>

        <div className="space-y-3">
          <DashboardCard className="p-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="size-3.5 text-[#a49dff]" />
              <h2 className="text-[14px] font-semibold text-white/90">
                Access &amp; Security
              </h2>
            </div>
            <div className="mt-2">
              <ToggleRow
                title="Require 2FA for admins"
                description="All admin accounts must use two-factor auth."
                checked={security.twoFactor}
                onChange={(value) =>
                  setSecurity((current) => ({ ...current, twoFactor: value }))
                }
              />
              <ToggleRow
                title="Email security alerts"
                description="Notify admins about unusual sign-in activity."
                checked={security.emailAlerts}
                onChange={(value) =>
                  setSecurity((current) => ({
                    ...current,
                    emailAlerts: value,
                  }))
                }
              />
              <ToggleRow
                title="Maintenance mode"
                description="Temporarily pause public job applications."
                checked={security.maintenance}
                onChange={(value) =>
                  setSecurity((current) => ({
                    ...current,
                    maintenance: value,
                  }))
                }
              />
            </div>
          </DashboardCard>

          <DashboardCard className="p-5">
            <h2 className="text-[14px] font-semibold text-white/90">
              Danger Zone
            </h2>
            <p className="mt-1.5 text-[9.5px] leading-relaxed text-white/28">
              Export or permanently delete platform data. These actions are
              logged and cannot be undone.
            </p>
            <div className="mt-4 flex flex-col gap-2">
              <Button
                type="button"
                variant="outline"
                className="h-[30px] rounded-[6px] border-white/[0.09] bg-transparent text-[10px] font-medium text-white/55 hover:bg-white/[0.05] hover:text-white"
              >
                Export Platform Data
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-[30px] rounded-[6px] border-[#ef4444]/25 bg-transparent text-[10px] font-medium text-[#f87171] hover:bg-[#ef4444]/10 hover:text-[#fca5a5]"
              >
                Delete All Demo Data
              </Button>
            </div>
          </DashboardCard>
        </div>
      </div>

      <div
        aria-live="polite"
        className={cn(
          "pointer-events-none fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-[8px] border border-[#22c55e]/25 bg-[#0d1a12] px-3.5 py-2.5 text-[11px] font-medium text-[#86efac] shadow-2xl transition-all duration-300",
          saved ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}
      >
        <Check className="size-3.5" />
        Platform settings saved.
      </div>
    </div>
  )
}
