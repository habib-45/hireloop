"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Eye, EyeOff } from "lucide-react"

import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ApiError, signIn, signUp } from "@/lib/api/auth"

type AuthFormProps = {
  mode: "sign-in" | "sign-up"
  next?: string
}

export function AuthForm({ mode, next }: AuthFormProps) {
  const isSignUp = mode === "sign-up"
  const { user, setUser, status } = useAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const firstName = user?.name.split(/\s+/).filter(Boolean)[0]
  const isSessionLoading = status === "loading"
  const destination =
    next && next.startsWith("/") && !next.startsWith("//")
      ? next
      : isSignUp
        ? "/dashboard/seeker"
        : "/jobs"
  const alternateHref = isSignUp ? "/sign-in" : "/sign-up"
  const alternateQuery = next
    ? `${alternateHref}?next=${encodeURIComponent(next)}`
    : alternateHref

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (isSubmitting || isSessionLoading) {
      return
    }

    setError(null)
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    try {
      const result = isSignUp
        ? await signUp({ name, email, password })
        : await signIn({ email, password })

      setUser(result.user)
      setSubmitted(true)
    } catch (submitError) {
      setError(
        submitError instanceof ApiError
          ? submitError.message
          : "Something went wrong. Please try again."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="w-full max-w-[420px] rounded-[22px] border border-white/[0.08] bg-[#0b0b0d]/92 p-8 text-center shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-10">
        <span className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[#5c53fe]/12 ring-1 ring-[#7c6cf6]/25">
          <Check className="size-6 text-[#a79fff]" strokeWidth={2} />
        </span>
        <h1 className="mt-6 text-[28px] leading-tight font-semibold tracking-[-0.035em] text-white">
          {isSignUp
            ? firstName
              ? `Welcome, ${firstName}`
              : "Welcome to HireLoop"
            : "You're signed in"}
        </h1>
        <p className="mx-auto mt-3 max-w-[300px] text-[14px] leading-[1.65] text-white/45">
          {isSignUp
            ? "Your profile is ready. The first matches start arriving tomorrow morning."
            : "Pick up right where you left off and keep exploring your next role."}
        </p>
        {user ? (
          <p className="mt-4 text-[12px] text-white/30">
            Signed in as {user.email}
          </p>
        ) : null}
        <Button
          nativeButton={false}
          render={<Link href={destination} />}
          className="mt-7 h-12 w-full rounded-xl bg-white text-[14px] font-medium text-[#09090a] hover:bg-white/90"
        >
          {next ? "Continue" : "Go to dashboard"}
        </Button>
        <Link
          href="/"
          className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-white/40 transition-colors hover:text-white/70"
        >
          <ArrowLeft className="size-3.5" />
          Back to home
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-[420px] rounded-[22px] border border-white/[0.08] bg-[#0b0b0d]/92 p-7 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-9">
      <h1 className="text-[28px] leading-tight font-semibold tracking-[-0.035em] text-white sm:text-[30px]">
        {isSignUp ? "Create your free account" : "Welcome back"}
      </h1>
      <p className="mt-2.5 text-[13.5px] leading-[1.6] text-white/45">
        {isSignUp
          ? "Build a profile in three minutes and let the roles come to you."
          : "Sign in to see your matches, saved jobs and applications."}
      </p>

      {error ? (
        <div
          role="alert"
          aria-live="polite"
          className="mt-5 rounded-xl border border-red-400/20 bg-red-400/[0.07] px-3.5 py-3 text-[12.5px] leading-relaxed text-red-200"
        >
          {error}
        </div>
      ) : null}

      <form onSubmit={handleSubmit} method="post" className="mt-7 space-y-4">
        {isSignUp ? (
          <div className="space-y-2">
            <Label
              htmlFor="name"
              className="text-[12.5px] font-medium text-white/70"
            >
              Full name
            </Label>
            <Input
              id="name"
              name="name"
              autoComplete="name"
              required
              placeholder="Ada Lovelace"
              className="h-12 rounded-xl border-white/10 bg-white/[0.035] px-3.5 text-[14px] text-white placeholder:text-white/28 focus-visible:border-[#5c53fe]/60 focus-visible:ring-[#5c53fe]/20"
            />
          </div>
        ) : null}

        <div className="space-y-2">
          <Label
            htmlFor="email"
            className="text-[12.5px] font-medium text-white/70"
          >
            Email address
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="h-12 rounded-xl border-white/10 bg-white/[0.035] px-3.5 text-[14px] text-white placeholder:text-white/28 focus-visible:border-[#5c53fe]/60 focus-visible:ring-[#5c53fe]/20"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="password"
              className="text-[12.5px] font-medium text-white/70"
            >
              Password
            </Label>
            {isSignUp ? null : (
              <a
                href="mailto:support@hireloop.com?subject=Password%20reset"
                className="text-[12px] text-[#9d97ff] transition-colors hover:text-white"
              >
                Forgot password?
              </a>
            )}
          </div>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={isSignUp ? "new-password" : "current-password"}
              required
              minLength={8}
              placeholder={isSignUp ? "At least 8 characters" : "Your password"}
              className="h-12 rounded-xl border-white/10 bg-white/[0.035] px-3.5 pr-11 text-[14px] text-white placeholder:text-white/28 focus-visible:border-[#5c53fe]/60 focus-visible:ring-[#5c53fe]/20"
            />
            <button
              type="button"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-white/35 transition-colors hover:text-white/70"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting || isSessionLoading}
          aria-busy={isSubmitting || isSessionLoading}
          className="mt-2 h-12 w-full rounded-xl bg-[#5c53fe] text-[14px] font-medium text-white shadow-[0_0_30px_-8px_rgba(92,83,254,0.85)] transition-colors hover:bg-[#6d65ff]"
        >
          {isSessionLoading
            ? "Loading..."
            : isSubmitting
              ? isSignUp
                ? "Creating account..."
                : "Signing in..."
              : isSignUp
                ? "Create account"
                : "Sign in"}
        </Button>
      </form>

      <p className="mt-6 text-center text-[13px] text-white/40">
        {isSignUp ? "Already have an account?" : "New to HireLoop?"}{" "}
        <Link
          href={alternateQuery}
          className="font-medium text-[#a29dff] transition-colors hover:text-white"
        >
          {isSignUp ? "Sign in" : "Create an account"}
        </Link>
      </p>

      {isSignUp ? (
        <p className="mt-5 text-center text-[11px] leading-relaxed text-white/25">
          By creating an account you agree to our Terms of Service and Privacy
          Policy.
        </p>
      ) : null}
    </div>
  )
}
