import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "HireLoop — Find Your Dream Job Today",
  description:
    "HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.",
  keywords: [
    "jobs",
    "careers",
    "hiring",
    "remote jobs",
    "tech jobs",
    "HireLoop",
  ],
  openGraph: {
    title: "HireLoop — Find Your Dream Job Today",
    description:
      "HireLoop connects top talent with world-class companies. Browse thousands of curated opportunities and land your next role — faster.",
    type: "website",
    siteName: "HireLoop",
  },
}

export const viewport: Viewport = {
  themeColor: "#050506",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={cn(
        "dark",
        geist.variable,
        fontMono.variable,
        "font-sans antialiased"
      )}
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
