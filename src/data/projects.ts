import type { ProjectSummary } from '@/types/project';

export const projects: ProjectSummary[] = [
  {
    slug: 'apex-peptides',
    title: 'Apex Peptides E-Commerce Platform Revamp',
    subtitle: 'Revamped a low-performance e-commerce site into a fast, modern, and fully responsive experience.',
    description:
      "A complete redesign and rebuild of Apex Peptides' e-commerce platform, focusing on performance, conversion optimization, and brand storytelling.",
    category: 'E-Commerce',
    role: 'Lead Developer & Designer',
    timeline: '8 weeks',
    year: 2025,
    techStack: ['React', 'TypeScript', 'Vite', 'GSAP', 'Material UI', 'Emotion'],
    liveUrl: 'https://apexsupps.onrender.com',
    previewVideo: '/videos/projects/apex-peptides/preview.mp4',
    featured: true,
    order: 1,
    heroImage: {
      src: '/images/projects/apex-peptides/hero.webp',
      alt: 'Apex Peptides website redesign shown on multiple devices',
      width: 1920,
      height: 1080,
    },
    metrics: [
      {
        label: 'Mobile Performance',
        after: 79,
      },
      {
        label: 'Desktop Performance',
        after: 98,
      },
      {
        label: 'Accessibility',
        after: 87,
      },
      {
        label: 'Best Practices',
        after: 100,
      },
    ],
  },
];
