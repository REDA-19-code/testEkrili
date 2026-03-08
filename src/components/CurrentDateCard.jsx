import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import "../styles/CurrentDateCard.css";

function CurrentDateCard({ value = "June 12, 2024" }) {
  return (
    <div className="dashboard-date-card" aria-label="Current date">
      <div className="dashboard-date-card__icon" aria-hidden="true">
        <EventAvailableOutlinedIcon fontSize="inherit" />
      </div>
      <div className="dashboard-date-card__content">
        <span className="dashboard-date-card__label">Today</span>
        <span className="dashboard-date-card__value">{value}</span>
      </div>
    </div>
  );
}

export default CurrentDateCard;
