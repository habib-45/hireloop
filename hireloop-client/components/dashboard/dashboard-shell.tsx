"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Bell,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  ChevronDown,
  ClipboardList,
  CreditCard,
  FileUser,
  HelpCircle,
  LayoutDashboard,
  LogOut,
  Menu,
  PlusSquare,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Users,
  Wallet,
} from "lucide-react"

import { useAuth } from "@/components/auth-provider"
import { Logo } from "@/components/logo"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export type DashboardRole = "seeker" | "recruiter" | "admin"

type NavItem = {
  label: string
  href: string
  icon: typeof LayoutDashboard
  exact?: boolean
  exclude?: string[]
}

const navItems: Record<DashboardRole, NavItem[]> = {
  seeker: [
    {
      label: "Dashboard",
      href: "/dashboard/seeker",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Jobs",
      href: "/dashboard/seeker/jobs",
      icon: BriefcaseBusiness,
    },
    {
      label: "Saved Jobs",
      href: "/dashboard/seeker/saved",
      icon: Bookmark,
    },
    {
      label: "Applications",
      href: "/dashboard/seeker/applications",
      icon: Send,
    },
    {
      label: "Billing",
      href: "/dashboard/seeker/billing",
      icon: CreditCard,
    },
    {
      label: "Settings",
      href: "/dashboard/seeker/settings",
      icon: Settings,
    },
  ],
  recruiter: [
    {
      label: "Dashboard",
      href: "/dashboard/recruiter",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Add Job",
      href: "/dashboard/recruiter/jobs/new",
      icon: PlusSquare,
      exact: true,
    },
    {
      label: "Manage Jobs",
      href: "/dashboard/recruiter/jobs",
      icon: ClipboardList,
      exclude: ["/dashboard/recruiter/jobs/new"],
    },
    {
      label: "Applications",
      href: "/dashboard/recruiter/applications",
      icon: Users,
    },
    {
      label: "Settings",
      href: "/dashboard/recruiter/settings",
      icon: Settings,
    },
  ],
  admin: [
    {
      label: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    { label: "Users", href: "/dashboard/admin/users", icon: Users },
    {
      label: "Companies",
      href: "/dashboard/admin/companies",
      icon: Building2,
    },
    { label: "Jobs", href: "/dashboard/admin/jobs", icon: BriefcaseBusiness },
    {
      label: "Payments",
      href: "/dashboard/admin/payments",
      icon: Wallet,
    },
    { label: "Settings", href: "/dashboard/admin/settings", icon: Settings },
  ],
}

const roleMeta: Record<
  DashboardRole,
  {
    portal: string
    tier: string
    name: string
    email: string
    bottomRole: string
    search: string
  }
> = {
  seeker: {
    portal: "Seeker Portal",
    tier: "Professional Tier",
    name: "Jane Doe",
    email: "jane.doe@example.com",
    bottomRole: "Job Seeker",
    search: "Search for opportunities...",
  },
  recruiter: {
    portal: "Recruiter",
    tier: "Premium Account",
    name: "Alex Sterling",
    email: "alex.sterling@hireloop.com",
    bottomRole: "Recruiter",
    search: "Search candidates, jobs...",
  },
  admin: {
    portal: "Admin Console",
    tier: "Super Admin",
    name: "Alex Rivera",
    email: "alex.rivera@hireloop.com",
    bottomRole: "Administrator",
    search: "Global search...",
  },
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("")
}

function getSearchPlaceholder(role: DashboardRole, pathname: string) {
  if (role === "seeker") {
    if (pathname.startsWith("/dashboard/seeker/jobs")) {
      return "Search jobs, companies, or skills..."
    }
    if (pathname.startsWith("/dashboard/seeker/saved")) {
      return "Search saved jobs..."
    }
    if (pathname.startsWith("/dashboard/seeker/applications")) {
      return "Search applications..."
    }
    if (pathname.startsWith("/dashboard/seeker/billing")) {
      return "Search invoices or plans..."
    }
    if (pathname.startsWith("/dashboard/seeker/settings")) {
      return "Search settings..."
    }

    return "Search for opportunities..."
  }

  if (role === "recruiter") {
    if (pathname.endsWith("/applicants")) {
      return "Search applicants..."
    }
    if (pathname.startsWith("/dashboard/recruiter/applications")) {
      return "Search candidates..."
    }
    if (pathname.startsWith("/dashboard/recruiter/jobs")) {
      return "Search job posts..."
    }
    if (pathname.startsWith("/dashboard/recruiter/settings")) {
      return "Search settings..."
    }

    return "Search candidates, jobs..."
  }

  if (pathname.startsWith("/dashboard/admin/users")) {
    return "Search by email or name..."
  }
  if (pathname.startsWith("/dashboard/admin/companies")) {
    return "Search companies..."
  }
  if (pathname.startsWith("/dashboard/admin/jobs")) {
    return "Search jobs or companies..."
  }
  if (pathname.startsWith("/dashboard/admin/payments")) {
    return "Search transactions..."
  }
  if (pathname.startsWith("/dashboard/admin/settings")) {
    return "Search settings..."
  }

  return "Global search..."
}

function isActive(pathname: string, item: NavItem) {
  if (item.exclude?.some((path) => pathname === path)) {
    return false
  }

  if (item.exact) {
    return pathname === item.href
  }

  return pathname === item.href || pathname.startsWith(`${item.href}/`)
}

type SidebarContentProps = {
  role: DashboardRole
  onNavigate?: () => void
}

function SidebarContent({ role, onNavigate }: SidebarContentProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const meta = roleMeta[role]
  const name = user?.name?.trim() || meta.name
  const email = user?.email || meta.email
  const items = navItems[role]

  async function handleSignOut() {
    setIsSigningOut(true)

    try {
      await signOut()
      router.push("/")
    } finally {
      setIsSigningOut(false)
    }
  }

  return (
    <div className="flex h-full flex-col bg-[#09090b]">
      <div className="flex h-[68px] items-center px-5">
        <Logo href="/" className="text-[29px]" />
      </div>

      {role === "admin" ? (
        <p className="px-5 pb-3 font-mono text-[9px] tracking-[0.18em] text-white/25 uppercase">
          Admin Console
        </p>
      ) : (
        <div className="mx-3 mb-4 flex items-center gap-2.5 rounded-[9px] border border-white/[0.06] bg-white/[0.025] p-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,#5c53fe,#8b85ff)] text-[10px] font-semibold text-white ring-1 ring-white/15">
            {getInitials(name)}
          </span>
          <div className="min-w-0">
            <p className="truncate text-[10px] text-white/38">{meta.portal}</p>
            <p className="truncate text-[11.5px] font-medium text-white/85">
              {meta.tier}
            </p>
          </div>
        </div>
      )}

      <nav
        aria-label={`${meta.portal} navigation`}
        className="flex-1 space-y-0.5 px-3"
      >
        {items.map((item) => {
          const active = isActive(pathname, item)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "relative flex h-[36px] items-center gap-2.5 rounded-[6px] px-3 text-[12.5px] font-medium transition-colors",
                active
                  ? "bg-white/[0.065] text-white"
                  : "text-white/48 hover:bg-white/[0.035] hover:text-white/80"
              )}
            >
              {active ? (
                <span
                  aria-hidden
                  className="absolute inset-y-2 left-0 w-[2px] rounded-full bg-[#8b85ff]"
                />
              ) : null}
              <Icon
                aria-hidden
                className={cn(
                  "size-[15px] shrink-0",
                  active ? "text-[#b8b2ff]" : "text-white/35"
                )}
                strokeWidth={1.7}
              />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {role === "seeker" ? (
        <div className="px-3 pb-3">
          <Link
            href="/dashboard/seeker/settings"
            onClick={onNavigate}
            className="flex h-[34px] items-center justify-center gap-1.5 rounded-[6px] bg-white text-[11.5px] font-semibold text-[#0a0a0b] transition-colors hover:bg-white/90"
          >
            <FileUser aria-hidden className="size-3.5" />
            Post Resume
          </Link>
        </div>
      ) : null}

      <div className="mt-auto border-t border-white/[0.055] p-3">
        <div className="flex items-center gap-2.5 rounded-[7px] px-1 py-1">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-[7px] bg-[#1c1c22] text-[9.5px] font-semibold text-white/70 ring-1 ring-white/8">
            {getInitials(name)}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[11px] font-medium text-white/80">
              {name}
            </p>
            <p className="truncate text-[9.5px] text-white/32">
              {meta.bottomRole}
            </p>
          </div>
          <button
            type="button"
            onClick={() => void handleSignOut()}
            disabled={isSigningOut}
            aria-label="Sign out"
            title="Sign out"
            className="flex size-7 shrink-0 items-center justify-center rounded-md text-white/30 transition-colors hover:bg-white/[0.06] hover:text-white/70"
          >
            <LogOut className="size-3.5" />
          </button>
        </div>
        <p className="mt-2 truncate px-1 text-[9px] text-white/20">{email}</p>
      </div>
    </div>
  )
}

type DashboardShellProps = {
  role: DashboardRole
  children: React.ReactNode
}

export function DashboardShell({ role, children }: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()
  const { user } = useAuth()
  const meta = roleMeta[role]
  const name = user?.name?.trim() || meta.name
  const initials = getInitials(name)
  const searchPlaceholder = getSearchPlaceholder(role, pathname)

  return (
    <div className="min-h-svh bg-[#08080a] text-[#ededef]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] flex-col border-r border-white/[0.06] lg:flex">
        <SidebarContent role={role} />
      </aside>

      <div className="flex min-h-svh flex-col lg:pl-[248px]">
        <header className="sticky top-0 z-30 flex h-[62px] shrink-0 items-center gap-4 border-b border-white/[0.055] bg-[#08080a]/92 px-4 backdrop-blur-xl lg:px-7">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label="Open dashboard menu"
            className="flex size-9 items-center justify-center rounded-lg border border-white/[0.07] text-white/60 transition-colors hover:bg-white/[0.05] hover:text-white lg:hidden"
          >
            <Menu className="size-4.5" />
          </button>

          <form
            action={
              role === "seeker"
                ? "/jobs"
                : role === "admin"
                  ? "/dashboard/admin/users"
                  : undefined
            }
            className="hidden h-[36px] w-full max-w-[380px] items-center gap-2.5 rounded-[7px] border border-white/[0.07] bg-white/[0.025] px-3.5 sm:flex"
          >
            <Search
              aria-hidden
              className="size-3.5 shrink-0 text-white/30"
              strokeWidth={1.8}
            />
            <input
              name="q"
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="h-full min-w-0 flex-1 bg-transparent text-[11.5px] text-white outline-none placeholder:text-white/28"
            />
            <kbd className="hidden rounded border border-white/[0.08] px-1 py-0.5 font-mono text-[8.5px] text-white/25 md:block">
              ⌘K
            </kbd>
          </form>

          <div className="ml-auto flex items-center gap-1.5">
            {role === "admin" ? (
              <button
                type="button"
                className="mr-2 hidden items-center gap-1.5 text-[11px] font-medium text-white/55 transition-colors hover:text-white sm:flex"
              >
                <ShieldCheck className="size-3.5 text-[#9d97ff]" />
                Admin View
                <ChevronDown className="size-3" />
              </button>
            ) : null}

            <button
              type="button"
              aria-label="Notifications"
              className="relative flex size-8 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/[0.05] hover:text-white"
            >
              <Bell className="size-4" strokeWidth={1.8} />
              <span
                aria-hidden
                className="absolute top-1.5 right-1.5 size-1.5 rounded-full bg-[#8b85ff] ring-2 ring-[#08080a]"
              />
            </button>

            {role !== "admin" ? (
              <button
                type="button"
                aria-label="Messages"
                className="flex size-8 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/[0.05] hover:text-white"
              >
                <Send className="size-4" strokeWidth={1.8} />
              </button>
            ) : null}

            <button
              type="button"
              aria-label="Help"
              className="hidden size-8 items-center justify-center rounded-md text-white/40 transition-colors hover:bg-white/[0.05] hover:text-white sm:flex"
            >
              <HelpCircle className="size-4" strokeWidth={1.8} />
            </button>

            <span className="ml-1 flex size-7 items-center justify-center rounded-full bg-[linear-gradient(145deg,#5c53fe,#8b85ff)] text-[9.5px] font-semibold text-white ring-1 ring-white/15">
              {initials}
            </span>
          </div>
        </header>

        <main className="flex-1 px-4 py-6 lg:px-7 lg:py-7">{children}</main>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent
          side="left"
          showCloseButton={false}
          className="w-[272px] gap-0 border-r border-white/[0.07] bg-[#09090b] p-0"
        >
          <SheetHeader className="sr-only">
            <SheetTitle>{meta.portal}</SheetTitle>
            <SheetDescription>Dashboard navigation</SheetDescription>
          </SheetHeader>
          <SidebarContent
            role={role}
            onNavigate={() => setMobileOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
