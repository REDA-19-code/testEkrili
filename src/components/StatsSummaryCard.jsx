import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import "../styles/box-static.css";

function StatsSummaryCard({
  icon,
  title = "Active Listings",
  value = "12",
  change,
  changeTone = "positive",
}) {
  return (
    <article className="box-static">
      <div className="box-static__top">
        <div>
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
