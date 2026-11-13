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
  /** Short uppercase line above the title, e.g. "Ask better questions". */
  eyebrow: string;
  title: string;
  description: string;
};

export const philosophyCards: PhilosophyCard[] = [
  {
    label: "Purpose",
    title: "Understand the why before the what",
    description:
      "A feature is only worth the problem it solves. Before any layout or component, I learn the business, its goals and the people it's for. Good engineering isn't building more. It's building what matters.",
  },
  {
    label: "Foundations",
    title: "Great experiences start beneath the surface",
    description:
      "A beautiful interface is only half of it. The architecture underneath decides how easily a product evolves, how reliably it performs and how confidently a team can build on it. I choose what makes today better without limiting tomorrow.",
  },
  {
    label: "Detail",
    title: "Every detail shapes the experience",
    description:
      "How something responds. How clearly it speaks. The rhythm of an interaction. Small details decide whether someone feels comfortable, confident or curious enough to continue. They're never just details: they're how people experience a product and see a brand.",
  },
];

/**
 * Sequent vs the original store's front end: homepage Lighthouse scores, measured side by side
 * (Lighthouse 12.8.2, default settings, median of 3 runs, 2026-11-13). The original was measured without
 * its marketing scripts and product photos, so both sides compare front-end code only. Shown on the About page.
 */
export const evidenceMetrics: EvidenceMetric[] = [
  { label: "Mobile Performance", before: 28, after: 91 },
  { label: "Desktop Performance", before: 28, after: 100 },
  { label: "Accessibility", before: 84, after: 91 },
  { label: "Best Practices", before: 79, after: 100 },
];

export const stackCategories: StackCategory[] = [
  {
    label: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP", "Material UI"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"],
  },
  {
    label: "Tools",
    items: ["Git", "GitHub", "Figma", "Vite", "Vercel", "Linux"],
  },
];

export const values: Value[] = [
  {
    eyebrow: "Ask better questions",
    title: "Curiosity before assumptions",
    description:
      "I don't jump straight into code. I take time to understand the context, challenge assumptions and find the real problem. Better questions lead to better decisions.",
  },
  {
    eyebrow: "Keep it intentional",
    title: "Clarity over complexity",
    description:
      "Complex problems don't need complicated solutions. I aim for clear architecture, readable code and interfaces that make sense. A good solution makes things easier, not more layered.",
  },
  {
    eyebrow: "Sweat the small stuff",
    title: "Craft in every detail",
    description:
      "I care about what people notice and what they don't, from app structure and performance to spacing, transitions and interaction states. Every decision adds up to the quality of the whole.",
  },
  {
    eyebrow: "Think like a partner",
    title: "Ownership beyond implementation",
    description:
      "My job doesn't end when the code works. I care how the product performs in the real world, how it serves its users and how it moves the business forward, and I bring that to every collaboration.",
  },
];
