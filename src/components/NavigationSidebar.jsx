import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SidebarNavItem from "./SidebarNavItem";
import { DASHBOARD_PATH, MY_PROPERTIES_PATH } from "./routes";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "../context/dataContext";
import SidebarProfileCard from "./SidebarProfileCard";
import SupportCard from "./SupportCard";
import "../styles/dashboard-sidebar.css";

const getBadgeValue = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numericValue = Number(value);

  if (Number.isFinite(numericValue)) {
    return numericValue > 0 ? String(numericValue) : null;
  }

  return String(value);
};

const buildTopItems = (badges = {}) => [
  {
    icon: GridViewOutlinedIcon,
    text: "Overview",
    link: DASHBOARD_PATH,
  },
  {
    icon: ApartmentOutlinedIcon,
    text: "My Properties",
    link: MY_PROPERTIES_PATH,
  },
  {
    icon: AddCircleOutlineRoundedIcon,
    text: "Add New Listing",
    link: "/Add",
  },
  {
    icon: CalendarTodayOutlinedIcon,
    text: "Visit Requests",
    badge: getBadgeValue(badges.visitRequests),
  },
  {
    icon: StarsRoundedIcon,
    text: "Reviews & Rating",
  },
  {
    icon: GroupOutlinedIcon,
    text: "User Management",
  },
  {
    icon: SettingsOutlinedIcon,
    text: "Settings",
  },
];

function NavigationSidebar({ badges, isOpen = false, onClose = () => {} }) {
  const navigate = useNavigate();
  const { logout, displayName, userRole, userAvatar } = useDataContext();
  const topItems = buildTopItems(badges);
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav
      className={["sidebar-menu", isOpen ? "sidebar-menu--open" : ""].filter(Boolean).join(" ")}
      aria-label="Sidebar"
    >
      <button
        type="button"
        className="sidebar-menu__close-btn"
        aria-label="Close navigation"
        onClick={onClose}
      >
        <CloseRoundedIcon fontSize="inherit" />
      </button>

      <SidebarProfileCard
        name={displayName || "James Harrison"}
        role={userRole || "owner"}
        avatar={userAvatar || "/images/photo_2026-02-11_22-49-45.jpg"}
        rating={badges?.averageRating || "4.9"}
        propertyCount={badges?.listings || 5}
      />

      <div className="sidebar-menu__panel">
        <div className="sidebar-menu__items">
          {topItems.map(({ icon: ItemIcon, text, link, badge, badgeClassName }) => (
            <SidebarNavItem
              key={text}
              icon={<ItemIcon fontSize="inherit" />}
              text={text}
              link={link}
              badge={badge}
              badgeClassName={badgeClassName}
              fullWidth
              className="sidebar-menu__item"
            />
          ))}
        </div>
      </div>

      <SupportCard
        compact
        className="sidebar-menu__support"
        title="Need assistance?"
        description="Our concierge team is available 24/7 for premium owners."
        buttonLabel="Open Support Chat"
      />

      <SidebarNavItem
        icon={<LogoutRoundedIcon fontSize="inherit" />}
        text="Sign Out"
        onClick={handleLogout}
        variant="danger"
        fullWidth
        className="sidebar-menu__item sidebar-menu__sign-out"
      />
    </nav>
  );
}

export default NavigationSidebar;
