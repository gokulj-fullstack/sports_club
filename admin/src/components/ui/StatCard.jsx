import React from 'react';

const TONE_STYLES = {
  brand: 'bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400',
  emerald: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
  amber: 'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
  violet: 'bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400',
  rose: 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400',
};

export default function StatCard({ label, value, icon: Icon, tone = 'brand', trend, loading }) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-500 dark:text-slate-400">{label}</p>
          {loading ? (
            <div className="mt-2 h-7 w-24 animate-pulse rounded bg-slate-200 dark:bg-night-elevated" />
          ) : (
            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</p>
          )}
          {trend && !loading && (
            <p className={`mt-1.5 text-xs font-medium ${trend.positive ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {trend.positive ? '↑' : '↓'} {trend.label}
            </p>
          )}
        </div>
        {Icon && (
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${TONE_STYLES[tone]}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
    </div>
  );
}
