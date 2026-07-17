import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { login as loginRequest, fetchProfile } from '../api/auth';
import { tokenStore } from '../api/axiosClient';

const AuthContext = createContext(null);
const USER_KEY = 'ksc-admin-user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Revalidate the session on load if a token exists. This also covers
    // tokens set by the SSO handoff from the public site (see SsoCallback) —
    // a token alone isn't enough, the account must actually be staff.
    const bootstrap = async () => {
      if (tokenStore.getAccess()) {
        try {
          const profile = await fetchProfile();
          if (!profile.is_staff && !profile.is_superuser) {
            throw new Error('not-staff');
          }
          setUser(profile);
          localStorage.setItem(USER_KEY, JSON.stringify(profile));
        } catch {
          tokenStore.clear();
          localStorage.removeItem(USER_KEY);
          setUser(null);
        }
      }
      setIsLoading(false);
    };
    bootstrap();
  }, []);

  const login = useCallback(async (email, password) => {
    setError(null);
    const data = await loginRequest(email, password);
    if (!data.user?.is_staff && !data.user?.is_superuser) {
      throw new Error('This account does not have admin access.');
    }
    tokenStore.set(data.access, data.refresh);
    localStorage.setItem(USER_KEY, JSON.stringify(data.user));
    setUser(data.user);
    return data.user;
  }, []);

  const logout = useCallback(() => {
    tokenStore.clear();
    localStorage.removeItem(USER_KEY);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
