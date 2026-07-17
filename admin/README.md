# King Sports Club — Admin Dashboard

A premium, responsive SaaS-style admin dashboard for managing Turf, Badminton,
and Gym bookings. Built with **React + Vite + Tailwind CSS**, talking to a
**Django REST Framework** backend (`../backend`).

## Stack

- React 18 + Vite 5
- Tailwind CSS 3 (class-based dark mode)
- React Router 6
- Axios (with automatic JWT refresh)
- Recharts (dashboard + report charts)
- lucide-react (icons)

## Folder structure

```
admin/
├── src/
│   ├── api/            # axios client + one module per resource (bookings, slots, members, payments, stats, auth)
│   ├── components/
│   │   ├── layout/      # Sidebar, Topbar, DashboardLayout
│   │   ├── ui/           # Button, Card, Table, Modal, Badge, Input, Select, ThemeToggle, Loader…
│   │   └── charts/       # RevenueChart, BookingsBarChart, FacilityPieChart (Recharts, theme-aware)
│   ├── context/          # ThemeContext (light/dark + localStorage), AuthContext (JWT session)
│   ├── hooks/            # useDebounce
│   ├── pages/            # Login, Dashboard, Bookings, Slots, Payments, Members, Reports, NotFound
│   ├── routes/           # ProtectedRoute
│   └── utils/            # format.js (currency/date helpers), constants.js (facility/status option lists)
```

## Client login flow (public site → admin dashboard)

Regular customers and staff/admins both log in through the **same** login
form on the public site (`frontend/src/components/auth/Login.js`). After a
successful `/api/login/` call:

- If the account is **not** staff → normal member flow, redirected into the
  public site as usual.
- If the account **is** staff/superuser → the public site redirects the
  browser straight to `${REACT_APP_ADMIN_URL}/sso#access=...&refresh=...`
  and this dashboard's `/sso` route (`src/pages/SsoCallback.jsx`) picks up
  those tokens and signs the admin in — no second login form, no re-entering
  a password.

Notes on that handoff:
- Tokens travel in the URL **fragment** (after `#`), never a query string —
  fragments aren't sent to any server or written to server logs, only JS on
  the receiving page can read them.
- The admin app doesn't just trust the fragment: `SsoCallback` stores the
  tokens and does a full reload, so `AuthContext`'s normal bootstrap re-hits
  `/api/profile/` and re-checks `is_staff`/`is_superuser` before granting
  access — a non-staff token dropped here (accidentally or otherwise) is
  rejected and bounced to `/login`.
- Set `REACT_APP_ADMIN_URL` in the public site's `.env` to point at wherever
  this app is actually hosted (`http://localhost:5173` in dev,
  `https://admin.kingsportsclub.in` or similar in production).

## Getting started

```bash
cd admin
cp .env.example .env      # point VITE_API_BASE_URL at your backend
npm install
npm run dev                # http://localhost:5173
```

## Backend requirements

The dashboard expects the Django backend (`../backend`) to be running with:

- JWT auth already wired up in `accounts/` (`POST /api/login/` returns
  `access` / `refresh` tokens + the user, including `is_staff`). Only staff
  accounts can sign in to the dashboard — create one with
  `python manage.py createsuperuser`.
- The new admin endpoints added to `api/` (see `backend/api/admin_views.py`
  and `backend/api/urls.py`):
  - `GET/POST /api/admin/bookings/`, `.../{id}/` — full booking CRUD, with
    `?search=&facility=&payment_status=&booking_status=&date_from=&date_to=`
  - `GET/POST /api/admin/slots/`, `.../{id}/` — slot timing/pricing/enable-disable
  - `GET/POST /api/admin/members/`, `.../{id}/` — gym memberships
  - `GET/POST /api/admin/payments/`, `.../{id}/` — transaction history
  - `GET /api/admin/stats/dashboard/` — card totals + status/facility breakdown
  - `GET /api/admin/stats/reports/` — daily/weekly/monthly series for charts

Run the backend's migration once before first use:

```bash
cd backend
python manage.py migrate
python manage.py createsuperuser   # give it is_staff=True (default for superuser)
python manage.py runserver
```

### Admin login

A `db.sqlite3` with one staff account already seeded ships in `backend/` so
you can log in immediately without running `createsuperuser`:

```
Email:    admin@kingsportsclub.in
Password: Admin@123
```

To (re)create or reset that account yourself — e.g. after wiping the DB, or
to change the password — run:

```bash
cd backend
python manage.py migrate
python manage.py create_admin                      # uses the credential above
python manage.py create_admin --email you@x.com --password "NewPass123"  # custom
```

`create_admin` is idempotent: running it again just resets the password on
the same account instead of erroring.

## Theme system

- `ThemeContext` stores the preference in `localStorage` (`ksc-admin-theme`)
  and toggles a `dark` class on `<html>`; Tailwind's `darkMode: 'class'`
  handles the rest.
- A small inline script in `index.html` applies the stored theme **before**
  React mounts, so there's no light→dark flash on load.
- `components/ui/ThemeToggle.jsx` is a custom sun↔moon switch — not a plain
  checkbox: the track morphs between a sky gradient and a starry night
  gradient, the thumb slides and rotates 180° while a sun (with retracting
  rays) cross-fades into a crescent moon, and small stars twinkle in on the
  dark side.

## Production build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Notes

- The public booking site (`../frontend`) and this admin dashboard are
  intentionally separate apps — the public site stays on Create React App,
  this dashboard is a fresh Vite app, and both talk to the same Django
  backend. Deploy them as separate static sites/subdomains (e.g.
  `kingsportsclub.in` and `admin.kingsportsclub.in`).
- Switch the backend from SQLite (dev) to MySQL (production) by setting
  `DB_ENGINE=mysql` plus `DB_NAME` / `DB_USER` / `DB_PASSWORD` / `DB_HOST` /
  `DB_PORT` in the backend's environment — see `backend/core/settings.py`.
