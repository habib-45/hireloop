import { Logo } from "@/components/logo"
import { SocialLinks } from "@/components/social-links"
import { footerColumns } from "@/lib/site-content"

export function SiteFooter() {
  return (
    <footer className="relative bg-transparent pt-10 pb-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-24"
        style={{
          height: "calc(100% + 6rem)",
          backgroundImage:
            "linear-gradient(180deg, transparent 0px, rgba(5,5,6,0.5) 48px, rgba(5,5,6,0.9) 96px, rgba(5,5,6,0.95) 160px, rgba(5,5,6,0.95) 100%)",
        }}
      />
      <div className="relative container-page">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-[2.9fr_1fr_1fr_1fr] md:gap-x-8 xl:grid-cols-[689px_235px_235px_minmax(0,1fr)] xl:gap-x-0">
          <div className="col-span-2 md:col-span-1">
            <Logo className="text-[36px]" />
            <p className="mt-5 max-w-[300px] text-[14.5px] leading-[1.7] text-white/45">
              The AI-native career platform. Built for people who take their
              work seriously.
            </p>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-[16px] font-medium tracking-[-0.01em] text-[#837aff]">
                {column.title}
              </h3>
              <ul className="mt-5 space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[15px] text-white/50 transition-colors duration-200 hover:text-white/80"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col gap-7 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <SocialLinks />

          <div className="flex flex-col gap-2.5 text-[13.5px] text-white/40 sm:flex-row sm:items-center sm:gap-6 sm:text-[15.5px]">
            <span>Copyright 2024 — Programming Hero</span>
            <a
              href="#"
              className="transition-colors duration-200 hover:text-white/60"
            >
              Terms &amp; Policy - Privacy Guideline
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
