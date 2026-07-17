import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, Trash2, Users, CheckCircle, XCircle, BadgeCheck, AlertTriangle } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
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
    <div
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${color} dark:bg-night-elevated dark:text-slate-200`}
    >
      {letter}
    </div>
  );
};

export default function UsersPage() {
  const [users, setUsers]       = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState('');
  const [search, setSearch]     = useState('');
  const debouncedSearch         = useDebounce(search, 400);

  // pendingAction: { id, type: 'verify' | 'delete' }
  const [pendingAction, setPendingAction] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const params = useMemo(
    () => ({ search: debouncedSearch || undefined }),
    [debouncedSearch]
  );

  const fetchUsers = useCallback(() => {
    setLoading(true);
    setError('');
    listUsers(params)
      .then((data) => setUsers(Array.isArray(data) ? data : data.results || []))
      .catch(() => setError('Could not load user accounts. Is the backend running?'))
      .finally(() => setLoading(false));
  }, [params]);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  /* ── confirm helpers ── */
  const askVerify = (user) => setPendingAction({ id: user.id, email: user.email, type: 'verify' });
  const askDelete = (user) => setPendingAction({ id: user.id, email: user.email, type: 'delete' });
  const cancelAction = () => setPendingAction(null);

  const confirmAction = async () => {
    if (!pendingAction) return;
    setActionLoading(true);
    try {
      if (pendingAction.type === 'verify') {
        await verifyUser(pendingAction.id);
      } else {
        await deleteUser(pendingAction.id);
      }
      setPendingAction(null);
      fetchUsers();
    } catch (err) {
      const msg = err?.response?.data
        ? JSON.stringify(err.response.data)
        : err?.message || 'Action failed. Please try again.';
      alert(msg);
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="space-y-4">

      {/* ── Inline confirmation banner ── */}
      {pendingAction && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 dark:border-amber-500/30 dark:bg-amber-500/10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
              <p className="text-sm font-medium text-amber-800 dark:text-amber-300">
                {pendingAction.type === 'verify'
                  ? <>Mark <strong>{pendingAction.email}</strong> as email-verified?</>
                  : <>Permanently delete the account <strong>{pendingAction.email}</strong>? This cannot be undone.</>}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                onClick={cancelAction}
                disabled={actionLoading}
                className="rounded-lg border border-slate-200 bg-white px-4 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 dark:border-night-border dark:bg-night-surface dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmAction}
                disabled={actionLoading}
                className={`rounded-lg px-4 py-1.5 text-xs font-semibold text-white transition disabled:opacity-50 ${
                  pendingAction.type === 'verify'
                    ? 'bg-emerald-600 hover:bg-emerald-700'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {actionLoading
                  ? 'Please wait…'
                  : pendingAction.type === 'verify'
                  ? 'Yes, Verify'
                  : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

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
            description={
              search
                ? 'Try refining your search.'
                : 'No customer accounts have registered yet.'
            }
            icon={Users}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-night-border">
                  {['Customer', 'Role', 'Email Status', 'Date Joined', 'Actions'].map((h, i) => (
                    <th
                      key={h}
                      className={`px-5 py-3 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 ${
                        i === 4 ? 'text-right' : 'text-left'
                      }`}
                      style={{ width: ['34%', '13%', '15%', '14%', '24%'][i] }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-night-border">
                {users.map((user) => {
                  const fullName =
                    `${user.first_name || ''} ${user.last_name || ''}`.trim() || '—';
                  const role   = roleInfo(user);
                  const isPending = pendingAction?.id === user.id;

                  return (
                    <tr
                      key={user.id}
                      className={`transition-colors ${
                        isPending
                          ? 'bg-amber-50/60 dark:bg-amber-500/5'
                          : 'hover:bg-slate-50 dark:hover:bg-night-elevated'
                      }`}
                    >
                      {/* Customer */}
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
                      <td className="px-5 py-3.5">
                        <Badge tone={role.tone}>{role.label}</Badge>
                      </td>

                      {/* Email status */}
                      <td className="px-5 py-3.5">
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
                      <td className="px-5 py-3.5 text-xs text-slate-500 dark:text-slate-400 whitespace-nowrap">
                        {formatDate(user.created_at)}
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-3.5">
                        <div className="flex items-center justify-end gap-2">
                          {!user.is_email_verified && (
                            <button
                              id={`verify-${user.id}`}
                              onClick={() => askVerify(user)}
                              disabled={!!pendingAction}
                              title="Mark email as verified"
                              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-40 disabled:cursor-not-allowed dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20"
                            >
                              <BadgeCheck className="h-3.5 w-3.5" />
                              Verify
                            </button>
                          )}

                          <button
                            id={`delete-${user.id}`}
                            onClick={() => askDelete(user)}
                            disabled={!!pendingAction || user.is_superuser}
                            title={
                              user.is_superuser
                                ? 'Cannot delete admin accounts'
                                : 'Delete account'
                            }
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
