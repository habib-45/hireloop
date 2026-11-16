"use client"

import { useState } from "react"

import { PlanCard } from "@/app/components/PlanCard"
import { BillingToggle } from "@/app/components/BillingToggle"
import { SectionLabel } from "@/components/section-label"
import { plans } from "@/lib/site-content"
import type { Billing } from "@/lib/types/site"

export function PricingSection() {
  const [billing, setBilling] = useState<Billing>("monthly")

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="relative scroll-mt-28 overflow-hidden bg-[#050506] pt-24 pb-24 sm:pt-[140px] sm:pb-28 lg:pt-[145px] lg:pb-28"
    >
      <div className="relative container-page">
        <SectionLabel>Pricing</SectionLabel>

        <h2
          id="pricing-heading"
          className="mx-auto mt-6 max-w-[900px] text-center text-[2.4rem] leading-[1.02] font-medium tracking-[-0.06em] text-balance text-white sm:text-[3rem] lg:text-[3.25rem]"
        >
          Pay for the leverage,
          <br className="hidden sm:block" /> not the listings
        </h2>

        <div className="mt-10 flex justify-center lg:mt-16">
          <BillingToggle value={billing} onValueChange={setBilling} />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} billing={billing} />
          ))}
        </div>
      </div>
    </section>
  )
}
