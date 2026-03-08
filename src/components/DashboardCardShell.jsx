import "../styles/dashboard-panel-card.css";

function DashboardCardShell({ className = "", children }) {
  const panelClassName = ["dashboard-panel-card", className].filter(Boolean).join(" ");

  return <article className={panelClassName}>{children}</article>;
}

export default DashboardCardShell;
