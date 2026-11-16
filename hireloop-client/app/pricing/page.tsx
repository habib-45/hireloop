import type { Metadata } from "next"

import { PricingContent } from "@/app/pricing/_components/pricing-content"
import { SiteFooter } from "@/components/site-footer"
import { SiteNavbar } from "@/components/site-navbar"

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Simple plans for job seekers and recruiters. Start free on HireLoop, then upgrade for more applications, visibility and hiring tools.",
}

export default function PricingPage() {
  return (
    <div className="relative min-h-svh overflow-x-clip bg-[#050506]">
      <SiteNavbar compact />
      <main className="pt-[104px] pb-28">
        <div className="container-page">
          <PricingContent />
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
