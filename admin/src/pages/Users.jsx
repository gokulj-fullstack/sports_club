import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Search, Trash2, Users, Shield, Mail, CheckCircle, XCircle } from 'lucide-react';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Table, THead, TH, TBody, TR, TD } from '../components/ui/Table';
import { TableSkeleton, EmptyState } from '../components/ui/Loader';
import useDebounce from '../hooks/useDebounce';
import { listUsers, deleteUser } from '../api/users';
import { formatDate } from '../utils/format';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 400);
  const [deletingId, setDeletingId] = useState(null);

  const params = useMemo(() => ({ search: debouncedSearch || undefined }), [debouncedSearch]);

  const fetchUsers = useCallback(() => {
    setLoading(true);
    setError('');
    listUsers(params)
      .then((data) => setUsers(Array.isArray(data) ? data : data.results || []))
      .catch(() => setError('Could not load user accounts. Is the backend running?'))
      .finally(() => setLoading(false));
  }, [params]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleDelete = async (id, email) => {
    if (!window.confirm(`Are you sure you want to delete the user account for ${email}?`)) {
      return;
    }
    setDeletingId(id);
    try {
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      alert('Failed to delete user account.');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-4">
      {/* Search Header */}
      <Card padded={false}>
        <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row">
            <Input
              placeholder="Search users by name or email…"
              icon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:w-80"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <Users className="h-4 w-4" />
            <span>Total Accounts: {users.length}</span>
          </div>
        </div>
      </Card>

      {/* Main Table */}
      <Card padded={false}>
        {loading ? (
          <TableSkeleton cols={6} rows={5} />
        ) : error ? (
          <div className="p-8 text-center text-red-500">{error}</div>
        ) : users.length === 0 ? (
          <EmptyState
            title="No User Accounts Found"
            description={search ? "Try refining your search query." : "No customer accounts have registered on the site yet."}
            icon={Users}
          />
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <THead>
                <TR>
                  <TH>Customer Name</TH>
                  <TH>Email Address</TH>
                  <TH>Email Verified</TH>
                  <TH>Roles</TH>
                  <TH>Date Joined</TH>
                  <TH className="text-right">Actions</TH>
                </TR>
              </THead>
              <TBody>
                {users.map((user) => {
                  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'No Name';
                  return (
                    <TR key={user.id}>
                      <TD>
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-sm font-semibold uppercase text-slate-700 dark:bg-night-elevated dark:text-slate-200">
                            {fullName.charAt(0)}
                          </div>
                          <div>
                            <span className="font-semibold text-slate-800 dark:text-white">{fullName}</span>
                          </div>
                        </div>
                      </TD>
                      <TD className="text-slate-600 dark:text-slate-300 font-medium">{user.email}</TD>
                      <TD>
                        <div className="flex items-center gap-1.5 text-xs">
                          {user.is_email_verified ? (
                            <Badge tone="success" className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" /> Verified
                            </Badge>
                          ) : (
                            <Badge tone="warning" className="flex items-center gap-1">
                              <XCircle className="h-3 w-3" /> Unverified
                            </Badge>
                          )}
                        </div>
                      </TD>
                      <TD>
                        <div className="flex flex-wrap gap-1">
                          {user.is_superuser && (
                            <Badge tone="danger" className="flex items-center gap-1">
                              <Shield className="h-3 w-3" /> Admin
                            </Badge>
                          )}
                          {user.is_staff && !user.is_superuser && (
                            <Badge tone="brand" className="flex items-center gap-1">
                              <Shield className="h-3 w-3" /> Staff
                            </Badge>
                          )}
                          {!user.is_staff && !user.is_superuser && (
                            <Badge tone="default">Customer</Badge>
                          )}
                        </div>
                      </TD>
                      <TD className="text-slate-500 dark:text-slate-400 text-xs">
                        {formatDate(user.created_at)}
                      </TD>
                      <TD className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          icon={Trash2}
                          onClick={() => handleDelete(user.id, user.email)}
                          disabled={deletingId === user.id || user.is_superuser}
                          className="text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                          title={user.is_superuser ? "Cannot delete superuser accounts" : "Delete Account"}
                        />
                      </TD>
                    </TR>
                  );
                })}
              </TBody>
            </Table>
          </div>
        )}
      </Card>
    </div>
  );
}
