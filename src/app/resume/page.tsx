import type { Metadata } from 'next';
import { ResumeDocument } from '@/components/resume/ResumeDocument';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Frontend-leaning Full-Stack Developer with experience in React, TypeScript, Node.js, and MongoDB.',
};

export default function ResumePage() {
  return <ResumeDocument />;
}
