import { HeroSection } from "@/components/home/HeroSection";
import { ProjectGrid } from "@/components/home/ProjectGrid";
import { HomeCta } from "@/components/home/HomeCta";
import { ThreeSeconds } from "@/components/home/ThreeSeconds";

import { getAllProjects, withSampleProjects } from "@/lib/projects";

export default function Home() {
  // Sample projects appear only in `next dev` with SAMPLE_PROJECTS set.
  const projects = withSampleProjects(getAllProjects());

  return (
    <>
      <HeroSection />
      <ThreeSeconds />
      <ProjectGrid projects={projects} />
      <HomeCta />
    </>
  );
}
