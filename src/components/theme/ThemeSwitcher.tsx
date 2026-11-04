'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { useTheme } from 'next-themes';

import { cn } from '@/lib/utils';

import { SunIcon, MoonIcon, MonitorIcon } from './ThemeIcons';

const themes = [
  { value: 'light', label: 'Light', icon: SunIcon },
  { value: 'dark', label: 'Dark', icon: MoonIcon },
  { value: 'system', label: 'System', icon: MonitorIcon },
] as const;

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const ActiveIcon = mounted ? (resolvedTheme === 'dark' ? MoonIcon : SunIcon) : MonitorIcon;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          'flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/90 transition-[filter] hover:brightness-110',
          mounted && resolvedTheme === 'dark'
            ? 'orb text-white'
            : 'bg-[radial-gradient(circle_at_35%_25%,#ffffff_0,#fff6c9_30%,#ffc93a_75%,#e59a00_100%)] text-[#7a4a00] shadow-[inset_0_-3px_6px_rgba(160,90,0,.3),0_4px_10px_rgba(200,130,0,.3)]',
        )}
        aria-label="Toggle theme"
      >
        <ActiveIcon width={20} height={20} />
      </button>

      {open && (
        <div role="menu" className="glass absolute right-0 z-50 mt-3 w-40 overflow-hidden rounded-2xl p-1.5">
          {themes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              role="menuitem"
              onClick={() => {
                setTheme(value);
                setOpen(false);
              }}
              className={cn(
                'flex min-h-10 w-full cursor-pointer items-center gap-2 rounded-xl px-3 text-sm font-bold transition-colors',
                theme === value
                  ? 'chip text-accent'
                  : 'text-text-secondary hover:bg-white/50 hover:text-text-primary dark:hover:bg-white/10',
              )}
            >
              <Icon />
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
