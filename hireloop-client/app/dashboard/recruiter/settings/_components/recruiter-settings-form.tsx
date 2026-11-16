"use client"

import { useState } from "react"
import { Check, Globe2, Upload } from "lucide-react"

import { DashboardCard } from "@/components/dashboard/primitives"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

const inputClass =
  "h-[38px] rounded-[6px] border-white/[0.08] bg-[#101013] text-[11.5px] text-white focus-visible:border-[#5c53fe]/60 focus-visible:ring-[#5c53fe]/15"

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

export function RecruiterSettingsForm() {
  const [saved, setSaved] = useState(false)
  const [notifications, setNotifications] = useState({
    newApplicants: true,
    statusUpdates: true,
    weeklyDigest: false,
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
            Settings
          </h1>
          <p className="mt-1.5 text-[11.5px] text-white/35">
            Manage your company profile, recruiter account and notifications.
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

      <div className="mt-5 grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-3">
          <DashboardCard className="p-5">
            <h2 className="text-[14px] font-semibold text-white/90">
              Company Profile
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-4 border-b border-white/[0.05] pb-5">
              <span className="flex size-16 items-center justify-center rounded-[12px] border border-white/[0.08] bg-[#141417] text-[18px] font-semibold text-[#b9b3ff]">
                HF
              </span>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  className="h-[30px] rounded-[6px] border-white/[0.09] bg-transparent px-3 text-[10px] font-medium text-white/65 hover:bg-white/[0.05] hover:text-white"
                >
                  <Upload className="size-3" />
                  Upload Logo
                </Button>
                <p className="mt-1.5 text-[9px] text-white/25">
                  Square image, at least 400 × 400px.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-white/40">
                  Company Name
                </Label>
                <Input defaultValue="HireFlow Network" className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-white/40">
                  Website
                </Label>
                <div className="relative">
                  <Globe2 className="pointer-events-none absolute top-1/2 left-3 size-3.5 -translate-y-1/2 text-white/25" />
                  <Input
                    defaultValue="https://hireflownetwork.com"
                    className={cn(inputClass, "pl-9")}
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-white/40">
                  Industry
                </Label>
                <Input
                  defaultValue="Engineering & Technology"
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-white/40">
                  Headquarters
                </Label>
                <Input defaultValue="New York, USA" className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-white/40">
                  Company Size
                </Label>
                <Input defaultValue="250 – 500 employees" className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-white/40">
                  Founded
                </Label>
                <Input defaultValue="2018" className={inputClass} />
              </div>
            </div>

            <div className="mt-4 space-y-1.5">
              <Label className="text-[10px] font-medium text-white/40">
                About the Company
              </Label>
              <textarea
                rows={4}
                defaultValue="HireFlow Network helps engineering organizations ship better software with intelligent workflow automation, connecting world-class talent with teams building the future."
                className="w-full resize-none rounded-[6px] border border-white/[0.08] bg-[#101013] px-3 py-2.5 text-[11.5px] leading-relaxed text-white outline-none focus:border-[#5c53fe]/60 focus:ring-2 focus:ring-[#5c53fe]/15"
              />
            </div>
          </DashboardCard>

          <DashboardCard className="p-5">
            <h2 className="text-[14px] font-semibold text-white/90">
              Recruiter Profile
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-white/40">
                  Full Name
                </Label>
                <Input defaultValue="Alex Sterling" className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-white/40">
                  Email Address
                </Label>
                <Input
                  type="email"
                  defaultValue="alex.sterling@hireloop.com"
                  className={inputClass}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-white/40">
                  Job Title
                </Label>
                <Input defaultValue="Head of Talent" className={inputClass} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-[10px] font-medium text-white/40">
                  Phone
                </Label>
                <Input defaultValue="+1 (555) 014-8823" className={inputClass} />
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <Button
                type="button"
                onClick={handleSave}
                className="h-[30px] rounded-[6px] bg-white px-3 text-[10px] font-semibold text-[#0a0a0b] hover:bg-white/90"
              >
                Update Profile
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-[30px] rounded-[6px] border-white/[0.09] bg-transparent px-3 text-[10px] font-medium text-white/55 hover:bg-white/[0.05] hover:text-white"
              >
                Reset Password
              </Button>
            </div>
          </DashboardCard>
        </div>

        <div className="space-y-3">
          <DashboardCard className="p-5">
            <h2 className="text-[14px] font-semibold text-white/90">
              Current Plan
            </h2>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-[#5c53fe]/20 bg-[#5c53fe]/10 px-2 py-1 text-[9px] font-medium text-[#b9b3ff]">
              Premium Account
            </span>
            <p className="mt-3 text-[22px] leading-none font-semibold text-white">
              $99
              <span className="ml-0.5 text-[10px] font-normal text-white/30">
                /mo
              </span>
            </p>
            <p className="mt-2 text-[9.5px] text-white/30">
              18 of 50 active job posts used
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
              <div className="h-full w-[36%] rounded-full bg-[#5c53fe]" />
            </div>
            <Button
              nativeButton={false}
              render={<a href="/pricing" />}
              className="mt-4 h-[30px] w-full rounded-[6px] bg-white text-[10px] font-semibold text-[#0a0a0b] hover:bg-white/90"
            >
              Upgrade Plan
            </Button>
          </DashboardCard>

          <DashboardCard className="p-5">
            <h2 className="text-[14px] font-semibold text-white/90">
              Notifications
            </h2>
            <div className="mt-2">
              <ToggleRow
                title="New applicants"
                description="Get notified when a candidate applies."
                checked={notifications.newApplicants}
                onChange={(value) =>
                  setNotifications((current) => ({
                    ...current,
                    newApplicants: value,
                  }))
                }
              />
              <ToggleRow
                title="Status updates"
                description="Candidate pipeline changes and offers."
                checked={notifications.statusUpdates}
                onChange={(value) =>
                  setNotifications((current) => ({
                    ...current,
                    statusUpdates: value,
                  }))
                }
              />
              <ToggleRow
                title="Weekly digest"
                description="A summary of job post performance."
                checked={notifications.weeklyDigest}
                onChange={(value) =>
                  setNotifications((current) => ({
                    ...current,
                    weeklyDigest: value,
                  }))
                }
              />
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
        Your changes have been saved.
      </div>
    </div>
  )
}
