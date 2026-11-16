import type { Metadata } from "next"
import Link from "next/link"
import {
  BadgeCheck,
  Check,
  ChevronRight,
  Headphones,
  Plus,
  ShieldCheck,
} from "lucide-react"

import {
  CardHeader,
  DashboardCard,
  TableHead,
  TableShell,
  Td,
  Th,
} from "@/components/dashboard/primitives"
import { PrintButton } from "@/components/dashboard/print-button"
import { StatusBadge } from "@/components/dashboard/status-badge"
import { Button } from "@/components/ui/button"
import { billingHistory } from "@/lib/dashboard-data"

export const metadata: Metadata = {
  title: "Subscription & Billing",
}

const planFeatures = [
  "Unlimited applications",
  "Priority Candidate Badge",
  "Direct Recruiter Messaging",
]

export default function SeekerBillingPage() {
  return (
    <div className="mx-auto w-full max-w-[1240px]">
      <div>
        <h1 className="text-[25px] leading-tight font-semibold tracking-[-0.03em] text-white">
          Subscription &amp; Billing
        </h1>
        <p className="mt-1.5 text-[11.5px] text-white/35">
          Manage your professional tier features, recurring payments, and
          billing history.
        </p>
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[1.45fr_1fr]">
        <DashboardCard className="p-5">
          <div className="flex items-start justify-between gap-5">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#5c53fe]/20 bg-[#5c53fe]/10 px-2 py-1 text-[9px] font-medium text-[#b9b3ff]">
                <BadgeCheck className="size-3" />
                Current Plan
              </span>
              <h2 className="mt-3 text-[17px] font-semibold tracking-[-0.02em] text-white">
                Professional Tier
              </h2>
              <p className="mt-1 text-[10.5px] text-white/35">
                Unlock global job insights and unlimited applications.
              </p>
            </div>
            <div className="text-right">
              <p className="text-[22px] leading-none font-semibold text-white">
                $29
                <span className="ml-0.5 text-[10px] font-normal text-white/30">
                  /mo
                </span>
              </p>
              <p className="mt-2 text-[9.5px] text-white/30">
                Next billing date:
                <br />
                <span className="text-white/55">Jul 24, 2026</span>
              </p>
            </div>
          </div>

          <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
            {planFeatures.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2 text-[10.5px] text-white/55"
              >
                <span className="flex size-4 items-center justify-center rounded-full bg-[#22c55e]/12">
                  <Check className="size-2.5 text-[#4ade80]" strokeWidth={3} />
                </span>
                {feature}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Button
              nativeButton={false}
              render={<Link href="/pricing" />}
              className="h-[32px] rounded-[6px] bg-white px-3.5 text-[10.5px] font-semibold text-[#0a0a0b] hover:bg-white/90"
            >
              Upgrade Plan
            </Button>
            <Button
              nativeButton={false}
              render={<Link href="/pricing" />}
              variant="outline"
              className="h-[32px] rounded-[6px] border-white/[0.09] bg-transparent px-3.5 text-[10.5px] font-medium text-white/60 hover:bg-white/[0.05] hover:text-white"
            >
              Manage Plan
            </Button>
          </div>
        </DashboardCard>

        <DashboardCard className="p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-[13px] font-semibold text-white/85">
              Payment Method
            </h2>
            <span className="inline-flex items-center gap-1 font-mono text-[8px] tracking-[0.14em] text-white/22 uppercase">
              <ShieldCheck className="size-2.5" />
              Secured by Stripe
            </span>
          </div>

          <div className="relative mt-4 h-[152px] overflow-hidden rounded-[12px] border border-white/[0.1] bg-[linear-gradient(135deg,#2b1554_0%,#4a1d86_44%,#1c1040_100%)] p-4 shadow-[0_18px_50px_-24px_rgba(124,58,237,0.8)]">
            <span
              aria-hidden
              className="absolute -top-10 -right-6 size-40 rounded-full bg-[radial-gradient(circle,rgba(236,72,153,0.55),transparent_68%)] blur-xl"
            />
            <span
              aria-hidden
              className="absolute -bottom-16 left-6 size-44 rounded-full bg-[radial-gradient(circle,rgba(92,83,254,0.6),transparent_70%)] blur-xl"
            />
            <div className="relative flex items-start justify-between">
              <span className="flex h-6 w-8 items-center justify-center rounded-[4px] bg-[linear-gradient(135deg,#f5d78e,#c79a3c)]">
                <span className="h-3 w-4 rounded-[2px] border border-[#8b6a22]/50" />
              </span>
              <span className="text-[13px] font-black tracking-[-0.04em] text-white/90 italic">
                VISA
              </span>
            </div>
            <div className="relative mt-6 flex items-center gap-2">
              {[0, 1, 2, 3].map((index) => (
                <span
                  key={index}
                  className="text-[13px] tracking-[0.16em] text-white/85"
                >
                  ••••
                </span>
              ))}
              <span className="ml-1 text-[12px] tracking-[0.12em] text-white/90">
                4242
              </span>
            </div>
            <div className="relative mt-4 flex items-end justify-between">
              <div>
                <p className="font-mono text-[7px] tracking-[0.16em] text-white/35 uppercase">
                  Card Holder
                </p>
                <p className="mt-1 text-[10px] font-medium tracking-[0.06em] text-white/80 uppercase">
                  Alexander Seeker
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[7px] tracking-[0.16em] text-white/35 uppercase">
                  Expires
                </p>
                <p className="mt-1 text-[10px] text-white/80">12/25</p>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="mt-4 inline-flex items-center gap-1 text-[10px] font-medium text-white/35 transition-colors hover:text-white/65"
          >
            <Plus className="size-3" />
            Add New Payment Method
          </button>
        </DashboardCard>
      </div>

      <DashboardCard className="mt-3">
        <CardHeader
          title="Billing History"
          action={<PrintButton />}
        />
        <TableShell>
          <TableHead>
            <Th className="pl-5">Date</Th>
            <Th>Plan</Th>
            <Th>Amount</Th>
            <Th>Transaction ID</Th>
            <Th>Status</Th>
          </TableHead>
          <tbody>
            {billingHistory.map((payment) => (
              <tr key={payment.id}>
                <Td className="pl-5">{payment.date}</Td>
                <Td className="font-medium text-white/70">{payment.plan}</Td>
                <Td>{payment.amount}</Td>
                <Td className="font-mono text-[10px] text-white/35">
                  {payment.transactionId}
                </Td>
                <Td>
                  <StatusBadge status={payment.status} />
                </Td>
              </tr>
            ))}
          </tbody>
        </TableShell>
      </DashboardCard>

      <div className="mt-3 flex flex-col items-start justify-between gap-4 rounded-[10px] border border-white/[0.06] bg-[#0b0b0d] p-5 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-[7px] border border-white/[0.07] bg-white/[0.035]">
            <Headphones className="size-4 text-[#a49dff]" />
          </span>
          <div>
            <h2 className="text-[13px] font-semibold text-white/85">
              Need help with your invoice?
            </h2>
            <p className="mt-1 max-w-[520px] text-[10.5px] leading-relaxed text-white/32">
              Our support team is available 24/7 to help you resolve any payment
              issues or clarify billing details.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            nativeButton={false}
            render={<a href="mailto:support@hireloop.com" />}
            variant="outline"
            className="h-[30px] rounded-[6px] border-white/[0.09] bg-transparent px-3 text-[10px] font-medium text-white/60 hover:bg-white/[0.05] hover:text-white"
          >
            Contact Support
            <ChevronRight className="size-3" />
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="/pricing" />}
            variant="outline"
            className="h-[30px] rounded-[6px] border-white/[0.09] bg-transparent px-3 text-[10px] font-medium text-white/60 hover:bg-white/[0.05] hover:text-white"
          >
            Read Refund Policy
          </Button>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center justify-between gap-2 border-t border-white/[0.045] pt-4 text-[9px] text-white/22 sm:flex-row">
        <span>© 2026 HireLoop, Inc. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-white/45">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-white/45">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  )
}
