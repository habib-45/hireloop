export type CheckoutCurrency = "USD" | "BDT"

export type Plan = {
  id: string
  name: string
  shortName: string
  description: string
  interval: string
  billingInterval?: "monthly" | "yearly"
  priceUsd: number
  monthlyPriceUsd?: number
  yearlyPriceUsd?: number
  amount: number
  currency: CheckoutCurrency
  checkoutEnabled?: boolean
  popular?: boolean
  features: string[]
}

export type PlansResponse = {
  plans: Plan[]
  exchangeRate: number
}

export type CheckoutSession = {
  sessionId: string
  planId: string
  planName: string
  planDescription: string
  amount: number
  currency: CheckoutCurrency
  exchangeRate: number
  status: string
  mode: "test"
  paymentMethod: "visa"
  last4: string
  saveInfo: boolean
  createdAt: string
}

export type CreateCheckoutInput = {
  planId: string
  currency: CheckoutCurrency
  email: string
  name: string
  country: string
  paymentMethod: "pm_card_visa"
  saveInfo: boolean
}

export type CheckoutResponse = {
  session: CheckoutSession
}

export type CheckoutSessionResponse = {
  session: CheckoutSession
}
