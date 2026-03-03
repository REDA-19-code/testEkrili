import { NavLink } from "react-router-dom";
import "./icons.css";

export function IconCard({
  icon,
  text,
  onClick,
  link,
  active = false,
  fullWidth = false,
  variant = "default",
  className = "",
}) {
  const cardClassName = `icon-card icon-card--${variant}${
    active ? " is-active" : ""
  }${fullWidth ? " icon-card--full" : ""}${className ? ` ${className}` : ""}`;

  if (link) {
    return (
      <NavLink
        to={link}
        onClick={onClick}
        className={({ isActive }) => `${cardClassName}${isActive ? " is-active" : ""}`}
      >
        <span className="icon-card__icon" aria-hidden="true">{icon}</span>
        <span className="icon-card__text">{text}</span>
      </NavLink>
    );
  }

  return (
    <button type="button" className={cardClassName} onClick={onClick}>
      <span className="icon-card__icon" aria-hidden="true">{icon}</span>
      <span className="icon-card__text">{text}</span>
    </button>
  );
}

export default IconCard;