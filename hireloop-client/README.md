# HireLoop Client

The HireLoop marketing site and seeker application shell, built with Next.js,
React, Tailwind CSS, and shadcn/ui.

## Project structure

The codebase follows the same conventions as the HireLoop reference app:

```text
app/
  (auth)/                 # Route group for the auth pages
    layout.tsx            # Shared auth shell
    sign-in/page.tsx
    sign-up/page.tsx
  components/             # Page-specific components (PascalCase)
    BillingToggle.tsx
    FeatureItem.tsx
    JobCard.tsx
    PlanCard.tsx
    StatCard.tsx
    StatsGrid.tsx
  globals.css
  layout.tsx
  page.tsx
components/               # Shared site-wide components
  shared/                 # Reusable visual building blocks
  ui/                     # shadcn/ui primitives
  auth-form.tsx
  auth-provider.tsx
  cta-section.tsx
  features-section.tsx
  hero-section.tsx
  jobs-section.tsx
  logo.tsx
  pricing-section.tsx
  section-label.tsx
  site-footer.tsx
  site-navbar.tsx
  social-links.tsx
  theme-provider.tsx
  user-menu.tsx
hooks/                    # Reusable client hooks
lib/
  api/                    # Typed client-side API helpers
  types/                  # Shared domain types
  site-content.ts         # Landing page content
  utils.ts                # `cn` helper
public/                   # Static assets
```

## Auth

The sign-in and sign-up forms call the Express API in
`../backend-side/hireloop-server`. The API URL is configurable with
`NEXT_PUBLIC_API_URL` and defaults to `http://localhost:5000`.

```bash
# Terminal 1
cd ../backend-side/hireloop-server
npm run dev

# Terminal 2
npm run dev
```

The frontend uses `http://localhost:3000` by default so the API cookie remains
same-site. `AuthProvider` loads the current session once, and the navbar switches
between the signed-out CTAs and the user menu. See
`../backend-side/hireloop-server/README.md` for API details and storage options.

## Conventions

- Site-wide sections and layout components live in `components/`.
- Components used by a single page or feature live in `app/components/`.
- Route-specific components belong in a `_components/` folder next to the route.
- shadcn/ui primitives stay in `components/ui/` and are imported with
  `@/components/ui/*`.
- Shared domain types live in `lib/types/`.
- Import from the project root alias, for example
  `@/components/site-navbar` or `@/lib/types/site`.

## Commands

```bash
npm run dev
npm run typecheck
npm run lint
npm run build
```

## Adding shadcn/ui components

```bash
npx shadcn@latest add button
```

UI primitives are placed in `components/ui/`.
