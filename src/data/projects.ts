import type { ProjectSummary } from '@/types/project';

export const projects: ProjectSummary[] = [
  {
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
    // Final scores from the case study (homepage, front end only, measured side by side with the original's front end)
    metrics: [
      { label: 'Mobile Performance', after: 91 },
      { label: 'Desktop Performance', after: 100 },
      { label: 'Best Practices', after: 100 },
      { label: 'Accessibility', after: 91 },
    ],
  },
];
