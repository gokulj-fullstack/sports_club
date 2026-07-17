import React, { useCallback, useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Power } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { Table, THead, TH, TBody, TR, TD } from '../components/ui/Table';
import { TableSkeleton, EmptyState } from '../components/ui/Loader';
import { listSlots, createSlot, updateSlot, deleteSlot, toggleSlot } from '../api/slots';
import { formatCurrency } from '../utils/format';
import { FACILITY_OPTIONS, DAY_TYPE_OPTIONS } from '../utils/constants';

const emptyForm = {
  facility: 'badminton_1', day_type: 'all', start_time: '06:00', end_time: '07:00',
  price: 300, capacity: 1, is_active: true,
};

export default function Slots() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [facilityFilter, setFacilityFilter] = useState('');

  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchSlots = useCallback(() => {
    setLoading(true);
    setError('');
    listSlots(facilityFilter ? { facility: facilityFilter } : {})
      .then((data) => setSlots(Array.isArray(data) ? data : data.results || []))
      .catch(() => setError('Could not load slots. Is the backend running?'))
      .finally(() => setLoading(false));
  }, [facilityFilter]);

  useEffect(() => {
    fetchSlots();
  }, [fetchSlots]);

  const openCreate = () => setEditing({ mode: 'create', data: { ...emptyForm } });
  const openEdit = (slot) => setEditing({ mode: 'edit', data: { ...slot } });
  const updateField = (key, value) => setEditing((prev) => ({ ...prev, data: { ...prev.data, [key]: value } }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing.mode === 'create') {
        await createSlot(editing.data);
      } else {
        await updateSlot(editing.data.id, editing.data);
      }
      setEditing(null);
      fetchSlots();
    } catch (err) {
      alert(err?.response?.data ? JSON.stringify(err.response.data) : 'Failed to save slot.');
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = async (slot) => {
    await toggleSlot(slot.id, !slot.is_active);
    fetchSlots();
  };

  const handleDelete = async () => {
    setSaving(true);
    try {
      await deleteSlot(deleting.id);
      setDeleting(null);
      fetchSlots();
    } catch {
      alert('Failed to delete slot.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card padded={false}>
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <Select
            placeholder="All facilities"
            options={FACILITY_OPTIONS}
            value={facilityFilter}
            onChange={(e) => setFacilityFilter(e.target.value)}
            className="sm:w-64"
          />
          <Button icon={Plus} onClick={openCreate}>Add Slot</Button>
        </div>
      </Card>

      <Card padded={false}>
        {error && <div className="p-5 text-sm text-rose-600 dark:text-rose-400">{error}</div>}
        {loading ? (
          <TableSkeleton cols={7} />
        ) : slots.length === 0 ? (
          <EmptyState title="No slots configured" subtitle="Add a slot to define timing, pricing, and capacity for a facility." action={<Button icon={Plus} onClick={openCreate}>Add Slot</Button>} />
        ) : (
          <div className="p-5 pt-4">
            <Table>
              <THead>
                <TH>Facility</TH>
                <TH>Days</TH>
                <TH>Timing</TH>
                <TH>Price</TH>
                <TH>Capacity</TH>
                <TH>Status</TH>
                <TH className="text-right">Actions</TH>
              </THead>
              <TBody>
                {slots.map((s) => (
                  <TR key={s.id}>
                    <TD className="font-medium text-slate-800 dark:text-slate-100">{s.facility_display}</TD>
                    <TD>{s.day_type_display}</TD>
                    <TD>{s.start_time} – {s.end_time}</TD>
                    <TD>{formatCurrency(s.price)}</TD>
                    <TD>{s.capacity}</TD>
                    <TD>
                      <Badge tone={s.is_active ? 'success' : 'default'}>{s.is_active ? 'Active' : 'Disabled'}</Badge>
                    </TD>
                    <TD>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleToggle(s)}
                          className={`rounded-lg p-1.5 hover:bg-slate-100 dark:hover:bg-night-elevated ${s.is_active ? 'text-emerald-500' : 'text-slate-400'}`}
                          title={s.is_active ? 'Disable slot' : 'Enable slot'}
                        >
                          <Power className="h-4 w-4" />
                        </button>
                        <button onClick={() => openEdit(s)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-night-elevated" title="Edit">
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button onClick={() => setDeleting(s)} className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10" title="Delete">
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
        title={editing?.mode === 'create' ? 'Add Slot' : 'Edit Slot'}
        footer={
          <>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save Slot'}</Button>
          </>
        }
      >
        {editing && (
          <form onSubmit={handleSave} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select label="Facility" options={FACILITY_OPTIONS} value={editing.data.facility} onChange={(e) => updateField('facility', e.target.value)} />
            <Select label="Applicable Days" options={DAY_TYPE_OPTIONS} value={editing.data.day_type} onChange={(e) => updateField('day_type', e.target.value)} />
            <Input label="Start Time" type="time" value={editing.data.start_time} onChange={(e) => updateField('start_time', e.target.value)} required />
            <Input label="End Time" type="time" value={editing.data.end_time} onChange={(e) => updateField('end_time', e.target.value)} required />
            <Input label="Price (₹)" type="number" min={0} value={editing.data.price} onChange={(e) => updateField('price', Number(e.target.value))} required />
            <Input label="Capacity" type="number" min={1} value={editing.data.capacity} onChange={(e) => updateField('capacity', Number(e.target.value))} required />
            <label className="flex items-center gap-2 sm:col-span-2">
              <input type="checkbox" checked={editing.data.is_active} onChange={(e) => updateField('is_active', e.target.checked)} className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
              <span className="text-sm text-slate-700 dark:text-slate-300">Slot is active and bookable</span>
            </label>
          </form>
        )}
      </Modal>

      <Modal
        open={!!deleting}
        onClose={() => setDeleting(null)}
        title="Delete Slot"
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
            Delete the {deleting.start_time}–{deleting.end_time} slot for <strong>{deleting.facility_display}</strong>? This can't be undone.
          </p>
        )}
      </Modal>
    </div>
  );
}
