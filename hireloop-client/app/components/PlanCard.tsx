"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { Billing, Plan } from "@/lib/types/site"

export function PlanCard({
  plan,
  billing,
}: {
  plan: Plan
  billing: Billing
}) {
  const Icon = plan.icon
  const price = billing === "monthly" ? plan.monthlyPrice : plan.yearlyPrice
  const href =
    plan.monthlyPrice === 0
      ? "/sign-up"
      : `/checkout?plan=${plan.id}&interval=${billing}`

  return (
    <Card
      className={cn(
        "relative min-h-[450px] gap-0 overflow-hidden rounded-[18px] p-0 ring-1 transition-all duration-300",
        plan.featured
          ? "bg-[linear-gradient(160deg,#17141d_0%,#0e0c12_48%,#08080a_100%)] ring-white/30 shadow-[0_0_70px_-30px_rgba(92,83,254,0.65)]"
          : "bg-[linear-gradient(160deg,#101012_0%,#0a0a0b_54%,#060607_100%)] ring-white/[0.1] hover:ring-white/16",
        plan.featured && "md:col-span-2 lg:col-span-1"
      )}
    >
      {plan.featured ? (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(ellipse_at_top,rgba(108,92,231,0.17),transparent_68%)]"
        />
      ) : null}

      <div className="relative flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.045] ring-1 ring-white/10">
              <Icon
                aria-hidden
                className="size-[17px] text-[#eda6f7]"
                strokeWidth={1.6}
              />
            </span>
            <span className="text-[19px] font-medium tracking-[-0.02em] text-white sm:text-[20px]">
              {plan.name}
            </span>
          </div>

          <div className="flex items-baseline gap-1 whitespace-nowrap">
            <span
              key={`${plan.id}-${billing}`}
              className="animate-[price-in_280ms_ease] text-[34px] leading-none font-semibold tracking-[-0.045em] text-white sm:text-[38px]"
            >
              ${price}
            </span>
            <span className="text-[11px] font-normal text-white/45 sm:text-[11.5px]">
              /month
            </span>
          </div>
        </div>

        <p className="mt-8 text-[14px] font-normal text-white/85 sm:text-[14.5px]">
          Start building your insights hub:
        </p>

        <ul className="mt-4 space-y-3.5">
          {plan.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 text-[13.5px] text-white/58 sm:text-[14.5px]"
            >
              <span className="flex size-5 shrink-0 items-center justify-center rounded-[6px] border border-white/12 bg-white/[0.04]">
                <span
                  aria-hidden
                  className="text-[13px] leading-none text-white/65"
                >
                  +
                </span>
              </span>
              {feature}
            </li>
          ))}
        </ul>

        <Button
          nativeButton={false}
          render={
            <Link
              href={href}
              aria-label={`Choose the ${plan.name} plan`}
            />
          }
          className={cn(
            "mt-auto h-[48px] w-full justify-between rounded-[12px] px-5 text-[14px] font-medium transition-all duration-200 sm:text-[15px]",
            plan.featured
              ? "bg-white text-[#0a0a0b] hover:bg-white/90"
              : "bg-[linear-gradient(180deg,#2a2a2d,#232326)] text-white ring-1 ring-white/8 hover:bg-[#2e2e31]"
          )}
        >
          Choose This Plan
          <ArrowRight aria-hidden className="size-4" />
        </Button>
      </div>
    </Card>
  )
}
