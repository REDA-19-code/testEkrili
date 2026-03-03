import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import PropertyCard from "../components/Card";
import "../components/card.css";

export default function Home() {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [carouselIndex, setCarouselIndex] = useState(0);
    const base = process.env.PUBLIC_URL || "";

    const cardsData = [
        {
            id: 1,
            title: "Amazing Card 1",
            description: "This is a very long description that will be truncated with three dots if it exceeds the maximum lines allowed on the card component.",
            price: "$29.99",
            rating: 4,
            username: "Oussama Ch",
            phone: "+213 659246171",
            image: `${base}/images/hqdefault.avif`,
            images: [
                `${base}/images/hqdefault.avif`,
                `${base}/images/photo_2026-02-11_22-49-45.jpg`,
                `${base}/images/photo_2026-02-11_22-49-42.png`
            ],
            publisherPfp: `${base}/images/luffy.jpg`,
            beds: 3,
            baths: 2,
            surface: "450 sqft"
        },
        {
            id: 2,
            title: "Amazing Card 2",
            description: "This is another long description for the second card that shows the product details and features.",
            price: "$39.99",
            rating: 5,
            username: "Name2",
            phone: "+213 661112233",
            image: `${base}/images/photo_2026-02-11_22-49-45.jpg`,
            images: [
                `${base}/images/photo_2026-02-11_22-49-45.jpg`,
                `${base}/images/hqdefault.avif`,
                `${base}/images/photo_2026-02-11_22-49-42.png`
            ],
            publisherPfp: `${base}/images/photo_2026-02-11_22-49-45.jpg`,
            beds: 2,
            baths: 1,
            surface: "350 sqft"
        },
        {
            id: 3,
            title: "Amazing Card 3",
            description: "This is the third card description with more information about the product and what makes it special.",
            price: "$49.99",
            rating: 3,
            username: "userName3",
            phone: "+213 770998877",
            image: `${base}/images/photo_2026-02-11_22-49-45.jpg`,
            images: [
                `${base}/images/photo_2026-02-11_22-49-45.jpg`,
                `${base}/images/photo_2026-02-11_22-49-42.png`,
                `${base}/images/hqdefault.avif`
            ],
            publisherPfp: `${base}/images/photo_2026-02-11_22-49-45.jpg`,
            beds: 4,
            baths: 3,
            surface: "600 sqft"
        },
        {
            id: 4,
            title: "Amazing Card 4",
            description: "A modern and cozy property with excellent natural light and a practical layout for daily life.",
            price: "$59.99",
            rating: 4,
            username: "userName3",
            phone: "+213 555667788",
            image: `${base}/images/photo_2026-02-11_22-49-45.jpg`,
            images: [
                `${base}/images/photo_2026-02-11_22-49-45.jpg`,
                `${base}/images/hqdefault.avif`,
                `${base}/images/photo_2026-02-11_22-49-42.png`
            ],
            publisherPfp: `${base}/images/photo_2026-02-11_22-49-45.jpg`,
            beds: 3,
            baths: 2,
            surface: "520 sqft"
        },
        {
            id: 5,
            title: "Amazing Card 5",
            description: "Spacious interiors and a clean design make this card stand out for comfort and functionality.",
            price: "$69.99",
            rating: 5,
            username: "userName4",
            phone: "+213 699443322",
            image: `${base}/images/photo_2026-02-11_22-49-45.jpg`,
            images: [
                `${base}/images/photo_2026-02-11_22-49-45.jpg`,
                `${base}/images/photo_2026-02-11_22-49-42.png`,
                `${base}/images/hqdefault.avif`
            ],
            publisherPfp: `${base}/images/photo_2026-02-11_22-49-45.jpg`,
            beds: 5,
            baths: 3,
            surface: "780 sqft"
        },
        {
            id: 6,
            title: "Amazing Card 6",
            description: "A compact but elegant option with balanced features, ideal for smaller families or couples.",
            price: "$79.99",
            rating: 2,
            username: "userName5",
            phone: "+213 782334455",
            image: `${base}/images/photo_2026-02-11_22-49-45.jpg`,
            images: [
                `${base}/images/photo_2026-02-11_22-49-45.jpg`,
                `${base}/images/hqdefault.avif`,
                `${base}/images/photo_2026-02-11_22-49-42.png`
            ],
            publisherPfp: `${base}/images/photo_2026-02-11_22-49-45.jpg`,
            beds: 2,
            baths: 2,
            surface: "430 sqft"
        }
    ];

    const handleViewDetails = (card) => {
        setSelectedCard(card);
        setOpenDialog(true);
    };

    const selectedCardImages =
        selectedCard?.images && selectedCard.images.length > 0
            ? selectedCard.images
            : selectedCard?.image
              ? [selectedCard.image]
              : [];

    const hasMultipleImages = selectedCardImages.length > 1;

    const handlePrevImage = () => {
        if (!selectedCardImages.length) return;
        setCarouselIndex((prev) => (prev - 1 + selectedCardImages.length) % selectedCardImages.length);
    };

    const handleNextImage = () => {
        if (!selectedCardImages.length) return;
        setCarouselIndex((prev) => (prev + 1) % selectedCardImages.length);
    };

    useEffect(() => {
        setCarouselIndex(0);
    }, [selectedCard?.id, openDialog]);

    return (
        <>
            <h1>Welcome to home page </h1>
            
            <div className="cards-container">
                {cardsData.map((cardData) => (
                    <PropertyCard key={cardData.id} cardData={cardData} onViewDetails={handleViewDetails} />
                ))}
            </div>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
                <DialogTitle className="dialog-title">
                    {selectedCard?.title || "Card Details"}
                    <button type="button" aria-label="close" className="dialog-close-btn" onClick={() => setOpenDialog(false)}>
                        <CloseIcon />
                    </button>
                </DialogTitle>
                <hr className="dialog-separator" />
                <DialogContent>
                    <div className="Details-profile-container">
                        <Link
                            to="/userProfile"
                            className="details-profile-pfp-link"
                            onClick={() => setOpenDialog(false)}
                            aria-label="Open user profile"
                        >
                            <div className="details-profile-pfp">
                                <img src={selectedCard?.publisherPfp} alt={selectedCard?.username || "publisher"} />
                            </div>
                        </Link>
                        <div className="details-profile-meta">
                            <Link
                                className="details-profile-username details-profile-username-link"
                                to="/userProfile"
                                onClick={() => setOpenDialog(false)}
                            >
                                {selectedCard?.username || "Store User"}
                            </Link>
                            <p className="details-profile-phone">
                                {selectedCard?.phone || "+213 555123456"}
                            </p>
                        </div>
                    </div>
                    <div className="dialog-image-wrapper">
                        {selectedCard ? (
                            <>
                                <img
                                    key={`${selectedCard.id}-${carouselIndex}`}
                                    src={selectedCardImages[carouselIndex]}
                                    alt={`${selectedCard.title} image ${carouselIndex + 1}`}
                                    className="dialog-image"
                                    onError={(e) => {
                                        e.currentTarget.src = `${base}/images/photo_2026-02-11_22-49-42.png`;
                                    }}
                                />
                                {hasMultipleImages ? (
                                    <>
                                        <button
                                            type="button"
                                            className="dialog-carousel-btn dialog-carousel-prev"
                                            onClick={handlePrevImage}
                                            aria-label="Previous image"
                                        >
                                            &#10094;
                                        </button>
                                        <button
                                            type="button"
                                            className="dialog-carousel-btn dialog-carousel-next"
                                            onClick={handleNextImage}
                                            aria-label="Next image"
                                        >
                                            &#10095;
                                        </button>
                                        <div className="dialog-carousel-indicator">
                                            {carouselIndex + 1} / {selectedCardImages.length}
                                        </div>
                                    </>
                                ) : null}
                            </>
                        ) : null}
                    </div>
                    <h6 className="dialog-price">{selectedCard?.price}</h6>
                    <p className="dialog-description">{selectedCard?.description}</p>
                    <Link className="dialog-check-product-btn" to="/productInfo" onClick={() => setOpenDialog(false)}>
                        check Product
                    </Link>
                </DialogContent>
            </Dialog>
        </>
    )
}
