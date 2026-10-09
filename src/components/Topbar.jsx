import { useNavigate } from "react-router-dom";

export default function Topbar({ crumb, title, onToggleSidebar, showSearch = false }) {
  const navigate = useNavigate();

  function handleLogout() {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      navigate("/");
    }
  }

  return (
    <header className="topbar">
      <button className="menu-toggle" onClick={onToggleSidebar} aria-label="Toggle sidebar">
        ☰
      </button>

      <div className="crumb">
        <div className="path">🏠 / {crumb}</div>
        <div className="page-title">{title}</div>
      </div>

      {showSearch && (
        <div className="topbar-search">
          <span>🔍</span>
          <input type="text" placeholder="Type here..." />
        </div>
      )}

      <div className="topbar-actions">
        <button className="logout" onClick={handleLogout}>
          🔒 Log out
        </button>
        <span>👤</span>
        <span>⚙️</span>
        <span>🔔</span>
      </div>
    </header>
  );
}
