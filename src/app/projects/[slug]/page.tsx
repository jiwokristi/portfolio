import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, getAllSlugs, getAllProjects } from "@/lib/projects";
import { CsHero } from "@/components/case-study/CsHero";
import { CsOverview } from "@/components/case-study/CsOverview";
import { CsMetrics } from "@/components/case-study/CsMetrics";
import { CsProcess } from "@/components/case-study/CsProcess";
import { CsFeatures } from "@/components/case-study/CsFeatures";
import { CsResults } from "@/components/case-study/CsResults";
import { CsNavigation } from "@/components/case-study/CsNavigation";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prev = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const next = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <>
      <CsHero
        title={project.title}
        subtitle={project.subtitle}
        category={project.category}
        heroImage={project.heroImage}
        metrics={project.metrics}
      />
      <CsOverview
        problem={project.problem}
        solution={project.solution}
        role={project.role}
        timeline={project.timeline}
        year={project.year}
        techStack={project.techStack}
        liveUrl={project.liveUrl}
      />
      <CsMetrics metrics={project.metrics} />
      <CsProcess process={project.process} />
      <CsFeatures features={project.features} />
      <CsResults
        summary={project.results.summary}
        outcomes={project.results.outcomes}
        lessonsLearned={project.results.lessonsLearned}
      />
      <CsNavigation prev={prev} next={next} />
    </>
  );
}
