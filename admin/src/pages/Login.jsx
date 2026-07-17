import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ThemeToggle from '../components/ui/ThemeToggle';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState(() => localStorage.getItem('remembered_admin_email') || '');
  const [password, setPassword] = useState(() => localStorage.getItem('remembered_admin_password') || '');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      localStorage.setItem('remembered_admin_email', email);
      localStorage.setItem('remembered_admin_password', password);
      navigate(location.state?.from?.pathname || '/', { replace: true });
    } catch (err) {
      setError(err?.response?.data?.detail || err.message || 'Unable to sign in. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-subtle px-4 dark:bg-night-bg">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-glow">
            <Trophy className="h-7 w-7" />
          </div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">King Sports Club</h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Sign in to the admin dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="surface-card space-y-4 p-6 sm:p-8">
          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-rose-50 px-3.5 py-3 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-400">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Input
            label="Email address"
            type="email"
            name="email"
            icon={Mail}
            placeholder="admin@kingsportsclub.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              icon={Lock}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-[38px] text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign in'}
          </Button>

          <p className="text-center text-xs text-slate-400 dark:text-slate-500">
            Only staff accounts can access this dashboard.
          </p>
        </form>
      </div>
    </div>
  );
}
