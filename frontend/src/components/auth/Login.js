import React, { useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const validateForm = () => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!password) {
      setError('Password is required');
      return false;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'https://sports-club-2i4r.onrender.com/api';
      const response = await axios.post(`${API_URL}/login/`, { email, password });

      if (response.data.access) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('user_email', email);
        const user = response.data.user || {};
        const fullName = [user.first_name, user.last_name].filter(Boolean).join(' ').trim();
        localStorage.setItem('user_name', fullName || user.email || email);
        window.dispatchEvent(new Event('auth:updated'));

        // Staff/admin accounts skip the member site entirely and land in the
        // separate admin dashboard app. Tokens are handed off via the URL
        // fragment (never sent to any server, unlike a query string) so the
        // admin app can sign itself in without asking for credentials again.
        if (user.is_staff || user.is_superuser) {
          const ADMIN_URL = process.env.REACT_APP_ADMIN_URL || 'http://localhost:5173';
          const handoff = new URLSearchParams({
            access: response.data.access,
            refresh: response.data.refresh,
          });
          setSuccess('Admin account detected. Redirecting to the dashboard...');
          window.location.href = `${ADMIN_URL}/sso#${handoff.toString()}`;
          return;
        }

        const returnTo = location.state?.returnTo || '/';
        const bookingData = location.state?.bookingData || JSON.parse(localStorage.getItem('pending_booking') || 'null');

        setSuccess('Login successful! Redirecting...');
        setTimeout(() => {
          localStorage.removeItem('pending_booking');
          navigate(returnTo, { state: bookingData ? { bookingData } : undefined });
        }, 800);
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Invalid email or password');
      } else if (err.response?.status === 400) {
        setError(err.response.data?.detail || 'Invalid credentials');
      } else {
        setError('An error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ksc-login-section">
      <div className="container">
        <div className="ksc-login-wrapper">

          {/* Left — brand panel */}
          <motion.div
            className="ksc-login-brand"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Members Area</span>
            <h1 className="section-title">
              WELCOME<br />BACK, <span className="gold-text">CHAMPION</span>
            </h1>
            <p className="ksc-login-tagline">
              Sign in to manage your bookings, track your membership and stay on top of your game.
            </p>
            <ul className="ksc-login-features">
              <li>
                <span className="ksc-login-check">✓</span>
                Book gym, turf &amp; badminton slots instantly
              </li>
              <li>
                <span className="ksc-login-check">✓</span>
                Track your membership &amp; renewals
              </li>
              <li>
                <span className="ksc-login-check">✓</span>
                Exclusive member-only offers
              </li>
            </ul>
          </motion.div>

          {/* Right — form panel */}
          <motion.div
            className="ksc-login-form-panel"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="ksc-login-form-title">Sign In</h2>
            <p className="ksc-login-form-subtitle">Access your King Sports Club account</p>

            {error && (
              <div className="ksc-alert ksc-alert-error" role="alert">
                {error}
              </div>
            )}
            {success && (
              <div className="ksc-alert ksc-alert-success" role="alert">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="ksc-form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(''); }}
                  disabled={loading}
                  className="ksc-form-input"
                  autoComplete="email"
                />
              </div>

              <div className="ksc-form-group">
                <div className="ksc-password-header">
                  <label htmlFor="password">Password</label>
                  <a href="#forgot" className="ksc-forgot-link">Forgot?</a>
                </div>
                <div className="ksc-password-wrapper">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(''); }}
                    disabled={loading}
                    className="ksc-form-input"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="ksc-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? 'Hide' : 'Show'}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={loading} className="ksc-submit-btn">
                {loading ? <span className="ksc-spinner" /> : null}
                {loading ? 'Signing in…' : 'Sign In ↗'}
              </button>
            </form>

            <div className="ksc-login-footer">
              <p>Don't have an account? <Link to="/register">Create one</Link></p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Login;
