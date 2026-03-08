import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import "../styles/dashboard-date-card.css";

function CurrentDateCard({ value = "June 12, 2024" }) {
  return (
    <div className="dashboard-date-card" aria-label="Current date">
      <span className="dashboard-date-card__icon" aria-hidden="true">
        <EventAvailableOutlinedIcon fontSize="inherit" />
      </span>
      <span className="dashboard-date-card__value">{value}</span>
    </div>
  );
}

export default CurrentDateCard;
