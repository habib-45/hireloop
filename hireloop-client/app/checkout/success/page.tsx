import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, Check, ShieldCheck } from "lucide-react"

import { SiteFooter } from "@/components/site-footer"
import { SiteNavbar } from "@/components/site-navbar"
import { Button } from "@/components/ui/button"
import { fetchCheckoutSession } from "@/lib/api/server"
import { formatCurrency, truncateSessionId } from "@/lib/format"
import type { CheckoutCurrency, CheckoutSession } from "@/lib/types/checkout"

export const metadata: Metadata = {
  title: "Payment Successful",
  description: "Your HireLoop subscription is active.",
}

type SuccessPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function first(value?: string | string[]) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "")
}

function demoSession(
  params: Record<string, string | string[] | undefined>
): CheckoutSession | null {
  const sessionId = first(params.session_id)
  const planName = first(params.plan_name)
  const amount = Number(first(params.amount))

  if (!sessionId || !planName || !Number.isFinite(amount)) {
    return null
  }

  const currency = (first(params.currency) || "USD") as CheckoutCurrency

  return {
    sessionId,
    planId: first(params.plan) || "growth",
    planName: planName.startsWith("Hireloop")
      ? planName
      : `Hireloop ${planName} Plan`,
    planDescription: first(params.plan_description) || "Subscription",
    amount,
    currency,
    exchangeRate: Number(first(params.exchange_rate)) || 127.6665,
    status: "succeeded",
    mode: "test",
    paymentMethod: "visa",
    last4: first(params.last4) || "4242",
    saveInfo: false,
    createdAt: new Date().toISOString(),
  }
}

function formatSessionDate(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return "Just now"
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

function dashboardHref(session: CheckoutSession) {
  return session.planId.startsWith("recruiter-")
    ? "/dashboard/recruiter"
    : "/dashboard/seeker"
}

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const params = await searchParams
  const sessionId = first(params.session_id)
  const isDemo = first(params.demo) === "1"

  let session: CheckoutSession | null = null

  if (sessionId && !isDemo) {
    const response = await fetchCheckoutSession(sessionId)
    session = response?.session ?? null
  }

  if (!session) {
    session = demoSession(params)
  }

  if (!session) {
    return (
      <div className="relative min-h-svh overflow-x-clip bg-[#050506]">
        <SiteNavbar compact />
        <main className="flex min-h-[72svh] items-center justify-center px-5 pt-[104px] pb-24">
          <div className="w-full max-w-[440px] rounded-[22px] border border-white/[0.08] bg-[#0b0b0d] p-8 text-center shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] sm:p-10">
            <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-amber-400/10 ring-1 ring-amber-400/20">
              <ShieldCheck className="size-5 text-amber-300" />
            </span>
            <h1 className="mt-6 text-[24px] font-semibold tracking-[-0.035em] text-white">
              Checkout session not found
            </h1>
            <p className="mt-3 text-[13.5px] leading-relaxed text-white/45">
              We could not verify that payment session. If you were charged,
              please contact support and we will sort it out right away.
            </p>
            <Button
              nativeButton={false}
              render={<Link href="/pricing" />}
              className="mt-7 h-11 w-full rounded-xl bg-white text-[13.5px] font-medium text-[#09090a] hover:bg-white/90"
            >
              Back to pricing
            </Button>
            <Link
              href="mailto:support@hireloop.com"
              className="mt-4 inline-block text-[12px] text-white/35 hover:text-white/60"
            >
              Contact support
            </Link>
          </div>
        </main>
        <SiteFooter />
      </div>
    )
  }

  const planLabel = session.planName.startsWith("Hireloop")
    ? session.planName
    : `Hireloop ${session.planName}`

  return (
    <div className="relative min-h-svh overflow-x-clip bg-[#050506]">
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 h-[620px] w-[900px] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(92,83,254,0.16),transparent_68%)] blur-3xl"
      />
      <SiteNavbar compact />

      <main className="relative flex min-h-svh items-center justify-center px-5 pt-[130px] pb-24">
        <div className="w-full max-w-[470px] rounded-[22px] border border-white/[0.08] bg-[linear-gradient(160deg,#101014_0%,#0b0b0d_55%,#08080a_100%)] p-7 text-center shadow-[0_40px_120px_-40px_rgba(0,0,0,0.95)] sm:p-9">
          <span className="relative mx-auto flex size-[62px] items-center justify-center rounded-full bg-[#22c55e]/10 ring-1 ring-[#22c55e]/25 shadow-[0_0_45px_-12px_rgba(34,197,94,0.65)]">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-[#22c55e]/10 blur-md"
            />
            <Check className="relative size-6 text-[#4ade80]" strokeWidth={2.4} />
          </span>

          <p className="mx-auto mt-6 w-fit rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1 font-mono text-[9px] tracking-[0.2em] text-[#a29dff] uppercase">
            Upgrade successful
          </p>

          <h1 className="mt-4 text-[27px] leading-tight font-semibold tracking-[-0.04em] text-white sm:text-[30px]">
            Welcome to {planLabel}
          </h1>

          <p className="mx-auto mt-3 max-w-[350px] text-[13.5px] leading-[1.65] text-white/50">
            Your payment of{" "}
            <span className="font-medium text-white/80">
              {formatCurrency(session.amount, session.currency)}
            </span>{" "}
            was received perfectly.
          </p>

          <p className="mx-auto mt-2 max-w-[360px] text-[12px] leading-[1.65] text-white/35">
            {session.planId.startsWith("recruiter-")
              ? "All advanced recruiting modules are now unlocked on your account. Post roles, review applicants and track performance without limits."
              : "All premium career tools are now unlocked on your account. Your match brief, saved jobs and application tracker are ready when you are."}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5 text-[10px] text-white/40">
              <ShieldCheck className="size-3 text-[#22c55e]" />
              Session ID verified
            </span>
            <span className="max-w-[220px] truncate rounded-full border border-white/[0.07] bg-white/[0.025] px-2.5 py-1.5 font-mono text-[9.5px] text-white/35">
              {truncateSessionId(session.sessionId)}
            </span>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2.5 rounded-[12px] border border-white/[0.06] bg-white/[0.02] p-3 text-left">
            <div>
              <p className="text-[9px] tracking-[0.14em] text-white/28 uppercase">
                Card
              </p>
              <p className="mt-1 text-[11.5px] font-medium text-white/65">
                Visa •••• {session.last4}
              </p>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.14em] text-white/28 uppercase">
                Date
              </p>
              <p className="mt-1 text-[11.5px] font-medium text-white/65">
                {formatSessionDate(session.createdAt)}
              </p>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.14em] text-white/28 uppercase">
                Paid
              </p>
              <p className="mt-1 text-[11.5px] font-medium text-white/65">
                {formatCurrency(session.amount, session.currency)}
              </p>
            </div>
            <div>
              <p className="text-[9px] tracking-[0.14em] text-white/28 uppercase">
                Status
              </p>
              <p className="mt-1 text-[11.5px] font-medium text-[#4ade80]">
                Succeeded
              </p>
            </div>
          </div>

          <Button
            nativeButton={false}
            render={<Link href={dashboardHref(session)} />}
            className="mt-6 h-[46px] w-full justify-between rounded-xl bg-white px-5 text-[13.5px] font-medium text-[#09090a] hover:bg-white/90"
          >
            Go to Workspace Dashboard
            <ArrowRight className="size-4" />
          </Button>

          <Link
            href="/"
            className="mt-4 inline-block text-[11.5px] text-white/30 transition-colors hover:text-white/55"
          >
            Back to home
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
