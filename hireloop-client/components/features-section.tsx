import { FeatureItem } from "@/app/components/FeatureItem"
import { SectionLabel } from "@/components/section-label"
import { features } from "@/lib/site-content"

export function FeaturesSection() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="scroll-mt-28 bg-[#151516] py-24 sm:py-28 lg:pt-[125px] lg:pb-[132px]"
    >
      <div className="container-page">
        <SectionLabel>Features Job</SectionLabel>

        <h2
          id="features-heading"
          className="mx-auto mt-6 max-w-[900px] text-center text-[2.4rem] leading-[1.02] font-medium tracking-[-0.06em] text-balance text-white sm:text-[3rem] lg:text-[3.25rem]"
        >
          Everything you need
          <br className="hidden sm:block" /> to succeed
        </h2>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-14 lg:mt-16 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-12">
          {features.map((feature) => (
            <FeatureItem key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
