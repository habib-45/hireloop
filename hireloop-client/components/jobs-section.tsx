import Link from "next/link"

import { JobCard } from "@/app/components/JobCard"
import { SectionLabel } from "@/components/section-label"
import { Button } from "@/components/ui/button"
import { jobs } from "@/lib/site-content"

export function JobsSection() {
  return (
    <section
      id="jobs"
      aria-labelledby="jobs-heading"
      className="scroll-mt-28 bg-[#050506] py-24 sm:py-28 lg:pt-[228px] lg:pb-32"
    >
      <div className="container-page">
        <SectionLabel>Smart Job Discovery</SectionLabel>

        <h2
          id="jobs-heading"
          className="mx-auto mt-6 max-w-[900px] text-center text-[2.4rem] leading-[1.02] font-medium tracking-[-0.06em] text-balance text-white sm:text-[3rem] lg:text-[3.25rem]"
        >
          The roles you&apos;d never
          <br className="hidden sm:block" /> find by searching
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button
            nativeButton={false}
            render={<Link href="/jobs" />}
            className="h-[54px] rounded-[12px] bg-white px-7 text-[15px] font-medium text-[#09090a] hover:bg-white/90"
          >
            View all job open
          </Button>
        </div>
      </div>
    </section>
  )
}
