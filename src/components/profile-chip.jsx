import "../styles/profile-chip.css";

const toEnglishRoleLabel = (role) => {
  const normalizedRole = String(role || "").trim().toLowerCase();

  if (!normalizedRole) {
    return "";
  }

  if (
    normalizedRole.includes("tenant") ||
    normalizedRole.includes("verified tenant") ||
    normalizedRole.includes("renter") ||
    normalizedRole.includes("lessee") ||
    normalizedRole.includes("مستاجر") ||
    normalizedRole.includes("مستأجر")
  ) {
    return "Tenant";
  }

  if (
    normalizedRole.includes("owner") ||
    normalizedRole.includes("landlord") ||
    normalizedRole.includes("host") ||
    normalizedRole.includes("مالك")
  ) {
    return "Owner";
  }

  return String(role);
};

function ProfileChip({
  image = "/images/photo_2026-02-11_22-49-45.jpg",
  name = "Sarah Jenkins",
  role = "tenant",
}) {
  const roleLabel = toEnglishRoleLabel(role);

  return (
    <div className="profile-chip">
      <img src={image} alt={name} className="profile-chip__image" />
      <div className="profile-chip__content">
        <strong className="profile-chip__name">{name}</strong>
        <p className="profile-chip__role">{roleLabel}</p>
      </div>
    </div>
  );
}

export default ProfileChip;
