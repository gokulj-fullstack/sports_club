import React from 'react';

const TONES = {
  success: 'bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-400 dark:ring-emerald-400/20',
  warning: 'bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:ring-amber-400/20',
  danger: 'bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-400/10 dark:text-rose-400 dark:ring-rose-400/20',
  info: 'bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-400/10 dark:text-sky-400 dark:ring-sky-400/20',
  default: 'bg-slate-100 text-slate-600 ring-slate-500/20 dark:bg-slate-400/10 dark:text-slate-300 dark:ring-slate-400/20',
};

const DOT = {
  success: 'bg-emerald-500',
  warning: 'bg-amber-500',
  danger: 'bg-rose-500',
  info: 'bg-sky-500',
  default: 'bg-slate-400',
};

export default function Badge({ tone = 'default', children, dot = true, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${TONES[tone] || TONES.default} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${DOT[tone] || DOT.default}`} />}
      {children}
    </span>
  );
}
