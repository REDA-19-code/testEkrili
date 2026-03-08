import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import "../styles/box-static.css";

function StatsSummaryCard({
  icon,
  title = "Active Listings",
  value = "12",
  change = "+8%",
  changeTone = "positive",
}) {
  return (
    <article className="box-static">
      <div className="box-static__top">
        <div className="box-static__icon">
          {icon || <TrendingUpRoundedIcon fontSize="inherit" />}
        </div>

        <span className={`box-static__change box-static__change--${changeTone}`}>{change}</span>
      </div>

      <div className="box-static__body">
        <h3 className="box-static__title">{title}</h3>
        <strong className="box-static__value">{value}</strong>
      </div>
    </article>
  );
}

export default StatsSummaryCard;
