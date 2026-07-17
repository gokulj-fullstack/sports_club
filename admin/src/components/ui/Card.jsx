import React from 'react';

export default function Card({ children, className = '', padded = true, ...props }) {
  return (
    <div className={`surface-card ${padded ? 'p-5' : ''} ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardHeader({ title, subtitle, actions }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-4">
      <div>
        <h3 className="text-base font-semibold text-slate-800 dark:text-slate-100">{title}</h3>
        {subtitle && <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
