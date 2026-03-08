import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import "../styles/SidebarProfileCard.css";

const toEnglishRoleLabel = (role) => {
  const normalizedRole = String(role || "").trim().toLowerCase();

  if (!normalizedRole) {
    return "Property Owner";
  }

  if (
    normalizedRole.includes("tenant") ||
    normalizedRole.includes("verified tenant") ||
    normalizedRole.includes("renter") ||
    normalizedRole.includes("lessee")
  ) {
    return "Tenant";
  }

  if (
    normalizedRole.includes("owner") ||
    normalizedRole.includes("landlord") ||
    normalizedRole.includes("host")
  ) {
    return "Property Owner";
  }

  return String(role);
};

function SidebarProfileCard({
  name = "James Harrison",
  role = "owner",
  avatar = "/images/photo_2026-02-11_22-49-45.jpg",
  rating = "4.9",
  propertyCount = 5,
}) {
  const roleLabel = toEnglishRoleLabel(role);
  const isTenant = roleLabel === "Tenant";
  const propertiesValue = Number.isFinite(Number(propertyCount))
    ? String(propertyCount)
    : String(propertyCount || "0");

  return (
    <section className="sidebar-profile-card" aria-label="Profile summary">
      <div className="sidebar-profile-card__top">
        <div className="sidebar-profile-card__avatar-shell">
          <img src={avatar} alt={name} className="sidebar-profile-card__avatar" />
        </div>

        <div className="sidebar-profile-card__identity">
          <span className="sidebar-profile-card__eyebrow">Account</span>
          <strong className="sidebar-profile-card__name">{name}</strong>
          <div className="sidebar-profile-card__role-row">
            <span className="sidebar-profile-card__role">{roleLabel}</span>
          </div>
        </div>
      </div>

      <div className="sidebar-profile-card__stats">
        <div className="sidebar-profile-card__stat">
          <span className="sidebar-profile-card__stat-label">Rating</span>
          <span className="sidebar-profile-card__stat-value">
            <StarBorderRoundedIcon fontSize="inherit" />
            <span>{rating}</span>
          </span>
        </div>
        <div className="sidebar-profile-card__divider" aria-hidden="true" />
        <div className="sidebar-profile-card__stat">
          <span className="sidebar-profile-card__stat-label">
            {isTenant ? "Visits" : "Listings"}
          </span>
          <span className="sidebar-profile-card__stat-value sidebar-profile-card__stat-value--plain">
            {propertiesValue}
          </span>
        </div>
      </div>
    </section>
  );
}

export default SidebarProfileCard;
