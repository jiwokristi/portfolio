import type { CaseStudy, ProjectSummary } from '@/types/project';
import { projects } from '@/data/projects';

const projectModules: Record<string, () => Promise<{ [key: string]: CaseStudy }>> = {
  'apex-peptides': () => import('@/data/projects/apex-peptides'),
};

export async function getProject(slug: string): Promise<CaseStudy | null> {
  const loader = projectModules[slug];
  if (!loader) return null;

  const mod = await loader();
  const key = Object.keys(mod)[0];
  return mod[key] ?? null;
}

export function getAllProjects(): ProjectSummary[] {
  return [...projects].sort((a, b) => a.order - b.order);
}

export function getAllSlugs(): string[] {
  return projects.map(p => p.slug);
}
