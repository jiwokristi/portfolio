'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';

import { Button } from '@/components/ui/Button';

import { contact } from '@/data/resume';

import { ResumePdf } from './ResumePdf';

export function DownloadResumeButton() {
  const [loading, setLoading] = useState(false);

  async function handleDownload() {
    setLoading(true);
    try {
      const blob = await pdf(<ResumePdf />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${contact.name.replace(/\s+/g, '_')}_Resume.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  }

  return (
    // Floating glass action bar, pinned just under the fixed header. Never printed.
    <div className="sticky top-24 z-50 mx-auto w-full max-w-237 px-6 print:hidden">
      <div className="glass flex flex-wrap items-center justify-between gap-3 rounded-[20px] py-2.5 pr-2.5 pl-5">
        <span className="font-display text-sm font-extrabold">Resume</span>
        <div className="flex flex-wrap gap-2.5">
          <Button variant="outlined" size="sm" className="min-h-11" onClick={() => window.print()}>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9V3h12v6" />
              <rect x="3" y="9" width="18" height="8" rx="2" />
              <path d="M6 14h12v7H6z" />
            </svg>
            Print
          </Button>
          <Button size="sm" className="min-h-11" onClick={handleDownload} disabled={loading}>
            <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
            </svg>
            {loading ? 'Generating...' : 'Download PDF'}
          </Button>
        </div>
      </div>
    </div>
  );
}
