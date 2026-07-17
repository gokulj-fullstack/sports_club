import React from 'react';
import { Inbox } from 'lucide-react';

export function Spinner({ className = 'h-5 w-5' }) {
  return (
    <svg className={`animate-spin text-brand-500 ${className}`} viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

export function PageLoader() {
  return (
    <div className="flex h-64 w-full items-center justify-center">
      <Spinner className="h-8 w-8" />
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 6 }) {
  return (
    <div className="space-y-2 p-4">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="flex gap-4">
          {Array.from({ length: cols }).map((_, c) => (
            <div key={c} className="h-8 flex-1 animate-pulse rounded-lg bg-slate-100 dark:bg-night-elevated" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function EmptyState({ title = 'Nothing here yet', subtitle, icon: Icon = Inbox, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-night-elevated dark:text-slate-500">
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">{title}</p>
      {subtitle && <p className="mt-1 max-w-sm text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
