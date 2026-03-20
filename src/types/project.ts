export interface ProjectMetric {
  label: string;
  before: number;
  after: number;
  unit?: string;
  description?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export interface ProcessPhase {
  title: string;
  description: string;
  image?: ProjectImage;
  highlights?: string[];
}

export interface ProjectFeature {
  title: string;
  description: string;
  image?: ProjectImage;
  tags?: string[];
}

export interface ProjectMeta {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  role: string;
  timeline: string;
  year: number;
  techStack: string[];
  liveUrl?: string;
  featured: boolean;
  order: number;
}

export interface CaseStudy extends ProjectMeta {
  heroImage: ProjectImage;
  problem: string;
  solution: string;
  metrics: ProjectMetric[];
  process: ProcessPhase[];
  features: ProjectFeature[];
  results: {
    summary: string;
    outcomes: string[];
    lessonsLearned?: string[];
  };
}

export type ProjectSummary = ProjectMeta & {
  heroImage: ProjectImage;
  metrics: Pick<ProjectMetric, "label" | "after">[];
};
