export interface ProjectMetric {
  label: string;
  before: number;
  /** Optional middle measurement (e.g. a first build before an optimization pass). */
  interim?: number;
  after: number;
  unit?: string;
  description?: string;
}

/** Names for the measurement stages shown with the metrics, e.g. "Original store" → "First build" → "Final". */
export interface MetricStages {
  before: string;
  interim?: string;
  after: string;
}

/** A side-by-side fact that isn't a 0–100 score (page weight, request count…). */
export interface MetricComparison {
  label: string;
  before: string;
  after: string;
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
  previewVideo?: string;
  featured: boolean;
  order: number;
}

export interface CaseStudy extends ProjectMeta {
  heroImage: ProjectImage;
  problem: string;
  solution: string;
  metrics: ProjectMetric[];
  metricStages?: MetricStages;
  /** Extra before/after facts shown under the score bars (labelled with metricStages.before / .after). */
  metricComparisons?: MetricComparison[];
  /** How the numbers were measured, shown as footnotes under the metrics. */
  metricNotes?: string[];
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
