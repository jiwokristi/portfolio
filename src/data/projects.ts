import type { ProjectSummary } from '@/types/project';

export const projects: ProjectSummary[] = [
  {
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
    // Final scores from the case study (homepage, measured side by side with the original store)
    metrics: [
      { label: 'Mobile Performance', after: 83 },
      { label: 'Desktop Performance', after: 99 },
      { label: 'Best Practices', after: 100 },
      { label: 'SEO', after: 91 },
    ],
  },
];
