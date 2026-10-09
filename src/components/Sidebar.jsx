import { Link } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/dashboard", icon: "🏠", label: "Dashboard" },
  { to: "#", icon: "📅", label: "Appointments" },
  { to: "/find-doctor", icon: "🩺", label: "Find Doctor" },
  { to: "/find-clinic", icon: "🏥", label: "Find Clinic" },
  { to: "#", icon: "💬", label: "Chat" },
  { to: "#", icon: "🛒", label: "Find MarketPlace" },
  { to: "#", icon: "💊", label: "Find Pharmacy" },
  { to: "#", icon: "👪", label: "My Dependents" },
  { to: "#", icon: "⚙️", label: "My Account" },
  { to: "#", icon: "🛠️", label: "Settings" },
];

export default function Sidebar({ active, onLinkClick }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="logo-icon">M</span>
        MyPatientHUB
      </div>

      <ul className="nav-list">
        {NAV_ITEMS.map((item) => (
          <li key={item.label}>
            <Link
              to={item.to}
              className={active === item.label ? "active" : ""}
              onClick={onLinkClick}
            >
              <span className="nav-icon">{item.icon}</span> {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="sidebar-promo">
        <div className="promo-icon">?</div>
        <strong>Download</strong>
        <span>MyPIHUB Mobile App</span>
      </div>
    </aside>
  );
}
