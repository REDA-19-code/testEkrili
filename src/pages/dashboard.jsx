import { useEffect, useState } from "react";
import axios from "axios";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import StatsSummaryCard from "../components/StatsSummaryCard";
import PropertyRowCard from "../components/PropertyRowCard";
import NavigationSidebar from "../components/NavigationSidebar";
import PropertiesInventorySection from "../components/PropertiesInventorySection";
import CurrentDateCard from "../components/CurrentDateCard";
import UpcomingVisitCard from "../components/UpcomingVisitCard";
import MonthlyStatsCard from "../components/MonthlyStatsCard";
import QuickActionsCard from "../components/QuickActionsCard";
import FooterSection from "../components/FooterSection";
import { useDataContext } from "../context/dataContext";
import "../styles/dashboard.css";

const STAT_ICONS = {
  listings: <TrendingUpRoundedIcon fontSize="inherit" />,
  views: <VisibilityOutlinedIcon fontSize="inherit" />,
  pendingRequests: <PendingActionsOutlinedIcon fontSize="inherit" />,
  averageRating: <StarOutlineRoundedIcon fontSize="inherit" />,
};

const STAT_CONFIG = [
  {
    id: "listings",
    iconKey: "listings",
    title: "Active Listings",
  },
  {
    id: "views",
    iconKey: "views",
    title: "Total Views",
  },
  {
    id: "pendingRequests",
    iconKey: "pendingRequests",
    title: "Pending Requests",
  },
  {
    id: "averageRating",
    iconKey: "averageRating",
    title: "Average Rating",
  },
];

const FALLBACK_STATS = {
  listings: {
    value: "12",
    change: "+8%",
    changeTone: "positive",
  },
  views: {
    value: "8,432",
    change: "+12%",
    changeTone: "positive",
  },
  pendingRequests: {
    value: "7",
    change: "+2",
    changeTone: "negative",
  },
  averageRating: {
    value: "4.8",
    change: "+0.2",
    changeTone: "positive",
  },
};

const SIDEBAR_BADGE_EXAMPLES = {
  visitRequests: 3,
  reviews: 2,
  notifications: 5,
};

const normalizeStatValue = (value, fallbackValue) => {
  if (value === null || value === undefined || value === "") {
    return fallbackValue;
  }

  return value;
};

const formatAverageRating = (value) => {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return value;
  }

  return numericValue.toFixed(1);
};

const getActiveListingsCount = (items) =>
  items.filter((property) => String(property.status || "").toLowerCase() === "active").length;

const getPendingRequestsCount = (items) =>
  items.filter((property) => String(property.status || "").toLowerCase() === "pending").length;

const getAverageRatingValue = (items) => {
  const ratings = items
    .map((property) => Number(property.rating || property.averageRating))
    .filter((value) => Number.isFinite(value));

  if (ratings.length === 0) {
    return FALLBACK_STATS.averageRating.value;
  }

  const total = ratings.reduce((sum, value) => sum + value, 0);
  return formatAverageRating(total / ratings.length);
};

const buildStatsToRender = (statsMap, propertiesToRender) => {
  const activeListingsValue = String(getActiveListingsCount(propertiesToRender));
  const pendingRequestsValue = String(getPendingRequestsCount(propertiesToRender));
  const averageRatingValue = getAverageRatingValue(propertiesToRender);

  const statSourceMap = {
    listings: {
      ...FALLBACK_STATS.listings,
      value: activeListingsValue,
      ...(statsMap.listings || statsMap.activeListings || {}),
    },
    views: {
      ...FALLBACK_STATS.views,
      ...(statsMap.views || statsMap.totalViews || {}),
    },
    pendingRequests: {
      ...FALLBACK_STATS.pendingRequests,
      value: pendingRequestsValue,
      ...(statsMap.pendingRequests || statsMap.inquiries || statsMap.requests || {}),
    },
    averageRating: {
      ...FALLBACK_STATS.averageRating,
      value: averageRatingValue,
      ...(statsMap.averageRating || statsMap.rating || {}),
    },
  };

  return STAT_CONFIG.map((stat) => ({
    ...stat,
    ...statSourceMap[stat.id],
    value:
      stat.id === "averageRating"
        ? formatAverageRating(normalizeStatValue(statSourceMap[stat.id].value, FALLBACK_STATS.averageRating.value))
        : normalizeStatValue(statSourceMap[stat.id].value, FALLBACK_STATS[stat.id].value),
  }));
};

const getStatDisplayValue = (stat) => {
  if (!stat) {
    return null;
  }

  const rawValue =
    stat.value ??
    stat.count ??
    stat.total ??
    stat.badge ??
    stat.unreadCount;

  if (rawValue === null || rawValue === undefined || rawValue === "") {
    return null;
  }

  const numericValue = Number(rawValue);
  return Number.isFinite(numericValue) ? numericValue : rawValue;
};

const FALLBACK_PROPERTIES = [
  {
    id: "property-1",
    image: "/images/house1.jpg",
    title: "Luxury Penthouse with Sea View",
    location: "Downtown Marina",
    status: "Active",
    price: "$4,500/mo",
    views: "1.2k",
    leads: 24,
    isNew: true,
    tenantName: "Sarah Jenkins",
    tenantRole: "Verified Tenant",
    visitTime: "Today - 14:30",
  },
  {
    id: "property-2",
    image: "/images/house2.jpg",
    title: "Modern Family Villa",
    location: "Green Valley Estates",
    status: "Pending",
    price: "$3,200/mo",
    views: "850",
    leads: 12,
    isNew: true,
  },
  {
    id: "property-3",
    image: "/images/house3.jpg",
    title: "Urban Loft Residence",
    location: "City Center District",
    status: "Rented",
    price: "$2,900/mo",
    views: "640",
    leads: 8,
    isNew: false,
  },
];

const formatDashboardDate = (dateValue) => {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Today";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
};

function Dashboard() {
  const base = process.env.PUBLIC_URL || "";
  const { displayName, token } = useDataContext();
  const userName = displayName || "Owner";
  const [stats, setStats] = useState([]);
  const [properties, setProperties] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const currentDateLabel = formatDashboardDate(new Date());

  const statsMap = stats.reduce((accumulator, stat) => {
    const key = stat.id || stat.key || stat.iconKey;
    if (key) {
      accumulator[key] = stat;
    }
    return accumulator;
  }, {});

  const propertiesToRender = properties.length > 0 ? properties : FALLBACK_PROPERTIES;
  const statsToRender = buildStatsToRender(statsMap, propertiesToRender);
  const primaryProperty = propertiesToRender[0] || {};
  const visitRole =
    primaryProperty.tenantRole ||
    primaryProperty.visitorRole ||
    primaryProperty.userRole ||
    primaryProperty.tenant?.role ||
    primaryProperty.visitor?.role ||
    "tenant";

  const sidebarBadges = {
    visitRequests: getStatDisplayValue(
      statsMap.visitRequests || statsMap.pendingRequests || statsMap.requests
    ) ?? SIDEBAR_BADGE_EXAMPLES.visitRequests,
    listings: getStatDisplayValue(statsMap.listings || statsMap.activeListings) ?? propertiesToRender.length,
    averageRating: getStatDisplayValue(statsMap.averageRating || statsMap.rating) ?? FALLBACK_STATS.averageRating.value,
    reviews: getStatDisplayValue(
      statsMap.reviews || statsMap.reviewCount || statsMap.pendingReviews
    ) ?? SIDEBAR_BADGE_EXAMPLES.reviews,
    notifications: getStatDisplayValue(
      statsMap.notifications || statsMap.unreadNotifications || statsMap.alerts
    ) ?? SIDEBAR_BADGE_EXAMPLES.notifications,
  };

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const dashboardStatsEndpoint = `${apiUrl}/dashboard/stats`;

    if (!apiUrl || !token) {
      setStats([]);
      return;
    }

    let isMounted = true;

    const loadDashboardStats = async () => {
      try {
        const response = await axios.get(dashboardStatsEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const payload = response.data;
        const statsList = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.stats)
            ? payload.stats
            : Array.isArray(payload?.data)
              ? payload.data
              : [];

        if (isMounted) {
          setStats(statsList);
        }
      } catch (error) {
        if (isMounted) {
          setStats([]);
        }
        console.error("Failed to load dashboard stats:", error.response?.data || error.message);
      }
    };

    loadDashboardStats();

    return () => {
      isMounted = false;
    };
  }, [token]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const dashboardPropertiesEndpoint = `${apiUrl}/properties`;

    if (!apiUrl || !token) {
      setProperties([]);
      return;
    }

    let isMounted = true;

    const loadDashboardProperties = async () => {
      try {
        const response = await axios.get(dashboardPropertiesEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const payload = response.data;
        const propertiesList = Array.isArray(payload)
          ? payload
          : Array.isArray(payload?.properties)
            ? payload.properties
            : Array.isArray(payload?.data)
              ? payload.data
              : [];

        if (isMounted) {
          setProperties(propertiesList);
        }
      } catch (error) {
        if (isMounted) {
          setProperties([]);
        }
        console.error("Failed to load dashboard properties:", error.response?.data || error.message);
      }
    };

    loadDashboardProperties();

    return () => {
      isMounted = false;
    };
  }, [token]);

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
              <h1 className="dashboard-hero__title">Welcome back, {userName} 👋</h1>
              <p className="dashboard-hero__subtitle">
                Here&apos;s what&apos;s happening with your properties.
              </p>
            </div>

            <div className="dashboard-hero__actions">
              <CurrentDateCard value={currentDateLabel} />
            </div>
          </header>

          <section className="dashboard-stats" aria-label="Dashboard stats">
            {statsToRender.map((stat) => (
              <StatsSummaryCard
                key={stat.id}
                icon={STAT_ICONS[stat.iconKey] || <TrendingUpRoundedIcon fontSize="inherit" />}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                changeTone={stat.changeTone}
              />
            ))}
          </section>

          <section className="dashboard-secondary-panels" aria-label="Dashboard highlights">
            <UpcomingVisitCard
              visitorName={primaryProperty.tenantName || primaryProperty.visitorName || "Sarah Jenkins"}
              visitorRole={visitRole}
              propertyName={primaryProperty.title || "Luxury Penthouse"}
              visitTime={primaryProperty.visitTime || "Today - 14:30"}
              avatar={`${base}/images/avatar-placeholder.jpg`}
            />
            <MonthlyStatsCard />
            <QuickActionsCard />
          </section>

          <PropertiesInventorySection>
            {propertiesToRender.map((property, index) => (
              <PropertyRowCard
                key={property.id || property._id || index}
                image={
                  property.image?.startsWith("/")
                    ? `${base}${property.image}`
                    : property.image || property.thumbnail || `${base}/images/house1.jpg`
                }
                title={property.title || property.name || "Untitled Property"}
                location={property.location || property.address || "Unknown location"}
                status={property.status || "Active"}
                price={property.price || property.rent || "--"}
                views={property.views || property.viewCount || "0"}
                leads={property.leads || property.leadsCount || 0}
                isNew={Boolean(property.isNew)}
              />
            ))}
          </PropertiesInventorySection>
        </div>
      </div>

      <FooterSection />
    </main>
  );
}

export default Dashboard;
