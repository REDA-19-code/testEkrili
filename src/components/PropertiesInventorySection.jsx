import { Link } from "react-router-dom";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import "../styles/MyProperties.css";

function PropertiesInventorySection({ children }) {
  return (
    <section className="my-properties" id="my-properties" aria-label="Property listings">
      <div className="my-properties__panel">
        <header className="my-properties__header">
          <div className="my-properties__title-wrap">
            <span className="my-properties__title-accent" aria-hidden="true" />
            <h2 className="my-properties__title">Property Inventory</h2>
          </div>

          <Link to="#" className="my-properties__view-all">
            <span>Manage All Listings</span>
            <ArrowOutwardRoundedIcon fontSize="inherit" />
          </Link>
        </header>

        <div className="my-properties__table-head" role="row">
          <span>Property</span>
          <span>Status</span>
          <span>Price</span>
          <span>Views</span>
          <span>Leads</span>
          <span className="my-properties__actions-head">Actions</span>
        </div>

        <div className="my-properties__content">
          {children}
        </div>
      </div>
    </section>
  );
}

export default PropertiesInventorySection;
