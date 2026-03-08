import StarBorderRoundedIcon from "@mui/icons-material/StarBorderRounded";
import "../styles/sidebar-profile-card.css";

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
  const propertiesLabel = Number.isFinite(Number(propertyCount))
    ? `${propertyCount} Properties`
    : String(propertyCount || "0 Properties");

  return (
    <section className="sidebar-profile-card" aria-label="Profile summary">
      <img src={avatar} alt={name} className="sidebar-profile-card__avatar" />

      <div className="sidebar-profile-card__identity">
        <strong className="sidebar-profile-card__name">{name}</strong>
        <div className="sidebar-profile-card__role-row">
          <span className="sidebar-profile-card__role">{roleLabel.toUpperCase()}</span>
          {isTenant ? (
            <span className="sidebar-profile-card__tenant-rating">
              <StarBorderRoundedIcon fontSize="inherit" />
              <span>{rating}</span>
            </span>
          ) : null}
        </div>
      </div>

      {!isTenant ? (
        <p className="sidebar-profile-card__meta-line sidebar-profile-card__meta-line--rating">
          <StarBorderRoundedIcon fontSize="inherit" />
          <span>{rating} - {propertiesLabel}</span>
        </p>
      ) : null}
    </section>
  );
}

export default SidebarProfileCard;
