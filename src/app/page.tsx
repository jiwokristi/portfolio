import { HeroSection } from "@/components/home/HeroSection";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { HomeCta } from "@/components/home/HomeCta";

import { getAllProjects, withSampleProjects } from "@/lib/projects";

export default function Home() {
  // Sample projects appear only in `next dev` with SAMPLE_PROJECTS set.
  const projects = withSampleProjects(getAllProjects());

  return (
    <>
      <HeroSection />
      <ProjectGrid projects={projects} />
      <HomeCta />
    </>
  );
}
