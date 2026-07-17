import React, { useEffect, useState } from 'react';
import { tokenStore } from '../api/axiosClient';

/**
 * SsoCallback — receives an access/refresh token pair handed off from the
 * public site's login page (src/components/auth/Login.js there) when it
 * detects a staff/admin account, e.g.:
 *
 *   https://admin.kingsportsclub.in/sso#access=xxx&refresh=yyy
 *
 * Tokens travel in the URL *fragment* (after #), not a query string, so
 * they're never sent to any server or logged — only JS on this page can
 * read them, and the fragment never leaves the browser.
 *
 * After storing the tokens we do a full reload to "/", which lets
 * AuthProvider's normal bootstrap re-validate the session against
 * /api/profile/ (including the is_staff check) exactly like any other
 * page load — this route has no special privilege of its own.
 */
export default function SsoCallback() {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace(/^#/, '');
    const params = new URLSearchParams(hash);
    const access = params.get('access');
    const refresh = params.get('refresh');

    if (!access || !refresh) {
      setFailed(true);
      return;
    }

    tokenStore.set(access, refresh);
    // Full reload (not react-router navigate) so AuthProvider bootstraps
    // fresh and re-verifies the token + staff status from scratch.
    window.location.replace('/');
  }, []);

  if (failed) {
    window.location.replace('/login');
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-surface-subtle dark:bg-night-bg">
      <div className="flex flex-col items-center gap-3">
        <svg className="h-8 w-8 animate-spin text-brand-500" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
        <p className="text-sm text-slate-500 dark:text-slate-400">Signing you in…</p>
      </div>
    </div>
  );
}
