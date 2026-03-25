# OG Image Flow

## What is this?

When you share a link like `jiwokristi.dev/projects/apex-peptides` on Twitter, LinkedIn, Slack, etc., those platforms show a **preview card** with a title, description, and image. That image is the **OG (Open Graph) image**.

Instead of manually creating an image for every project page, Next.js **generates one automatically** using code. Think of it like a template that gets filled in with each project's data and then "screenshotted" into a PNG.

---

## The dumbed-down version

```
You share a link on Twitter
        ↓
Twitter visits the link and asks: "Got a preview image?"
        ↓
Next.js says: "Hold on, let me make one"
        ↓
It grabs the project's title, subtitle, and category from data
        ↓
It renders a styled card (dark background, white text) as a 1200×630 PNG
        ↓
Twitter displays that PNG as the link preview
```

That's it. No Photoshop, no Figma — just code that draws an image on the fly (or at build time).

---

## File-by-file breakdown

### 1. The image generator

**`src/app/projects/[slug]/opengraph-image.tsx`**

This is the core file. Next.js recognises the filename `opengraph-image.tsx` as a special convention — any file with this name automatically becomes the OG image for that route.

It does three things:

1. Receives the `slug` from the URL (e.g. `apex-peptides`)
2. Loads the project data via `getProject(slug)`
3. Returns an `ImageResponse` — JSX that gets converted into a PNG

```
┌──────────────────────────────────────────────┐
│  (dark gradient background)                  │
│                                              │
│  E-Commerce              ← category (blue)  │
│  Apex Peptides E-Commerce                    │
│  Platform Revamp         ← title (white)     │
│  Revamped a low-perf...  ← subtitle (gray)   │
└──────────────────────────────────────────────┘
                  1200 × 630 px
```

### 2. Page metadata

**`src/app/projects/[slug]/page.tsx`**

Exports a `generateMetadata` function that sets the page's `<title>` and `<meta name="description">`. Next.js automatically pairs this with the OG image from the same directory — no need to manually wire them together.

Also exports `generateStaticParams`, which tells Next.js to pre-build all known project slugs at build time (currently just `apex-peptides`). This means the OG image is generated once during build, not on every request.

### 3. Root layout

**`src/app/layout.tsx`**

Sets `metadataBase: new URL('https://jiwokristi.vercel.app')`, which Next.js needs to turn relative OG image paths into absolute URLs. Without this, social platforms wouldn't know where to fetch the image from.

Also defines a title template (`%s | Jiwo Kristi`) so project pages get titles like "Apex Peptides E-Commerce Platform Revamp | Jiwo Kristi".

### 4. Data layer

**`src/lib/projects.ts`** → `getProject(slug)` dynamically imports the right data file.

**`src/data/projects/apex-peptides.ts`** → Contains the full `CaseStudy` object with `title`, `subtitle`, `category`, and everything else the OG image (and the page itself) needs.

---

## Request flow

```
Browser / social-platform crawler hits:
  https://jiwokristi.vercel.app/projects/apex-peptides
                          │
                          ▼
         Next.js matches route: /projects/[slug]
                          │
              ┌───────────┴───────────┐
              ▼                       ▼
     generateMetadata()      opengraph-image.tsx
              │                       │
              ▼                       ▼
       getProject("apex-peptides")  getProject("apex-peptides")
              │                       │
              ▼                       ▼
     Returns <title> and       Renders JSX → ImageResponse
     <meta description>        → 1200×630 PNG
              │                       │
              └───────────┬───────────┘
                          ▼
                HTML <head> includes:
      <meta property="og:title" content="Apex Peptides...">
      <meta property="og:description" content="A complete...">
      <meta property="og:image" content="https://jiwokristi.vercel.app
            /projects/apex-peptides/opengraph-image?...">
```

---

## How to add a new project's OG image

You don't need to do anything extra. Because `opengraph-image.tsx` lives inside the `[slug]` directory, it automatically applies to every project. Just:

1. Add the project data to `src/data/projects/`
2. Register the slug in `src/lib/projects.ts`
3. The OG image generates itself from the project's `category`, `title`, and `subtitle`

---

## Key details

| Detail | Value |
| --- | --- |
| Image size | 1200 × 630 px |
| Format | PNG |
| Runtime | Node.js (default) |
| When generated | At build time (static) |
| Auto-discovered | Yes — Next.js uses the `opengraph-image.tsx` filename convention |
| Fields used | `category`, `title`, `subtitle` from `CaseStudy` |
