"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"

import { cn } from "@/lib/utils"

import { useAuth } from "@/components/auth-provider"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { UserMenu } from "@/components/user-menu"
import { navLinks } from "@/lib/site-content"

type SiteNavbarProps = {
  compact?: boolean
}

export function SiteNavbar({ compact = false }: SiteNavbarProps) {
  const [open, setOpen] = useState(false)
  const { user, status } = useAuth()

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 pt-4",
        !compact && "lg:pt-[52px]"
      )}
    >
      <div
        className={cn(
          "mx-auto w-full px-4",
          compact ? "max-w-[1280px]" : "max-w-[1350px]"
        )}
      >
        <div
          className={cn(
            "flex h-[68px] items-center justify-between gap-6 rounded-[18px] border border-white/[0.07] bg-[linear-gradient(180deg,rgba(22,22,25,0.92),rgba(10,10,12,0.88))] px-4 shadow-[0_12px_50px_-12px_rgba(0,0,0,0.8)] backdrop-blur-xl",
            !compact && "lg:h-[78px]"
          )}
        >
          <Logo
            className={cn(
              compact ? "text-[34px]" : "text-[40px] lg:text-[50px]"
            )}
          />

          <nav
            className="ml-auto hidden items-center gap-8 lg:flex xl:gap-10"
            aria-label="Main"
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-white/80 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-6 lg:ml-16 lg:flex xl:ml-20">
            <span aria-hidden className="h-6 w-px bg-white/12" />
            {status === "loading" ? (
              <div
                aria-hidden
                className="h-[42px] w-[172px] animate-pulse rounded-[10px] bg-white/[0.04]"
              />
            ) : user ? (
              <UserMenu />
            ) : (
              <>
                <Link
                  href="/sign-in"
                  className="text-[15px] font-medium text-[#8a82ff] transition-colors duration-200 hover:text-white"
                >
                  Sign In
                </Link>
                <Button
                  nativeButton={false}
                  render={<Link href="/sign-up" />}
                  className="h-[42px] rounded-[10px] bg-[linear-gradient(180deg,#6d63ff,#554bff)] px-6 text-[14.5px] font-medium text-white shadow-[0_0_28px_-4px_rgba(92,83,254,0.65)] transition-all duration-200 hover:bg-[#6d65ff] hover:shadow-[0_0_34px_-4px_rgba(92,83,254,0.85)]"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-lg"
                  className="rounded-xl border border-white/8 bg-white/4 text-white hover:bg-white/8 lg:hidden"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[88vw] max-w-sm gap-0 border-white/8 bg-[#08080a]/98 px-6 backdrop-blur-2xl"
            >
              <SheetHeader className="px-0 pt-2">
                <SheetTitle className="sr-only">Navigation</SheetTitle>
                <SheetDescription className="sr-only">
                  Browse sections of the HireLoop website
                </SheetDescription>
                <Logo className="text-[34px]" />
              </SheetHeader>

              <nav
                className="mt-10 flex flex-col gap-1"
                aria-label="Mobile navigation"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3.5 text-[16px] font-medium text-white/75 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto flex flex-col gap-3 border-t border-white/8 pt-6">
                {status === "loading" ? (
                  <div className="space-y-3">
                    <div
                      aria-hidden
                      className="h-12 animate-pulse rounded-xl bg-white/[0.04]"
                    />
                    <div
                      aria-hidden
                      className="h-12 animate-pulse rounded-xl bg-white/[0.04]"
                    />
                  </div>
                ) : user ? (
                  <UserMenu variant="mobile" onSignOut={() => setOpen(false)} />
                ) : (
                  <>
                    <Button
                      nativeButton={false}
                      render={
                        <Link href="/sign-in" onClick={() => setOpen(false)} />
                      }
                      variant="outline"
                      className="h-12 rounded-xl border-white/10 bg-transparent text-[15px] text-white hover:bg-white/5"
                    >
                      Sign In
                    </Button>
                    <Button
                      nativeButton={false}
                      render={
                        <Link href="/sign-up" onClick={() => setOpen(false)} />
                      }
                      className="h-12 rounded-xl bg-[#5c53fe] text-[15px] font-medium text-white hover:bg-[#6d65ff]"
                    >
                      Get Started
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
