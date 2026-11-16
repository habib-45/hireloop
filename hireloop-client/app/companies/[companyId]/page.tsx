import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Check, Globe, MapPin, Users } from "lucide-react"

import { JobListCard } from "@/components/public/job-list-card"
import { SiteFooter } from "@/components/site-footer"
import { SiteNavbar } from "@/components/site-navbar"
import { Button } from "@/components/ui/button"
import {
  companiesById,
  getCompanyOpenings,
  toJobSummary,
} from "@/lib/data/catalog"

type CompanyPageProps = {
  params: Promise<{ companyId: string }>
}

export async function generateMetadata({
  params,
}: CompanyPageProps): Promise<Metadata> {
  const { companyId } = await params
  const company = companiesById.get(companyId)

  return company
    ? {
        title: `${company.name} careers`,
        description: company.about,
      }
    : { title: "Company not found" }
}

export default async function CompanyDetailPage({ params }: CompanyPageProps) {
  const { companyId } = await params
  const company = companiesById.get(companyId)

  if (!company) {
    notFound()
  }

  const openings = getCompanyOpenings(company.id)

  return (
    <div className="relative min-h-svh overflow-x-clip bg-[#050506]">
      <SiteNavbar compact />

      <main className="pt-[104px] pb-24">
        <div className="mx-auto w-full max-w-[1280px] px-5 sm:px-6">
          <Link
            href="/companies"
            className="inline-flex items-center gap-2 text-[12.5px] text-[#8f8f99] transition-colors hover:text-white"
          >
            <ArrowLeft className="size-3.5" />
            All companies
          </Link>

          <div className="mt-4 overflow-hidden rounded-[18px] border border-white/[0.07] bg-[#0b0b0d]">
            <div className="relative h-[190px] bg-[radial-gradient(circle_at_30%_20%,#252554_0%,#14141f_45%,#0a0a0c_100%)] sm:h-[230px]">
              {company.coverImage ? (
                <Image
                  src={company.coverImage}
                  alt={`${company.name} cover`}
                  fill
                  sizes="1280px"
                  priority
                  className="object-cover"
                />
              ) : null}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0b0b0d] to-transparent" />
            </div>

            <div className="relative px-6 pb-7 sm:px-8">
              <div className="-mt-9 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-end gap-4">
                  <div className="relative size-[84px] shrink-0 overflow-hidden rounded-[18px] border border-white/[0.12] bg-[#151518] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.9)]">
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      fill
                      sizes="84px"
                      className="object-cover"
                    />
                  </div>
                  <div className="pb-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h1 className="text-[28px] leading-none font-medium tracking-[-0.045em] text-[#ededef] sm:text-[32px]">
                        {company.name}
                      </h1>
                      {company.verified ? (
                        <span className="inline-flex items-center gap-1 text-[11.5px] font-medium text-[#22c55e]">
                          <Check className="size-3" strokeWidth={3} />
                          Verified
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-[13.5px] text-[#a0a0ab]">
                      {company.industry}
                    </p>
                  </div>
                </div>

                <Button
                  nativeButton={false}
                  render={
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                    />
                  }
                  variant="outline"
                  className="h-10 w-fit rounded-lg border-white/[0.09] bg-white/[0.03] px-4 text-[12.5px] text-[#ededef] hover:bg-white/[0.06]"
                >
                  <Globe className="size-3.5" />
                  Visit website
                </Button>
              </div>

              <div className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-[12.5px] text-[#8f8f99]">
                <span className="flex items-center gap-2">
                  <MapPin className="size-3.5 text-[#6e6e78]" />
                  {company.location}
                </span>
                <span className="flex items-center gap-2">
                  <Users className="size-3.5 text-[#6e6e78]" />
                  {company.size}
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-[#22c55e]" />
                  {openings.length} open{" "}
                  {openings.length === 1 ? "role" : "roles"}
                </span>
              </div>

              <p className="mt-6 max-w-[760px] text-[13.5px] leading-[1.7] text-[#a0a0ab]">
                {company.about}
              </p>
            </div>
          </div>

          <section className="mt-10" aria-labelledby="open-roles-heading">
            <h2
              id="open-roles-heading"
              className="text-[22px] font-medium tracking-[-0.035em] text-[#ededef]"
            >
              Open roles
            </h2>

            {openings.length > 0 ? (
              <div className="mt-5 grid gap-3 xl:grid-cols-2">
                {openings.map((job) => (
                  <JobListCard
                    key={job.id}
                    job={toJobSummary(job)}
                  />
                ))}
              </div>
            ) : (
              <p className="mt-4 rounded-[14px] border border-white/[0.06] bg-[#0a0a0c] px-6 py-10 text-center text-[13.5px] text-[#8f8f99]">
                No open roles right now. Check back soon.
              </p>
            )}
          </section>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
