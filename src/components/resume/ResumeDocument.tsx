'use client';

import { useEffect } from 'react';

import { DownloadResumeButton } from './DownloadResumeButton';
import { ResumePrint } from './ResumePrint';
import { ResumeScreen } from './ResumeScreen';

/**
 * The resume page has two renderings of the same data:
 * - ResumeScreen: the Aero design, shown on screen only.
 * - ResumePrint: the legacy layout, shown only when printing, so `window.print()` output is unchanged.
 * The "Download PDF" file is generated separately by ResumePdf (@react-pdf) and is not affected by either.
 */
export function ResumeDocument() {
  // Print uses Inter, which nothing on screen uses, so the browser wouldn't fetch it until print time
  // and could print with a fallback font. Load it up front.
  useEffect(() => {
    document.fonts?.load('400 1em "Inter Variable"').catch(() => {});
  }, []);

  return (
    <>
      <DownloadResumeButton />
      <ResumeScreen />
      <ResumePrint />
    </>
  );
}
