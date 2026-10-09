import AppLayout from "../components/AppLayout.jsx";
import HealthSparkline from "../components/HealthSparkline.jsx";

const CLINIC_PROMOTIONS = [
  { name: "Kabul Medical Clinic", pct: 19, color: "#ec4899" },
  { name: "Herat Family Health Clinic", pct: 4, color: "#1e3a8a" },
  { name: "Ibn Sina Specialist Clinic", pct: 10, color: "#7c3aed" },
  { name: "Kandahar Dental Care Center", pct: 21, color: "#22c55e" },
  { name: "Mazar Physiotherapy Clinic", pct: 2, color: "#2563eb" },
];

const PHARMACY_PROMOTIONS = [
  { name: "Kabul Central Pharmacy", pct: 15, color: "#ec4899" },
  { name: "Herat City Pharmacy", pct: 12, color: "#1e3a8a" },
  { name: "Kandahar Pharmacy", pct: 5, color: "#7c3aed" },
  { name: "Mazar Pharmacy", pct: 9, color: "#22c55e" },
  { name: "Jalalabad Family Pharmacy", pct: 14, color: "#2563eb" },
];

const MARKET_USAGE = [
  { name: "Food Panda", pct: 25, color: "#94a3b8" },
  { name: "Grab Food", pct: 3, color: "#1e3a8a" },
];

// Build a CSS conic-gradient string from a list of { pct, color }
function toConicGradient(items) {
  let acc = 0;
  const stops = items.map((item) => {
    const start = acc;
    acc += item.pct;
    return `${item.color} ${start}% ${acc}%`;
  });
  stops.push(`#e2e8f0 ${acc}% 100%`);
  return `conic-gradient(${stops.join(", ")})`;
}

function PromotionCard({ title, items }) {
  return (
    <div className="card">
      <div className="card-head">
        <h3>{title}</h3>
        <span className="info-dot">!</span>
      </div>
      <div className="donut-row">
        <div className="donut" style={{ background: toConicGradient(items) }} />
        <div className="legend">
          {items.map((item) => (
            <div className="legend-row" key={item.name}>
              <span className="swatch" style={{ background: item.color }}>
                ●
              </span>
              <span className="name">{item.name}</span>
              <span className="pct">{item.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <button className="more-details">MORE DETAILS</button>
    </div>
  );
}

export default function Dashboard() {
  return (
    <AppLayout active="Dashboard" crumb="Dashboard" title="Dashboard" showSearch>
      <div className="welcome-banner">
        <div className="welcome-text">
          Welcome To MyPatientHUB!
          <span>Your health, your doctors, your clinics — all in one place.</span>
        </div>

        {/* Original flat-style doctor illustration (no external image, no copyright) */}
        <svg className="welcome-illustration" viewBox="0 0 220 180" xmlns="http://www.w3.org/2000/svg">
          <circle cx="110" cy="90" r="80" fill="#f3ecfb" />
          <circle cx="165" cy="45" r="26" fill="#fde8f0" />
          <circle cx="45" cy="135" r="20" fill="#e5f6fb" />

          <rect x="18" y="60" width="34" height="46" rx="4" fill="#ffffff" stroke="#dfe3ee" strokeWidth="2" />
          <rect x="26" y="52" width="18" height="10" rx="2" fill="#7b2ff7" />
          <line x1="24" y1="74" x2="46" y2="74" stroke="#c9cee0" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="83" x2="46" y2="83" stroke="#c9cee0" strokeWidth="3" strokeLinecap="round" />
          <line x1="24" y1="92" x2="38" y2="92" stroke="#c9cee0" strokeWidth="3" strokeLinecap="round" />

          <rect x="78" y="95" width="64" height="70" rx="20" fill="#ffffff" stroke="#e3e7f2" strokeWidth="2" />
          <path
            d="M92 100 L110 118 L128 100"
            fill="none"
            stroke="#2c3e66"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path d="M96 100 C96 118, 124 118, 124 100" fill="none" stroke="#2c3e66" strokeWidth="4" strokeLinecap="round" />
          <circle cx="124" cy="122" r="7" fill="#2c3e66" />

          <circle cx="110" cy="70" r="26" fill="#f7c9a0" />
          <path d="M84 66 a26 26 0 0 1 52 0 q-4 -14 -26 -14 t-26 14 z" fill="#4a3527" />

          <path d="M84 118 Q60 110 52 90" fill="none" stroke="#f7c9a0" strokeWidth="10" strokeLinecap="round" />

          <g transform="translate(160,95)">
            <circle r="20" fill="#e91e8c" />
            <rect x="-4" y="-12" width="8" height="24" rx="2" fill="#ffffff" />
            <rect x="-12" y="-4" width="24" height="8" rx="2" fill="#ffffff" />
          </g>

          <polyline
            points="10,150 35,150 42,135 50,162 58,145 66,150 90,150"
            fill="none"
            stroke="#2196f3"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="card-grid">
        <PromotionCard title="Promotion by Clinics" items={CLINIC_PROMOTIONS} />
        <PromotionCard title="Promotion by Pharmacies" items={PHARMACY_PROMOTIONS} />

        <div className="card">
          <div className="card-head">
            <h3>Smart Market Usage by app</h3>
            <span className="info-dot">!</span>
          </div>
          <div className="donut-row">
            <div className="donut" style={{ background: toConicGradient(MARKET_USAGE) }} />
            <div className="legend">
              {MARKET_USAGE.map((item) => (
                <div className="legend-row" key={item.name}>
                  <span className="swatch" style={{ background: item.color }}>
                    ●
                  </span>
                  <span className="name">{item.name}</span>
                  <span className="pct">{item.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <h3>Health Index</h3>
          </div>
          <div className="health-index-value">
            70% <span className="delta">+3%</span>
          </div>
          <HealthSparkline />
        </div>
      </div>
    </AppLayout>
  );
}
