import React, { useState } from 'react';
import { Menu, Bell, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { initials } from '../../utils/format';

export default function Topbar({ onMenuClick, title }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md dark:border-night-border dark:bg-night-bg/80 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-night-elevated lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="text-lg font-semibold text-slate-800 dark:text-white">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative rounded-xl p-2 text-slate-500 transition hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-night-elevated">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-night-bg" />
        </button>

        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 py-1.5 pl-1.5 pr-2.5 transition hover:bg-slate-50 dark:border-night-border dark:hover:bg-night-elevated"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 text-xs font-bold text-white">
              {initials(user?.first_name ? `${user.first_name} ${user.last_name}` : user?.email) || 'A'}
            </div>
            <span className="hidden text-sm font-medium text-slate-700 dark:text-slate-200 sm:block">
              {user?.first_name || user?.email?.split('@')[0] || 'Admin'}
            </span>
            <ChevronDown className="hidden h-4 w-4 text-slate-400 sm:block" />
          </button>

          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 z-20 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 shadow-lg animate-fade-in dark:border-night-border dark:bg-night-surface">
                <div className="border-b border-slate-100 px-3.5 py-2.5 dark:border-night-border">
                  <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">{user?.email}</p>
                  <p className="text-xs text-slate-400">Administrator</p>
                </div>
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-2 px-3.5 py-2.5 text-sm text-rose-600 transition hover:bg-rose-50 dark:hover:bg-rose-500/10"
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
