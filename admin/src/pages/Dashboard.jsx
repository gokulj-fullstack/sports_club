import React, { useEffect, useState } from 'react';
import {
  Wallet, TrendingUp, CalendarCheck, Users, IndianRupee, AlertTriangle,
} from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import Card, { CardHeader } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { EmptyState } from '../components/ui/Loader';
import { Table, THead, TH, TBody, TR, TD } from '../components/ui/Table';
import BookingsBarChart from '../components/charts/BookingsBarChart';
import FacilityPieChart from '../components/charts/FacilityPieChart';
import { getDashboardStats } from '../api/stats';
import { formatCurrency, formatDate, titleCase } from '../utils/format';
import { PAYMENT_STATUS_OPTIONS, BOOKING_STATUS_OPTIONS } from '../utils/constants';

const toneFor = (options, value) => options.find((o) => o.value === value)?.tone || 'default';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    getDashboardStats()
      .then((data) => mounted && setStats(data))
      .catch(() => mounted && setError('Could not load dashboard stats. Is the backend running?'))
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const statusChartData = (stats?.bookings_by_status || []).map((s) => ({
    label: titleCase(s.booking_status || 'unknown'),
    bookings: s.count,
  }));

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
          <AlertTriangle className="h-4 w-4 shrink-0" /> {error}
        </div>
      )}

      {/* Top stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCard label="Total Bookings" value={stats?.total_bookings ?? '—'} icon={CalendarCheck} tone="brand" loading={loading} />
        <StatCard label="Today's Revenue" value={formatCurrency(stats?.today_revenue)} icon={IndianRupee} tone="emerald" loading={loading} />
        <StatCard label="Monthly Revenue" value={formatCurrency(stats?.monthly_revenue)} icon={TrendingUp} tone="violet" loading={loading} />
        <StatCard label="Active Members" value={stats?.active_members ?? '—'} icon={Users} tone="amber" loading={loading} />
        <StatCard label="Facilities Tracked" value={(stats?.bookings_by_facility || []).length || '—'} icon={Wallet} tone="rose" loading={loading} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-5">
        <Card className="xl:col-span-3">
          <CardHeader title="Booking Statistics" subtitle="Bookings grouped by status" />
          {loading ? (
            <div className="h-[280px] animate-pulse rounded-xl bg-slate-100 dark:bg-night-elevated" />
          ) : statusChartData.length ? (
            <BookingsBarChart data={statusChartData} />
          ) : (
            <EmptyState title="No bookings yet" subtitle="Once bookings come in, status breakdown will show here." />
          )}
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader title="Facility Split" subtitle="Bookings by facility" />
          {loading ? (
            <div className="h-[280px] animate-pulse rounded-xl bg-slate-100 dark:bg-night-elevated" />
          ) : (stats?.bookings_by_facility || []).length ? (
            <FacilityPieChart data={stats.bookings_by_facility} />
          ) : (
            <EmptyState title="No data yet" />
          )}
        </Card>
      </div>

      {/* Recent bookings */}
      <Card padded={false}>
        <div className="p-5 pb-0">
          <CardHeader title="Recent Bookings" subtitle="Latest activity across all facilities" />
        </div>
        {loading ? (
          <div className="space-y-2 p-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-10 animate-pulse rounded-lg bg-slate-100 dark:bg-night-elevated" />
            ))}
          </div>
        ) : (stats?.recent_bookings || []).length ? (
          <div className="p-5 pt-0">
            <Table>
              <THead>
                <TH>Customer</TH>
                <TH>Facility</TH>
                <TH>Date</TH>
                <TH>Amount</TH>
                <TH>Payment</TH>
                <TH>Status</TH>
              </THead>
              <TBody>
                {stats.recent_bookings.map((b) => (
                  <TR key={b.id}>
                    <TD className="font-medium text-slate-800 dark:text-slate-100">{b.name}</TD>
                    <TD>{b.facility_display || titleCase(b.facility)}</TD>
                    <TD>{formatDate(b.date)}</TD>
                    <TD>{formatCurrency(b.amount)}</TD>
                    <TD>
                      <Badge tone={toneFor(PAYMENT_STATUS_OPTIONS, b.payment_status)}>
                        {b.payment_status_display || titleCase(b.payment_status)}
                      </Badge>
                    </TD>
                    <TD>
                      <Badge tone={toneFor(BOOKING_STATUS_OPTIONS, b.booking_status)}>
                        {b.booking_status_display || titleCase(b.booking_status)}
                      </Badge>
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </div>
        ) : (
          <EmptyState title="No bookings yet" subtitle="New bookings from the site will appear here in real time." />
        )}
      </Card>
    </div>
  );
}
