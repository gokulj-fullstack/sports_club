import React from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface-subtle px-4 text-center dark:bg-night-bg">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
        <Compass className="h-8 w-8" />
      </div>
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Page not found</h1>
      <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
        The page you're looking for doesn't exist or may have been moved.
      </p>
      <Link to="/" className="mt-6">
        <Button>Back to dashboard</Button>
      </Link>
    </div>
  );
}
