import type { Metadata } from "next"

import { AuthForm } from "@/components/auth-form"

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create a free HireLoop account and let the right roles come to you.",
}

type SignUpPageProps = {
  searchParams: Promise<{ next?: string | string[]; role?: string | string[] }>
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams
  const next = Array.isArray(params.next) ? params.next[0] : params.next

  return <AuthForm mode="sign-up" next={next} />
}
