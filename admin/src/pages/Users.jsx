import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, Trash2, Users, ShieldCheck, CheckCircle, XCircle, BadgeCheck } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { TableSkeleton, EmptyState } from '../components/ui/Loader';
import useDebounce from '../hooks/useDebounce';
import { listUsers, verifyUser, deleteUser } from '../api/users';
import { formatDate } from '../utils/format';

const roleInfo = (user) => {
  if (user.is_superuser) return { label: 'Admin', tone: 'danger' };
  if (user.is_staff) return { label: 'Staff', tone: 'brand' };
  return { label: 'Customer', tone: 'default' };
};

const Avatar = ({ name }) => {
  const letter = (name || '?').charAt(0).toUpperCase();
  const colors = [
    'bg-violet-100 text-violet-700',
    'bg-blue-100 text-blue-700',
    'bg-emerald-100 text-emerald-700',
    'bg-orange-100 text-orange-700',
    'bg-pink-100 text-pink-700',
  ];
  const color = colors[letter.charCodeAt(0) % colors.length];
  return (
    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${color} dark:bg-night-elevated dark:text-slate-200`}>
      {letter}
    </div>
  );
};

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [actionId, setActionId] = useState(null); // track which user has a pending action

  const params = useMemo(() => ({ search: debouncedSearch || undefined }), [debouncedSearch]);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    setError('');
    listUsers(params)
      .then((data) => setUsers(Array.isArray(data) ? data : data.results || []))
      .catch(() => setError('Could not load user accounts. Is the backend running?'))
      .finally(() => setLoading(false));
  }, [params]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  const handleVerify = async (user) => {
    if (!window.confirm(`Mark ${user.email} as email-verified?`)) return;
    setActionId(user.id);
    try {
      await verifyUser(user.id);
      fetchUsers();
    } catch {
      alert('Failed to verify user.');
    } finally {
      setActionId(null);
    }
  };

  const handleDelete = async (user) => {
    if (!window.confirm(`Delete account for ${user.email}? This cannot be undone.`)) return;
    setActionId(user.id);
    try {
      await deleteUser(user.id);
      fetchUsers();
    } catch {
      alert('Failed to delete user account.');
    } finally {
      setActionId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* ── Header bar ── */}
      <Card padded={false}>
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <Input
            placeholder="Search by name or email…"
            icon={Search}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="sm:w-80"
          />
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
            <Users className="h-4 w-4" />
            <span>
              {users.length} Account{users.length !== 1 ? 's' : ''} registered
            </span>
          </div>
        </div>
      </Card>

      {/* ── Table ── */}
      <Card padded={false}>
        {loading ? (
          <TableSkeleton cols={5} rows={5} />
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : users.length === 0 ? (
          <EmptyState
            title="No User Accounts Found"
            description={search ? 'Try refining your search.' : 'No customer accounts have registered yet.'}
            icon={Users}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-night-border">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500" style={{ width: '34%' }}>
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500" style={{ width: '14%' }}>
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500" style={{ width: '16%' }}>
                    Email Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500" style={{ width: '14%' }}>
                    Date Joined
                  </th>
                  <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500" style={{ width: '22%' }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-night-border">
                {users.map((user) => {
                  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || '—';
                  const role = roleInfo(user);
                  const busy = actionId === user.id;
                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-slate-50 dark:hover:bg-night-elevated transition-colors"
                    >
                      {/* Customer column */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar name={fullName} />
                          <div className="min-w-0">
                            <p className="truncate font-semibold text-slate-800 dark:text-white">
                              {fullName}
                            </p>
                            <p className="truncate text-xs text-slate-400 dark:text-slate-500">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-4 py-3.5">
                        <Badge tone={role.tone}>{role.label}</Badge>
                      </td>

                      {/* Email status */}
                      <td className="px-4 py-3.5">
                        {user.is_email_verified ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                            <CheckCircle className="h-3.5 w-3.5" /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-500 dark:text-amber-400">
                            <XCircle className="h-3.5 w-3.5" /> Unverified
                          </span>
                        )}
                      </td>

                      {/* Date joined */}
                      <td className="px-4 py-3.5 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {formatDate(user.created_at)}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-2">
                          {/* Verify button — only show when not already verified */}
                          {!user.is_email_verified && (
                            <button
                              onClick={() => handleVerify(user)}
                              disabled={busy}
                              title="Mark email as verified"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-50 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
                            >
                              <BadgeCheck className="h-3.5 w-3.5" />
                              Verify
                            </button>
                          )}

                          {/* Delete button — disabled for superusers */}
                          <button
                            onClick={() => handleDelete(user)}
                            disabled={busy || user.is_superuser}
                            title={user.is_superuser ? 'Cannot delete admin accounts' : 'Delete account'}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-30 disabled:cursor-not-allowed dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400 dark:hover:bg-red-500/20"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
