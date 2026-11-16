import type { Metadata } from "next"

import { AuthForm } from "@/components/auth-form"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to HireLoop to see your matches and applications.",
}

type SignInPageProps = {
  searchParams: Promise<{ next?: string | string[] }>
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams
  const next = Array.isArray(params.next) ? params.next[0] : params.next

  return <AuthForm mode="sign-in" next={next} />
}
