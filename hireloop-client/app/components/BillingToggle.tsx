"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Billing } from "@/lib/types/site"

export function BillingToggle({
  value,
  onValueChange,
}: {
  value: Billing
  onValueChange: (value: Billing) => void
}) {
  return (
    <Tabs
      value={value}
      onValueChange={(nextValue) => onValueChange(nextValue as Billing)}
      className="items-center gap-0"
    >
      <TabsList
        aria-label="Billing period"
        className="group-data-horizontal/tabs:h-[56px] rounded-full border border-white/[0.09] bg-[#0e0e10] p-1.5 shadow-[inset_0_2px_10px_rgba(0,0,0,0.55)]"
      >
        <TabsTrigger
          value="monthly"
          className="h-full rounded-full px-5 text-[14.5px] font-medium text-white/55 transition-colors after:hidden hover:text-white/80 data-active:border-transparent data-active:bg-white data-active:text-[#0a0a0b] data-active:shadow-[0_4px_20px_rgba(255,255,255,0.12)] dark:data-active:border-transparent dark:data-active:bg-white dark:data-active:text-[#0a0a0b] sm:text-[15px]"
        >
          Monthly
        </TabsTrigger>
        <TabsTrigger
          value="yearly"
          className="h-full gap-2 rounded-full px-4 text-[14.5px] font-medium text-white/55 transition-colors after:hidden hover:text-white/80 data-active:border-transparent data-active:bg-[#1c1c20] data-active:text-white dark:data-active:border-transparent dark:data-active:bg-[#1c1c20] dark:data-active:text-white sm:text-[15px]"
        >
          Yearly
          <span className="rounded-full bg-[#d600ff] px-2 py-0.5 font-mono text-[10px] leading-none font-semibold text-white">
            25%
          </span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
