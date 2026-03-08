import { useMemo, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import KingBedOutlinedIcon from "@mui/icons-material/KingBedOutlined";
import BathtubOutlinedIcon from "@mui/icons-material/BathtubOutlined";
import SquareFootOutlinedIcon from "@mui/icons-material/SquareFootOutlined";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "../components/NavigationSidebar";
import CurrentDateCard from "../components/CurrentDateCard";
import StatsSummaryCard from "../components/StatsSummaryCard";
import PropertiesInventorySection from "../components/PropertiesInventorySection";
import PropertyRowCard from "../components/PropertyRowCard";
import FooterSection from "../components/FooterSection";
import "../styles/dashboard.css";
import "../styles/myProps.css";

const sampleProperties = [
  {
    id: "property-1",
    image: "/images/house1.jpg",
    title: "Luxury Penthouse with Sea View",
    location: "Downtown Marina",
    status: "Active",
    price: "$4,500/mo",
    rating: 4.8,
    listedAt: "2026-03-06",
    views: "1.2k",
    leads: 24,
    saves: 84,
    beds: 3,
    baths: 2,
    area: "145m2",
    addedAt: "Added 2 days ago",
    isNew: true,
  },
  {
    id: "property-2",
    image: "/images/house2.jpg",
    title: "Modern Family Villa",
    location: "Green Valley Estates",
    status: "Pending",
    price: "$3,200/mo",
    rating: 4.6,
    listedAt: "2026-03-01",
    views: "850",
    leads: 12,
    saves: 42,
    beds: 4,
    baths: 3,
    area: "320m2",
    addedAt: "Added 1 week ago",
    isNew: true,
  },
  {
    id: "property-3",
    image: "/images/house3.jpg",
    title: "Urban Loft Residence",
    location: "City Center District",
    status: "Rented",
    price: "$2,900/mo",
    rating: 4.4,
    listedAt: "2026-02-15",
    views: "640",
    leads: 8,
    saves: 25,
    beds: 2,
    baths: 1,
    area: "95m2",
    addedAt: "Added 3 weeks ago",
    isNew: false,
  },
  {
    id: "property-4",
    image: "/images/house2.jpg",
    title: "Downtown Smart Apartment",
    location: "Central Business District",
    status: "Active",
    price: "$2,000/mo",
    rating: 4.5,
    listedAt: "2026-03-05",
    views: "720",
    leads: 10,
    saves: 31,
    beds: 2,
    baths: 1,
    area: "110m2",
    addedAt: "Added 3 days ago",
    isNew: true,
  },
];

const sidebarBadges = {
  visitRequests: 3,
  listings: sampleProperties.length,
  averageRating: "4.8",
  reviews: 2,
  notifications: 5,
};

const myPropsStats = [
  {
    id: "active",
    icon: <VisibilityOutlinedIcon fontSize="inherit" />,
    title: "Active Listings",
    value: sampleProperties.filter((property) => String(property.status).toLowerCase() === "active").length,
  },
  {
    id: "pending",
    icon: <PendingActionsOutlinedIcon fontSize="inherit" />,
    title: "Pending Properties",
    value: sampleProperties.filter((property) => String(property.status).toLowerCase() === "pending").length,
  },
  {
    id: "rating",
    icon: <Inventory2OutlinedIcon fontSize="inherit" sx={{ color: "#ef4444" }} />,
    title: "Draft Items",
    value: sampleProperties.filter((property) => String(property.status).toLowerCase() === "draft").length,
  },
];

const formatDateLabel = (value) =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(value);

function MyProps() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCardView, setIsCardView] = useState(true);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortKey, setSortKey] = useState("date");
  const navigate = useNavigate();
  const currentDateLabel = formatDateLabel(new Date());
  const base = process.env.PUBLIC_URL || "";
  const sortLabel = sortKey === "price" ? "By Price" : sortKey === "rating" ? "By Rating" : "By Date";

  const sortedProperties = useMemo(() => {
    const toPrice = (priceValue) => {
      const numeric = Number(String(priceValue || "").replace(/[^0-9.]/g, ""));
      return Number.isFinite(numeric) ? numeric : 0;
    };

    const next = [...sampleProperties];

    if (sortKey === "price") {
      next.sort((a, b) => toPrice(b.price) - toPrice(a.price));
      return next;
    }

    if (sortKey === "rating") {
      next.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
      return next;
    }

    next.sort((a, b) => new Date(b.listedAt || 0) - new Date(a.listedAt || 0));
    return next;
  }, [sortKey]);

  const handleSortSelect = (nextSortKey) => {
    setSortKey(nextSortKey);
    setIsSortOpen(false);
  };

  return (
    <main className="app-shell">
      <div className="app-layout">
        <div
          className={["dashboard-sidebar-overlay", isSidebarOpen ? "is-open" : ""].filter(Boolean).join(" ")}
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden={isSidebarOpen ? "false" : "true"}
        />

        <NavigationSidebar
          badges={sidebarBadges}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <div className="dashboard-main">
          <header className="dashboard-hero">
            <div>
              <button
                type="button"
                className="dashboard-mobile-nav-btn"
                aria-label="Open navigation"
                onClick={() => setIsSidebarOpen(true)}
              >
                <MenuRoundedIcon fontSize="inherit" />
              </button>
              <h1 className="dashboard-hero__title">My Properties</h1>
              <p className="dashboard-hero__subtitle">
                Manage and track all your rental listing in one place.
              </p>
            </div>

            <div className="dashboard-hero__actions myprops-actions">
              <CurrentDateCard value={currentDateLabel} />
              <div className="myprops-toolbar" aria-label="Properties tools">
                <button
                  type="button"
                  className="icons-view"
                  aria-label="Change view"
                  aria-pressed={isCardView ? "true" : "false"}
                  onClick={() => setIsCardView((prev) => !prev)}
                >
                  <GridViewRoundedIcon fontSize="inherit" />
                  <ViewListRoundedIcon fontSize="inherit" />
                </button>

                <div className="sort-menu">
                  <button
                    type="button"
                    className="sort-btn"
                    aria-label="Sort listings"
                    aria-expanded={isSortOpen ? "true" : "false"}
                    onClick={() => setIsSortOpen((prev) => !prev)}
                  >
                    <span>Sort: {sortLabel}</span>
                    <ExpandMoreRoundedIcon fontSize="inherit" />
                  </button>

                  {isSortOpen ? (
                    <div className="sort-menu__panel" role="menu" aria-label="Sort options">
                      <button type="button" className="sort-menu__item" onClick={() => handleSortSelect("date")}>
                        By Date
                      </button>
                      <button type="button" className="sort-menu__item" onClick={() => handleSortSelect("price")}>
                        By Price
                      </button>
                      <button type="button" className="sort-menu__item" onClick={() => handleSortSelect("rating")}>
                        By Rating
                      </button>
                    </div>
                  ) : null}
                </div>

                <button
                  type="button"
                  className="Add-new-prop"
                  aria-label="Add new property"
                  onClick={() => navigate("/Add")}
                >
                  <AddRoundedIcon fontSize="inherit" />
                  <span>Add New Property</span>
                </button>
              </div>
            </div>
          </header>

          <section className="dashboard-stats" aria-label="My properties stats">
            {myPropsStats.map((stat) => (
              <StatsSummaryCard
                key={stat.id}
                icon={stat.icon}
                title={stat.title}
                value={stat.value}
              />
            ))}
            <StatsSummaryCard
              icon={<HomeWorkRoundedIcon fontSize="inherit" />}
              title="Total Properties"
              value={sampleProperties.length}
            />
          </section>

          {!isCardView ? (
            <PropertiesInventorySection>
              {sortedProperties.map((property) => (
                <PropertyRowCard
                  key={property.id}
                  image={property.image?.startsWith("/") ? `${base}${property.image}` : property.image}
                  title={property.title}
                  location={property.location}
                  status={property.status}
                  price={property.price}
                  views={property.views}
                  leads={property.leads}
                  isNew={property.isNew}
                />
              ))}
            </PropertiesInventorySection>
          ) : null}

          {isCardView ? (
            <section className="dashboard-property-cards" aria-label="Property cards">
              {sortedProperties.map((property) => {
                const imagePath = property.image?.startsWith("/") ? `${base}${property.image}` : property.image;
                const statusClassName = String(property.status || "active").toLowerCase();

                return (
                  <article key={`${property.id}-card`} className="dashboard-property-card">
                    <div className="dashboard-property-card__media-wrap">
                      <img
                        src={imagePath}
                        alt={property.title}
                        className="dashboard-property-card__media"
                      />
                      <span className={`dashboard-property-card__status dashboard-property-card__status--${statusClassName}`}>
                        {property.status}
                      </span>
                      <button type="button" className="dashboard-property-card__more-btn" aria-label="More options">
                        <MoreVertRoundedIcon fontSize="inherit" />
                      </button>
                      <span className="dashboard-property-card__views-pill">
                        <VisibilityOutlinedIcon fontSize="inherit" />
                        {property.views} Views
                      </span>
                    </div>

                    <div className="dashboard-property-card__body">
                      <h3 className="dashboard-property-card__title">{property.title}</h3>
                      <p className="dashboard-property-card__location">- {property.location}</p>

                      <div className="dashboard-property-card__price-row">
                        <span className="dashboard-property-card__price">{property.price}</span>
                        <div className="dashboard-property-card__meta-inline">
                          <span><KingBedOutlinedIcon fontSize="inherit" /> {property.beds}</span>
                          <span><BathtubOutlinedIcon fontSize="inherit" /> {property.baths}</span>
                          <span><SquareFootOutlinedIcon fontSize="inherit" /> {property.area}</span>
                        </div>
                      </div>

                      <div className="dashboard-property-card__stats">
                        <div>
                          <VisibilityOutlinedIcon fontSize="inherit" />
                          <strong>{property.views}</strong>
                          <small>Views</small>
                        </div>
                        <div>
                          <FavoriteBorderOutlinedIcon fontSize="inherit" />
                          <strong>{property.saves}</strong>
                          <small>Saves</small>
                        </div>
                        <div>
                          <ChatBubbleOutlineRoundedIcon fontSize="inherit" />
                          <strong>{property.leads}</strong>
                          <small>Leads</small>
                        </div>
                      </div>

                      <div className="dashboard-property-card__footer">
                        <span>{property.addedAt}</span>
                        <div className="dashboard-property-card__actions">
                          <button type="button" className="dashboard-property-card__btn dashboard-property-card__btn--ghost">
                            Edit
                          </button>
                          <button type="button" className="dashboard-property-card__btn dashboard-property-card__btn--dark">
                            View
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>
          ) : null}
        </div>
      </div>

      <FooterSection />
    </main>
  );
}

export default MyProps;
