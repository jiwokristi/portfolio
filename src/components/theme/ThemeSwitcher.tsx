'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { SunIcon, MoonIcon, MonitorIcon } from './ThemeIcons';

const themes = [
  { value: 'light', label: 'Light', icon: SunIcon },
  { value: 'dark', label: 'Dark', icon: MoonIcon },
  { value: 'system', label: 'System', icon: MonitorIcon },
] as const;

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

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
        className="cursor-pointer text-text-secondary transition-colors hover:text-text-primary"
        aria-label="Toggle theme"
      >
        <ActiveIcon />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-lg border border-border bg-surface py-1 shadow-lg">
          {themes.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => {
                setTheme(value);
                setOpen(false);
              }}
              className={cn(
                'flex w-full cursor-pointer items-center gap-2 px-3 py-1.5 text-sm transition-colors',
                theme === value ? 'text-accent' : 'text-text-secondary hover:text-text-primary',
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
