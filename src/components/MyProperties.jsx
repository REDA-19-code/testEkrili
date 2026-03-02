import "./MyProperties.css";

function MyProperties({ cards = [] }) {
  const isEmpty = !Array.isArray(cards) || cards.length === 0;

  return (
    <section className="my-properties" aria-label="My properties">
      <h2 className="my-properties__title">My properties</h2>

      {isEmpty ? (
        <button type="button" className="my-properties__add-link">
          <span className="my-properties__add-plus" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M11 5a1 1 0 1 1 2 0v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5z" />
            </svg>
          </span>
          Add your first property
        </button>
      ) : null}
    </section>
  );
}

export default MyProperties;
