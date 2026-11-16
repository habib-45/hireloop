"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Check,
  ChevronDown,
  Crown,
  ChartColumn,
  Sparkles,
  Zap,
} from "lucide-react"

import { BillingToggle } from "@/app/components/BillingToggle"
import { SectionLabel } from "@/components/section-label"
import { Button } from "@/components/ui/button"
import {
  getPlanPrice,
  pricingFaq,
  pricingPlans,
  type PricingAudience,
  type PricingPlan,
} from "@/lib/data/pricing"
import { cn } from "@/lib/utils"
import type { Billing } from "@/lib/types/site"

const planIcons = [Crown, ChartColumn, Zap]

const audiences: { value: PricingAudience; label: string }[] = [
  { value: "seeker", label: "For Job Seekers" },
  { value: "recruiter", label: "For Recruiters" },
]

function planHref(plan: PricingPlan, billing: Billing) {
  if (plan.monthlyPrice === 0) {
    return plan.audience === "recruiter"
      ? "/sign-up?role=recruiter"
      : "/sign-up"
  }

  return `/checkout?plan=${plan.id}&interval=${billing}`
}

function PlanCard({
  plan,
  billing,
}: {
  plan: PricingPlan
  billing: Billing
}) {
  const Icon = planIcons[pricingPlans[plan.audience].indexOf(plan) % 3]
  const price = getPlanPrice(plan, billing)
  const isFree = plan.monthlyPrice === 0

  return (
    <article
      className={cn(
        "relative flex min-h-[500px] flex-col overflow-hidden rounded-[18px] p-6 ring-1 transition-all duration-300",
        plan.featured
          ? "bg-[linear-gradient(160deg,#17141d_0%,#0e0c12_48%,#08080a_100%)] ring-white/30 shadow-[0_0_70px_-30px_rgba(92,83,254,0.65)]"
          : "bg-[linear-gradient(160deg,#101012_0%,#0a0a0b_54%,#060607_100%)] ring-white/[0.1] hover:ring-white/16"
      )}
    >
      {plan.featured ? (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_top,rgba(108,92,231,0.17),transparent_68%)]"
          />
          <span className="absolute top-5 right-5 rounded-full border border-[#8b85ff]/25 bg-[#5c53fe]/12 px-2.5 py-1 font-mono text-[9px] tracking-[0.18em] text-[#c3bfff] uppercase">
            Popular
          </span>
        </>
      ) : null}

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.045] ring-1 ring-white/10">
              <Icon
                aria-hidden
                className="size-[17px] text-[#eda6f7]"
                strokeWidth={1.6}
              />
            </span>
            <div>
              <span className="text-[20px] font-medium tracking-[-0.02em] text-white">
                {plan.name}
              </span>
              <p className="mt-0.5 text-[12px] text-white/38">
                {plan.description}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-end gap-1.5">
          <span
            key={`${plan.id}-${billing}`}
            className="animate-[price-in_280ms_ease] text-[42px] leading-none font-semibold tracking-[-0.05em] text-white"
          >
            ${price}
          </span>
          <span className="pb-1 text-[12px] text-white/42">
            {isFree ? "/forever" : "/month"}
          </span>
        </div>
        <p className="mt-1.5 h-4 text-[11.5px] text-white/35">
          {isFree
            ? "No credit card required"
            : billing === "yearly"
              ? `Billed $${price * 12} yearly`
              : "Billed monthly, cancel anytime"}
        </p>

        <ul className="mt-7 space-y-3.5">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 text-[13.5px] leading-snug text-white/62"
            >
              <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-[5px] border border-white/12 bg-white/[0.04]">
                <Check
                  aria-hidden
                  className="size-3 text-[#c4c0ff]"
                  strokeWidth={2.4}
                />
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <Button
          nativeButton={false}
          render={<Link href={planHref(plan, billing)} />}
          className={cn(
            "mt-auto h-[48px] w-full justify-between rounded-[12px] px-5 text-[14px] font-medium transition-all duration-200",
            plan.featured
              ? "bg-white text-[#0a0a0b] hover:bg-white/90"
              : "bg-[linear-gradient(180deg,#2a2a2d,#232326)] text-white ring-1 ring-white/8 hover:bg-[#2e2e31]"
          )}
        >
          {isFree ? "Start for free" : "Choose This Plan"}
          <ArrowRight aria-hidden className="size-4" />
        </Button>
      </div>
    </article>
  )
}

function FaqSection() {
  return (
    <section
      aria-labelledby="pricing-faq-heading"
      className="mx-auto mt-28 w-full max-w-[900px]"
    >
      <div className="text-center">
        <SectionLabel>FAQ</SectionLabel>
        <h2
          id="pricing-faq-heading"
          className="mt-5 text-[2rem] leading-[1.08] font-medium tracking-[-0.045em] text-white sm:text-[2.6rem]"
        >
          Questions, answered
        </h2>
      </div>

      <div className="mt-10 divide-y divide-white/[0.07] border-y border-white/[0.07]">
        {pricingFaq.map((item) => (
          <details key={item.question} className="group py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[15px] font-medium text-white/85 transition-colors hover:text-white sm:text-[16px] [&::-webkit-details-marker]:hidden">
              {item.question}
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/45 transition-transform duration-200 group-open:rotate-180">
                <ChevronDown aria-hidden className="size-3.5" />
              </span>
            </summary>
            <p className="max-w-[760px] pb-6 text-[13.5px] leading-[1.75] text-white/45 sm:text-[14px]">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  )
}

export function PricingContent() {
  const [audience, setAudience] = useState<PricingAudience>("seeker")
  const [billing, setBilling] = useState<Billing>("monthly")
  const plans = pricingPlans[audience]

  return (
    <>
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(92,83,254,0.13),transparent_68%)] blur-3xl"
        />

        <div className="relative text-center">
          <SectionLabel>Pricing</SectionLabel>

          <h1 className="mx-auto mt-6 max-w-[900px] text-[2.5rem] leading-[1.02] font-medium tracking-[-0.06em] text-balance text-white sm:text-[3.1rem] lg:text-[3.4rem]">
            Pay for the leverage,
            <br className="hidden sm:block" /> not the listings
          </h1>

          <p className="mx-auto mt-5 max-w-[600px] text-[14.5px] leading-[1.7] text-pretty text-white/48 sm:text-[15.5px]">
            Start free, then upgrade when you need more reach. Every plan is
            built to get you to the next step of your career, faster.
          </p>

          <div
            role="tablist"
            aria-label="Choose audience"
            className="mx-auto mt-10 inline-flex rounded-full border border-white/[0.09] bg-[#0e0e10] p-1.5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.55)]"
          >
            {audiences.map((item) => (
              <button
                key={item.value}
                type="button"
                role="tab"
                aria-selected={audience === item.value}
                onClick={() => setAudience(item.value)}
                className={cn(
                  "h-[42px] rounded-full px-5 text-[13.5px] font-medium transition-all sm:px-6 sm:text-[14px]",
                  audience === item.value
                    ? "bg-white text-[#0a0a0b] shadow-[0_4px_20px_rgba(255,255,255,0.12)]"
                    : "text-white/55 hover:text-white/85"
                )}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-5 flex justify-center">
            <BillingToggle value={billing} onValueChange={setBilling} />
          </div>
        </div>

        <div className="relative mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-7">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} billing={billing} />
          ))}
        </div>

        <p className="mt-7 flex items-center justify-center gap-2 text-center text-[12px] text-white/35">
          <Sparkles aria-hidden className="size-3.5 text-[#9d97ff]" />
          Every plan includes secure payments, instant activation and the
          HireLoop match engine.
        </p>
      </div>

      <FaqSection />

      <section className="relative mt-28 overflow-hidden rounded-[22px] border border-white/[0.07] bg-[linear-gradient(145deg,#111016_0%,#0a0a0c_60%,#070708_100%)] px-6 py-12 text-center sm:px-10 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 -top-24 h-48 bg-[radial-gradient(ellipse_at_center,rgba(92,83,254,0.22),transparent_70%)] blur-2xl"
        />
        <h2 className="relative mx-auto max-w-[620px] text-[1.9rem] leading-[1.08] font-medium tracking-[-0.045em] text-balance text-white sm:text-[2.4rem]">
          Your next role is already looking for you
        </h2>
        <p className="relative mx-auto mt-4 max-w-[520px] text-[14px] leading-[1.65] text-white/45">
          Join 2M+ job seekers using HireLoop to find better work, with less
          noise.
        </p>
        <div className="relative mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            nativeButton={false}
            render={<Link href="/sign-up" />}
            className="h-[48px] w-full rounded-xl bg-white px-7 text-[14px] font-medium text-[#09090a] hover:bg-white/90 sm:w-auto"
          >
            Create a free account
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/jobs" />}
            variant="outline"
            className="h-[48px] w-full rounded-xl border-white/12 bg-transparent px-7 text-[14px] font-medium text-white hover:bg-white/[0.05] sm:w-auto"
          >
            Browse open roles
            <ArrowRight aria-hidden className="size-4" />
          </Button>
        </div>
      </section>
    </>
  )
}
