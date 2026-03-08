import { NavLink } from "react-router-dom";
import "../styles/icons.css";

export function SidebarNavItem({
  icon,
  text,
  badge,
  badgeClassName = "",
  onClick,
  link,
  active = false,
  fullWidth = false,
  variant = "default",
  className = "",
}) {
  const cardClassName = [
    "icon-card",
    `icon-card--${variant}`,
    active ? "is-active" : "",
    fullWidth ? "icon-card--full" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span className="icon-card__icon" aria-hidden="true">{icon}</span>
      <span className="icon-card__text">{text}</span>
      {badge != null ? (
        <span className={["icon-card__badge", badgeClassName].filter(Boolean).join(" ")}>
          {badge}
        </span>
      ) : null}
    </>
  );

  if (link) {
    return (
      <NavLink
        to={link}
        onClick={onClick}
        className={({ isActive }) => `${cardClassName}${isActive ? " is-active" : ""}`}
      >
        {content}
      </NavLink>
    );
  }

  if (!onClick) {
    return (
      <div className={cardClassName} aria-disabled="true">
        {content}
      </div>
    );
  }

  return (
    <button type="button" className={cardClassName} onClick={onClick}>
      {content}
    </button>
  );
}

export default SidebarNavItem;
