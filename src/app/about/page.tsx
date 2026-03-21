import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { AboutPhilosophy } from "@/components/about/AboutPhilosophy";
import { AboutEvidence } from "@/components/about/AboutEvidence";
import { AboutStack } from "@/components/about/AboutStack";
import { AboutValues } from "@/components/about/AboutValues";
import { AboutCta } from "@/components/about/AboutCta";

export const metadata: Metadata = {
  title: "About — Jiwo Kristi",
  description:
    "How I think about building software — approach, philosophy, and the evidence behind it.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutPhilosophy />
      <AboutEvidence />
      <AboutStack />
      <AboutValues />
      <AboutCta />
    </>
  );
}
