import type { CaseStudy, ProjectSummary } from '@/types/project';

import { projects } from '@/data/projects';

/** Lazy loaders for each project's full case study data, keyed by slug. */
const projectModules: Record<string, () => Promise<{ [key: string]: CaseStudy }>> = {
  'apex-peptides': () => import('@/data/projects/apex-peptides'),
};

/**
 * Loads the full case study data for a project by its slug.
 *
 * @param slug - The project's URL slug (e.g. `"apex-peptides"`).
 * @returns The case study object, or `null` if the slug is unknown.
 */
export async function getProject(slug: string): Promise<CaseStudy | null> {
  const loader = projectModules[slug];
  if (!loader) return null;

  const mod = await loader();
  const key = Object.keys(mod)[0];
  return mod[key] ?? null;
}

/**
 * Returns all project summaries sorted by their display order.
 *
 * @returns A sorted array of {@link ProjectSummary} objects.
 */
export function getAllProjects(): ProjectSummary[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

const SAMPLE_DESCRIPTIONS = [
  'A short sample description that fits on one line.',
  'A sample description long enough to run past two lines on most screens, so you can check the See more toggle, how the clamp behaves at different widths, and that expanding it never opens the case study by accident.',
];

/**
 * Development helper: appends placeholder projects so the grid's pagination and
 * "See more" toggle can be tried before real projects exist.
 *
 * Enabled only in `next dev`, by setting `SAMPLE_PROJECTS=<count>` (e.g. in `.env.local`).
 * Production builds always return the real list. Sample cards link to pages that don't exist.
 *
 * @param list - The real project summaries.
 * @returns The list, plus `SAMPLE_PROJECTS` samples when enabled.
 */
export function withSampleProjects(list: ProjectSummary[]): ProjectSummary[] {
  const count = Number(process.env.SAMPLE_PROJECTS);
  if (process.env.NODE_ENV !== 'development' || !Number.isInteger(count) || count <= 0 || !list[0]) return list;

  const samples = Array.from({ length: Math.min(count, 50) }, (_, i): ProjectSummary => ({
    ...list[0],
    slug: `sample-${i + 1}`,
    title: `Sample Project ${i + 1}`,
    description: SAMPLE_DESCRIPTIONS[i % SAMPLE_DESCRIPTIONS.length],
    order: list.length + i + 1,
    featured: false,
  }));
  return [...list, ...samples];
}

/**
 * Returns the slugs for every registered project.
 *
 * @returns An array of slug strings.
 */
export function getAllSlugs(): string[] {
  return projects.map(p => p.slug);
}
