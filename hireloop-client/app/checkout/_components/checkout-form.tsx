"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Check,
  ChevronDown,
  CreditCard,
  LoaderCircle,
  Lock,
} from "lucide-react"

import { useAuth } from "@/components/auth-provider"
import { ApiError } from "@/lib/api/client"
import { createCheckoutSession } from "@/lib/api/checkout"
import {
  exchangeRate,
  getPlanAmount,
  getPlanPrice,
  isDemoPlan,
  type PricingPlan,
} from "@/lib/data/pricing"
import { formatCurrency } from "@/lib/format"
import { cn } from "@/lib/utils"
import type { CheckoutCurrency, CheckoutSession } from "@/lib/types/checkout"
import type { Billing } from "@/lib/types/site"

const countries = [
  "Bangladesh",
  "United States",
  "United Kingdom",
  "Canada",
  "India",
  "Germany",
  "Australia",
  "Singapore",
  "United Arab Emirates",
]

const currencies: {
  value: CheckoutCurrency
  label: string
  flag: string
  prefix: string
}[] = [
  { value: "BDT", label: "BDT", flag: "🇧🇩", prefix: "৳" },
  { value: "USD", label: "$", flag: "🇺🇸", prefix: "$" },
]

function digitsOnly(value: string) {
  return value.replace(/\D/g, "")
}

function formatCardNumber(value: string) {
  return digitsOnly(value)
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, "$1 ")
    .trim()
}

function formatExpiry(value: string) {
  const digits = digitsOnly(value).slice(0, 4)

  if (digits.length <= 2) {
    return digits
  }

  return `${digits.slice(0, 2)}/${digits.slice(2)}`
}

function makeDemoSessionId() {
  const suffix = Math.random().toString(36).slice(2, 12)
  return `cs_test_demo_${suffix}`
}

type CheckoutFormProps = {
  plan: PricingPlan
  billing: Billing
}

export function CheckoutForm({ plan, billing }: CheckoutFormProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [currency, setCurrency] = useState<CheckoutCurrency>("BDT")
  const [email, setEmail] = useState(user?.email ?? "")
  const [cardNumber, setCardNumber] = useState("")
  const [expiry, setExpiry] = useState("")
  const [cvc, setCvc] = useState("")
  const [cardholder, setCardholder] = useState(user?.name ?? "")
  const [country, setCountry] = useState("Bangladesh")
  const [saveInfo, setSaveInfo] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isPaying, setIsPaying] = useState(false)

  const unitPrice = getPlanPrice(plan, billing)
  const amount = getPlanAmount(plan, billing, currency)
  const isFree = unitPrice === 0

  function validate() {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return "Enter a valid email address."
    }

    if (digitsOnly(cardNumber).length !== 16) {
      return "Enter a valid 16-digit card number."
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      return "Enter the card expiry as MM/YY."
    }

    const month = Number(expiry.slice(0, 2))
    if (month < 1 || month > 12) {
      return "That expiry month is not valid."
    }

    if (digitsOnly(cvc).length < 3) {
      return "Enter the 3-digit security code."
    }

    if (cardholder.trim().length < 2) {
      return "Enter the cardholder name."
    }

    return null
  }

  function goToSuccess(session: CheckoutSession) {
    router.push(`/checkout/success?session_id=${encodeURIComponent(session.sessionId)}`)
  }

  function goToDemoSuccess() {
    const params = new URLSearchParams({
      session_id: makeDemoSessionId(),
      demo: "1",
      plan: plan.id,
      plan_name: plan.name,
      plan_description: plan.description,
      amount: amount.toFixed(2),
      currency,
      interval: billing,
      exchange_rate: String(exchangeRate),
      email: email.trim(),
      last4: digitsOnly(cardNumber).slice(-4),
    })

    router.push(`/checkout/success?${params.toString()}`)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isPaying) {
      return
    }

    const validationError = validate()

    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setIsPaying(true)

    if (isDemoPlan(plan.id) || isFree) {
      window.setTimeout(goToDemoSuccess, 650)
      return
    }

    try {
      const { session } = await createCheckoutSession({
        planId: plan.id,
        currency,
        email: email.trim(),
        name: cardholder.trim(),
        country,
        paymentMethod: "pm_card_visa",
        saveInfo,
      })

      goToSuccess(session)
    } catch (submitError) {
      if (submitError instanceof ApiError && submitError.status === 0) {
        window.setTimeout(goToDemoSuccess, 500)
        return
      }

      setError(
        submitError instanceof ApiError
          ? submitError.message
          : "Payment could not be completed. Please try again."
      )
      setIsPaying(false)
    }
  }

  return (
    <div className="min-h-svh bg-[#09090b] text-[#ededef]">
      <header className="flex h-[68px] items-center justify-between border-b border-white/[0.06] px-5 sm:px-8">
        <div className="flex items-center gap-4">
          <Link
            href="/pricing"
            aria-label="Back to pricing"
            className="flex size-8 items-center justify-center rounded-lg text-white/55 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <ArrowLeft className="size-4.5" />
          </Link>
          <span className="flex items-center gap-1.5 text-[12px] text-white/35">
            <Lock aria-hidden className="size-3" />
            Secure checkout
          </span>
        </div>
        <span className="font-mono text-[9px] tracking-[0.22em] text-white/35 uppercase">
          Sandbox
        </span>
      </header>

      <main className="mx-auto w-full max-w-[1010px] px-5 py-10 sm:px-8 sm:py-14">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,480px)] lg:gap-16">
          <section aria-label="Order summary">
            <p className="font-mono text-[9.5px] tracking-[0.18em] text-white/38 uppercase">
              Choose a currency
            </p>

            <div className="mt-3 grid max-w-[330px] grid-cols-2 gap-2.5">
              {currencies.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setCurrency(item.value)}
                  className={cn(
                    "flex h-[44px] items-center gap-2.5 rounded-[7px] border px-3 text-left transition-colors",
                    currency === item.value
                      ? "border-white/80 bg-white/[0.03]"
                      : "border-white/20 bg-transparent hover:border-white/35"
                  )}
                >
                  <span aria-hidden className="text-[15px] leading-none">
                    {item.flag}
                  </span>
                  <span className="text-[11.5px] font-medium text-white/85">
                    {item.label} {amount.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-2 text-[10.5px] text-white/32">
              {currency === "BDT"
                ? `1 USD = ${exchangeRate.toFixed(4)} BDT`
                : "United States Dollar"}
            </p>

            <div className="mt-10 flex items-start justify-between gap-6 border-t border-white/[0.08] pt-6">
              <div>
                <p className="text-[13.5px] font-semibold text-white">
                  Hireloop {plan.name} Plan
                </p>
                <p className="mt-1 text-[11.5px] text-white/38">
                  {plan.description}
                </p>
                <p className="mt-2 text-[10.5px] text-white/30">
                  Billed {billing === "yearly" ? "yearly" : "monthly"} · Cancel
                  anytime
                </p>
              </div>
              <p className="shrink-0 text-[13.5px] font-semibold whitespace-nowrap text-white">
                {formatCurrency(amount, currency)}
              </p>
            </div>

            <div className="mt-6 border-t border-white/[0.08] pt-5">
              <div className="flex items-center justify-between text-[12px]">
                <span className="text-white/45">Total due today</span>
                <span className="font-semibold text-white">
                  {formatCurrency(amount, currency)}
                </span>
              </div>
              {billing === "yearly" ? (
                <p className="mt-1.5 text-[10.5px] text-white/32">
                  ${unitPrice}/month billed annually at ${unitPrice * 12}.
                </p>
              ) : null}
            </div>

            <div className="mt-10 hidden items-center gap-2 text-[10.5px] text-white/28 lg:flex">
              <Lock aria-hidden className="size-3" />
              Payments are encrypted end to end.
            </div>
          </section>

          <section aria-label="Payment details">
            <form onSubmit={handleSubmit} noValidate>
              <div>
                <h1 className="text-[12px] font-semibold text-white/80">
                  Contact information
                </h1>
                <div className="mt-3">
                  <label
                    htmlFor="checkout-email"
                    className="text-[10px] font-medium tracking-[0.08em] text-white/38 uppercase"
                  >
                    Email
                  </label>
                  <input
                    id="checkout-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="email@example.com"
                    className="mt-1.5 h-[40px] w-full rounded-[6px] border border-white/[0.09] bg-[#0e0e11] px-3 text-[12.5px] text-white outline-none placeholder:text-white/22 focus:border-[#5c53fe]/70 focus:ring-2 focus:ring-[#5c53fe]/15"
                  />
                </div>
              </div>

              <div className="mt-7">
                <h2 className="text-[12px] font-semibold text-white/80">
                  Payment method
                </h2>

                <div className="mt-3 rounded-[10px] border border-white/[0.09] bg-[#0c0c0e] p-3.5">
                  <div className="flex items-center gap-2 text-[11.5px] text-white/75">
                    <span className="flex size-6 items-center justify-center rounded-[5px] border border-white/12 bg-white/[0.04]">
                      <CreditCard aria-hidden className="size-3.5" />
                    </span>
                    Card
                  </div>

                  <div className="mt-3.5 space-y-2">
                    <div>
                      <label
                        htmlFor="card-number"
                        className="text-[9px] font-medium tracking-[0.1em] text-white/38 uppercase"
                      >
                        Card information
                      </label>
                      <div className="relative mt-1.5">
                        <input
                          id="card-number"
                          name="cardNumber"
                          inputMode="numeric"
                          autoComplete="cc-number"
                          value={cardNumber}
                          onChange={(event) =>
                            setCardNumber(formatCardNumber(event.target.value))
                          }
                          placeholder="1234 1234 1234 1234"
                          className="h-[38px] w-full rounded-t-[6px] border border-white/[0.1] bg-[#111114] px-3 pr-24 text-[12px] text-white outline-none placeholder:text-white/22 focus:border-[#5c53fe]/70 focus:ring-2 focus:ring-[#5c53fe]/15"
                        />
                        <span className="absolute inset-y-0 right-3 flex items-center gap-1.5">
                          <span className="rounded-[3px] bg-[#1a1b3a] px-1.5 py-0.5 text-[7px] font-bold tracking-wide text-[#9aa2ff]">
                            VISA
                          </span>
                          <span className="flex items-center gap-0.5">
                            <span className="size-2.5 rounded-full bg-[#eb001b]" />
                            <span className="-ml-1 size-2.5 rounded-full bg-[#f79e1b]/90" />
                          </span>
                        </span>
                      </div>
                      <div className="grid grid-cols-2">
                        <input
                          aria-label="Card expiry"
                          name="expiry"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          value={expiry}
                          onChange={(event) =>
                            setExpiry(formatExpiry(event.target.value))
                          }
                          placeholder="MM / YY"
                          className="h-[38px] w-full rounded-bl-[6px] border border-t-0 border-white/[0.1] bg-[#111114] px-3 text-[12px] text-white outline-none placeholder:text-white/22 focus:border-[#5c53fe]/70 focus:ring-2 focus:ring-[#5c53fe]/15"
                        />
                        <div className="relative">
                          <input
                            aria-label="Card security code"
                            name="cvc"
                            inputMode="numeric"
                            autoComplete="cc-csc"
                            value={cvc}
                            onChange={(event) =>
                              setCvc(digitsOnly(event.target.value).slice(0, 4))
                            }
                            placeholder="CVC"
                            className="h-[38px] w-full rounded-br-[6px] border border-t-0 border-l-0 border-white/[0.1] bg-[#111114] px-3 text-[12px] text-white outline-none placeholder:text-white/22 focus:border-[#5c53fe]/70 focus:ring-2 focus:ring-[#5c53fe]/15"
                          />
                          <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                            <CreditCard className="size-3 text-white/25" />
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="cardholder"
                        className="text-[9px] font-medium tracking-[0.1em] text-white/38 uppercase"
                      >
                        Cardholder name
                      </label>
                      <input
                        id="cardholder"
                        name="cardholder"
                        autoComplete="cc-name"
                        value={cardholder}
                        onChange={(event) => setCardholder(event.target.value)}
                        placeholder="Full name on card"
                        className="mt-1.5 h-[38px] w-full rounded-[6px] border border-white/[0.1] bg-[#111114] px-3 text-[12px] text-white outline-none placeholder:text-white/22 focus:border-[#5c53fe]/70 focus:ring-2 focus:ring-[#5c53fe]/15"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="country"
                        className="text-[9px] font-medium tracking-[0.1em] text-white/38 uppercase"
                      >
                        Country or region
                      </label>
                      <div className="relative mt-1.5">
                        <select
                          id="country"
                          name="country"
                          value={country}
                          onChange={(event) => setCountry(event.target.value)}
                          className="h-[38px] w-full appearance-none rounded-[6px] border border-white/[0.1] bg-[#111114] px-3 pr-9 text-[12px] text-white outline-none focus:border-[#5c53fe]/70 focus:ring-2 focus:ring-[#5c53fe]/15"
                        >
                          {countries.map((name) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-3.5 -translate-y-1/2 text-white/30" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <label className="mt-5 flex cursor-pointer items-start gap-2.5 rounded-[7px] border border-white/[0.08] bg-[#0d0d10] px-3 py-3">
                <span
                  className={cn(
                    "mt-0.5 flex size-3.5 shrink-0 items-center justify-center rounded-[3px] border transition-colors",
                    saveInfo
                      ? "border-[#5c53fe] bg-[#5c53fe] text-white"
                      : "border-white/20 bg-transparent"
                  )}
                >
                  {saveInfo ? (
                    <Check aria-hidden className="size-2.5" strokeWidth={3} />
                  ) : null}
                </span>
                <input
                  type="checkbox"
                  checked={saveInfo}
                  onChange={(event) => setSaveInfo(event.target.checked)}
                  className="sr-only"
                />
                <span>
                  <span className="block text-[11px] font-medium text-white/70">
                    Save my information for faster checkout
                  </span>
                  <span className="mt-0.5 block text-[10px] text-white/30">
                    Securely save this card for future payments.
                  </span>
                </span>
              </label>

              {error ? (
                <div
                  role="alert"
                  aria-live="polite"
                  className="mt-4 rounded-[7px] border border-red-400/20 bg-red-400/[0.07] px-3 py-2.5 text-[11.5px] text-red-200"
                >
                  {error}
                </div>
              ) : null}

              <button
                type="submit"
                disabled={isPaying}
                aria-busy={isPaying}
                className="mt-5 flex h-[44px] w-full items-center justify-center gap-2 rounded-[6px] bg-[#0570de] text-[12.5px] font-semibold text-white transition-colors hover:bg-[#0a7aea] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isPaying ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Processing…
                  </>
                ) : (
                  <>Pay {formatCurrency(amount, currency)}</>
                )}
              </button>

              <p className="mt-5 text-center text-[9.5px] text-white/25">
                Powered by <span className="font-semibold text-white/40">Stripe</span>
                <span className="mx-2 text-white/15">|</span>
                <a href="#" className="hover:text-white/45">
                  Terms
                </a>
                <span className="mx-1.5">·</span>
                <a href="#" className="hover:text-white/45">
                  Privacy
                </a>
              </p>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}
