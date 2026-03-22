# Styling & Theming

## Tailwind CSS v4

This project uses Tailwind CSS v4 with the `@theme` directive in `src/app/globals.css` to define custom design tokens. These tokens generate utility classes automatically (e.g., `bg-bg`, `text-text-primary`, `border-border`).

## Color Palette

Colors are defined in `@theme` (light/default values) and overridden in `.dark` for dark mode.

| Token | Light | Dark |
|---|---|---|
| `bg` | `#ffffff` | `#0a0a0a` |
| `bg-secondary` | `#f5f5f5` | `#141414` |
| `surface` | `#e5e5e5` | `#1a1a1a` |
| `border` | `#d4d4d4` | `#2a2a2a` |
| `text-primary` | `#0a0a0a` | `#fafafa` |
| `text-secondary` | `#525252` | `#a0a0a0` |
| `text-muted` | `#737373` | `#666666` |
| `accent` | `#2563eb` | `#3b82f6` |
| `accent-hover` | `#1d4ed8` | `#2563eb` |
| `success` | `#16a34a` | `#22c55e` |
| `error` | `#dc2626` | `#ef4444` |
| `warning` | `#ca8a04` | `#eab308` |

## Typography Scale

| Token | Size | Usage |
|---|---|---|
| `text-display` | 4.5rem | Hero headings |
| `text-h1` | 3rem | Page titles |
| `text-h2` | 2.25rem | Section headings |
| `text-h3` | 1.5rem | Sub-headings |
| `text-body` | 1rem | Body text |
| `text-small` | 0.875rem | Secondary text |

## Spacing

| Token | Value | Usage |
|---|---|---|
| `spacing-section` | 6rem | Vertical padding between page sections (`py-section`) |

## Fonts

Defined in `src/lib/fonts.ts` using Next.js Font API with `display: "swap"`:

- **Inter** (`--font-inter`) — primary sans-serif
- **JetBrains Mono** (`--font-jetbrains-mono`) — code/mono text

## Dark Mode

Implemented with `next-themes`:

1. `ThemeProvider` wraps the app with `attribute="class"`, applying `.dark` class to `<html>`
2. `@theme` in `globals.css` defines light values (default)
3. `.dark` block overrides CSS variables for dark mode
4. `@custom-variant dark (&:where(.dark, .dark *))` enables Tailwind's `dark:` utility prefix
5. `suppressHydrationWarning` on `<html>` prevents React hydration mismatch from the blocking theme script

User preference persists in localStorage and defaults to system preference.

## Container Convention

Standard content container via `Container` component:
```
mx-auto w-full max-w-6xl px-6 lg:px-8
```

Resume uses a narrower `max-w-4xl`.

## Print Styles

The `@media print` block in `globals.css` provides resume-optimized printing:

- `@page` margins: `0 0.2in`
- Hides header/footer
- Forces white background, black text
- Resume-specific font sizes: base `0.75rem`, h1 `1.25rem`, h2 `0.85rem`
- `.resume-entry` uses `break-inside: avoid`
- Links stripped of decoration and color

## Custom Easing

```
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1)
```

Used in GSAP animations for smooth deceleration.
