import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaEllipsisV, FaMapMarkerAlt, FaRegStar, FaStar } from "react-icons/fa";
import '../styles/card.css'

function PropertyCard({ cardData }) {
    const rating = Math.max(0, Math.min(5, Number(cardData.rating) || 0));
    const displayPrice = `${String(cardData.price ?? "").replace("$", "").trim()} DZD`;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <article className="card-item">
            <div className="card-image-wrapper">
                <Link
                    to="/productInfo"
                    className="card-image-link"
                    aria-label="Open product info"
                >
                    <img className="card-image" alt={cardData.title} src={cardData.image} />
                </Link>
                <div className="card-top-bar">
                    <Link to="/userProfile" className="publisher-meta" aria-label="Open user profile">
                        <span className="publisher-pfp">
                            <img src={cardData.publisherPfp} alt="publisher" />
                        </span>
                        <span className="publisher-username">{cardData.username}</span>
                    </Link>
                    <div className="overflow-menu-container" ref={menuRef}>
                        <button
                            type="button"
                            className="overflow-menu-trigger"
                            aria-label="Open actions menu"
                            onClick={() => setIsMenuOpen((prev) => !prev)}
                        >
                            <FaEllipsisV />
                        </button>
                        {isMenuOpen && (
                            <div className="overflow-menu">
                                <button type="button" className="overflow-menu-item">Edit</button>
                                <button type="button" className="overflow-menu-item overflow-menu-item-delete">Delete</button>
                                <button type="button" className="overflow-menu-item">Hide</button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="card-content">
                <h5 className="card-title">{cardData.title}</h5>
                <p className="card-description">{cardData.description}</p>
                <div className="card-location">
                    <FaMapMarkerAlt className="card-location-icon" />
                    <span className="card-location-text">{cardData.location}</span>
                </div>

                <div className="properties-section">
                    <div className="property-item">
                        <span>{cardData.beds}</span>
                    </div>
                    <div className="property-item">
                        <span>{cardData.baths}</span>
                    </div>
                    <div className="property-item">
                        <span>{cardData.surface}</span>
                    </div>
                </div>
            </div>

            <div className="card-footer">
                <div className="card-price-rating">
                    <h6 className="card-price">{displayPrice}</h6>
                    <div className="card-rating" aria-label={`Rating: (${rating} out of 5 stars)`}>
                        <div className="rating-stars">
                            {[...Array(5)].map((_, index) =>
                                index < rating ? (
                                    <FaStar key={index} className="rating-star filled" />
                                ) : (
                                    <FaRegStar key={index} className="rating-star" />
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default PropertyCard;
