import { evidenceMetrics } from '@/data/about';

function CheckIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L4 14h7l-1 8 9-12h-7z" />
    </svg>
  );
}

const find = (label: string) => evidenceMetrics.find(m => m.label === label);

/**
 * Decorative glossy globe with floating Lighthouse stats.
 * The stats repeat data shown in the project card, so the whole block is hidden from assistive tech.
 */
export function HeroOrb() {
  const desktop = find('Desktop Performance');
  const mobile = find('Mobile Performance');
  const practices = find('Best Practices');

  const stats = [
    desktop && { value: `${desktop.after}`, label: desktop.label, icon: <CheckIcon />, green: true, pos: 'left-0 top-10' },
    mobile && { value: `${mobile.before} → ${mobile.after}`, label: 'Mobile Lighthouse', icon: <BoltIcon />, green: false, pos: 'right-0 top-[11rem]' },
    practices && { value: `${practices.after}`, label: practices.label, icon: <CheckIcon />, green: true, pos: 'left-8 bottom-12' },
  ].filter(Boolean) as { value: string; label: string; icon: React.ReactNode; green: boolean; pos: string }[];

  return (
    <div aria-hidden="true" className="relative h-[460px] min-w-0 flex-[1_1_400px] max-sm:hidden">
      {/* Globe */}
      <div className="absolute top-1/2 left-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full dark:brightness-[.7] dark:saturate-[.85] bg-[radial-gradient(circle_at_34%_26%,#ffffff_0,#e8f8ff_10%,#8fd6fa_34%,#2a9de6_62%,#0a5fae_100%)] shadow-[inset_-24px_-30px_60px_rgba(0,50,110,.35),inset_18px_18px_40px_rgba(255,255,255,.55),0_40px_60px_rgba(10,90,160,.28)]">
        <div className="absolute -bottom-[12%] -left-[10%] h-[52%] w-[120%] rounded-t-[50%] bg-[linear-gradient(180deg,#8be06a_0%,#3fae34_55%,#1f7a22_100%)] shadow-[inset_0_10px_20px_rgba(255,255,255,.45)]" />
        <div className="absolute top-[6%] left-[14%] h-[30%] w-[56%] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,.9),rgba(255,255,255,0))]" />
      </div>
      <div className="absolute bottom-6 left-1/2 h-6 w-[300px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(10,70,130,.25),transparent_70%)]" />

      {stats.map((s, i) => (
        <div
          key={s.label}
          className={`glass absolute ${s.pos} flex items-center gap-3 rounded-[20px] px-[18px] py-3.5 motion-safe:animate-[float_8s_ease-in-out_infinite]`}
          style={{ animationDelay: `${i * 1.2}s` }}
        >
          <span className={`${s.green ? 'orb-green' : 'orb'} flex h-9 w-9 items-center justify-center`}>{s.icon}</span>
          <div className="flex flex-col">
            <span className="font-display text-2xl font-black">{s.value}</span>
            <span className="text-xs font-bold text-text-muted">{s.label}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
