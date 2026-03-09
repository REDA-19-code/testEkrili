import { Children } from "react";
import { Link } from "react-router-dom";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import "../styles/PropertiesInventorySection.css";

function PropertiesInventorySection({ children, hideActions = false }) {
  const listingCount = Children.count(children);
  const hasListings = listingCount > 0;

  return (
    <section className="my-properties" id="my-properties" aria-label="Property listings">
      <div className="my-properties__panel">
        <header className="my-properties__header">
          <div className="my-properties__intro">
            <div className="my-properties__title-wrap">
              <span className="my-properties__title-accent" aria-hidden="true" />
              <div className="my-properties__title-block">
                <span className="my-properties__eyebrow">Portfolio</span>
                <h2 className="my-properties__title">Property Inventory</h2>
              </div>
            </div>
            <p className="my-properties__summary">
              {listingCount} active records organized for quick review.
            </p>
          </div>

          <Link to="/my-properties" className="my-properties__view-all">
            <span>Manage All Listings</span>
            <ArrowOutwardRoundedIcon fontSize="inherit" />
          </Link>
        </header>

        {hasListings ? (
          <div
            className={["my-properties__table-head", hideActions ? "my-properties__table-head--no-actions" : ""]
              .filter(Boolean)
              .join(" ")}
            role="row"
          >
            <span>Property</span>
            <span>Status</span>
            <span>Price</span>
            <span>Views</span>
            <span>Leads</span>
            {hideActions ? null : <span className="my-properties__actions-head">Actions</span>}
          </div>
        ) : null}

        <div className="my-properties__content">
          {hasListings ? (
            children
          ) : (
            <div className="my-properties__empty-state">
              <h2 className="my-properties__empty-title">No properties to display</h2>
              <p className="my-properties__empty-text">
                There are no homes or properties to display. Add one to see it here.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default PropertiesInventorySection;
