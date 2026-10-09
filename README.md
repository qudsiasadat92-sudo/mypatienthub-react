# MyPatientHUB — React Version

A React (Vite) port of the MyPatientHUB HTML/CSS/JS project: login page, dashboard,
find-a-doctor and find-a-clinic pages, with routing between them.

## Project structure

```
mypatienthub-react/
├── index.html            ← Vite entry HTML
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx           ← React root
    ├── App.jsx            ← Routes
    ├── styles.css         ← Shared stylesheet (same design as the HTML version)
    ├── data/
    │   ├── doctors.js      ← Edit doctor names/specialties/cities here
    │   └── clinics.js      ← Edit clinic names/categories/cities here
    ├── components/
    │   ├── Sidebar.jsx
    │   ├── Topbar.jsx
    │   ├── AppLayout.jsx   ← Sidebar + Topbar + responsive show/hide logic
    │   ├── Accordion.jsx   ← Used by Find Doctor / Find Clinic
    │   └── HealthSparkline.jsx
    └── pages/
        ├── Login.jsx
        ├── Dashboard.jsx
        ├── FindDoctor.jsx
        └── FindClinic.jsx
```

## Setup (in VS Code)

1. Open this folder in VS Code.
2. Open a terminal (``Ctrl+` ``) and install dependencies:

   ```bash
   npm install
   ```

3. Start the dev server:

   ```bash
   npm run dev
   ```

4. Open the URL Vite prints (usually `http://localhost:5173`) in your browser.

## What each page does

- **Login (`/`)** — validates the email/phone and password fields and shows inline
  error messages; on success it redirects to `/dashboard` (demo only — no real
  authentication yet).
- **Dashboard (`/dashboard`)** — clinic/pharmacy promotion cards (CSS `conic-gradient`
  donut charts, no chart library needed), a market-usage card and a health-index
  sparkline, plus a hand-drawn SVG illustration (no external images).
- **Find Doctor (`/find-doctor`)** — accordion list of doctors grouped by specialty,
  sourced from `src/data/doctors.js`.
- **Find Clinic (`/find-clinic`)** — accordion list of clinics grouped by category,
  sourced from `src/data/clinics.js`.

## Sidebar show/hide

The hamburger button (☰) in the top bar toggles the sidebar at any screen size.
This is handled in `AppLayout.jsx` with a `sidebarHidden` state value and a
`sidebar-hidden` CSS class, so both the sidebar and the main content column ()
respond to the toggle. It also updates automatically when a Find Doctor or Find
Clinic route link resizes the window (open by default on desktop, closed by
default on small screens).

## Editing the data

To add/rename a doctor or clinic, edit `src/data/doctors.js` or
`src/data/clinics.js` — the accordion re-renders automatically, no other file
needs to change.

## Building for production

```bash
npm run build
```

Outputs static files to `dist/`, which you can deploy to any static host.
