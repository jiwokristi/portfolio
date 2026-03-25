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

/**
 * Returns the slugs for every registered project.
 *
 * @returns An array of slug strings.
 */
export function getAllSlugs(): string[] {
  return projects.map(p => p.slug);
}
