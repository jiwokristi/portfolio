import type { CaseStudy } from '@/types/project';

/*
 * Sequent is paid freelance work commissioned through a client: a redesign proposal for a real
 * research-peptides store, designed directly in code so the deliverable was a working front end. The
 * store went another way; it's rebranded as "Sequent" to keep the original brand private. It runs on mock
 * data with no backend, payments or tracking scripts, and its product visuals (generated vials) are
 * placeholders for real photography, so claims stay to the front end only.
 *
 * Measurements (Lighthouse 12.8.2, default settings, homepage, median of 3 runs):
 * - Original front end and Final: measured side by side on 2026-11-13, alternating runs, same machine.
 *   The original was measured with its marketing, tracking and payment scripts blocked and without
 *   product photos (Blazor runtime and app fully loaded, no console errors), so both sides compare
 *   front-end code only. Its unblocked live homepage scores 21 mobile / 23 desktop.
 * - First build: the same homepage before the performance pass, from the Sequent performance audit
 *   (live site, 2026-11-06, before fixes).
 * - Requests and SEO are left out: request counts mostly reflect architecture (Blazor loads 140 .wasm
 *   files), and SEO showed no meaningful difference.
 */
export const sequent: CaseStudy = {
  slug: 'sequent',
  title: 'Sequent — Storefront Redesign',
  subtitle:
    'A redesign built to make people stay: a scroll story that earns trust in the first few seconds, a catalog that’s easy to explore, and a front end that loads fast.',
  description:
    'Paid freelance work commissioned through a client: a redesign proposal for a research-peptides store, designed directly in code as a working front end, then audited and tuned until every page scored 99–100 on desktop.',
  category: 'E-Commerce · Freelance',
  role: 'Designer & Front-end Developer',
  timeline: '8 weeks + performance pass',
  year: 2026,
  techStack: ['React', 'TypeScript', 'Vite', 'GSAP', 'Material UI', 'Emotion', 'Static prerendering'],
  liveUrl: 'https://sequent-peptides.netlify.app',
  previewVideo: '/videos/projects/sequent/preview.mp4',
  featured: true,
  order: 1,
  heroImage: {
    src: '/images/projects/sequent/hero.webp',
    alt: 'Sequent storefront homepage: the headline “Sequenced. Tested. Shipped.” over an animated molecule',
    width: 1920,
    height: 1080,
  },
  problem:
    'The starting point was a live research-peptides store built with Blazor WebAssembly. Before a single product photo, its homepage shipped about 9.3 MB of front-end code, mostly a 6.6 MB .NET WebAssembly runtime and a 2.5 MB icon script, and on a phone it kept the page busy for seconds before it responded. Navigation spread the catalog across 14 categories, the visual identity didn’t match a premium brand, and nothing on the homepage made me want to learn more about it.',
  solution:
    'Commissioned through a client as paid freelance work, Sequent is a redesign proposal I designed directly in code, so the deliverable was a working front end you can click through. The store went another way, so I rebranded it as Sequent to keep the original brand private. The homepage tells the brand’s story in three scroll chapters, built to earn trust in the first few seconds, while the shop, product and checkout pages stay quick and focused. The catalog is reorganized into eight research areas with filters kept in the URL, so filtered views can be shared. A performance pass then prerendered all 46 pages at build time, fixed layout shift and font loading, and loaded heavy libraries only where they’re used. It runs on mock data, with no backend, payments or tracking scripts, and placeholder visuals where product photos would go, so the comparison covers the front end only.',
  metricStages: {
    before: 'Original front end',
    interim: 'First build',
    after: 'Final',
  },
  metrics: [
    {
      label: 'Mobile Performance',
      before: 28,
      interim: 61,
      after: 91,
      description: 'Lighthouse performance score on a simulated mid-range phone',
    },
    {
      label: 'Desktop Performance',
      before: 28,
      interim: 72,
      after: 100,
      description: 'Lighthouse performance score on desktop',
    },
    {
      label: 'Best Practices',
      before: 79,
      interim: 100,
      after: 100,
      description: 'Security, modern APIs and console errors',
    },
    {
      label: 'Accessibility',
      before: 84,
      after: 91,
      description: 'Lighthouse accessibility score on the homepage',
    },
  ],
  metricComparisons: [
    { label: 'Front-end code', before: '9.3 MB', after: '220 KB' },
    { label: 'Mobile blocking time', before: '6.9 s', after: '0.23 s' },
    { label: 'Layout shift (mobile)', before: '0.138', after: '0' },
  ],
  metricNotes: [
    'Homepage, Lighthouse 12.8.2 with default settings, median of 3 runs. The original and the final build were measured side by side on 13 November 2026, alternating runs on the same machine; the first build comes from the performance audit before its fixes.',
    'Both front ends measured the same way: the original without its marketing scripts and product photos, so the comparison covers front-end code only.',
    'Sequent’s product visuals are placeholders for real photography, which would add weight and slow its largest paint once added.',
  ],
  process: [
    {
      title: 'Discovery & UX Audit',
      description:
        'Reviewed the original store for performance, visual hierarchy and user flow, especially on mobile, and measured where its weight came from.',
      highlights: [
        'Lighthouse put the homepage front end at 28 on mobile and 28 on desktop',
        'About 9.3 MB of front-end code per homepage load, most of it a .NET WebAssembly runtime and an icon script',
        'Catalog spread across 14 categories, with no clear starting point on the homepage',
        'Set the focus areas: performance, mobile UX, and a clearer path to products',
      ],
    },
    {
      title: 'UX Strategy & Information Architecture',
      description:
        'Restructured the catalog and the homepage so visitors reach the right products with fewer decisions.',
      highlights: [
        'Reorganized the catalog into 8 research areas, featured on the homepage',
        'Dedicated categories page for browsing every area',
        'Filters kept in the URL, so filtered views can be shared and survive a refresh',
        'Clearer call-to-action hierarchy from homepage to product',
      ],
    },
    {
      title: 'Interaction & Experience Design',
      description:
        'An immersive story on the homepage; quiet, fast pages everywhere else.',
      highlights: [
        'Three-chapter scroll story (Sequenced, Tested, Shipped) with sticky, scroll-driven scenes',
        'Animated molecule canvas in the hero that stops drawing when it leaves the screen',
        'Curtain footer reveal at the end of each page',
        'Subtle micro-interactions on shop, product and checkout pages',
      ],
    },
    {
      title: 'Front-end Build',
      description:
        'Built the front end in React and TypeScript with reusable components, mock catalog data and route-level code splitting.',
      highlights: [
        '37 products across 8 research areas, with search, cart and checkout flows',
        'Each route ships as its own chunk, 0.9–25 KB',
        'Generated product vials as placeholders until real photography is added',
        'Responsive across phone, tablet and desktop',
      ],
    },
    {
      title: 'Performance Audit & Fixes',
      description:
        'Audited every route on mobile and desktop, fixed the four biggest problems without changing the design, and re-measured the live site.',
      highlights: [
        'Prerendered all 46 pages at build time, so direct links work on every route (was 1 of 10)',
        'Fixed a hidden footer that Chrome counted as layout shift: desktop CLS 0.598 → 0',
        'Self-hosted fonts with width-matched fallbacks, so the font swap no longer moves text',
        'Mobile LCP under real throttling: 6.8 s → 2.2 s on the homepage',
      ],
    },
  ],
  features: [
    {
      title: 'Scroll-Story Homepage',
      description:
        'Three sticky, scroll-driven chapters tell the product story, with GSAP animation holding 60 fps on desktop and loaded only on the homepage.',
      tags: ['GSAP', 'Scroll Animation', 'Storytelling'],
    },
    {
      title: 'Clearer Catalog',
      description:
        'The original’s 14 categories are reorganized into 8 research areas, featured on the homepage with a dedicated page for browsing them all.',
      tags: ['UX Strategy', 'Navigation', 'Information Architecture'],
    },
    {
      title: 'URL-Based Filtering',
      description:
        'Shop filters live in the URL, so a filtered view can be shared, bookmarked or refreshed without losing its state.',
      tags: ['React Router', 'State in URL', 'UX'],
    },
    {
      title: 'Prerendered Pages',
      description:
        'All 46 pages are rendered to HTML at build time and hydrated in the browser, so visitors see a finished page instead of an empty shell.',
      tags: ['Static Prerendering', 'React', 'Performance'],
    },
    {
      title: 'Zero Layout Shift',
      description:
        'Fixed a covered footer that Chrome measured as moving, and matched fallback fonts to the real ones, taking desktop layout shift from 0.598 to 0.',
      tags: ['Core Web Vitals', 'Fonts', 'CSS'],
    },
    {
      title: 'Light by Design',
      description:
        'Route-level code splitting and libraries loaded only where they’re needed keep the homepage’s code to about 220 KB.',
      tags: ['Code Splitting', 'Vite', 'Bundle Size'],
    },
  ],
  results: {
    summary:
      'Sequent is a redesign built to make people stay: a homepage that tells the brand’s story, a catalog that’s easier to explore, and a front end that loads fast. The store went another way, so it never went live, and the numbers compare front-end code only.',
    outcomes: [
      'Front-end Lighthouse score: 28 → 91 on mobile and 28 → 100 on desktop, measured side by side with the original',
      'Front-end code: 9.3 MB → 220 KB, and mobile blocking time: 6.9 s → 0.23 s',
      'Performance pass on my own build: desktop 72 → 100, with every route now 99–100',
      'Layout shift eliminated (desktop CLS 0.598 → 0) and every route reachable by direct link',
      'Best Practices 100 and Accessibility 91–98 across all routes',
      'Scroll animation at 60 fps on desktop',
    ],
    lessonsLearned: [
      'Measure where the weight comes from before redesigning; most of the original’s cost was its own runtime, not its images',
      'A hidden element can still count as layout shift. Check what Chrome measures, not only what you see',
      'Prerendering moves work rather than removing it; hydration cost shows up in blocking time and is the next target',
      'Expressive animation and speed can coexist when heavy libraries load only on the pages that use them',
      'Be precise about what a number compares: a front end without a backend isn’t a finished store',
    ],
  },
};
