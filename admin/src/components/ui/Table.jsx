import React from 'react';

export function Table({ children, className = '' }) {
  return (
    <div className={`overflow-x-auto rounded-2xl border border-slate-200/70 dark:border-night-border ${className}`}>
      <table className="w-full min-w-[720px] text-left text-sm">{children}</table>
    </div>
  );
}

export function THead({ children }) {
  return (
    <thead className="border-b border-slate-200 bg-slate-50/80 dark:border-night-border dark:bg-night-elevated/60">
      <tr>{children}</tr>
    </thead>
  );
}

export function TH({ children, className = '' }) {
  return (
    <th className={`px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400 ${className}`}>
      {children}
    </th>
  );
}

export function TBody({ children }) {
  return <tbody className="divide-y divide-slate-100 dark:divide-night-border">{children}</tbody>;
}

export function TR({ children, className = '' }) {
  return (
    <tr className={`bg-white transition hover:bg-slate-50/80 dark:bg-night-surface dark:hover:bg-night-elevated/50 ${className}`}>
      {children}
    </tr>
  );
}

export function TD({ children, className = '' }) {
  return <td className={`px-4 py-3.5 text-slate-700 dark:text-slate-300 ${className}`}>{children}</td>;
}
