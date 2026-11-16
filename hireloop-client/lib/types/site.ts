import type { LucideIcon } from "lucide-react"

export type NavLink = {
  label: string
  href: string
}

export type Stat = {
  value: string
  label: string
  icon: LucideIcon
}

export type Job = {
  id: string
  title: string
  description: string
  location: string
  workplace: string
  salary: string
}

export type Feature = {
  title: string
  description: string
  icon: LucideIcon
}

export type Billing = "monthly" | "yearly"

export type Plan = {
  id: string
  name: string
  icon: LucideIcon
  monthlyPrice: number
  yearlyPrice: number
  features: string[]
  featured?: boolean
}

export type FooterColumn = {
  title: string
  links: NavLink[]
}
