import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import DashboardCardShell from "./DashboardCardShell";
import ProfileChip from "./profile-chip";

function UpcomingVisitCard({
  visitorName = "Sarah Jenkins",
  visitorRole = "Verified Tenant",
  propertyName = "Luxury Penthouse",
  visitTime = "Today - 14:30",
  avatar = "/images/photo_2026-02-11_22-49-45.jpg",
}) {
  const safeVisitTime = String(visitTime).replace("·", "-");
  const safeAvatar = String(avatar || "").includes("avatar-placeholder")
    ? "/images/photo_2026-02-11_22-49-45.jpg"
    : avatar;

  return (
    <DashboardCardShell className="dashboard-panel-card--visit">
      <div className="dashboard-panel-card__header">
        <div className="dashboard-panel-card__heading">
          <span className="dashboard-panel-card__heading-icon" aria-hidden="true">
            <EventAvailableOutlinedIcon fontSize="inherit" />
          </span>
          <h3 className="dashboard-panel-card__title dashboard-panel-card__title--accent">
            Upcoming Visit
          </h3>
        </div>
        <span className="dashboard-panel-card__eyebrow dashboard-panel-card__eyebrow--badge">Today</span>
      </div>

      <div className="dashboard-panel-card__visitor">
        <ProfileChip image={safeAvatar} name={visitorName} role={visitorRole} />
      </div>

      <div className="dashboard-panel-card__details">
        <p className="dashboard-panel-card__meta-line">
          <DescriptionOutlinedIcon fontSize="inherit" />
          <span>{propertyName}</span>
        </p>
        <p className="dashboard-panel-card__meta-line">
          <ScheduleOutlinedIcon fontSize="inherit" />
          <span>{safeVisitTime}</span>
        </p>
      </div>

      <div className="dashboard-panel-card__actions">
        <button type="button" className="dashboard-panel-card__text-btn dashboard-panel-card__text-btn--highlight">
          <CheckCircleOutlineRoundedIcon fontSize="inherit" />
          <span>View Request</span>
        </button>
      </div>
    </DashboardCardShell>
  );
}

export default UpcomingVisitCard;
