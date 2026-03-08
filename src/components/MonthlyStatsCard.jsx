import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import DashboardCardShell from "./DashboardCardShell";

const DEFAULT_ITEMS = [
  {
    label: "Profile Views",
    value: "1,240",
    icon: <VisibilityOutlinedIcon fontSize="inherit" />,
  },
  {
    label: "Contact Requests",
    value: "32",
    icon: <ChatBubbleOutlineRoundedIcon fontSize="inherit" />,
  },
  {
    label: "Times Saved",
    value: "48",
    icon: <FavoriteBorderRoundedIcon fontSize="inherit" />,
  },
];

function MonthlyStatsCard({ items = DEFAULT_ITEMS }) {
  return (
    <DashboardCardShell className="dashboard-panel-card--stats">
      <div className="dashboard-panel-card__header">
        <div className="dashboard-panel-card__heading">
          <span className="dashboard-panel-card__mini-icon" aria-hidden="true">
            <ShowChartOutlinedIcon fontSize="inherit" />
          </span>
          <div className="dashboard-panel-card__heading-copy">
            <span className="dashboard-panel-card__heading-label">Insights</span>
            <h3 className="dashboard-panel-card__title">This Month</h3>
          </div>
        </div>
        <span className="dashboard-panel-card__eyebrow dashboard-panel-card__eyebrow--badge">
          Live
        </span>
      </div>

      <div className="dashboard-panel-card__stat-list">
        {items.map((item) => (
          <div key={item.label} className="dashboard-panel-card__stat-item">
            <span className="dashboard-panel-card__stat-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span className="dashboard-panel-card__stat-label">{item.label}</span>
            <strong className="dashboard-panel-card__stat-value">{item.value}</strong>
          </div>
        ))}
      </div>
    </DashboardCardShell>
  );
}

export default MonthlyStatsCard;
