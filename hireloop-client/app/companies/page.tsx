import type { Metadata } from "next"
import { Building2 } from "lucide-react"

import { CompanyDirectory } from "@/app/companies/_components/company-directory"
import { SectionLabel } from "@/components/section-label"
import { SiteFooter } from "@/components/site-footer"
import { SiteNavbar } from "@/components/site-navbar"
import { companies, getCompanyOpenings } from "@/lib/data/catalog"

export const metadata: Metadata = {
  title: "Companies",
  description:
    "Explore verified companies hiring on HireLoop. Filter by industry and find your next team.",
}

export default function CompaniesPage() {
  const directory = companies.map((company) => ({
    ...company,
    openings: getCompanyOpenings(company.id).length,
  }))
  const totalOpenings = directory.reduce(
    (total, company) => total + company.openings,
    0
  )

  return (
    <div className="relative min-h-svh overflow-x-clip bg-[#050506]">
      <SiteNavbar compact />

      <main className="pt-[104px] pb-24">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6">
          <div className="relative overflow-hidden rounded-[20px] border border-white/[0.07] bg-[linear-gradient(150deg,#14141a_0%,#0a0a0d_55%,#070708_100%)] px-6 py-12 text-center sm:px-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[620px] -translate-x-1/2 rounded-full bg-[#5c53fe]/15 blur-[110px]"
            />
            <div className="relative">
              <SectionLabel>Verified employers</SectionLabel>
              <h1 className="mx-auto mt-5 max-w-[760px] text-[2.4rem] leading-[1.03] font-medium tracking-[-0.06em] text-balance text-white sm:text-[3rem]">
                Work with teams building what comes next
              </h1>
              <p className="mx-auto mt-4 max-w-[620px] text-[14.5px] leading-[1.65] text-pretty text-white/50 sm:text-[15.5px]">
                Browse vetted companies across AI, fintech, design, and
                developer tools — all actively hiring on HireLoop.
              </p>

              <div className="mx-auto mt-7 flex w-fit items-center gap-5 rounded-full border border-white/[0.07] bg-white/[0.025] px-5 py-2.5 text-[12px] text-white/60">
                <span className="flex items-center gap-2">
                  <Building2 className="size-3.5 text-[#8b85ff]" />
                  {directory.length} companies
                </span>
                <span aria-hidden className="h-4 w-px bg-white/10" />
                <span>{totalOpenings} open roles</span>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <CompanyDirectory companies={directory} />
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
