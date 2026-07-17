import React from 'react';

const VARIANTS = {
  primary:
    'bg-brand-600 text-white shadow-glow hover:bg-brand-700 focus-visible:ring-brand-500 disabled:bg-brand-300',
  secondary:
    'bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-400 dark:bg-night-elevated dark:text-slate-200 dark:hover:bg-night-border',
  outline:
    'border border-slate-300 text-slate-700 hover:bg-slate-50 focus-visible:ring-slate-400 dark:border-night-border dark:text-slate-200 dark:hover:bg-night-elevated',
  ghost:
    'text-slate-600 hover:bg-slate-100 focus-visible:ring-slate-400 dark:text-slate-300 dark:hover:bg-night-elevated',
  danger:
    'bg-rose-600 text-white hover:bg-rose-700 focus-visible:ring-rose-500 disabled:bg-rose-300',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
  icon: 'p-2',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-night-bg disabled:cursor-not-allowed disabled:opacity-60 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="h-4 w-4" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="h-4 w-4" />}
    </button>
  );
}
