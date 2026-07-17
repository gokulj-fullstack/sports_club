import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, CalendarClock, Clock3, CreditCard, Users, BarChart3, Trophy, X, Coins,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/bookings', label: 'Bookings', icon: CalendarClock },
  { to: '/slots', label: 'Slot Management', icon: Clock3 },
  { to: '/payments', label: 'Payments', icon: CreditCard },
  { to: '/members', label: 'Members', icon: Users },
  { to: '/pricing', label: 'Pricing Settings', icon: Coins },
  { to: '/reports', label: 'Reports', icon: BarChart3 },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-200 bg-white transition-transform duration-300 dark:border-night-border dark:bg-night-surface lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 px-5 dark:border-night-border">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
              <Trophy className="h-[18px] w-[18px]" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold text-slate-800 dark:text-white">King Sports Club</p>
              <p className="text-[11px] font-medium uppercase tracking-wide text-slate-400 dark:text-slate-500">Admin Panel</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-night-elevated lg:hidden">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  isActive
                    ? 'bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400'
                    : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-night-elevated'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`h-[18px] w-[18px] ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-400'}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-4 dark:border-night-border">
          <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-500 dark:bg-night-elevated dark:text-slate-400">
            <p className="font-semibold text-slate-600 dark:text-slate-300">Padappai, Chennai</p>
            <p>Gym · Turf · Badminton</p>
          </div>
        </div>
      </aside>
    </>
  );
}
