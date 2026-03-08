import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { Link } from "react-router-dom";
import DashboardCardShell from "./DashboardCardShell";

function QuickActionsCard() {
  return (
    <DashboardCardShell className="dashboard-panel-card--actions">
      <div className="dashboard-panel-card__header">
        <div className="dashboard-panel-card__heading">
          <span className="dashboard-panel-card__mini-icon" aria-hidden="true">
            <AddCircleOutlineRoundedIcon fontSize="inherit" />
          </span>
          <h3 className="dashboard-panel-card__title">Quick Actions</h3>
        </div>
      </div>

      <div className="dashboard-panel-card__action-stack">
        <Link to="/Add" className="dashboard-panel-card__primary-action">
          <AddCircleOutlineRoundedIcon fontSize="inherit" />
          <span>Add New Property</span>
        </Link>
        <Link to="/dashboard" className="dashboard-panel-card__secondary-action">
          <CalendarTodayOutlinedIcon fontSize="inherit" />
          <span>Visit Requests</span>
        </Link>
        <Link to="/dashboard" className="dashboard-panel-card__secondary-action">
          <StarBorderRoundedIcon fontSize="inherit" />
          <span>My Reviews</span>
        </Link>
        <button type="button" className="dashboard-panel-card__text-link">
          <DownloadRoundedIcon fontSize="inherit" />
          <span>Export Report</span>
        </button>
      </div>
    </DashboardCardShell>
  );
}

export default QuickActionsCard;
