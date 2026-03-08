import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import "../styles/SupportCard.css";

function SupportCard({
  title = "Need assistance?",
  description = "Our concierge team is available 24/7 for premium owners.",
  buttonLabel = "Open Support Chat",
  onAction,
  compact = false,
  className = "",
}) {
  const supportBoxClassName = [
    "support-box",
    compact ? "support-box--compact" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={supportBoxClassName} aria-label="Support">
      <span className="support-box__icon" aria-hidden="true">
        <HelpOutlineRoundedIcon fontSize="inherit" />
      </span>

      <h3 className="support-box__title">{title}</h3>
      <p className="support-box__description">{description}</p>

      <button type="button" className="support-box__button" onClick={onAction}>
        {buttonLabel}
      </button>
    </section>
  );
}

export default SupportCard;
