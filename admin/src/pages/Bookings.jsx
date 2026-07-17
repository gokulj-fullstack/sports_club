import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Search, Plus, Eye, Pencil, Trash2, Filter } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { Table, THead, TH, TBody, TR, TD } from '../components/ui/Table';
import { TableSkeleton, EmptyState } from '../components/ui/Loader';
import useDebounce from '../hooks/useDebounce';
import { listBookings, updateBooking, createBooking, deleteBooking } from '../api/bookings';
import { formatCurrency, formatDate, titleCase } from '../utils/format';
import {
  FACILITY_OPTIONS, PAYMENT_STATUS_OPTIONS, BOOKING_STATUS_OPTIONS,
} from '../utils/constants';

const toneFor = (options, value) => options.find((o) => o.value === value)?.tone || 'default';

const emptyForm = {
  name: '', email: '', phone: '', facility: 'badminton_1', date: '', time_slot: '',
  hours: 1, amount: 0, payment_status: 'pending', booking_status: 'pending', message: '',
};

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [facility, setFacility] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [viewing, setViewing] = useState(null);
  const [editing, setEditing] = useState(null); // { mode: 'create' | 'edit', data }
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);

  const params = useMemo(
    () => ({
      search: debouncedSearch || undefined,
      facility: facility || undefined,
      payment_status: paymentStatus || undefined,
      booking_status: bookingStatus || undefined,
    }),
    [debouncedSearch, facility, paymentStatus, bookingStatus]
  );

  const fetchBookings = useCallback(() => {
    setLoading(true);
    setError('');
    listBookings(params)
      .then((data) => setBookings(Array.isArray(data) ? data : data.results || []))
      .catch(() => setError('Could not load bookings. Is the backend running?'))
      .finally(() => setLoading(false));
  }, [params]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  const openCreate = () => setEditing({ mode: 'create', data: { ...emptyForm } });
  const openEdit = (booking) => setEditing({ mode: 'edit', data: { ...booking } });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing.mode === 'create') {
        await createBooking(editing.data);
      } else {
        await updateBooking(editing.data.id, editing.data);
      }
      setEditing(null);
      fetchBookings();
    } catch (err) {
      alert(err?.response?.data ? JSON.stringify(err.response.data) : 'Failed to save booking.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await deleteBooking(deleting.id);
      setDeleting(null);
      fetchBookings();
    } catch {
      alert('Failed to delete booking.');
    } finally {
      setSaving(false);
    }
  };

  const updateField = (key, value) => setEditing((prev) => ({ ...prev, data: { ...prev.data, [key]: value } }));

  return (
    <div className="space-y-4">
      <Card padded={false}>
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              placeholder="Search by name, phone, or email…"
              icon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:w-72"
            />
            <Button variant="outline" icon={Filter} onClick={() => setShowFilters((v) => !v)}>
              Filters
            </Button>
          </div>
          <Button icon={Plus} onClick={openCreate}>
            New Booking
          </Button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 gap-3 border-t border-slate-100 p-5 dark:border-night-border sm:grid-cols-3">
            <Select
              placeholder="All facilities"
              options={FACILITY_OPTIONS}
              value={facility}
              onChange={(e) => setFacility(e.target.value)}
            />
            <Select
              placeholder="All payment statuses"
              options={PAYMENT_STATUS_OPTIONS}
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
            />
            <Select
              placeholder="All booking statuses"
              options={BOOKING_STATUS_OPTIONS}
              value={bookingStatus}
              onChange={(e) => setBookingStatus(e.target.value)}
            />
          </div>
        )}
      </Card>

      <Card padded={false}>
        {error && <div className="p-5 text-sm text-rose-600 dark:text-rose-400">{error}</div>}
        {loading ? (
          <TableSkeleton cols={9} />
        ) : bookings.length === 0 ? (
          <EmptyState title="No bookings found" subtitle="Try adjusting your search or filters." />
        ) : (
          <div className="p-5 pt-4">
            <Table>
              <THead>
                <TH>Customer</TH>
                <TH>Phone</TH>
                <TH>Sport</TH>
                <TH>Date</TH>
                <TH>Slot Time</TH>
                <TH>Amount</TH>
                <TH>Payment</TH>
                <TH>Status</TH>
                <TH className="text-right">Actions</TH>
              </THead>
              <TBody>
                {bookings.map((b) => (
                  <TR key={b.id}>
                    <TD className="font-medium text-slate-800 dark:text-slate-100">{b.name}</TD>
                    <TD>{b.phone}</TD>
                    <TD>{b.facility_display || titleCase(b.facility)}</TD>
                    <TD>{formatDate(b.date)}</TD>
                    <TD>{b.time_slot}{b.hours > 1 ? ` (+${b.hours}h)` : ''}</TD>
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
                    <TD>
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => setViewing(b)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-night-elevated" title="View">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button onClick={() => openEdit(b)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-night-elevated" title="Edit">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => setDeleting(b)} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10" title="Delete">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </div>
        )}
      </Card>

      {/* View modal */}
      <Modal open={!!viewing} onClose={() => setViewing(null)} title="Booking Details" size="sm">
        {viewing && (
          <dl className="space-y-3 text-sm">
            {[
              ['Customer', viewing.name],
              ['Email', viewing.email],
              ['Phone', viewing.phone],
              ['Facility', viewing.facility_display || titleCase(viewing.facility)],
              ['Date', formatDate(viewing.date)],
              ['Slot Time', viewing.time_slot],
              ['Duration', `${viewing.hours} hour(s)`],
              ['Amount', formatCurrency(viewing.amount)],
              ['Payment Status', viewing.payment_status_display || titleCase(viewing.payment_status)],
              ['Booking Status', viewing.booking_status_display || titleCase(viewing.booking_status)],
              ['Message', viewing.message || '—'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 border-b border-slate-100 pb-2 dark:border-night-border">
                <dt className="text-slate-500 dark:text-slate-400">{label}</dt>
                <dd className="text-right font-medium text-slate-800 dark:text-slate-100">{value}</dd>
              </div>
            ))}
          </dl>
        )}
      </Modal>

      {/* Create / Edit modal */}
      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.mode === 'create' ? 'New Booking' : 'Edit Booking'}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save Booking'}</Button>
          </>
        }
      >
        {editing && (
          <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Customer Name" value={editing.data.name} onChange={(e) => updateField('name', e.target.value)} required />
            <Input label="Phone" value={editing.data.phone} onChange={(e) => updateField('phone', e.target.value)} required />
            <Input label="Email" type="email" value={editing.data.email} onChange={(e) => updateField('email', e.target.value)} required />
            <Select label="Facility" options={FACILITY_OPTIONS} value={editing.data.facility} onChange={(e) => updateField('facility', e.target.value)} />
            <Input label="Date" type="date" value={editing.data.date} onChange={(e) => updateField('date', e.target.value)} required />
            <Input label="Slot Time" placeholder="e.g. 6:00 PM" value={editing.data.time_slot} onChange={(e) => updateField('time_slot', e.target.value)} required />
            <Input label="Hours" type="number" min={1} value={editing.data.hours} onChange={(e) => updateField('hours', Number(e.target.value))} />
            <Input label="Amount (₹)" type="number" min={0} value={editing.data.amount} onChange={(e) => updateField('amount', Number(e.target.value))} />
            <Select label="Payment Status" options={PAYMENT_STATUS_OPTIONS} value={editing.data.payment_status} onChange={(e) => updateField('payment_status', e.target.value)} />
            <Select label="Booking Status" options={BOOKING_STATUS_OPTIONS} value={editing.data.booking_status} onChange={(e) => updateField('booking_status', e.target.value)} />
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Notes</label>
              <textarea
                rows={3}
                value={editing.data.message}
                onChange={(e) => updateField('message', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-night-border dark:bg-night-elevated dark:text-slate-100"
              />
            </div>
          </form>
        )}
      </Modal>

      {/* Delete confirmation */}
      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Delete Booking"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleting(null)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete} disabled={saving}>{saving ? 'Deleting…' : 'Delete'}</Button>
          </>
        }
      >
        {deleting && (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Are you sure you want to delete the booking for <strong>{deleting.name}</strong> on {formatDate(deleting.date)}? This can't be undone.
          </p>
        )}
      </Modal>
    </div>
  );
}
