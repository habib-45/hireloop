import { HeroGlobe } from "@/components/shared/hero-globe"
import { SearchBar } from "@/components/shared/search-bar"
import { StarField } from "@/components/shared/star-field"
import { StatsGrid } from "@/app/components/StatsGrid"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-[240px] sm:pt-[286px] lg:pt-[313px]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,#29292c_0%,#1b1b1d_8%,#0c0c0e_25%,#050506_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[1100px]"
      >
        <StarField className="h-[1100px]" count={110} />
        <div className="absolute top-[120px] left-1/2 h-[560px] w-[92%] max-w-[980px] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(92,83,254,0.16),transparent_66%)] blur-3xl" />
      </div>
      <div
        aria-hidden
        className="noise-overlay pointer-events-none absolute inset-0"
      />

      <div className="relative z-10 container-page text-center">
        <div className="relative inline-flex items-center">
          <span
            aria-hidden
            className="absolute right-full mr-4 hidden h-px w-14 bg-gradient-to-r from-transparent to-white/20 sm:block lg:w-16"
          />
          <div className="inline-flex items-center gap-3.5 rounded-full border border-white/10 bg-[#0b0b0d]/85 py-3.5 pr-8 pl-4 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md sm:h-[51px] sm:min-w-[412px] sm:justify-center sm:gap-4 sm:py-0">
            <span aria-hidden className="text-[23px] leading-none">
              💼
            </span>
            <span className="text-[13px] font-semibold tracking-[-0.01em] text-white sm:text-[15px]">
              50,000+
            </span>
            <span className="font-mono text-[10px] tracking-[0.24em] text-white/45 uppercase sm:text-[12px] sm:tracking-[0.28em]">
              New jobs this month
            </span>
          </div>
          <span
            aria-hidden
            className="absolute left-full ml-4 hidden h-px w-14 bg-gradient-to-l from-transparent to-white/20 sm:block lg:w-16"
          />
        </div>

        <h1 className="mx-auto mt-5 max-w-[980px] text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.075em] text-balance text-[#f7f7f8] sm:mt-6 sm:text-[3.35rem] lg:mt-[26px] lg:text-[3.84rem]">
          Find Your Dream Job Today
        </h1>

        <p className="mx-auto mt-5 max-w-[700px] text-[15.5px] leading-[1.6] text-pretty text-white/55 sm:mt-6 sm:text-[19px]">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <div className="mt-10 sm:mt-14 lg:mt-10">
          <SearchBar />
        </div>

        <div className="relative mt-[100px] sm:mt-[120px] lg:mt-[141px]">
          <HeroGlobe />

          <div className="relative z-10 pt-[180px] sm:pt-[200px] lg:pt-[213px]">
            <p className="mx-auto max-w-[720px] text-[20px] leading-[1.3] text-balance text-white/80 sm:text-[26px] lg:text-[38px] lg:leading-[1.2]">
              Assisting over 15,000 job seekers
              <br className="hidden sm:block" /> find their dream positions.
            </p>

            <div className="mx-auto mt-10 max-w-[1320px] lg:mt-[47px]">
              <StatsGrid />
            </div>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#050506] via-[#050506]/80 to-transparent"
      />
    </section>
  )
}
