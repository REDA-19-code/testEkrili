import "../styles/MyProperties.css";
import PropertyCard from "./Card";


function MyProperties({ cards = [] }) {
  const isEmpty = !Array.isArray(cards) || cards.length === 0;
  const creatBtn=<button type="button" className="my-properties__add-link">
          <span className="my-properties__add-plus" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M11 5a1 1 0 1 1 2 0v6h6a1 1 0 1 1 0 2h-6v6a1 1 0 1 1-2 0v-6H5a1 1 0 1 1 0-2h6V5z" />
            </svg>
          </span>
          Add your first property
        </button>
  return (
    <section className="my-properties" aria-label="My properties">
      <h2 className="my-properties__title">My properties</h2>

      {isEmpty ?creatBtn : (
        <div className="properties-grid">
          {cards.map((cardData) => (
            <PropertyCard key={cardData.id} cardData={cardData} />
          ))}
        </div>
      )}

      {/* CSS داخل نفس الملف */}
      <style>{`
        .properties-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1rem;
        }
        @media (max-width: 992px) {
          .properties-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .properties-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}





export default MyProperties;
