import type { CaseStudy } from '@/types/project';

/*
 * Sequent is paid freelance work, subcontracted through a client: a front-end redesign of a real
 * research-peptides storefront. The end client didn't adopt it, so the live store is unchanged; it's
 * shown as "Sequent" so the original store isn't named. It has no backend (mock catalog data, no payments,
 * accounts or analytics), so claims stay to front-end performance, design and engineering.
 *
 * Measurements (Lighthouse 12.8.2, default settings, homepage, median of 3 runs):
 * - Original store and Final: measured side by side on 2026-11-06, alternating runs, same machine.
 * - First build: the same homepage before the performance pass, from the Sequent performance audit
 *   (live site, 2026-11-06, before fixes).
 */
export const sequent: CaseStudy = {
  slug: 'sequent',
  title: 'Sequent — Storefront Redesign',
  subtitle:
    'A front-end redesign of a slow research-peptides store: a scroll-story homepage, a clearer catalog, and pages that load in a fraction of the original’s weight.',
  description:
    'Paid freelance work, subcontracted through a client: I redesigned and rebuilt the front end of an existing research-peptides storefront, then audited and tuned it until every page scored 99–100 on desktop.',
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
    'The starting point was a live research-peptides store built with Blazor WebAssembly. Its homepage weighed 13.2 MB across 292 requests and scored 21 on mobile and 23 on desktop in Lighthouse. Most of that was its own front end: about 10 MB of .NET runtime, scripts and images before any of its 29 third-party services loaded. Navigation spread the catalog across 14 categories, the visual identity didn’t match a premium brand, and on phones key journeys were slow and hard to follow.',
  solution:
    'I redesigned the store and rebuilt the front end in React and TypeScript, shown here as Sequent. The homepage tells the product story in three scroll chapters, while the shop, product and checkout pages stay quick and focused. The catalog is reorganized into six research areas with filters kept in the URL, so filtered views can be shared. A performance pass then prerendered all 46 pages at build time, fixed layout shift and font loading, and loaded heavy libraries only where they’re used. Sequent has no backend: products are mock data and there are no payments, accounts or tracking scripts, so the comparison is between front ends, not finished stores.',
  metricStages: {
    before: 'Original store',
    interim: 'First build',
    after: 'Final',
  },
  metrics: [
    {
      label: 'Mobile Performance',
      before: 21,
      interim: 61,
      after: 83,
      description: 'Lighthouse performance score on a simulated mid-range phone',
    },
    {
      label: 'Desktop Performance',
      before: 23,
      interim: 72,
      after: 99,
      description: 'Lighthouse performance score on desktop',
    },
    {
      label: 'Best Practices',
      before: 57,
      interim: 100,
      after: 100,
      description: 'Security, modern APIs and console errors',
    },
    {
      label: 'SEO',
      before: 85,
      interim: 90,
      after: 91,
      description: 'Crawlability and metadata basics',
    },
  ],
  metricComparisons: [
    { label: 'Page weight', before: '13.2 MB', after: '380 KB' },
    { label: 'Requests', before: '292', after: '16' },
    { label: 'Mobile blocking time', before: '22.2 s', after: '0.36 s' },
    { label: 'Layout shift (mobile)', before: '0.138', after: '0' },
    { label: 'Accessibility', before: '85', after: '91' },
    { label: 'Third-party services', before: '29', after: '0' },
  ],
  metricNotes: [
    'Homepage, Lighthouse 12.8.2 with default settings, median of 3 runs. The original store and the final build were measured side by side on the same day and machine; the first build comes from the performance audit before its fixes.',
    'Sequent is a front-end build with mock data and no analytics or marketing scripts. The original also loads 29 third-party services (about 2.9 MB), but even counting only its own code it ships about 10 MB.',
  ],
  process: [
    {
      title: 'Discovery & UX Audit',
      description:
        'Reviewed the original store for performance, visual hierarchy and user flow, especially on mobile, and measured where its weight came from.',
      highlights: [
        'Lighthouse put the homepage at 21 on mobile and 23 on desktop',
        '13.2 MB per homepage load: about 10 MB of its own .NET runtime, scripts and images, plus 29 third-party services',
        'Catalog spread across 14 categories, with no clear starting point on the homepage',
        'Set the focus areas: performance, mobile UX, and a clearer path to products',
      ],
    },
    {
      title: 'UX Strategy & Information Architecture',
      description:
        'Restructured the catalog and the homepage so visitors reach the right products with fewer decisions.',
      highlights: [
        'Reorganized the catalog into 6 research areas, featured on the homepage',
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
        '37 products across 6 research areas, with search, cart and checkout flows',
        'Each route ships as its own chunk, 0.9–25 KB',
        'No third-party scripts: about 340 KB per page in 16–18 requests',
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
        'The original’s 14 categories are reorganized into 6 research areas, featured on the homepage with a dedicated page for browsing them all.',
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
        'Route-level code splitting, no third-party scripts and libraries loaded only where needed keep each page around 340 KB.',
      tags: ['Code Splitting', 'Vite', 'Bundle Size'],
    },
  ],
  results: {
    summary:
      'Sequent shows what the same store could feel like with a modern front end: a homepage that tells a story, a catalog that’s easier to navigate, and pages a fraction of the original’s weight. The end client went another way and kept their current store, so these results compare front ends, not live stores.',
    outcomes: [
      'Homepage Lighthouse score: 21 → 83 on mobile and 23 → 99 on desktop, measured side by side with the original',
      'Homepage weight: 13.2 MB → 380 KB, and requests: 292 → 16',
      'Performance pass on my own build: desktop 72 → 99, with every route now 99–100',
      'Layout shift eliminated (desktop CLS 0.598 → 0) and every route reachable by direct link',
      'Best Practices 100 and Accessibility 91–98 across all routes',
      'Scroll animation at 60 fps on desktop; add to cart responds in 128 ms',
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
