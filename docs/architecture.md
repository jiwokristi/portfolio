# Project Architecture

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.0 (App Router, Turbopack) |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS 4 with custom `@theme` tokens |
| Animation | GSAP 3.14 + ScrollTrigger |
| Theming | next-themes (dark/light/system) |
| Components | CVA (class-variance-authority) |
| Fonts | Inter (sans), JetBrains Mono (mono) via Next.js Font API |

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── layout.tsx          # Root layout (ThemeProvider, Header, Footer)
│   ├── page.tsx            # Home page
│   ├── globals.css         # Design tokens, dark mode, print styles
│   ├── sitemap.ts          # Dynamic sitemap generation
│   ├── robots.ts           # Robots.txt metadata
│   ├── not-found.tsx       # 404 page
│   ├── about/page.tsx      # About page
│   ├── resume/page.tsx     # Resume page
│   └── projects/[slug]/
│       ├── page.tsx        # Dynamic case study pages
│       └── opengraph-image.tsx
├── components/
│   ├── ui/                 # Reusable primitives (Button, Badge, Container)
│   ├── layout/             # Header, Footer
│   ├── theme/              # ThemeProvider, ThemeSwitcher, ThemeIcons
│   ├── home/               # HeroSection, ProjectGrid, ProjectCard
│   ├── about/              # AboutHero, Philosophy, Evidence, Stack, Values, Cta
│   ├── case-study/         # CsHero, Overview, Metrics, Process, Features, Results, Navigation
│   └── resume/             # ResumeDocument
├── data/
│   ├── projects.ts         # ProjectSummary[] for the grid
│   ├── projects/           # Full CaseStudy objects per project
│   ├── about.ts            # About page data
│   └── resume.ts           # Resume data (experience, education, skills)
├── hooks/
│   ├── use-counter.ts      # Animated number counter
│   └── use-reduced-motion.ts  # Accessibility motion preference
├── lib/
│   ├── fonts.ts            # Font configuration
│   ├── gsap.ts             # GSAP + ScrollTrigger setup
│   ├── utils.ts            # cn() utility (clsx + tailwind-merge)
│   └── projects.ts         # Project data loaders
└── types/
    └── project.ts          # TypeScript interfaces
```

## Routes

| Route | File | Type | Metadata Title |
|---|---|---|---|
| `/` | `app/page.tsx` | Server | `Jiwo Kristi \| Portfolio` |
| `/about` | `app/about/page.tsx` | Server | `About` |
| `/resume` | `app/resume/page.tsx` | Server | `Resume` |
| `/projects/[slug]` | `app/projects/[slug]/page.tsx` | Server | Dynamic (project title) |

All pages use the title template `%s | Jiwo Kristi` defined in the root layout.

## Server vs Client Components

**Server components** (default) are used for pages and static content sections:
- All `page.tsx` files
- HeroSection, CsOverview, CsResults, CsNavigation, AboutCta, Footer

**Client components** (`'use client'`) are used when needed for:
- GSAP animations (ProjectGrid, CsHero, CsProcess, CsFeatures, AboutHero, AboutPhilosophy, AboutStack, AboutValues, AboutEvidence)
- Browser APIs (ThemeSwitcher, ResumeDocument)
- React hooks (useCounter, useReducedMotion)

This split minimizes client-side JavaScript while enabling rich animations where needed.

## Data Flow

```
src/data/projects/apex-peptides.ts  →  src/lib/projects.ts  →  page.tsx  →  CaseStudy components
src/data/projects.ts                →  page.tsx             →  ProjectGrid → ProjectCard
src/data/about.ts                   →  page.tsx             →  About components
src/data/resume.ts                  →  page.tsx             →  ResumeDocument
```

Projects are loaded via `src/lib/projects.ts` which provides:
- `getProject(slug)` — async, uses dynamic imports for lazy loading
- `getAllProjects()` — returns sorted `ProjectSummary[]`
- `getAllSlugs()` — returns slug strings for `generateStaticParams()`

## SEO

- **Sitemap**: Dynamically generated at `/sitemap.xml` including all pages and project slugs
- **Robots**: Allows all crawlers, points to sitemap
- **OpenGraph**: Per-project OG image generation via edge runtime (`opengraph-image.tsx`)
- **Metadata**: Page-level overrides with root template fallback
