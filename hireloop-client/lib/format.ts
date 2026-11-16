import type { CheckoutCurrency } from "@/lib/types/checkout"

export function formatCurrency(amount: number, currency: CheckoutCurrency) {
  const formatted = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)

  return currency === "BDT" ? `BDT ${formatted}` : `$${formatted}`
}

export function formatCount(count: number) {
  if (count >= 1000) {
    const value = count / 1000
    return `${value >= 10 ? Math.round(value) : value.toFixed(1)}k`
  }

  return String(count)
}

export function truncateSessionId(sessionId: string) {
  if (sessionId.length <= 26) {
    return sessionId
  }

  return `${sessionId.slice(0, 23)}...`
}
