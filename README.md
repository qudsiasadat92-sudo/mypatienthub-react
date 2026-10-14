# MyPatientHUB Afghanistan — Defense Edition

React + Vite frontend presentation project. See README-FA.md and DEFENSE-GUIDE-FA.md.

```bash
npm install
npm run dev
npm run build
```

Sign In accepts any syntactically valid email and nonblank password. Passwords are not stored or sent. No fixed presentation account is required.
Explore Demo was removed. Session gating demonstrates routing only; it is not real authentication.
Providers, catalog prices, balances and health information are fictional. Appointments, messages and profiles are browser-local. No healthcare booking, real chat delivery or payment backend is connected.
All photographs are packaged locally; OpenStreetMap requires internet. Product images show example brands and may differ from local packaging. Apple/Android download links are not configured.

Active code: App.jsx, Hub.jsx, hub.css, src/pages and src/data.
Source credits: IMAGE-SOURCES.json and MEDICINE-PHOTO-SOURCES.json. Reference imagery and layout inspiration: https://mypihub.web.app/searchdoctor .

Validation: 30 DOM interaction checks passed; Vite production build passed; raster/SVG integrity and image paths verified. The reference site was inspected in a real browser. Local visual browser QA remains unverified because this environment blocks terminal.local.


Doctor and pharmacy photo update: all seven doctor slots now use portraits sourced from Afghan medical-professional profiles. One female portrait is shared. All six pharmacy slots use a suitable real pharmacy interior stock photograph. Real photo subjects are identified in AFGHAN-DOCTOR-PHOTO-SOURCES.json. Profiles, specialties, fees and locations in the app remain fictional and do not describe those people. Photography is illustrative; stock pharmacy imagery does not depict the named pharmacies.

## Teacher review updates
Responsive dashboard image; interactive Recharts charts; full-width final doctor/specialty rows; five distinct illustrative clinic photos; equal-size marketplace photos with matching descriptions; compact account panels; restored mobile-app download card. Health chart data is simulated, while appointment totals use saved bookings. Browser visual QA completed at desktop and mobile sizes.
