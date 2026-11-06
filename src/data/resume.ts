export type ContactInfo = {
  name: string;
  /** Only shown in the downloadable PDF (ResumePdf), never on the public web or printed page. */
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

/** "https://www.linkedin.com/in/jiwokristi/" → "linkedin.com/in/jiwokristi", so links read as text, not just labels. */
export const displayUrl = (url: string) => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

export const contact: ContactInfo = {
  name: 'Jiwo Kristi',
  phone: '+62 821 3036 3110',
  email: 'priyadijiwo@gmail.com',
  linkedin: 'https://www.linkedin.com/in/jiwokristi/',
  github: 'https://github.com/jiwokristi',
  portfolio: 'https://jiwokristi.vercel.app',
  location: 'Tangerang Regency, Indonesia',
};

/** Target titles under the name, on the web resume, the printed page and the PDF (ATS title match). */
export const headline = 'Middle Frontend Engineer · Mid-level Frontend Engineer · Full-Stack Engineer';

export type SkillGroup = { label: string; items: string[] };

export const summary =
  'Frontend Engineer with 4 years of experience building fast, responsive web apps with React.js, Next.js, and TypeScript, plus full-stack features in Node.js, Express, and MongoDB. Built for banking, healthcare, and SaaS, from maker-checker workflows and micro-frontends to dashboards and SEO-optimized sites. Works in Agile/Scrum teams from Figma handoff to code review, automates workflows with LLM agents, and sweats the details that earn user trust.';

/**
 * Bullets lead with a strong verb and follow action, context, result; when there's a number,
 * the result goes first (XYZ: "Accomplished X, measured by Y, by doing Z").
 */
export const experience: Experience[] = [
  {
    company: 'PT Satkomindo Mediyasa',
    location: 'Jakarta, Indonesia',
    role: 'Frontend Developer',
    period: 'Mar 2026 - Present',
    // Indonesia's 2nd largest bank by assets ($126B), serving ~30 million retail customers through 8,600+ branches. State-owned, MSME-focused, $31B market cap, 82,000+ employees.
    context:
      "In-house at PT Bank Rakyat Indonesia (Persero) Tbk, Indonesia's 2nd largest bank by assets ($126B), 30M+ customers.",
    highlights: [
      'Cut sprint unit-test documentation from 5 hours to 15 minutes (95% faster) with an LLM-agent workflow that turns git diffs into test scenarios and fills Confluence via its REST API; caught a real bug and shared it team-wide.',
      "Delivered the maker flow for BRI's loan origination system (LOS), a Next.js micro-frontend that lets the bank configure consumer-credit pre-screening rules as parameters under maker-checker-signer approval.",
      'Owned and completed the checker and signer approval and activity-log pages after a teammate left, integrating backend services via TanStack Query into one end-to-end maker-checker-signer workflow.',
      'Strengthened code quality ahead of architecture review by writing 12 Jest and React Testing Library suites and resolving SonarQube issues (cognitive complexity, type-dependent bugs).',
    ],
  },
  {
    company: 'Freelance',
    role: 'Frontend Developer',
    period: 'Dec 2025 - Present',
    // Sequent is a paid subcontract: the end client (shown as "Sequent") bought a redesign but didn't adopt it, so the
    // numbers compare the rebuild against their live site rather than claiming a shipped improvement.
    context: 'Subcontracted website redesign and rebuild work for end clients.',
    highlights: [
      'Cut homepage weight from 13 MB to 380 KB and raised Lighthouse mobile/desktop from 21/23 to 83/99 vs. the live site by rebuilding a research-peptides storefront in React.js, TypeScript, and Vite.',
      'Prerendered all 46 pages and improved Core Web Vitals in a performance pass on the rebuild: mobile LCP from 6.8 s to 2.2 s and desktop CLS from 0.598 to 0.',
      'Restructured 14 product categories into 6 research areas and built a scroll-driven storytelling homepage, delivered as a live demo (sequent-peptides.netlify.app).',
    ],
  },
  {
    company: 'RiddleStory Software B.V.',
    location: 'Amsterdam, Netherlands',
    role: 'Full-Stack Developer',
    period: 'Apr 2024 - Dec 2025',
    //  Mediq is a healthcare services company with 2,500+ employees across 13 European countries. Brabantia is a well-known Dutch home goods brand (founded 1919).
    context: 'Enboq, an AI-powered gamified onboarding SaaS, trusted by Mediq and Brabantia.',
    highlights: [
      'Increased employee onboarding completion by 30% by architecting activity modules (questionnaires, quizzes, goal setting) with full CRUD, form validation, and real-time progress tracking in React.js and Node.js.',
      'Grew user retention by 65% by designing and shipping gamification systems: daily missions, leveling and EXP mechanics, and mini-games.',
      'Led development of the marketing site serving 5,000+ monthly visitors, driving lead generation through a responsive, SEO-optimized experience built with Next.js, Material UI, and GSAP.',
      'Delivered 10+ full-stack features, from UI components to REST APIs and database schemas, with React.js, TypeScript, Node.js, Express, and MongoDB for an onboarding platform used by 1,000+ new hires.',
      'Built 5 data-driven dashboards (onboarding progress, employee overview, NPS, daily missions, questionnaire insights) with React.js charting libraries and REST APIs, giving stakeholders the data to steer onboarding.',
    ],
  },
  {
    company: 'PT Cipta Integrasi Nusantara',
    location: 'Sleman, Indonesia',
    role: 'Frontend Developer',
    period: 'Aug 2023 - Apr 2024',
    context:
      "Healthcare IT company building NOTES, a hospital management system (SIMRS) for Indonesia's EMR mandate.",
    highlights: [],
  },
  {
    company: 'PT Infosys Solusi Terpadu',
    location: 'Yogyakarta, Indonesia',
    role: 'Frontend Developer',
    period: 'Aug 2022 - Aug 2023',
    // Indonesia's #1 mortgage bank — 39% market share in home ownership loans, 83% in subsidized segment, 5.5M customers, 470T IDR in assets.
    context:
      "IT projects for PT Bank Tabungan Negara (Persero) Tbk, Indonesia's #1 mortgage bank (39% home loan share).",
    highlights: [],
  },
];

export const education: Education[] = [
  {
    institution: 'Universitas Terbuka',
    credential: 'Bachelor of Information Systems (S.Kom)',
    period: 'Jun 2026 - 2030 (expected)',
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

/** Grouped so ATS parsers and recruiters can scan them by area; kept to the keywords job ads search for. */
export const skills: SkillGroup[] = [
  {
    label: 'Frontend',
    items: ['JavaScript', 'TypeScript', 'React.js', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS', 'Material UI', 'GSAP', 'Micro-frontends'],
  },
  { label: 'State & Forms', items: ['TanStack Query (React Query)', 'React Hook Form', 'Zod', 'Yup'] },
  { label: 'Testing & Quality', items: ['Jest', 'React Testing Library', 'SonarQube'] },
  { label: 'Backend', items: ['Node.js', 'Express', 'REST APIs', 'MongoDB', 'PostgreSQL'] },
  { label: 'Tools & DevOps', items: ['Git', 'Docker', 'CI/CD', 'Vite', 'Figma', 'Jira', 'ClickUp', 'Confluence', 'LLM Agents'] },
];

/** Personal projects, shown on screen, in print and in the PDF when there are any. */
// Lighthouse 12.8.2 on the production build, homepage, 3 runs each (2026-11-06): mobile 92, desktop 100,
// Accessibility, Best Practices and SEO 100, CLS 0.
export const projects: Project[] = [
  {
    name: 'Portfolio',
    year: '2026',
    description:
      'Scored Lighthouse 92/100 on mobile/desktop and 100 on accessibility with a Frutiger Aero portfolio built in Next.js 16, Tailwind CSS v4, and GSAP: scroll-pinned storytelling, dark mode, reduced-motion fallbacks, and an ATS-friendly PDF resume generated in the browser.',
    url: 'https://jiwokristi.vercel.app',
  },
];

export const languages = ['English (Professional working proficiency)', 'Indonesian (Native)'];
