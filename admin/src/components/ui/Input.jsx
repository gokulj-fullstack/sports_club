import React from 'react';

export default function Input({ label, error, icon: Icon, className = '', id, ...props }) {
  const inputId = id || props.name;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        )}
        <input
          id={inputId}
          className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:bg-night-elevated dark:text-slate-100 dark:placeholder:text-slate-500 ${
            error ? 'border-rose-400' : 'border-slate-300 dark:border-night-border'
          } ${Icon ? 'pl-9' : ''}`}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}
