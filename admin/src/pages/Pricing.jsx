import React, { useCallback, useEffect, useState } from 'react';
import { Pencil, Tag } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Select from '../components/ui/Select';
import Badge from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { Table, THead, TH, TBody, TR, TD } from '../components/ui/Table';
import { TableSkeleton, EmptyState } from '../components/ui/Loader';
import { listPricingSettings, updatePricingSetting } from '../api/pricing';
import { formatCurrency } from '../utils/format';

const CATEGORY_OPTIONS = [
  { value: 'booking', label: 'Booking Fees' },
  { value: 'membership', label: 'Memberships' },
];

export default function Pricing() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchSettings = useCallback(() => {
    setLoading(true);
    setError('');
    listPricingSettings(categoryFilter ? { category: categoryFilter } : {})
      .then((data) => {
        setSettings(Array.isArray(data) ? data : data.results || []);
      })
      .catch(() => setError('Could not load pricing settings. Is the backend running?'))
      .finally(() => setLoading(false));
  }, [categoryFilter]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const openEdit = (setting) => setEditing({ data: { ...setting } });
  const updateField = (key, value) => setEditing((prev) => ({ ...prev, data: { ...prev.data, [key]: value } }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updatePricingSetting(editing.data.id, editing.data);
      setEditing(null);
      fetchSettings();
    } catch (err) {
      alert(err?.response?.data ? JSON.stringify(err.response.data) : 'Failed to save pricing.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-4">
      <Card padded={false}>
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="leading-tight">
            <h1 className="text-lg font-bold text-slate-800 dark:text-white">Pricing Settings</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Configure global prices for bookings and memberships.</p>
          </div>
          <Select
            placeholder="All categories"
            options={CATEGORY_OPTIONS}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="sm:w-64"
          />
        </div>
      </Card>

      <Card padded={false}>
        {error && <div className="p-5 text-sm text-rose-600 dark:text-rose-400">{error}</div>}
        {loading ? (
          <TableSkeleton cols={4} />
        ) : settings.length === 0 ? (
          <EmptyState title="No pricing settings found" icon={Tag} subtitle="Configure backend settings to display options." />
        ) : (
          <div className="p-5 pt-4">
            <Table>
              <THead>
                <TH>Setting Label</TH>
                <TH>Category</TH>
                <TH>System Key</TH>
                <TH>Price</TH>
                <TH className="text-right">Actions</TH>
              </THead>
              <TBody>
                {settings.map((s) => (
                  <TR key={s.id}>
                    <TD>
                      <span className="font-semibold text-slate-800 dark:text-slate-100">{s.label}</span>
                    </TD>
                    <TD>
                      <Badge tone={s.category === 'membership' ? 'brand' : 'success'}>
                        {s.category === 'membership' ? 'Membership' : 'Booking Fee'}
                      </Badge>
                    </TD>
                    <TD>
                      <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600 dark:bg-night-elevated dark:text-slate-400">
                        {s.key}
                      </code>
                    </TD>
                    <TD>
                      <span className="font-medium text-slate-900 dark:text-white">
                        {formatCurrency(s.price)}
                      </span>
                    </TD>
                    <TD>
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => openEdit(s)}
                          className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-night-elevated"
                          title="Edit Price"
                        >
                          <Pencil className="h-4 w-4" />
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
        title="Edit Pricing Setting"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>{saving ? 'Saving…' : 'Save Changes'}</Button>
          </>
        }
      >
        {editing && (
          <form onSubmit={handleSave} className="space-y-4">
            <Input label="System Key" value={editing.data.key} disabled />
            <Input
              label="Setting Label"
              value={editing.data.label}
              onChange={(e) => updateField('label', e.target.value)}
              required
            />
            <Input
              label="Price (₹)"
              type="number"
              min={0}
              step="0.01"
              value={editing.data.price}
              onChange={(e) => updateField('price', parseFloat(e.target.value) || 0)}
              required
            />
          </form>
        )}
      </Modal>
    </div>
  );
}
