import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import "../styles/MyPropertyVerticalCard.css";

function MyPropertyVerticalCard({
  id,
  image,
  title,
  location,
  status,
  price,
  views,
  saves,
  leads,
  beds,
  baths,
  area,
  addedAt,
  onEdit,
  onPause,
  onDelete,
  onView,
}) {
  const statusClassName = String(status || "active").toLowerCase();

  return (
    <article className="myprops-vertical-card">
      <div className="myprops-vertical-card__media-wrap">
        <img src={image} alt={title} className="myprops-vertical-card__media" />
        <span className={`myprops-vertical-card__status myprops-vertical-card__status--${statusClassName}`}>
          {status}
        </span>
        <span className="myprops-vertical-card__date-pill">{addedAt}</span>
      </div>

      <div className="myprops-vertical-card__body">
        <h3 className="myprops-vertical-card__title">{title}</h3>
        <p className="myprops-vertical-card__location">- {location}</p>

        <div className="myprops-vertical-card__price-row">
          <span className="myprops-vertical-card__price">{price}</span>
          <div className="myprops-vertical-card__meta-inline">
            <span><KingBedOutlinedIcon fontSize="inherit" /> {beds}</span>
            <span><BathtubOutlinedIcon fontSize="inherit" /> {baths}</span>
            <span><SquareFootOutlinedIcon fontSize="inherit" /> {area}</span>
          </div>
        </div>

        <div className="myprops-vertical-card__stats">
          <div>
            <VisibilityOutlinedIcon fontSize="inherit" />
            <strong>{views}</strong>
            <small>Views</small>
          </div>
          <div>
            <FavoriteBorderOutlinedIcon fontSize="inherit" />
            <strong>{saves}</strong>
            <small>Saves</small>
          </div>
          <div>
            <ChatBubbleOutlineRoundedIcon fontSize="inherit" />
            <strong>{leads}</strong>
            <small>Leads</small>
          </div>
        </div>

        <div className="myprops-vertical-card__footer">
          <div className="myprops-vertical-card__actions">
            <button
              type="button"
              className="myprops-vertical-card__btn myprops-vertical-card__btn--ghost"
              onClick={() => onEdit?.(id)}
            >
              Edit
            </button>
            <button
              type="button"
              className="myprops-vertical-card__btn myprops-vertical-card__btn--pause"
              onClick={() => onPause?.(id)}
            >
              Pause
            </button>
            <button
              type="button"
              className="myprops-vertical-card__btn myprops-vertical-card__btn--danger"
              onClick={() => onDelete?.(id)}
            >
              Delete
            </button>
            <button
              type="button"
              className="myprops-vertical-card__btn myprops-vertical-card__btn--dark"
              onClick={() => onView?.(id)}
            >
              View
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default MyPropertyVerticalCard;
