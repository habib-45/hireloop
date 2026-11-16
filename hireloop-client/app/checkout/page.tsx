import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"

import { CheckoutForm } from "@/app/checkout/_components/checkout-form"
import { Button } from "@/components/ui/button"
import { getPricingPlan } from "@/lib/data/pricing"
import type { Billing } from "@/lib/types/site"

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your HireLoop subscription securely.",
}

type CheckoutPageProps = {
  searchParams: Promise<{
    plan?: string | string[]
    interval?: string | string[]
  }>
}

function first(value?: string | string[]) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "")
}

export default async function CheckoutPage({
  searchParams,
}: CheckoutPageProps) {
  const params = await searchParams
  const requestedPlan = getPricingPlan(first(params.plan))
  const plan = requestedPlan ?? getPricingPlan("growth")
  const billing: Billing =
    first(params.interval) === "yearly" ? "yearly" : "monthly"

  if (!plan) {
    return null
  }

  if (plan.monthlyPrice === 0) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-[#09090b] px-6 text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-[#22c55e]/10 ring-1 ring-[#22c55e]/20">
          <Check className="size-6 text-[#4ade80]" />
        </span>
        <h1 className="mt-6 text-[30px] font-semibold tracking-[-0.035em] text-white">
          {plan.name} is free
        </h1>
        <p className="mt-3 max-w-[380px] text-[14px] leading-relaxed text-white/45">
          No payment needed. Create an account and start using HireLoop right
          away.
        </p>
        <Button
          nativeButton={false}
          render={
            <Link
              href={
                plan.audience === "recruiter"
                  ? "/sign-up?role=recruiter"
                  : "/sign-up"
              }
            />
          }
          className="mt-7 h-12 w-full max-w-[280px] rounded-xl bg-white text-[14px] font-medium text-[#09090a] hover:bg-white/90"
        >
          Create a free account
        </Button>
        <Link
          href="/pricing"
          className="mt-5 inline-flex items-center gap-1.5 text-[12.5px] text-white/40 hover:text-white/70"
        >
          <ArrowLeft className="size-3.5" />
          Back to pricing
        </Link>
      </div>
    )
  }

  return <CheckoutForm plan={plan} billing={billing} />
}
