import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function LemonSeedOilUses() {
const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: "#f6f8f3" }}>

      {/* 🔥 HERO SECTION */}
      <div className="hero">
        <img
          src="/assets/images/category_essential_oil.png"
          alt="Lemon Seed Oil"
          className="hero-img"
        />

        <h1>Lemon Essential Oil</h1>
        <p>
          Natural, versatile oil for food, skincare, haircare, and wellness.
        </p>
      </div>

      {/* 🔥 ALL USES */}
      <div className="uses-container">
        {uses.map((item, i) => (
          <motion.div
            key={i}
            className="use-card"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* 🔥 BUY BUTTON */}
    <div className="buy-section">
  <button
    className="buy-btn"
    onClick={() => navigate("/product/64")}
  >
    Buy Now
  </button>
</div>

      {/* 🔥 CSS */}
      <style>{`

.hero {
  text-align: center;
  padding: 60px 20px 30px;
}

.hero-img {
  width: 140px;
  margin-bottom: 15px;
}

.hero h1 {
  font-size: 2.3rem;
  font-weight: 800;
}

.hero p {
  color: #555;
}

/* GRID */
.uses-container {
  max-width: 1100px;
  margin: auto;
  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* ✅ FIXED */
  gap: 25px;
  justify-items: center;
}

/* CARD */
.use-card {
  background: white;
  border-radius: 20px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  transition: 0.3s;
  max-width: 320px;
  width: 100%;
}

.use-card:hover {
  transform: translateY(-8px);
}

.use-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
}

.use-card h3 {
  margin-top: 10px;
  font-size: 1.2rem;
  font-weight: 700;
}

.use-card p {
  font-size: 0.9rem;
  color: #555;
}

/* BUY BUTTON */
.buy-section {
  text-align: center;
  padding: 40px;
}

.buy-btn {
  background: #4caf50;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  cursor: pointer;
}

/* MOBILE */
@media (max-width: 768px) {
  .uses-container {
    grid-template-columns: 1fr;
  }
}

      `}</style>
    </div>
  );
}

/* 🔥 ALL USES DATA */
const uses = [
  {
    title: "Salad Dressing",
    desc: "Add lemon seed oil to salads for fresh flavor.",
    img: "/assets/images/oil_salad.png",
  },
  {
    title: "Cooking",
    desc: "Use as finishing oil for dishes.",
    img: "/assets/images/oil_cooking.png",
  },
  {
    title: "Face Glow",
    desc: "Apply for natural glowing skin.",
    img: "/assets/images/oil_skin.png",
  },
  {
    title: "Hair Growth",
    desc: "Massage scalp for healthy hair.",
    img: "/assets/images/oil_hair.png",
  },
  {
    title: "Detox Drink",
    desc: "Add drops to warm water with honey.",
    img: "/assets/images/oil_detox.png",
  },
];