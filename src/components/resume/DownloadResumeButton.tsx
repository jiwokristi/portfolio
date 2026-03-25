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
    <div className="fixed right-6 bottom-6 flex gap-2 print:hidden">
      <Button variant="outlined" size="sm" onClick={() => window.print()}>
        Print
      </Button>
      <Button size="sm" onClick={handleDownload} disabled={loading}>
        {loading ? 'Generating...' : 'Download PDF'}
      </Button>
    </div>
  );
}
