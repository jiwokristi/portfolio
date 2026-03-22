# Component Reference

## UI Primitives

### Button (`src/components/ui/Button.tsx`)

CVA-based button with link support.

| Prop | Type | Default | Options |
|---|---|---|---|
| `variant` | string | `contained` | `contained`, `outlined`, `ghost` |
| `color` | string | `accent` | `default`, `accent` |
| `size` | string | `md` | `xs`, `sm`, `md`, `lg` |
| `href` | string | — | If set, renders as `<Link>` |

### Badge (`src/components/ui/Badge.tsx`)

CVA-based inline badge for labels and tags.

| Prop | Type | Default | Options |
|---|---|---|---|
| `variant` | string | `contained` | `contained`, `outlined` |
| `color` | string | `default` | `default`, `accent`, `success`, `warning`, `error`, `muted`, `subtle` |
| `size` | string | `md` | `xs`, `sm`, `md`, `lg` |

### Container (`src/components/ui/Container.tsx`)

Layout wrapper: `mx-auto w-full max-w-6xl px-6 lg:px-8`. Accepts `className` for overrides via `cn()`.

---

## Layout

### Header (`src/components/layout/Header.tsx`)

Server component. Fixed top navigation bar with backdrop blur.

- Logo link to `/`
- Nav links: Projects (`/#projects`), About, Resume, Contact (mailto)
- ThemeSwitcher with vertical divider separator

### Footer (`src/components/layout/Footer.tsx`)

Server component. Dynamic copyright year, GitHub and LinkedIn links.

---

## Theme

### ThemeProvider (`src/components/theme/ThemeProvider.tsx`)

Client component. Wraps `next-themes` with config: `attribute="class"`, `defaultTheme="system"`, `enableSystem`, `disableTransitionOnChange`.

### ThemeSwitcher (`src/components/theme/ThemeSwitcher.tsx`)

Client component. Dropdown with three options: Light (SunIcon), Dark (MoonIcon), System (MonitorIcon). Active theme highlighted in accent color. Closes on outside click and Escape key. Uses `mounted` state to prevent SSR hydration mismatch.

### ThemeIcons (`src/components/theme/ThemeIcons.tsx`)

Inline SVG icon components: `SunIcon`, `MoonIcon`, `MonitorIcon`. 16x16, stroke-based.

---

## Home

### HeroSection (`src/components/home/HeroSection.tsx`)

Server component. Full-stack Engineer label, display heading, description, two CTA buttons (View Projects, Get in Touch).

### ProjectGrid (`src/components/home/ProjectGrid.tsx`)

Client component. 2-column grid (`md:grid-cols-2`) of ProjectCards. Uses `ScrollTrigger.batch` for staggered fade-in animation. Respects `useReducedMotion()`.

### ProjectCard (`src/components/home/ProjectCard.tsx`)

Server component. Link wrapper to `/projects/[slug]`. Shows hero image with hover scale, category badge, title, description, key metrics, and tech stack badges. Hover effects on border and title color.

---

## About

### AboutHero (`src/components/about/AboutHero.tsx`)

Client component. GSAP `fromTo` stagger animation on `[data-hero-text]` elements. Code-style label, display heading, description, two buttons.

### AboutPhilosophy (`src/components/about/AboutPhilosophy.tsx`)

Client component. 3-column grid of philosophy cards with `ScrollTrigger.batch` animation. Each card: mono label, title, description.

### AboutEvidence (`src/components/about/AboutEvidence.tsx`)

Client component. 2-column layout with text and metrics grid. Uses `useCounter` hook for animated numbers. Contains `MetricCounter` sub-component.

### AboutStack (`src/components/about/AboutStack.tsx`)

Client component. Tech stack categories (frontend, backend, tools) with Badge items. Sticky sidebar note. `ScrollTrigger.batch` animation.

### AboutValues (`src/components/about/AboutValues.tsx`)

Client component. 2-column grid of numbered values. Per-element ScrollTrigger animations. Respects `useReducedMotion()`.

### AboutCta (`src/components/about/AboutCta.tsx`)

Server component. Centered CTA with heading, description, Email and GitHub buttons. `bg-bg-secondary` background.

---

## Case Study

### CsHero (`src/components/case-study/CsHero.tsx`)

Client component. Category badge, title, subtitle with staggered fade-in. Hero image with desktop-only parallax (`yPercent: 15`).

### CsOverview (`src/components/case-study/CsOverview.tsx`)

Server component. 2-column layout: Problem/Solution text on left, sticky metadata sidebar on right (role, timeline, year, tech stack, live URL button).

### CsMetrics (`src/components/case-study/CsMetrics.tsx`)

Client component. 4-column grid of metric cards. Uses `useCounter` for before/after animated counters. Percentage change badge (success/error color). Progress bar visualization.

### CsProcess (`src/components/case-study/CsProcess.tsx`)

Client component. Alternating timeline layout (`lg:grid-cols-2`). Vertical line divider, numbered phase circles. Per-item ScrollTrigger animations.

### CsFeatures (`src/components/case-study/CsFeatures.tsx`)

Client component. 3-column grid of feature cards with `ScrollTrigger.batch`. Title, description, optional tag badges. Hover state on border and title.

### CsResults (`src/components/case-study/CsResults.tsx`)

Server component. Summary text, outcomes list with checkmark icons. Optional "Lessons Learned" section with accent border.

### CsNavigation (`src/components/case-study/CsNavigation.tsx`)

Server component. Previous/Next project links. Null-safe handling for first/last projects.

---

## Resume

### ResumeDocument (`src/components/resume/ResumeDocument.tsx`)

Client component. Full resume layout with GSAP staggered section animation.

Sections:
- **Header**: Name, contact info, LinkedIn/GitHub links
- **Work Experience**: Company, role, location, period, context, bullet highlights with `**bold**` support
- **Education**: Institution, credential, period, highlights
- **Projects**: Name, year, description (with bold parsing), optional URL link
- **Skills**: Inline list with dot separators

Fixed "Download PDF" button (bottom-right, hidden on print). Uses `renderBold()` helper to parse `**text**` into `<strong>` tags.
