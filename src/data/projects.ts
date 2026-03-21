import type { ProjectSummary } from '@/types/project';

export const projects: ProjectSummary[] = [
  {
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
    metrics: [
      { label: 'Load Time', after: 1.4 },
      { label: 'Conversion', after: 3.8 },
      { label: 'Lighthouse', after: 98 },
    ],
  },
];
