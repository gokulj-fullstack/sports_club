import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, Plus, Pencil, Trash2, Users } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { Table, THead, TH, TBody, TR, TD } from '../components/ui/Table';
import { TableSkeleton, EmptyState } from '../components/ui/Loader';
import useDebounce from '../hooks/useDebounce';
import { listMembers, createMember, updateMember, deleteMember } from '../api/members';
import { formatCurrency, formatDate, initials } from '../utils/format';
import { MEMBERSHIP_TYPE_OPTIONS, MEMBERSHIP_STATUS_OPTIONS } from '../utils/constants';

const toneFor = (value) => MEMBERSHIP_STATUS_OPTIONS.find((o) => o.value === value)?.tone || 'default';

const emptyForm = {
  name: '', phone: '', email: '', membership_type: 'gym_ac', start_date: '', end_date: '',
  amount_paid: 0, status: 'active', notes: '',
};

export default function Members() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [status, setStatus] = useState('');

  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);

  const params = useMemo(
    () => ({ search: debouncedSearch || undefined, status: status || undefined }),
    [debouncedSearch, status]
  );

  const fetchMembers = useCallback(() => {
    setLoading(true);
    setError('');
    listMembers(params)
      .then((data) => setMembers(Array.isArray(data) ? data : data.results || []))
      .catch(() => setError('Could not load members. Is the backend running?'))
      .finally(() => setLoading(false));
  }, [params]);

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const openCreate = () => setEditing({ mode: 'create', data: { ...emptyForm } });
  const openEdit = (m) => setEditing({ mode: 'edit', data: { ...m } });
  const updateField = (key, value) => setEditing((prev) => ({ ...prev, data: { ...prev.data, [key]: value } }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing.mode === 'create') {
        await createMember(editing.data);
      } else {
        await updateMember(editing.data.id, editing.data);
      }
      setEditing(null);
      fetchMembers();
    } catch (err) {
      alert(err?.response?.data ? JSON.stringify(err.response.data) : 'Failed to save member.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await deleteMember(deleting.id);
      setDeleting(null);
      fetchMembers();
    } catch {
      alert('Failed to delete member.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card padded={false}>
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row">
            <Input placeholder="Search by name, phone, or email…" icon={Search} value={search} onChange={(e) => setSearch(e.target.value)} className="sm:w-72" />
            <Select placeholder="All statuses" options={MEMBERSHIP_STATUS_OPTIONS} value={status} onChange={(e) => setStatus(e.target.value)} className="sm:w-56" />
          </div>
          <Button icon={Plus} onClick={openCreate}>Add Member</Button>
        </div>
      </Card>

      <Card padded={false}>
        {error && <div className="p-5 text-sm text-rose-600 dark:text-rose-400">{error}</div>}
        {loading ? (
          <TableSkeleton cols={7} />
        ) : members.length === 0 ? (
          <EmptyState title="No members yet" icon={Users} subtitle="Add your first gym membership record." action={<Button icon={Plus} onClick={openCreate}>Add Member</Button>} />
        ) : (
          <div className="p-5 pt-4">
            <Table>
              <THead>
                <TH>Member</TH>
                <TH>Phone</TH>
                <TH>Plan</TH>
                <TH>Start</TH>
                <TH>Expires</TH>
                <TH>Paid</TH>
                <TH>Status</TH>
                <TH className="text-right">Actions</TH>
              </THead>
              <TBody>
                {members.map((m) => (
                  <TR key={m.id}>
                    <TD>
                      <div className="flex items-center gap-2.5">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-bold text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                          {initials(m.name)}
                        </div>
                        <span className="font-medium text-slate-800 dark:text-slate-100">{m.name}</span>
                      </div>
                    </TD>
                    <TD>{m.phone}</TD>
                    <TD>{m.membership_type_display}</TD>
                    <TD>{formatDate(m.start_date)}</TD>
                    <TD>{formatDate(m.end_date)}</TD>
                    <TD>{formatCurrency(m.amount_paid)}</TD>
                    <TD><Badge tone={toneFor(m.status)}>{m.status_display}</Badge></TD>
                    <TD>
                      <div className="flex items-center justify-end gap-1">
                        <button onClick={() => openEdit(m)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-night-elevated" title="Edit">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => setDeleting(m)} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10" title="Delete">
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

      <Modal
        open={!!editing}
        onClose={() => setEditing(null)}
        title={editing?.mode === 'create' ? 'Add Member' : 'Edit Member'}
        size="lg"
        footer={
          <>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save Member'}</Button>
          </>
        }
      >
        {editing && (
          <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Input label="Full Name" value={editing.data.name} onChange={(e) => updateField('name', e.target.value)} required />
            <Input label="Phone" value={editing.data.phone} onChange={(e) => updateField('phone', e.target.value)} required />
            <Input label="Email" type="email" value={editing.data.email} onChange={(e) => updateField('email', e.target.value)} />
            <Select label="Membership Plan" options={MEMBERSHIP_TYPE_OPTIONS} value={editing.data.membership_type} onChange={(e) => updateField('membership_type', e.target.value)} />
            <Input label="Start Date" type="date" value={editing.data.start_date} onChange={(e) => updateField('start_date', e.target.value)} required />
            <Input label="End Date" type="date" value={editing.data.end_date} onChange={(e) => updateField('end_date', e.target.value)} required />
            <Input label="Amount Paid (₹)" type="number" min={0} value={editing.data.amount_paid} onChange={(e) => updateField('amount_paid', Number(e.target.value))} />
            <Select label="Status" options={MEMBERSHIP_STATUS_OPTIONS} value={editing.data.status} onChange={(e) => updateField('status', e.target.value)} />
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Notes</label>
              <textarea
                rows={3}
                value={editing.data.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-night-border dark:bg-night-elevated dark:text-slate-100"
              />
            </div>
          </form>
        )}
      </Modal>

      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Remove Member"
        size="sm"
        footer={
          <>
            <Button variant="outline" onClick={() => setDeleting(null)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete} disabled={saving}>{saving ? 'Removing…' : 'Remove'}</Button>
          </>
        }
      >
        {deleting && (
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Remove <strong>{deleting.name}</strong>'s membership record? This can't be undone.
          </p>
        )}
      </Modal>
    </div>
  );
}
