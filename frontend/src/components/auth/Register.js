import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Login.css';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    password2: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (!formData.password2) {
      setError('Please confirm your password');
      return false;
    }
    if (formData.password !== formData.password2) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
      const response = await axios.post(`${API_URL}/register/`, {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
        password2: formData.password2,
      });

      if (response.data.access) {
        const fullName = [formData.firstName, formData.lastName].filter(Boolean).join(' ').trim();
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        localStorage.setItem('user_email', formData.email);
        localStorage.setItem('user_name', fullName || formData.email);
        window.dispatchEvent(new Event('auth:updated'));
      }

      setSuccess('Account created successfully! Redirecting home...');
      setTimeout(() => {
        navigate('/');
      }, 800);
    } catch (err) {
      const backendError = err.response?.data;
      if (backendError?.email) {
        setError(Array.isArray(backendError.email) ? backendError.email[0] : backendError.email);
      } else if (backendError?.password) {
        setError(Array.isArray(backendError.password) ? backendError.password[0] : backendError.password);
      } else if (backendError?.detail) {
        setError(backendError.detail);
      } else {
        setError('Unable to create your account right now. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="ksc-login-section">
      <div className="container">
        <div className="ksc-login-wrapper">
          <motion.div
            className="ksc-login-brand"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">Members Area</span>
            <h1 className="section-title">
              CREATE<br />YOUR <span className="gold-text">ACCOUNT</span>
            </h1>
            <p className="ksc-login-tagline">
              Join King Sports Club to book courts, manage memberships, and enjoy member benefits.
            </p>
            <ul className="ksc-login-features">
              <li><span className="ksc-login-check">✓</span> Quick access to sports bookings</li>
              <li><span className="ksc-login-check">✓</span> Track membership plans and renewals</li>
              <li><span className="ksc-login-check">✓</span> Stay updated with exclusive offers</li>
            </ul>
          </motion.div>

          <motion.div
            className="ksc-login-form-panel"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h2 className="ksc-login-form-title">Create Account</h2>
            <p className="ksc-login-form-subtitle">Sign up to access your club account</p>

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
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={loading}
                  className="ksc-form-input"
                />
              </div>

              <div className="ksc-form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={loading}
                  className="ksc-form-input"
                />
              </div>

              <div className="ksc-form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={loading}
                  className="ksc-form-input"
                  autoComplete="email"
                />
              </div>

              <div className="ksc-form-group">
                <label htmlFor="password">Password</label>
                <div className="ksc-password-wrapper">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    disabled={loading}
                    className="ksc-form-input"
                    autoComplete="new-password"
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

              <div className="ksc-form-group">
                <label htmlFor="password2">Confirm Password</label>
                <input
                  id="password2"
                  name="password2"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Re-enter password"
                  value={formData.password2}
                  onChange={handleChange}
                  disabled={loading}
                  className="ksc-form-input"
                  autoComplete="new-password"
                />
              </div>

              <button type="submit" disabled={loading} className="ksc-submit-btn">
                {loading ? <span className="ksc-spinner" /> : null}
                {loading ? 'Creating account…' : 'Create Account ↗'}
              </button>
            </form>

            <div className="ksc-login-footer">
              <p>Already have an account? <Link to="/login">Sign in</Link></p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Register;
