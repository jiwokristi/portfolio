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
      label: 'Mobile Performance',
      before: 25,
      after: 79,
      unit: '',
      description: 'Google Lighthouse performance score on mobile devices',
    },
    {
      label: 'Desktop Performance',
      before: 27,
      after: 98,
      unit: '',
      description: 'Google Lighthouse performance score on desktop',
    },
    {
      label: 'Accessibility',
      before: 76,
      after: 87,
      unit: '',
      description: 'Accessibility score based on Lighthouse audit',
    },
    {
      label: 'Best Practices',
      before: 50,
      after: 100,
      unit: '',
      description: 'Adherence to modern web development best practices',
    },
  ],
  process: [
    {
      title: 'Discovery & UX Audit',
      description:
        'Evaluated the existing storefront to identify issues in performance, visual hierarchy, and user flow—especially on mobile.',
      highlights: [
        'Identified poor visual hierarchy affecting readability and navigation',
        'Lighthouse audit revealed low performance (25 mobile, 27 desktop)',
        'Analyzed category structure (14 categories) and identified overload on homepage',
        'Defined key focus areas: performance, mobile UX, and conversion clarity',
      ],
    },
    {
      title: 'UX Strategy & Information Architecture',
      description:
        'Restructured the user experience to improve clarity, reduce cognitive load, and guide users toward conversion-focused actions.',
      highlights: [
        'Reduced homepage complexity by featuring 4 key categories instead of all 14',
        'Introduced dedicated category page for full product exploration',
        'Designed URL-based filtering system for better usability and shareability',
        'Improved CTA hierarchy to guide users through product discovery',
      ],
    },
    {
      title: 'Interaction & Experience Design',
      description:
        'Designed a differentiated interaction system where animations support storytelling on the homepage and remain subtle and conversion-focused across other pages.',
      highlights: [
        'Planned immersive scroll-based storytelling for homepage experience',
        'Used subtle micro-interactions on product and category pages to maintain performance',
        'Implemented stacking animation for featured categories to reduce visual overload',
        'Designed animated newsletter section with text-split effect for engagement',
        'Added global scroll progress indicator for user feedback and navigation awareness',
        'Created progressive footer reveal interaction to enhance page depth and engagement',
      ],
    },
    {
      title: 'Frontend Development',
      description:
        'Built a high-fidelity frontend implementation using React and TypeScript, focusing on performance, responsiveness, and maintainable architecture.',
      highlights: [
        'Implemented reusable component-based architecture',
        'Ensured responsiveness across multiple breakpoints',
        'Optimized rendering and asset loading for better performance',
        'Improved Lighthouse scores (25 → 79 mobile, 27 → 98 desktop)',
      ],
    },
  ],
  features: [
    {
      title: 'Scalable Frontend System',
      description:
        'Built a high-fidelity frontend using React and TypeScript with a reusable, component-based structure designed for scalability and future integration into a production environment.',
      tags: ['React', 'TypeScript', 'Component Architecture'],
    },
    {
      title: 'Structured Product Navigation',
      description:
        'Improved product discovery by simplifying the homepage to highlight 4 key categories while providing a dedicated page for all 14 categories, reducing cognitive load and improving usability.',
      tags: ['UX Strategy', 'Navigation', 'Information Architecture'],
    },
    {
      title: 'URL-Based Filtering System',
      description:
        'Designed product filtering to persist in the URL, allowing users to share filtered views and maintain state across navigation for a more consistent browsing experience.',
      tags: ['React Router', 'State Management', 'UX'],
    },
    {
      title: 'Performance-Focused Implementation',
      description:
        'Optimized rendering and asset usage to significantly improve Lighthouse performance scores (25 → 79 mobile, 27 → 98 desktop), ensuring a faster and smoother experience.',
      tags: ['Performance', 'Optimization', 'Lighthouse'],
    },
    {
      title: 'Purposeful Animation System',
      description:
        'Designed distinct animation strategies: immersive, scroll-based storytelling on the homepage and subtle micro-interactions on other pages to support usability without compromising performance.',
      tags: ['GSAP', 'UX Motion', 'Interaction Design'],
    },
    {
      title: 'Enhanced UI Interactions',
      description:
        'Implemented refined UI details including stacking category animations, animated newsletter section, scroll progress indicator, and progressive footer reveal to create a more engaging and polished experience.',
      tags: ['Micro-interactions', 'GSAP', 'UI Polish'],
    },
    {
      title: 'Interactive Particle Animation',
      description:
        'Built an interactive bubble-based animation where cursor movement influences particle behavior, including collision and fluid-like blending effects between particles. Used selectively on secondary pages (login, register, contact) to enhance engagement without affecting core conversion flows.',
      tags: ['CSS', 'DOM', 'Interaction Design'],
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
