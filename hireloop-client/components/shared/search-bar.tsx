"use client"

import { useState } from "react"
import { LocateFixed, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { trendingPositions } from "@/lib/site-content"

function scrollToJobs() {
  document.getElementById("jobs")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  })
}

export function SearchBar() {
  const [role, setRole] = useState("")
  const [location, setLocation] = useState("")

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    scrollToJobs()
  }

  function pickTrending(position: string) {
    setRole(position)
    scrollToJobs()
  }

  return (
    <div className="mx-auto w-full max-w-[780px]">
      <form
        role="search"
        onSubmit={handleSubmit}
        className="flex flex-col gap-2 rounded-2xl border border-white/[0.09] bg-[#0e0e10]/90 p-2.5 shadow-[0_20px_70px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-xl sm:flex-row sm:items-center sm:rounded-[22px] sm:p-3"
      >
        <div className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:pl-5">
          <Search
            aria-hidden
            className="size-5 shrink-0 text-white/55"
            strokeWidth={1.8}
          />
          <Input
            value={role}
            onChange={(event) => setRole(event.target.value)}
            placeholder="Job title, skill or company"
            aria-label="Job title, skill or company"
            className="h-12 min-w-0 border-0 bg-transparent px-0 text-[15.5px] text-white shadow-none placeholder:text-white/42 focus-visible:border-0 focus-visible:ring-0 sm:h-[56px]"
          />
        </div>

        <span
          aria-hidden
          className="mx-5 hidden h-7 w-px shrink-0 bg-white/12 sm:block"
        />

        <div className="flex min-w-0 flex-1 items-center gap-3 px-3 sm:pl-1">
          <LocateFixed
            aria-hidden
            className="size-5 shrink-0 text-white/55"
            strokeWidth={1.6}
          />
          <Input
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Location or Remote"
            aria-label="Location or Remote"
            className="h-12 min-w-0 border-0 bg-transparent px-0 text-[15.5px] text-white shadow-none placeholder:text-white/42 focus-visible:border-0 focus-visible:ring-0 sm:h-[56px]"
          />
        </div>

        <Button
          type="submit"
          aria-label="Search jobs"
          className="h-12 w-full shrink-0 rounded-[14px] bg-[#5c53fe] text-white shadow-[0_0_30px_-6px_rgba(92,83,254,0.9)] transition-all hover:bg-[#6d65ff] hover:shadow-[0_0_36px_-6px_rgba(92,83,254,1)] sm:size-[56px] sm:w-[56px]"
        >
          <Search className="size-[21px]" strokeWidth={2.1} />
        </Button>
      </form>

      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-2 text-[13.5px]">
        <span className="mr-0.5 text-white/45">Trending Position</span>
        {trendingPositions.map((position) => (
          <button
            key={position}
            type="button"
            onClick={() => pickTrending(position)}
            className="rounded-full border border-white/[0.07] bg-[#141416] px-4 py-1.5 text-[13px] font-medium text-white/75 transition-colors hover:border-white/15 hover:bg-white/[0.08] hover:text-white"
          >
            {position}
          </button>
        ))}
      </div>
    </div>
  )
}
