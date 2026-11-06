import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { AboutPhilosophy } from '@/components/about/AboutPhilosophy';
import { AboutEvidence } from '@/components/about/AboutEvidence';
import { AboutStack } from '@/components/about/AboutStack';
import { AboutValues } from '@/components/about/AboutValues';
import { AboutCta } from '@/components/about/AboutCta';

export const metadata: Metadata = {
  title: 'About',
  description: 'How I work: why the details matter, the philosophy behind them, and the values I build by.',
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
