import {
  Bookmark,
  BriefcaseBusiness,
  Building2,
  ChartColumn,
  ChartLine,
  Crown,
  FileUser,
  Hexagon,
  MousePointerClick,
  Search,
  Star,
  TrendingUp,
  UserRoundSearch,
  Zap,
} from "lucide-react"

import type {
  Feature,
  FooterColumn,
  Job,
  NavLink,
  Plan,
  Stat,
} from "@/lib/types/site"

export const navLinks: NavLink[] = [
  { label: "Browse Jobs", href: "/jobs" },
  { label: "Company", href: "/companies" },
  { label: "Pricing", href: "/pricing" },
]

export const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

export const stats: Stat[] = [
  { value: "50K", label: "Active Jobs", icon: BriefcaseBusiness },
  { value: "12K", label: "Companies", icon: ChartColumn },
  { value: "2M", label: "Job Seekers", icon: UserRoundSearch },
  { value: "97%", label: "Satisfaction Rate", icon: Star },
]

const jobDescription =
  "Showcase your commitment to diversity and inclusion by highlighting initiatives"

export const jobs: Job[] = Array.from({ length: 6 }, (_, index) => ({
  id: `frontend-developer-${index + 1}`,
  title: "Frontend Developer",
  description: jobDescription,
  location: "New York, USA",
  workplace: "Hybrid",
  salary: "€25–€40/hour",
}))

export const features: Feature[] = [
  {
    title: "Smart Search",
    description: "Find your ideal job with advanced filters.",
    icon: Search,
  },
  {
    title: "Salary Insights",
    description: "Get real salary data to negotiate confidently.",
    icon: ChartLine,
  },
  {
    title: "Top Companies",
    description: "Apply to vetted companies that are hiring.",
    icon: Building2,
  },
  {
    title: "Saved Jobs",
    description: "Manage apps & favorites on your dashboard.",
    icon: Bookmark,
  },
  {
    title: "One-Click Apply",
    description: "Simplify your job applications for an easier process!",
    icon: MousePointerClick,
  },
  {
    title: "Resume Builder",
    description: "Create professional resumes with modern templates.",
    icon: FileUser,
  },
  {
    title: "Skill-Based Matching",
    description: "Discover jobs that match your skills and experience.",
    icon: Hexagon,
  },
  {
    title: "Career Growth Resources",
    description: "Boost your career with quick interview tips.",
    icon: TrendingUp,
  },
]

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    icon: Crown,
    monthlyPrice: 0,
    yearlyPrice: 0,
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
    icon: ChartColumn,
    monthlyPrice: 17,
    yearlyPrice: 13,
    featured: true,
    features: [
      "Daily AI match brief (top 5)",
      "Verified salary bands",
      "Company insight dashboards",
      "1-click apply, unlimited",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    icon: Zap,
    monthlyPrice: 99,
    yearlyPrice: 74,
    features: [
      "Everything in Pro",
      "Multi-profile career portfolios",
      "Shared talent rooms",
      "Recruiter view (read-only)",
    ],
  },
]

export const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "Job discovery", href: "/jobs" },
      { label: "Worker AI", href: "/#features" },
      { label: "Companies", href: "/companies" },
      { label: "Salary data", href: "/jobs" },
    ],
  },
  {
    title: "Navigations",
    links: [
      { label: "Help center", href: "mailto:support@hireloop.com" },
      { label: "Career library", href: "/#features" },
      { label: "Contact", href: "mailto:hello@hireloop.com" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Brand Guideline", href: "/#features" },
      { label: "Newsroom", href: "/#features" },
    ],
  },
]
