import { useEffect, useMemo, useRef, useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import HomeWorkRoundedIcon from "@mui/icons-material/HomeWorkRounded";
import { useNavigate } from "react-router-dom";
import NavigationSidebar from "../components/NavigationSidebar";
import StatsSummaryCard from "../components/StatsSummaryCard";
import MyPropertyVerticalCard from "../components/MyPropertyVerticalCard";
import PropertyRowCard from "../components/PropertyRowCard";
import FooterSection from "../components/FooterSection";
import SidebarNavItem from "../components/SidebarNavItem";
import { useDataContext } from "../context/dataContext";
import { deleteProperty, fetchProperties, pauseProperty } from "../services/propertyService";
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

const STATUS_FILTERS = [
  {
    id: "all",
    label: "All",
    matches: () => true,
  },
  {
    id: "active",
    label: "Active",
    matches: (property) => String(property.status || "").toLowerCase() === "active",
  },
  {
    id: "pending",
    label: "Pending",
    matches: (property) => String(property.status || "").toLowerCase() === "pending",
  },
  {
    id: "rented",
    label: "Rented",
    matches: (property) => String(property.status || "").toLowerCase() === "rented",
  },
];

const getNormalizedStatus = (value) => String(value || "").trim().toLowerCase();

const getIsNewValue = (value) => {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value === 1;
  }

  if (typeof value === "string") {
    return ["true", "1", "yes", "new"].includes(value.trim().toLowerCase());
  }

  return Boolean(value);
};

const formatAddedAtLabel = (value) => {
  if (!value) {
    return "";
  }

  if (typeof value === "string" && value.toLowerCase().startsWith("added ")) {
    return value;
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return String(value);
  }

  const now = Date.now();
  const diffDays = Math.max(0, Math.floor((now - date.getTime()) / (1000 * 60 * 60 * 24)));

  if (diffDays === 0) {
    return "Added today";
  }

  if (diffDays === 1) {
    return "Added 1 day ago";
  }

  if (diffDays < 7) {
    return `Added ${diffDays} days ago`;
  }

  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks <= 1) {
    return "Added 1 week ago";
  }

  if (diffWeeks < 5) {
    return `Added ${diffWeeks} weeks ago`;
  }

  return `Added ${new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date)}`;
};

const normalizeProperty = (property, index, base) => ({
  id: property.id || property._id || `property-${index}`,
  image: property.image?.startsWith("/")
    ? `${base}${property.image}`
    : property.image || property.thumbnail || `${base}/images/house1.jpg`,
  title: property.title || property.name || "Untitled Property",
  location: property.location || property.address || "Unknown location",
  status: property.status || "Active",
  price: property.price || property.rent || "--",
  rating: Number(property.rating || property.averageRating || 0),
  listedAt: property.listedAt || property.createdAt || property.updatedAt || "",
  views: property.views || property.viewCount || "0",
  leads: property.leads || property.leadsCount || 0,
  saves: property.saves || property.savesCount || property.favorites || 0,
  beds: property.beds || property.rooms || property.bedrooms || 0,
  baths: property.baths || property.bathrooms || 0,
  area: property.area || property.surface || property.size || "--",
  addedAt: formatAddedAtLabel(property.addedAt || property.createdAt || property.listedAt),
  isNew: getIsNewValue(property.isNew),
});

function MyProperties() {
  const { token } = useDataContext();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobileLayout, setIsMobileLayout] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth <= 760 : false
  );
  const [isCardView, setIsCardView] = useState(() => {
    const savedValue = localStorage.getItem("myprops:isCardView");
    return savedValue ? savedValue === "true" : true;
  });
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortKey, setSortKey] = useState(() => localStorage.getItem("myprops:sortKey") || "date");
  const [activeFilter, setActiveFilter] = useState(() => localStorage.getItem("myprops:activeFilter") || "all");
  const [properties, setProperties] = useState([]);
  const sortMenuRef = useRef(null);
  const base = process.env.PUBLIC_URL || "";
  const sortLabel = sortKey === "price" ? "Price" : sortKey === "views" ? "Most Viewed" : "Newest";
  const propertiesToRender = properties.length > 0 ? properties : sampleProperties;

  const sidebarBadges = {
    visitRequests: 3,
    listings: propertiesToRender.length,
    averageRating:
      propertiesToRender.length > 0
        ? (
            propertiesToRender.reduce((sum, property) => sum + Number(property.rating || 0), 0) / propertiesToRender.length
          ).toFixed(1)
        : "4.8",
    reviews: 2,
    notifications: 5,
  };

  const myPropsStats = [
    {
      id: "active",
      icon: <VisibilityOutlinedIcon fontSize="inherit" />,
      title: "Active Listings",
      value: propertiesToRender.filter((property) => getNormalizedStatus(property.status) === "active").length,
    },
    {
      id: "pending",
      icon: <PendingActionsOutlinedIcon fontSize="inherit" />,
      title: "Pending Listings",
      value: propertiesToRender.filter((property) => getNormalizedStatus(property.status) === "pending").length,
    },
    {
      id: "rented",
      icon: <Inventory2OutlinedIcon fontSize="inherit" sx={{ color: "#ef4444" }} />,
      title: "Rented Listings",
      value: propertiesToRender.filter((property) => getNormalizedStatus(property.status) === "rented").length,
    },
  ];

  const sortedProperties = useMemo(() => {
    const toPrice = (priceValue) => {
      const numeric = Number(String(priceValue || "").replace(/[^0-9.]/g, ""));
      return Number.isFinite(numeric) ? numeric : 0;
    };

    const next = [...propertiesToRender];

    if (sortKey === "price") {
      next.sort((a, b) => toPrice(b.price) - toPrice(a.price));
      return next;
    }

    if (sortKey === "views") {
      const toViews = (viewsValue) => {
        const normalizedValue = String(viewsValue || "").trim().toLowerCase();

        if (normalizedValue.endsWith("k")) {
          return Number(normalizedValue.replace("k", "")) * 1000;
        }

        const numeric = Number(normalizedValue.replace(/[^0-9.]/g, ""));
        return Number.isFinite(numeric) ? numeric : 0;
      };

      next.sort((a, b) => toViews(b.views) - toViews(a.views));
      return next;
    }

    next.sort((a, b) => new Date(b.listedAt || 0) - new Date(a.listedAt || 0));
    return next;
  }, [propertiesToRender, sortKey]);

  const handleSortSelect = (nextSortKey) => {
    setSortKey(nextSortKey);
    setIsSortOpen(false);
  };

  const handleEditProperty = (propertyId) => {
    navigate("/Edit", { state: { propertyId } });
  };

  const handleViewProperty = (propertyId) => {
    navigate("/Edit", { state: { propertyId, mode: "view" } });
  };

  const handlePauseProperty = async (propertyId) => {
    try {
      await pauseProperty({ token, propertyId });
      setProperties((currentProperties) =>
        currentProperties.map((property) =>
          property.id === propertyId ? { ...property, status: "Pending" } : property
        )
      );
    } catch (error) {
      console.error("Pause property action needs backend wiring:", error.response?.data || error.message);
    }
  };

  const handleDeleteProperty = async (propertyId) => {
    try {
      await deleteProperty({ token, propertyId });
      setProperties((currentProperties) =>
        currentProperties.filter((property) => property.id !== propertyId)
      );
    } catch (error) {
      console.error("Delete property action needs backend wiring:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (!process.env.REACT_APP_API_URL || !token) {
      setProperties([]);
      return;
    }

    let isMounted = true;

    const loadProperties = async () => {
      try {
        const propertiesList = await fetchProperties({ token });

        if (isMounted) {
          setProperties(propertiesList.map((property, index) => normalizeProperty(property, index, base)));
        }
      } catch (error) {
        if (isMounted) {
          setProperties([]);
        }
        console.error("Failed to load my properties:", error.response?.data || error.message);
      }
    };

    loadProperties();

    return () => {
      isMounted = false;
    };
  }, [base, token]);

  useEffect(() => {
    localStorage.setItem("myprops:isCardView", String(isCardView));
  }, [isCardView]);

  useEffect(() => {
    localStorage.setItem("myprops:sortKey", sortKey);
  }, [sortKey]);

  useEffect(() => {
    localStorage.setItem("myprops:activeFilter", activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 760px)");
    const updateLayout = (event) => {
      setIsMobileLayout(event.matches);
    };

    setIsMobileLayout(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updateLayout);
      return () => mediaQuery.removeEventListener("change", updateLayout);
    }

    mediaQuery.addListener(updateLayout);
    return () => mediaQuery.removeListener(updateLayout);
  }, []);

  useEffect(() => {
    if (!isSortOpen) {
      return undefined;
    }

    const handlePointerDownOutside = (event) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape") {
        setIsSortOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDownOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDownOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [isSortOpen]);

  const statusFilters = useMemo(
    () =>
      STATUS_FILTERS.map((filter) => ({
        ...filter,
        count: propertiesToRender.filter((property) => filter.matches(property)).length,
      })),
    [propertiesToRender]
  );

  const visibleProperties = useMemo(() => {
    const selectedFilter = STATUS_FILTERS.find((filter) => filter.id === activeFilter) || STATUS_FILTERS[0];
    return sortedProperties.filter((property) => selectedFilter.matches(property));
  }, [activeFilter, sortedProperties]);

  const resultsSummary =
    visibleProperties.length === 1
      ? "1 listing found"
      : `${visibleProperties.length} listings found`;

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

        <div className={["dashboard-main", isSidebarOpen ? "dashboard-main--sidebar-open" : ""].filter(Boolean).join(" ")}>
          <header className="dashboard-hero">
            <div className="dashboard-hero__copy">
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
                Manage, sort, and review all your listings in one place.
              </p>
            </div>

            <div className="dashboard-hero__actions myprops-actions">
              <div className="myprops-toolbar" aria-label="Properties tools">
                <SidebarNavItem
                  icon={<AddCircleOutlineRoundedIcon fontSize="inherit" />}
                  text="Add Property"
                  link="/Add"
                  onClick={() => setIsSidebarOpen(false)}
                  className="myprops-toolbar__add-link myprops-toolbar__add-link--desktop"
                />
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
              title="Total Listings"
              value={propertiesToRender.length}
            />
          </section>

          <section className="myprops-add-cta" aria-label="Add property">
            <SidebarNavItem
              icon={<AddCircleOutlineRoundedIcon fontSize="inherit" />}
              text="Add Property"
              link="/Add"
              onClick={() => setIsSidebarOpen(false)}
              className="myprops-toolbar__add-link myprops-toolbar__add-link--mobile"
            />
          </section>

          <section className="myprops-filters" aria-label="Listing status filters">
            {statusFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={["myprops-filter-chip", activeFilter === filter.id ? "myprops-filter-chip--active" : ""]
                  .filter(Boolean)
                  .join(" ")}
                aria-pressed={activeFilter === filter.id ? "true" : "false"}
                onClick={() => setActiveFilter(filter.id)}
              >
                <span>{filter.label}</span>
                <span className="myprops-filter-chip__count">{filter.count}</span>
              </button>
            ))}
          </section>

          <section className="myprops-results-bar" aria-label="Listings summary">
            <div className="myprops-results-bar__copy">
              <span className="myprops-results-bar__eyebrow">Collection</span>
              <h2 className="myprops-results-bar__title">{resultsSummary}</h2>
            </div>
            <div className="myprops-controls" aria-label="View and sort controls">
              <div className="sort-menu" ref={sortMenuRef}>
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
                    <button
                      type="button"
                      className={["sort-menu__item", sortKey === "date" ? "sort-menu__item--active" : ""].filter(Boolean).join(" ")}
                      onClick={() => handleSortSelect("date")}
                    >
                      Newest
                    </button>
                    <button
                      type="button"
                      className={["sort-menu__item", sortKey === "price" ? "sort-menu__item--active" : ""].filter(Boolean).join(" ")}
                      onClick={() => handleSortSelect("price")}
                    >
                      Price
                    </button>
                    <button
                      type="button"
                      className={["sort-menu__item", sortKey === "views" ? "sort-menu__item--active" : ""].filter(Boolean).join(" ")}
                      onClick={() => handleSortSelect("views")}
                    >
                      Most Viewed
                    </button>
                  </div>
                ) : null}
              </div>

              {isMobileLayout ? null : (
                <div className="view-toggle-group" role="group" aria-label="Change view">
                  <button
                    type="button"
                    className={["icons-view", isCardView ? "icons-view--active" : ""].filter(Boolean).join(" ")}
                    aria-label="Grid view"
                    aria-pressed={isCardView ? "true" : "false"}
                    onClick={() => setIsCardView(true)}
                  >
                    <GridViewRoundedIcon fontSize="inherit" />
                  </button>
                  <button
                    type="button"
                    className={["icons-view", !isCardView ? "icons-view--active" : ""].filter(Boolean).join(" ")}
                    aria-label="List view"
                    aria-pressed={!isCardView ? "true" : "false"}
                    onClick={() => setIsCardView(false)}
                  >
                    <ViewListRoundedIcon fontSize="inherit" />
                  </button>
                </div>
              )}
            </div>
          </section>

          {isMobileLayout || isCardView ? (
            <section className="myprops-cards-panel" aria-label="Property cards">
              {visibleProperties.length > 0 ? (
                <div className="myprops-cards-grid">
                  {visibleProperties.map((property) => {
                    const imagePath = property.image?.startsWith("/") ? `${base}${property.image}` : property.image;

                    return (
                      <MyPropertyVerticalCard
                        key={property.id}
                        id={property.id}
                        image={imagePath}
                        title={property.title}
                        location={property.location}
                        status={property.status}
                        price={property.price}
                        views={property.views}
                        saves={property.saves}
                        leads={property.leads}
                        beds={property.beds}
                        baths={property.baths}
                        area={property.area}
                        addedAt={property.addedAt}
                        onEdit={handleEditProperty}
                        onPause={handlePauseProperty}
                        onDelete={handleDeleteProperty}
                        onView={handleViewProperty}
                      />
                    );
                  })}
                </div>
              ) : (
                <div className="myprops-empty-state">
                  <h2 className="myprops-empty-state__title">No properties to display</h2>
                  <p className="myprops-empty-state__text">
                    There are no homes or properties to display. Add one to see it here.
                  </p>
                </div>
              )}
            </section>
          ) : (
            <section className="myprops-list-panel" aria-label="Property listings">
              <div className="myprops-list-panel__table-head" role="row">
                <span className="myprops-list-panel__head-cell myprops-list-panel__head-cell--property">Property</span>
                <span className="myprops-list-panel__head-cell myprops-list-panel__head-cell--status">Status</span>
                <span className="myprops-list-panel__head-cell myprops-list-panel__head-cell--price">Price</span>
                <span className="myprops-list-panel__head-cell myprops-list-panel__head-cell--views">Views</span>
                <span className="myprops-list-panel__head-cell myprops-list-panel__head-cell--leads">Leads</span>
                <span className="myprops-list-panel__actions-head">Actions</span>
              </div>

              <div className="myprops-list-panel__content">
                {visibleProperties.length > 0 ? (
                  visibleProperties.map((property) => (
                    <PropertyRowCard
                      key={property.id}
                      id={property.id}
                      image={property.image?.startsWith("/") ? `${base}${property.image}` : property.image}
                      title={property.title}
                      location={property.location}
                      addedAt={property.addedAt}
                      status={property.status}
                      price={property.price}
                      views={property.views}
                      leads={property.leads}
                      isNew={property.isNew}
                      onEdit={handleEditProperty}
                      onPause={handlePauseProperty}
                      onDelete={handleDeleteProperty}
                      onView={handleViewProperty}
                    />
                  ))
                ) : (
                  <div className="myprops-empty-state myprops-empty-state--list">
                    <h2 className="myprops-empty-state__title">No properties to display</h2>
                    <p className="myprops-empty-state__text">
                      There are no homes or properties to display. Add one to see it here.
                    </p>
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>

      <FooterSection />
    </main>
  );
}

export default MyProperties;
