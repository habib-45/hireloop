import type { Billing } from "@/lib/types/site"

export type PricingAudience = "seeker" | "recruiter"

export type PricingPlan = {
  id: string
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  featured?: boolean
  audience: PricingAudience
  note: string
}

export const exchangeRate = 127.6665

export const seekerPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Start building your insights hub",
    monthlyPrice: 0,
    yearlyPrice: 0,
    audience: "seeker",
    note: "Free forever",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    description: "Everything you need to grow faster",
    monthlyPrice: 17,
    yearlyPrice: 13,
    featured: true,
    audience: "seeker",
    note: "Most popular",
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
      "Application tracking",
      "Weekly career insights",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    description: "For power users who want an edge",
    monthlyPrice: 99,
    yearlyPrice: 79,
    audience: "seeker",
    note: "Full access",
    features: [
      "Everything in Growth",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
      "Priority support",
      "Dedicated career advisor",
    ],
  },
]

export const recruiterPlans: PricingPlan[] = [
  {
    id: "recruiter-starter",
    name: "Starter",
    description: "For a company's first year of hiring",
    monthlyPrice: 0,
    yearlyPrice: 0,
    audience: "recruiter",
    note: "Free forever",
    features: [
      "Up to 3 active job posts",
      "Basic applicant management",
      "Standard listing visibility",
      "Email notifications",
    ],
  },
  {
    id: "recruiter-growth",
    name: "Growth",
    description: "For teams hiring steadily",
    monthlyPrice: 49,
    yearlyPrice: 39,
    featured: true,
    audience: "recruiter",
    note: "Most popular",
    features: [
      "Up to 10 active job posts",
      "Applicant tracking pipeline",
      "Basic analytics",
      "Email support",
      "Team collaboration",
    ],
  },
  {
    id: "recruiter-enterprise",
    name: "Enterprise",
    description: "For high-volume hiring teams",
    monthlyPrice: 149,
    yearlyPrice: 119,
    audience: "recruiter",
    note: "Full access",
    features: [
      "Up to 50 active job posts",
      "Advanced analytics dashboard",
      "Featured job listings",
      "Team collaboration",
      "Custom branding",
      "Priority support",
    ],
  },
]

export const pricingPlans = {
  seeker: seekerPlans,
  recruiter: recruiterPlans,
} satisfies Record<PricingAudience, PricingPlan[]>

const allPlans = [...seekerPlans, ...recruiterPlans]

export function getPricingPlan(id: string) {
  return allPlans.find((plan) => plan.id === id) ?? null
}

export function getPlanPrice(plan: PricingPlan, billing: Billing) {
  return billing === "yearly" ? plan.yearlyPrice : plan.monthlyPrice
}

export function getPlanAmount(
  plan: PricingPlan,
  billing: Billing,
  currency: "USD" | "BDT"
) {
  const price = getPlanPrice(plan, billing)

  return currency === "BDT"
    ? Math.round(price * exchangeRate * 100) / 100
    : price
}

export function isDemoPlan(id: string) {
  return id.startsWith("recruiter-")
}

export const pricingFaq = [
  {
    question: "Can I cancel my subscription at any time?",
    answer:
      "Yes. You can cancel from your billing settings whenever you like. Your plan stays active until the end of the billing period you have already paid for — there are no long-term contracts or cancellation fees.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a 14-day money-back guarantee on your first paid subscription. If HireLoop is not the right fit, contact support within 14 days of your first payment and we will refund it in full.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "We accept all major debit and credit cards, including Visa, Mastercard and American Express. Every payment is processed securely and your card details never touch our servers.",
  },
  {
    question: "Can I switch between monthly and yearly billing?",
    answer:
      "Absolutely. Switch to yearly billing at any time to save 25%. Any unused credit from your current plan is applied to the new billing period automatically.",
  },
  {
    question: "Is there really a free plan?",
    answer:
      "Yes. Starter is free forever and includes the daily AI match brief, verified salary bands and unlimited 1-click applications. No card is required to get started.",
  },
] as const
