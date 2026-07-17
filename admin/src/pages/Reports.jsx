import React, { useEffect, useState } from 'react';
import { CalendarDays, CalendarRange, Calendar } from 'lucide-react';
import Card, { CardHeader } from '../components/ui/Card';
import RevenueChart from '../components/charts/RevenueChart';
import BookingsBarChart from '../components/charts/BookingsBarChart';
import { EmptyState } from '../components/ui/Loader';
import { getReportsAnalytics } from '../api/stats';
import { formatCurrency, titleCase } from '../utils/format';

const TABS = [
  { key: 'daily', label: 'Daily', icon: CalendarDays, subtitle: 'Last 30 days' },
  { key: 'weekly', label: 'Weekly', icon: CalendarRange, subtitle: 'Last 12 weeks' },
  { key: 'monthly', label: 'Monthly', icon: Calendar, subtitle: 'Last 12 months' },
];

export default function Reports() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [tab, setTab] = useState('daily');

  useEffect(() => {
    getReportsAnalytics()
      .then(setData)
      .catch(() => setError('Could not load report analytics. Is the backend running?'))
      .finally(() => setLoading(false));
  }, []);

  const activeSeries = data?.[tab] || [];
  const activeTab = TABS.find((t) => t.key === tab);

  const totalRevenue = activeSeries.reduce((sum, d) => sum + Number(d.revenue || 0), 0);
  const totalBookings = activeSeries.reduce((sum, d) => sum + Number(d.bookings || 0), 0);

  return (
    <div className="space-y-6">
      {error && <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">{error}</div>}

      <div className="flex flex-wrap gap-2">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${
              tab === key
                ? 'bg-brand-600 text-white shadow-glow'
                : 'surface-card text-slate-600 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-night-elevated'
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Revenue — {activeTab.subtitle}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{loading ? '—' : formatCurrency(totalRevenue)}</p>
        </Card>
        <Card>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Bookings — {activeTab.subtitle}</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{loading ? '—' : totalBookings}</p>
        </Card>
      </div>

      <Card>
        <CardHeader title="Revenue Trend" subtitle={activeTab.subtitle} />
        {loading ? (
          <div className="h-[280px] animate-pulse rounded-xl bg-slate-100 dark:bg-night-elevated" />
        ) : activeSeries.length ? (
          <RevenueChart data={activeSeries} />
        ) : (
          <EmptyState title="No revenue data yet" />
        )}
      </Card>

      <Card>
        <CardHeader title="Booking Volume" subtitle={activeTab.subtitle} />
        {loading ? (
          <div className="h-[280px] animate-pulse rounded-xl bg-slate-100 dark:bg-night-elevated" />
        ) : activeSeries.length ? (
          <BookingsBarChart data={activeSeries} />
        ) : (
          <EmptyState title="No booking data yet" />
        )}
      </Card>

      {!loading && data?.facility_breakdown?.length > 0 && (
        <Card padded={false}>
          <div className="p-5 pb-0">
            <CardHeader title="Revenue by Facility" subtitle="All-time breakdown" />
          </div>
          <div className="divide-y divide-slate-100 px-5 pb-5 dark:divide-night-border">
            {data.facility_breakdown.map((f) => (
              <div key={f.facility} className="flex items-center justify-between py-3">
                <span className="text-sm text-slate-600 dark:text-slate-300">{titleCase(f.facility)}</span>
                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{formatCurrency(f.revenue)}</p>
                  <p className="text-xs text-slate-400">{f.count} bookings</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
