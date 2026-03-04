import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import '../styles/card.css'

function PropertyCard({ cardData, onViewDetails }) {
    const rating = Math.max(0, Math.min(5, Number(cardData.rating) || 0));
    const hoverTimerRef = useRef(null);

    const clearHoverTimer = () => {
        if (hoverTimerRef.current) {
            clearTimeout(hoverTimerRef.current);
            hoverTimerRef.current = null;
        }
    };

    const handleImageHoverStart = () => {
        clearHoverTimer();
        hoverTimerRef.current = setTimeout(() => {
            onViewDetails(cardData);
            hoverTimerRef.current = null;
        }, 1500);
    };

    const handleImageHoverEnd = () => {
        clearHoverTimer();
    };

    useEffect(() => {
        return () => {
            clearHoverTimer();
        };
    }, []);

    return (
        <article className="card-item">
            <Link
                to="/productInfo"
                className="card-image-link"
                aria-label="Open product info"
                onMouseEnter={handleImageHoverStart}
                onMouseLeave={handleImageHoverEnd}
            >
                <img className="card-image" alt={cardData.title} src={cardData.image} />
            </Link>

            <Link to="/userProfile" className="publisher-pfp" aria-label="Open user profile">
                <img src={cardData.publisherPfp} alt="publisher" />
            </Link>

            <div className="card-content">
                <h5 className="card-title">{cardData.title}</h5>
                <p className="card-description">{cardData.description}</p>

                <div className="properties-section">
                    <div className="property-item">
                        <BedIcon className="property-icon" />
                        <span>{cardData.beds}</span>
                    </div>
                    <div className="property-item">
                        <BathtubIcon className="property-icon" />
                        <span>{cardData.baths}</span>
                    </div>
                    <div className="property-item">
                        <AspectRatioIcon className="property-icon" />
                        <span>{cardData.surface}</span>
                    </div>
                </div>
            </div>

            <div className="card-footer">
                <div className="card-price-rating">
                    <h6 className="card-price">{cardData.price}</h6>
                    <div className="card-rating" aria-label={`Rating: (${rating} out of 5 stars)`}>
                        <div className="rating-stars">
                            {[...Array(5)].map((_, index) =>
                                index < rating ? (
                                    <StarIcon key={index} className="rating-star filled" />
                                ) : (
                                    <StarBorderIcon key={index} className="rating-star" />
                                )
                            )}
                        </div>
                        <small className="rating-text">{`Rating: (${rating} out of 5 stars)`}</small>
                    </div>
                </div>

                <div className="card-actions">
                    <button type="button" className="card-action-btn card-action-secondary">
                        Edit
                    </button>
                    <button type="button" className="card-action-btn card-action-delete">
                        Delete
                    </button>
                    <button type="button" className="card-action-btn card-action-secondary">
                        Hide
                    </button>
                </div>
            </div>
        </article>
    );
}

export default PropertyCard;
