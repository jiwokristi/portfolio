import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  /** Small uppercase label above the title, e.g. "Philosophy". */
  eyebrow: string;
  title: string;
  /** Eyebrow colour: sky blue (default) or leaf green. */
  tone?: 'accent' | 'leaf';
  className?: string;
};

/** Eyebrow + section title used across the Aero pages. */
export function SectionHeading({ eyebrow, title, tone = 'accent', className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-8 space-y-2', className)}>
      <p
        className={cn(
          'text-[13px] font-extrabold tracking-[0.14em] uppercase',
          tone === 'leaf' ? 'text-leaf' : 'text-accent',
        )}
      >
        {eyebrow}
      </p>
      <h2 className="text-h2 font-black tracking-[-0.02em]">{title}</h2>
    </div>
  );
}
