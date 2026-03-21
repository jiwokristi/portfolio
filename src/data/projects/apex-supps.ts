import type { CaseStudy } from '@/types/project';

export const apexSupps: CaseStudy = {
  slug: 'apex-supps',
  title: 'Apex Supps Website Revamp',
  subtitle: 'Revamped a low-performance e-commerce site into a fast, modern, and fully responsive experience.',
  description:
    "A complete redesign and rebuild of Apex Supplements' e-commerce platform, focusing on performance, conversion optimization, and brand storytelling.",
  category: 'E-Commerce',
  role: 'Lead Developer & Designer',
  timeline: '8 weeks',
  year: 2025,
  techStack: ['React', 'TypeScript', 'Vite', 'GSAP', 'Material UI', 'Emotion'],
  liveUrl: 'https://apexsupps.onrender.com',
  featured: true,
  order: 1,
  heroImage: {
    src: '/images/projects/apex-supps/hero.jpg',
    alt: 'Apex Supps website redesign shown on multiple devices',
    width: 1920,
    height: 1080,
  },
  problem:
    'Apex Supplements’ existing storefront, built with Blazor, lacked a cohesive visual identity and suffered from poor mobile experience, slow performance, and unclear product navigation. The site did not reflect the brand’s premium positioning, and key user journeys—especially on mobile—were inefficient and difficult to navigate, limiting overall engagement and conversion potential.',
  solution:
    'I redesigned and built a modern frontend experience using React and TypeScript, serving as a high-fidelity reference implementation for a planned migration back into Blazor. The new system introduced a mobile-first layout, clearer product navigation across all categories, and a premium visual direction aligned with the brand’s identity. I implemented an immersive homepage scroll experience using GSAP, while keeping all other pages clean, fast, and conversion-focused with subtle micro-interactions. The result is a scalable, framework-agnostic frontend foundation that improves usability, perceived performance, and design consistency—while being structured for efficient reimplementation in a production Blazor environment. This approach allowed rapid iteration and creative flexibility, while ensuring the final system could be translated into the existing Blazor-based production stack.',
  metrics: [
    {
      label: 'Page Load Time',
      before: 6.2,
      after: 1.4,
      unit: 's',
      description: 'Time to interactive on mobile 4G connection',
    },
    {
      label: 'Mobile Conversion',
      before: 1.2,
      after: 3.8,
      unit: '%',
      description: 'Purchase conversion rate on mobile devices',
    },
    {
      label: 'Bounce Rate',
      before: 68,
      after: 34,
      unit: '%',
      description: 'Percentage of single-page sessions',
    },
    {
      label: 'Lighthouse Score',
      before: 42,
      after: 98,
      description: 'Google Lighthouse performance score',
    },
  ],
  process: [
    {
      title: 'Discovery & Audit',
      description:
        'Conducted a comprehensive audit of the existing site, analyzing performance bottlenecks, user flows, and conversion funnels. Interviewed stakeholders and reviewed analytics data to identify the highest-impact areas for improvement.',
      highlights: [
        'Performance audit revealed 4.2MB initial page weight',
        'Heatmap analysis showed 73% of users never scrolled past the fold',
        'Competitor analysis across 8 supplement brands',
        'Defined KPIs: load time, conversion rate, bounce rate',
      ],
    },
    {
      title: 'Design System & Prototyping',
      description:
        'Created a comprehensive design system in Figma with reusable components, typography scales, and color tokens. Built interactive prototypes for key user flows and validated them with A/B testing concepts.',
      highlights: [
        '40+ reusable Figma components',
        'Dark-first design language matching brand energy',
        'Mobile-first responsive layouts',
        'Interactive prototype for product → cart → checkout flow',
      ],
    },
    {
      title: 'Development & Integration',
      description:
        'Built the headless storefront with Next.js App Router, integrating the Shopify Storefront API for product data and cart management. Implemented ISR for product pages, edge caching for API responses, and optimistic UI updates for cart interactions.',
      highlights: [
        'Headless Shopify architecture with GraphQL',
        'ISR with 60-second revalidation for product pages',
        'Edge middleware for geo-based pricing',
        'Optimistic cart updates with error recovery',
      ],
    },
    {
      title: 'Testing & Launch',
      description:
        'Ran comprehensive cross-browser and device testing, load testing, and a staged rollout with A/B traffic splitting. Monitored Core Web Vitals throughout the launch period and iterated on performance bottlenecks.',
      highlights: [
        'Tested across 12 device/browser combinations',
        'Load tested to 10,000 concurrent users',
        'Staged rollout: 10% → 50% → 100% over 2 weeks',
        'Zero downtime migration from old theme',
      ],
    },
  ],
  features: [
    {
      title: 'Headless Commerce Architecture',
      description:
        "Decoupled frontend from Shopify's theme engine, enabling full control over the user experience while maintaining Shopify's robust inventory and order management.",
      tags: ['Next.js', 'Shopify Storefront API', 'GraphQL'],
    },
    {
      title: 'Smart Product Filtering',
      description:
        'Multi-faceted filtering system with URL state management, allowing users to find products by goal, ingredient, flavor, and price range — all with instant results.',
      tags: ['React', 'URL State', 'Search'],
    },
    {
      title: 'Performance-First Images',
      description:
        'Automated image pipeline with responsive srcsets, AVIF/WebP format negotiation, and blur-up placeholders. Hero images load in under 200ms on fast connections.',
      tags: ['Next/Image', 'CDN', 'WebP/AVIF'],
    },
    {
      title: 'Animated Product Showcases',
      description:
        'Scroll-triggered product reveals with staggered animations, 3D card tilts on hover, and smooth transitions between product variants.',
      tags: ['GSAP', 'ScrollTrigger', 'CSS Transforms'],
    },
    {
      title: 'Conversion-Optimized Checkout',
      description:
        'Streamlined cart drawer with upsell recommendations, progress indicators, and trust signals. Reduced checkout abandonment by 23%.',
      tags: ['Shopify Checkout', 'A/B Testing', 'UX'],
    },
    {
      title: 'Real-Time Inventory',
      description:
        'Live stock indicators and back-in-stock notifications powered by Shopify webhooks and server-sent events. No more overselling.',
      tags: ['Webhooks', 'SSE', 'Real-Time'],
    },
  ],
  results: {
    summary:
      'The revamped Apex Supps website delivered measurable improvements across every key metric. The headless architecture provided the performance foundation, while the redesigned UX drove significant conversion gains.',
    outcomes: [
      'Page load time reduced from 6.2s to 1.4s (77% improvement)',
      'Mobile conversion rate increased from 1.2% to 3.8% (217% increase)',
      'Bounce rate dropped from 68% to 34% (50% reduction)',
      'Lighthouse performance score improved from 42 to 98',
      'Average session duration increased by 45%',
      'Revenue per visitor increased by 62%',
    ],
    lessonsLearned: [
      'Headless commerce adds complexity — ensure the team can maintain it before committing',
      'Incremental Static Regeneration is ideal for product catalogs with frequent updates',
      'Performance gains directly correlate with conversion improvements on mobile',
      'A staged rollout dramatically reduces launch risk for revenue-critical sites',
    ],
  },
};
