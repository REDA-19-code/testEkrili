import IconCard from "./icons";
import { DASHBOARD_PATH } from "./routes";
import "../styles/dashboard-sidebar.css";

function Sidebar() {
  return (
    <nav className="sidebar-menu" aria-label="Sidebar">
      <IconCard
        icon={
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <path d="M12 3.2L3 10.4h2v9.4h5.5v-5.6h3v5.6H19v-9.4h2L12 3.2z" />
          </svg>
        }
        text="Dashboard"
        link={DASHBOARD_PATH}
        fullWidth
      />

      <IconCard
        icon={
          <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <path d="M12 2.5a9.5 9.5 0 1 0 0 19 9.5 9.5 0 0 0 0-19Zm0 2a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15Zm-1 3.5v3h-3a1 1 0 1 0 0 2h3v3a1 1 0 1 0 2 0v-3h3a1 1 0 1 0 0-2h-3v-3a1 1 0 1 0-2 0Z" />
          </svg>
        }
        text="Add New Property"
        fullWidth
      />
    </nav>
  );
}

export default Sidebar;
