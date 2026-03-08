import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
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
  image = "https://via.placeholder.com/56x56",
  title = "Luxury Penthouse with Sea View",
  location = "Downtown Marina",
  status = "Active",
  price = "$4,500/mo",
  views = "1.2k",
  leads = 24,
  isNew = true,
}) {
  const statusTone = getStatusTone(status);

  return (
    <article className="dashboard-property-row">
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

      <div className="dashboard-property-row__actions">
        <Link
          to="#"
          className="dashboard-property-row__action-btn"
          aria-label="Open property"
        >
          <OpenInNewRoundedIcon fontSize="inherit" />
        </Link>
        <button
          type="button"
          className="dashboard-property-row__action-btn"
          aria-label="Edit property"
        >
          <EditOutlinedIcon fontSize="inherit" />
        </button>
        <button
          type="button"
          className="dashboard-property-row__action-btn dashboard-property-row__action-btn--danger"
          aria-label="Delete property"
        >
          <DeleteOutlineRoundedIcon fontSize="inherit" />
        </button>
      </div>

      <Link to="/dashboard#my-properties" className="dashboard-property-row__manage-link">
        Manage
      </Link>
    </article>
  );
}

export default PropertyRowCard;
