"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Building2, MapPin, Users } from "lucide-react"

import { cn } from "@/lib/utils"
import type { JobCompany } from "@/lib/types/jobs"

type CompanyDirectoryProps = {
  companies: (JobCompany & { openings: number })[]
}

export function CompanyDirectory({ companies }: CompanyDirectoryProps) {
  const [industry, setIndustry] = useState("All")

  const industries = useMemo(() => {
    const values = new Set(
      companies.map((company) => company.industry.split("/")[0].trim())
    )

    return ["All", ...Array.from(values)]
  }, [companies])

  const filtered = useMemo(
    () =>
      industry === "All"
        ? companies
        : companies.filter(
            (company) =>
              company.industry.split("/")[0].trim() === industry
          ),
    [companies, industry]
  )

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {industries.map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setIndustry(value)}
            className={cn(
              "h-9 rounded-full border px-4 text-[12.5px] font-medium transition-colors",
              industry === value
                ? "border-white bg-white text-[#0a0a0b]"
                : "border-white/[0.08] bg-white/[0.02] text-[#a0a0ab] hover:border-white/15 hover:text-white"
            )}
          >
            {value}
          </button>
        ))}
      </div>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((company) => (
          <Link
            key={company.id}
            href={`/companies/${company.id}`}
            className="group relative overflow-hidden rounded-[16px] border border-white/[0.07] bg-[linear-gradient(160deg,#121215_0%,#0a0a0c_58%,#070708_100%)] p-6 transition-colors hover:border-white/[0.14]"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
            />

            <div className="flex items-start justify-between gap-4">
              <div className="relative flex size-[58px] shrink-0 items-center justify-center overflow-hidden rounded-[13px] border border-white/[0.09] bg-[#17171b]">
                <Image
                  src={company.logo}
                  alt={`${company.name} logo`}
                  fill
                  sizes="58px"
                  className="object-cover"
                />
              </div>
              <span className="flex size-8 items-center justify-center rounded-full border border-white/[0.08] text-[#6e6e78] transition-colors group-hover:border-white/20 group-hover:text-white">
                <ArrowUpRight className="size-3.5" />
              </span>
            </div>

            <h2 className="mt-5 text-[20px] font-medium tracking-[-0.03em] text-[#ededef]">
              {company.name}
            </h2>
            <p className="mt-1.5 text-[13px] text-[#8f8f99]">
              {company.industry}
            </p>

            <div className="mt-5 space-y-2 text-[12.5px] text-[#8f8f99]">
              <p className="flex items-center gap-2">
                <MapPin className="size-3.5 text-[#6e6e78]" />
                {company.location}
              </p>
              <p className="flex items-center gap-2">
                <Users className="size-3.5 text-[#6e6e78]" />
                {company.size}
              </p>
              <p className="flex items-center gap-2">
                <Building2 className="size-3.5 text-[#6e6e78]" />
                {company.openings} open{" "}
                {company.openings === 1 ? "role" : "roles"}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4">
              <span className="text-[12px] font-medium text-[#a7a1ff]">
                View company
              </span>
              {company.verified ? (
                <span className="text-[11px] font-medium text-[#22c55e]">
                  Verified
                </span>
              ) : null}
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-7 flex min-h-[220px] items-center justify-center rounded-[16px] border border-white/[0.06] bg-[#0a0a0c] text-[14px] text-[#8f8f99]">
          No companies in this category yet.
        </div>
      ) : null}
    </div>
  )
}
