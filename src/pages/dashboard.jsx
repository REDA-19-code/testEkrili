import "../styles/dashboard.css";
import Sidebar from "../components/dashboard-sidebar";
import MyProperties from "../components/MyProperties";

function Dashboard() {
      const base = process.env.PUBLIC_URL || "";

  const cardData=[{
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
        },{
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
        },{
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
        },{
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
        }]
  return (
    <main className="app-layout">
      <Sidebar />
      <MyProperties cards={cardData} />
    </main>
  );
}

export default Dashboard;
