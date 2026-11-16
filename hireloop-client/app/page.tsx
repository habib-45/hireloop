import { CtaSection } from "@/components/cta-section"
import { FeaturesSection } from "@/components/features-section"
import { HeroSection } from "@/components/hero-section"
import { JobsSection } from "@/components/jobs-section"
import { PricingSection } from "@/components/pricing-section"
import { SiteFooter } from "@/components/site-footer"
import { SiteNavbar } from "@/components/site-navbar"

export default function Page() {
  return (
    <div className="relative min-h-svh overflow-x-clip bg-[#050506]">
      <SiteNavbar />
      <main>
        <HeroSection />
        <JobsSection />
        <FeaturesSection />
        <PricingSection />
        <CtaSection />
      </main>
      <SiteFooter />
    </div>
  )
}
