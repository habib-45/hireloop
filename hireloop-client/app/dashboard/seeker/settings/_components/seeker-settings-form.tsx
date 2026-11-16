"use client"

import { useRef, useState } from "react"
import {
  Check,
  FileText,
  Plus,
  Upload,
  UserRound,
  X,
} from "lucide-react"

import { useAuth } from "@/components/auth-provider"
import { DashboardCard } from "@/components/dashboard/primitives"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { seekerSkills } from "@/lib/dashboard-data"
import { cn } from "@/lib/utils"

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

export function SeekerSettingsForm() {
  const { user } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState(user?.name || "Jane Doe")
  const [email, setEmail] = useState(user?.email || "jane.doe@example.com")
  const [headline, setHeadline] = useState("Senior UX/UI Designer")
  const [bio, setBio] = useState(
    "Passionate designer with 5+ years of experience crafting user-centric digital experiences."
  )
  const [skills, setSkills] = useState<string[]>(seekerSkills)
  const [newSkill, setNewSkill] = useState("")
  const [addingSkill, setAddingSkill] = useState(false)
  const [resumeName, setResumeName] = useState("Jane_Doe_Resume_2023.pdf")
  const [saved, setSaved] = useState(false)

  function handleSave() {
    setSaved(true)
    window.setTimeout(() => setSaved(false), 2200)
  }

  function addSkill() {
    const value = newSkill.trim()

    if (!value) {
      setAddingSkill(false)
      return
    }

    if (!skills.some((skill) => skill.toLowerCase() === value.toLowerCase())) {
      setSkills((current) => [...current, value])
    }

    setNewSkill("")
    setAddingSkill(false)
  }

  function handleFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]

    if (file) {
      setResumeName(file.name)
    }
  }

  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <div>
        <h1 className="text-[25px] leading-tight font-semibold tracking-[-0.03em] text-white">
          Settings
        </h1>
        <p className="mt-1.5 text-[11.5px] text-white/35">
          Manage your account details and professional profile.
        </p>
      </div>

      <div className="mt-5 grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-3">
          <DashboardCard className="p-5">
            <h2 className="text-[14px] font-semibold text-white/90">
              Profile Information
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-4 border-b border-white/[0.05] pb-5">
              <span className="flex size-16 items-center justify-center rounded-full bg-[linear-gradient(145deg,#5c53fe,#8b85ff)] text-[18px] font-semibold text-white ring-2 ring-white/10">
                {getInitials(name)}
              </span>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => fileInputRef.current?.click()}
                  className="h-[30px] rounded-[6px] border-white/[0.09] bg-transparent px-3 text-[10px] font-medium text-white/65 hover:bg-white/[0.05] hover:text-white"
                >
                  Change Avatar
                </Button>
                <p className="mt-1.5 text-[9px] text-white/25">
                  JPG, GIF or PNG, max size of 5MB.
                </p>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label
                  htmlFor="settings-name"
                  className="text-[10px] font-medium text-white/40"
                >
                  Full Name
                </Label>
                <Input
                  id="settings-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="h-[38px] rounded-[6px] border-white/[0.08] bg-[#101013] text-[11.5px] text-white focus-visible:border-[#5c53fe]/60 focus-visible:ring-[#5c53fe]/15"
                />
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="settings-email"
                  className="text-[10px] font-medium text-white/40"
                >
                  Email Address
                </Label>
                <Input
                  id="settings-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-[38px] rounded-[6px] border-white/[0.08] bg-[#101013] text-[11.5px] text-white focus-visible:border-[#5c53fe]/60 focus-visible:ring-[#5c53fe]/15"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-2">
              <Button
                type="button"
                onClick={handleSave}
                className="h-[32px] rounded-[6px] bg-white px-3.5 text-[10.5px] font-semibold text-[#0a0a0b] hover:bg-white/90"
              >
                {saved ? (
                  <>
                    <Check className="size-3" />
                    Profile Updated
                  </>
                ) : (
                  "Update Profile"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-[32px] rounded-[6px] border-white/[0.09] bg-transparent px-3.5 text-[10.5px] font-medium text-white/55 hover:bg-white/[0.05] hover:text-white"
              >
                Reset Password
              </Button>
            </div>
          </DashboardCard>

          <DashboardCard className="p-5">
            <h2 className="text-[14px] font-semibold text-white/90">
              Professional Details
            </h2>

            <div className="mt-5 space-y-4">
              <div className="space-y-1.5">
                <Label
                  htmlFor="settings-headline"
                  className="text-[10px] font-medium text-white/40"
                >
                  Professional Headline
                </Label>
                <Input
                  id="settings-headline"
                  value={headline}
                  onChange={(event) => setHeadline(event.target.value)}
                  className="h-[38px] rounded-[6px] border-white/[0.08] bg-[#101013] text-[11.5px] text-white focus-visible:border-[#5c53fe]/60 focus-visible:ring-[#5c53fe]/15"
                />
              </div>

              <div className="space-y-1.5">
                <Label
                  htmlFor="settings-bio"
                  className="text-[10px] font-medium text-white/40"
                >
                  Bio
                </Label>
                <textarea
                  id="settings-bio"
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  rows={5}
                  className="w-full resize-none rounded-[6px] border border-white/[0.08] bg-[#101013] px-3 py-2.5 text-[11.5px] leading-relaxed text-white outline-none focus:border-[#5c53fe]/60 focus:ring-2 focus:ring-[#5c53fe]/15"
                />
              </div>

              <div>
                <p className="text-[10px] font-medium text-white/40">Skills</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex h-[26px] items-center gap-1.5 rounded-[5px] border border-white/[0.08] bg-[#141417] px-2 text-[10px] text-white/65"
                    >
                      {skill}
                      <button
                        type="button"
                        onClick={() =>
                          setSkills((current) =>
                            current.filter((item) => item !== skill)
                          )
                        }
                        aria-label={`Remove ${skill}`}
                        className="text-white/25 transition-colors hover:text-white/70"
                      >
                        <X className="size-2.5" />
                      </button>
                    </span>
                  ))}

                  {addingSkill ? (
                    <span className="inline-flex items-center gap-1">
                      <input
                        autoFocus
                        value={newSkill}
                        onChange={(event) => setNewSkill(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter") {
                            event.preventDefault()
                            addSkill()
                          }

                          if (event.key === "Escape") {
                            setAddingSkill(false)
                            setNewSkill("")
                          }
                        }}
                        onBlur={addSkill}
                        placeholder="Skill name"
                        className="h-[26px] w-[110px] rounded-[5px] border border-[#5c53fe]/40 bg-[#101013] px-2 text-[10px] text-white outline-none"
                      />
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setAddingSkill(true)}
                      className="inline-flex h-[26px] items-center gap-1 text-[10px] text-white/35 transition-colors hover:text-white/70"
                    >
                      <Plus className="size-3" />
                      Add a skill
                    </button>
                  )}
                </div>
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
                  "Save Details"
                )}
              </Button>
            </div>
          </DashboardCard>
        </div>

        <DashboardCard className="p-5">
          <h2 className="text-[14px] font-semibold text-white/90">Resume</h2>
          <p className="mt-1 text-[10px] leading-relaxed text-white/30">
            Upload your most recent resume to enable one-click applications.
          </p>

          <div className="mt-4 rounded-[10px] border border-dashed border-white/[0.11] bg-white/[0.015] px-4 py-7 text-center">
            <span className="mx-auto flex size-10 items-center justify-center rounded-[10px] border border-white/[0.08] bg-white/[0.03]">
              <FileText className="size-4.5 text-[#a49dff]" />
            </span>
            <p className="mt-3 truncate text-[11px] font-medium text-white/75">
              {resumeName}
            </p>
            <p className="mt-1 text-[9px] text-white/28">
              Last updated 3 days ago · 1.2 MB
            </p>
            <p className="mt-3 text-[9px] text-[#4ade80]">
              <span className="mr-1 inline-block size-1.5 rounded-full bg-[#22c55e] align-middle" />
              Resume is ready for 1-click apply
            </p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFile}
            className="sr-only"
            aria-label="Upload resume"
          />

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex h-[30px] items-center justify-center gap-1.5 rounded-[6px] border border-white/[0.08] bg-white/[0.03] text-[10px] font-medium text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              <Upload className="size-3" />
              Replace
            </button>
            <button
              type="button"
              onClick={() => setResumeName("No resume uploaded")}
              className="inline-flex h-[30px] items-center justify-center rounded-[6px] border border-white/[0.08] bg-transparent text-[10px] font-medium text-white/55 transition-colors hover:bg-white/[0.04] hover:text-[#f87171]"
            >
              Remove
            </button>
          </div>

          <div className="mt-5 flex items-start gap-2 rounded-[7px] border border-white/[0.055] bg-white/[0.015] p-2.5">
            <UserRound className="mt-0.5 size-3 shrink-0 text-white/25" />
            <p className="text-[9px] leading-relaxed text-white/28">
              Recruiters can view your resume when you apply through HireLoop.
              Keep it updated for the best matches.
            </p>
          </div>
        </DashboardCard>
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
