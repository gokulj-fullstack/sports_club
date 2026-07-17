import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Select({ label, error, options = [], placeholder, className = '', id, ...props }) {
  const selectId = id || props.name;
  return (
    <div className={className}>
      {label && (
        <label htmlFor={selectId} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={`w-full appearance-none rounded-xl border bg-white px-3.5 py-2.5 pr-9 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:bg-night-elevated dark:text-slate-100 ${
            error ? 'border-rose-400' : 'border-slate-300 dark:border-night-border'
          }`}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      </div>
      {error && <p className="mt-1 text-xs text-rose-500">{error}</p>}
    </div>
  );
}
