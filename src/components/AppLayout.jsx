import { useEffect, useState } from "react";
import Sidebar from "./Sidebar.jsx";
import Topbar from "./Topbar.jsx";

const MOBILE_BREAKPOINT = 900;

export default function AppLayout({ active, crumb, title, showSearch, children }) {
  // Sidebar starts open on desktop, closed on small screens
  const [sidebarHidden, setSidebarHidden] = useState(
    typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT
  );

  useEffect(() => {
    function handleResize() {
      setSidebarHidden(window.innerWidth <= MOBILE_BREAKPOINT);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function toggleSidebar() {
    setSidebarHidden((prev) => !prev);
  }

  function handleLinkClick() {
    // On small screens, close the sidebar again after a link is tapped
    if (window.innerWidth <= MOBILE_BREAKPOINT) {
      setSidebarHidden(true);
    }
  }

  return (
    <div className={`app-shell ${sidebarHidden ? "sidebar-hidden" : ""}`}>
      <Sidebar active={active} onLinkClick={handleLinkClick} />

      <div className="main-col">
        <Topbar
          crumb={crumb}
          title={title}
          onToggleSidebar={toggleSidebar}
          showSearch={showSearch}
        />
        <main className="page-content">{children}</main>
      </div>
    </div>
  );
}
