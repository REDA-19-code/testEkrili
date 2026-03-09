import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import PauseRoundedIcon from "@mui/icons-material/PauseRounded";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styles/PropertyRowCard.css";

const getStatusTone = (status) => {
  const normalizedStatus = String(status || "").trim().toLowerCase();

  if (!normalizedStatus) {
    return "default";
  }

  if (normalizedStatus.includes("active")) {
    return "active";
  }

  if (normalizedStatus.includes("pending")) {
    return "pending";
  }

  if (normalizedStatus.includes("rent")) {
    return "rented";
  }

  if (normalizedStatus.includes("draft")) {
    return "draft";
  }

  return "default";
};

function PropertyRowCard({
  id,
  image = "https://via.placeholder.com/56x56",
  title = "Luxury Penthouse with Sea View",
  location = "Downtown Marina",
  addedAt,
  status = "Active",
  price = "$4,500/mo",
  views = "1.2k",
  leads = 24,
  isNew = true,
  onView,
  onEdit,
  onPause,
  onDelete,
  showActions = true,
}) {
  const navigate = useNavigate();
  const statusTone = getStatusTone(status);

  return (
    <article
      className={["dashboard-property-row", !showActions ? "dashboard-property-row--no-actions" : ""]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="dashboard-property-row__property">
        <img
          src={image}
          alt={title}
          className="dashboard-property-row__image"
        />

        <div className="dashboard-property-row__info">
          <h3 className="dashboard-property-row__title">{title}</h3>
          <p className="dashboard-property-row__location">
            <LocationOnOutlinedIcon fontSize="inherit" />
            <span>{location}</span>
          </p>
          {addedAt ? <p className="dashboard-property-row__added-at">{addedAt}</p> : null}
        </div>
      </div>

      <div className="dashboard-property-row__status">
        <div className={`dashboard-property-row__status-badge dashboard-property-row__status-badge--${statusTone}`}>
          {status}
        </div>
      </div>
      <div className="dashboard-property-row__price">{price}</div>
      <div className="dashboard-property-row__views">{views}</div>

      <div className="dashboard-property-row__leads">
        <span className="dashboard-property-row__leads-count">{leads}</span>
        {isNew ? <span className="dashboard-property-row__badge">New</span> : null}
      </div>

      {showActions ? (
        <div className="dashboard-property-row__actions">
          <Link
            to="#"
            className="dashboard-property-row__action-btn"
            aria-label="Open property"
            onClick={(event) => {
              event.preventDefault();
              if (onView) {
                onView(id);
                return;
              }
              navigate("/Edit");
            }}
          >
            <OpenInNewRoundedIcon fontSize="inherit" />
          </Link>
          <button
            type="button"
            className="dashboard-property-row__action-btn"
            aria-label="Edit property"
            onClick={() => {
              if (onEdit) {
                onEdit(id);
                return;
              }
              navigate("/Edit");
            }}
          >
            <EditOutlinedIcon fontSize="inherit" />
          </button>
          <button
            type="button"
            className="dashboard-property-row__action-btn dashboard-property-row__action-btn--pause"
            aria-label="Pause property"
            onClick={() => onPause?.(id)}
          >
            <PauseRoundedIcon fontSize="inherit" />
          </button>
          <button
            type="button"
            className="dashboard-property-row__action-btn dashboard-property-row__action-btn--danger"
            aria-label="Delete property"
            onClick={() => onDelete?.(id)}
          >
            <DeleteOutlineRoundedIcon fontSize="inherit" />
          </button>
        </div>
      ) : null}

      {showActions ? (
        <Link to="/my-properties" className="dashboard-property-row__manage-link">
          Manage
        </Link>
      ) : null}
    </article>
  );
}

export default PropertyRowCard;
