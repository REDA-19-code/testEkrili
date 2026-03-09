import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import "../styles/StatsSummaryCard.css";

function StatsSummaryCard({
  icon,
  title = "Active Listings",
  value = "12",
  change,
  changeTone = "positive",
}) {
  return (
    <article className="box-static">
      <span className="box-static__eyebrow">Overview</span>
      <div className="box-static__top">
        <div className="box-static__copy">
          <h3 className="box-static__title">{title}</h3>
          <strong className="box-static__value">{value}</strong>
        </div>

        <div className="box-static__icon">
          {icon || <TrendingUpRoundedIcon fontSize="inherit" />}
        </div>
      </div>

      {change && (
        <div className="box-static__footer">
          <span className={`box-static__change box-static__change--${changeTone}`}>{change}</span>
        </div>
      )}
    </article>
  );
}

export default StatsSummaryCard;
