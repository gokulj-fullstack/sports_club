import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, IndianRupee, TrendingUp, CheckCircle2, XCircle } from 'lucide-react';
import Card, { CardHeader } from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';
import { Table, THead, TH, TBody, TR, TD } from '../components/ui/Table';
import { TableSkeleton, EmptyState } from '../components/ui/Loader';
import useDebounce from '../hooks/useDebounce';
import { listPayments } from '../api/payments';
import { formatCurrency, formatDateTime, titleCase } from '../utils/format';
import { PAYMENT_METHOD_OPTIONS } from '../utils/constants';

const STATUS_OPTIONS = [
  { value: 'success', label: 'Success', tone: 'success' },
  { value: 'pending', label: 'Pending', tone: 'warning' },
  { value: 'failed', label: 'Failed', tone: 'danger' },
  { value: 'refunded', label: 'Refunded', tone: 'info' },
];
const toneFor = (value) => STATUS_OPTIONS.find((o) => o.value === value)?.tone || 'default';

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [status, setStatus] = useState('');
  const [method, setMethod] = useState('');

  const params = useMemo(
    () => ({ search: debouncedSearch || undefined, status: status || undefined, method: method || undefined }),
    [debouncedSearch, status, method]
  );

  const fetchPayments = useCallback(() => {
    setLoading(true);
    setError('');
    listPayments(params)
      .then((data) => setPayments(Array.isArray(data) ? data : data.results || []))
      .catch(() => setError('Could not load payments. Is the backend running?'))
      .finally(() => setLoading(false));
  }, [params]);

  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  const summary = useMemo(() => {
    const success = payments.filter((p) => p.status === 'success');
    const total = success.reduce((sum, p) => sum + Number(p.amount || 0), 0);
    const failed = payments.filter((p) => p.status === 'failed').length;
    return { total, count: success.length, failed };
  }, [payments]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Revenue (filtered)" value={formatCurrency(summary.total)} icon={IndianRupee} tone="emerald" loading={loading} />
        <StatCard label="Successful Transactions" value={summary.count} icon={CheckCircle2} tone="brand" loading={loading} />
        <StatCard label="Failed Transactions" value={summary.failed} icon={XCircle} tone="rose" loading={loading} />
      </div>

      <Card padded={false}>
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
          <Input placeholder="Search by customer or transaction ID…" icon={Search} value={search} onChange={(e) => setSearch(e.target.value)} className="sm:w-72" />
          <Select placeholder="All statuses" options={STATUS_OPTIONS} value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-48" />
          <Select placeholder="All methods" options={PAYMENT_METHOD_OPTIONS} value={method} onChange={(e) => setMethod(e.target.value)} className="sm:w-48" />
        </div>
      </Card>

      <Card padded={false}>
        <div className="p-5 pb-0">
          <CardHeader title="Transaction History" />
        </div>
        {error && <div className="px-5 text-sm text-rose-600 dark:text-rose-400">{error}</div>}
        {loading ? (
          <TableSkeleton cols={6} />
        ) : payments.length === 0 ? (
          <EmptyState title="No transactions found" icon={TrendingUp} />
        ) : (
          <div className="p-5 pt-4">
            <Table>
              <THead>
                <TH>Customer</TH>
                <TH>Amount</TH>
                <TH>Method</TH>
                <TH>Status</TH>
                <TH>Transaction ID</TH>
                <TH>Date</TH>
              </THead>
              <TBody>
                {payments.map((p) => (
                  <TR key={p.id}>
                    <TD className="font-medium text-slate-800 dark:text-slate-100">{p.customer_name}</TD>
                    <TD>{formatCurrency(p.amount)}</TD>
                    <TD>{p.method_display || titleCase(p.method)}</TD>
                    <TD><Badge tone={toneFor(p.status)}>{p.status_display || titleCase(p.status)}</Badge></TD>
                    <TD className="font-mono text-xs text-slate-500 dark:text-slate-400">{p.transaction_id || '—'}</TD>
                    <TD>{formatDateTime(p.created_at)}</TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}
