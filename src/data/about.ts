export type PhilosophyCard = {
  label: string;
  title: string;
  description: string;
};

export type EvidenceMetric = {
  label: string;
  before: number;
  after: number;
};

export type StackCategory = {
  label: string;
  items: string[];
};

export type Value = {
  title: string;
  description: string;
};

export const philosophyCards: PhilosophyCard[] = [
  {
    label: "// approach",
    title: "Start before you're ready",
    description:
      "I don't wait for perfect specs or complete information. I ship early, learn from what's real, and iterate. Shipping is how you prove your thinking works — not slide decks.",
  },
  {
    label: "// decisions",
    title: "The best features are removals",
    description:
      "The hardest UX decisions are about what you leave out. Fewer categories on the homepage, URL-based filters instead of modal dialogs, removing friction instead of adding features.",
  },
  {
    label: "// outcomes",
    title: "Good code is invisible",
    description:
      "Users never see your architecture. They feel a fast page, a clear flow, a button that does what they expect. That's the whole point — technology that disappears behind the experience.",
  },
];

export const evidenceMetrics: EvidenceMetric[] = [
  { label: "Mobile Performance", before: 25, after: 79 },
  { label: "Desktop Performance", before: 27, after: 98 },
  { label: "Accessibility", before: 76, after: 87 },
  { label: "Best Practices", before: 50, after: 100 },
];

export const stackCategories: StackCategory[] = [
  {
    label: "// frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Material UI"],
  },
  {
    label: "// backend",
    items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"],
  },
  {
    label: "// tools",
    items: ["Git", "GitHub", "Figma", "Vite", "Vercel", "Linux"],
  },
];

export const values: Value[] = [
  {
    title: "Ship first, polish in flight",
    description:
      "Bias toward action over analysis paralysis. Get something real in front of users, then refine based on what actually matters — not what you imagined would matter.",
  },
  {
    title: "Details compound",
    description:
      "A better hover state, a clearer label, a faster transition. None of these matter alone. Together, they're the difference between a product that feels right and one that feels off.",
  },
  {
    title: "Performance is a feature",
    description:
      "Not an afterthought, not a metric you check at the end. Every architectural decision either makes the page faster or slower. I choose faster by default.",
  },
  {
    title: "Business context matters",
    description:
      "Code that solves the wrong problem is waste. I care about why something needs to exist, who it's for, and what success looks like — before writing a single line.",
  },
];
