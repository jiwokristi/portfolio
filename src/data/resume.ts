export type ContactInfo = {
  name: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  location: string;
};

export type Experience = {
  company: string;
  location?: string;
  role: string;
  period: string;
  context?: string;
  highlights: string[];
};

export type Education = {
  institution: string;
  location?: string;
  credential: string;
  period: string;
  highlights?: string[];
};

export type Project = {
  name: string;
  year: string;
  description: string;
  url?: string;
};

export const contact: ContactInfo = {
  name: 'Jiwo Kristi',
  phone: '+6282130363110',
  email: 'priyadijiwo@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jiwokristi/',
  github: 'https://github.com/jiwokristi',
  portfolio: 'https://jiwokristi.vercel.app',
  location: 'Tangerang, Indonesia',
};

export const summary =
  'Frontend-leaning Full-Stack Developer with experience in React, TypeScript, Node.js, and MongoDB. Skilled in building clean, responsive, and scalable web applications. Strong background in end-to-end feature development, from UI to APIs and authentication. Startup experience taught me to take ownership, ship fast with quality, adapt quickly, and think like a product builder. I prioritize good UI/UX, maintainable architecture, and collaborative workflows.';

export const experience: Experience[] = [
  {
    company: 'PT Satkomindo Mediyasa',
    location: 'Jakarta, Indonesia',
    role: 'Frontend Developer',
    period: 'Mar 2026 - Present',
    // Indonesia's 2nd largest bank by assets ($126B), serving ~30 million retail customers through 8,600+ branches. State-owned, MSME-focused, $31B market cap, 82,000+ employees.
    context:
      "Worked on IT projects for Indonesia's 2nd largest bank by assets ($126B), 30M+ customers, $31B market cap.",
    highlights: [],
  },
  {
    company: 'Freelance',
    role: 'Full-stack Developer',
    period: 'Dec 2025 - Present',
    // Indonesia's 2nd largest bank by assets ($126B), serving ~30 million retail customers through 8,600+ branches. State-owned, MSME-focused, $31B market cap, 82,000+ employees.
    context: 'Worked with early-stage SaaS startups, agencies, and solo founders.',
    highlights: [
      'Redesigned and rebuilt an e-commerce storefront, boosting **mobile Lighthouse performance by 216%** (25 → 79) and **desktop by 263%** (27 → 98) by leveraging **React, TypeScript, Vite, GSAP, and Material UI**.',
    ],
  },
  {
    company: 'Enboq',
    location: 'Amsterdam, Netherlands',
    role: 'Full-stack Developer',
    period: 'Apr 2024 - Dec 2025',
    //  Mediq is a healthcare services company with 2,500+ employees across 13 European countries. Brabantia is a well-known Dutch home goods brand (founded 1919).
    context: 'AI-powered gamified onboarding SaaS, trusted by Mediq and Brabantia.',
    highlights: [
      'Led development of the **marketing site** serving **5,000+ monthly visitors**, driving lead generation and brand awareness through a responsive, SEO-optimized experience built with **Next.js, Material UI, and GSAP**.',
      'Delivered **10+ full-stack features** end-to-end — from UI components to REST APIs and database schemas — using **React, TypeScript, Node.js, Express, and MongoDB**, directly contributing to a scalable onboarding experience used by **1,000+ new hires** across clients.',
      'Drove **30% increase in employee onboarding completion** by architecting activity modules (questionnaires, quizzes, goals setting) with full CRUD, form validation, and real-time progress tracking in **React and Node.js**.',
      'Grew **user retention by 65%** by designing and shipping gamification systems — daily mission, leveling and EXP mechanics, and mini-games.',
      'Built **5 data-driven dashboards** visualizing onboarding progress, employee overview, NPS metric, daily mission insights, and questionnaire insights, enabling stakeholders to make informed decisions using **React charting libraries and REST APIs**.',
    ],
  },
  {
    company: 'Notes',
    location: 'Sleman, Indonesia',
    role: 'Frontend Developer',
    period: 'Aug 2023 - Apr 2024',
    highlights: [],
  },
  {
    company: 'PT Infosys Solusi Terpadu',
    location: 'Yogyakarta, Indonesia',
    role: 'Frontend Developer',
    period: 'Aug 2022 - Aug 2023',
    // Indonesia's #1 mortgage bank — 39% market share in home ownership loans, 83% in subsidized segment, 5.5M customers, 470T IDR in assets.
    context:
      "Worked on IT projects for PT Bank Tabungan Negara (Persero) Tbk, Indonesia's #1 mortgage bank — 39% home loan market share, 5.5M customers, 470T IDR in assets.",
    highlights: [],
  },
];

export const education: Education[] = [
  {
    institution: 'Universitas Terbuka',
    credential: 'Bachelor of Information Systems (S.Kom)',
    period: 'Jun 2026 - Present',
  },
  // ! DO NOT DELETE
  // {
  //   institution: 'Hacktiv8 Indonesia',
  //   credential: 'Certificate in Full Stack JavaScript Immersive',
  //   period: 'Feb 2022 - May 2022',
  //   highlights: [
  //     'Completed an intensive 16-week bootcamp covering JavaScript, Node.js, React, PostgreSQL, MongoDB, and REST API development.',
  //     'Built multiple full-stack applications with authentication, CRUD operations, and third-party API integrations.',
  //     'Practiced Agile methodologies, pair programming, and code reviews in a collaborative team environment.',
  //     'Graduated with a strong foundation in software engineering principles and modern web development practices.',
  //   ],
  // },
];

export const skills = [
  'JavaScript',
  'TypeScript',
  'React.js',
  'Next.js',
  'Vue.js',
  'Tailwind CSS',
  'GSAP',
  'Performance Optimization',
  'Node.js',
  'Express',
  'MongoDB',
  'PostgreSQL',
  'System Design',
  'REST APIs',
  'Fedora Linux',
  'Docker',
  'CI/CD',
  'LLM Orchestration',
  'Custom Agents',
];

export const projects: Project[] = [
  {
    name: 'Apex Peptides',
    year: '2025',
    description:
      'Complete redesign and rebuild of an e-commerce storefront using **React, TypeScript, Vite, GSAP, and Material UI**. Improved Lighthouse **mobile performance by 216%** (25 → 79) and **desktop by 263%** (27 → 98). Simplified product navigation from **14 categories to 4 key categories**. Built an **immersive scroll-based homepage** with GSAP and implemented **URL-based filtering** for persistent, shareable product views.',
    url: 'https://apexsupps.onrender.com',
  },
];

export const languages = ['English', 'Indonesian'];
