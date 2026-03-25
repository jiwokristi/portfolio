'use client';

import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import { Button } from '@/components/ui/Button';
import { ResumePdf } from './ResumePdf';
import { contact } from '@/data/resume';

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
    <div className="sticky top-16 z-50 flex justify-center gap-2 border-b border-border bg-bg/80 px-6 py-3 backdrop-blur-md print:hidden">
      <Button variant="outlined" size="sm" onClick={() => window.print()}>
        Print
      </Button>
      <Button size="sm" onClick={handleDownload} disabled={loading}>
        {loading ? 'Generating...' : 'Download PDF'}
      </Button>
    </div>
  );
}
