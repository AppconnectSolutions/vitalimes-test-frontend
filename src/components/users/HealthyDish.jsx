import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaLeaf } from "react-icons/fa";

export default function LemonSeedOilUses() {

  const navigate = useNavigate();

  const [text, setText] = useState("");
  const fullText = "Glow naturally with the power of lemon 🍋";

  useEffect(() => {
    window.scrollTo(0, 0);

    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 35);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">

      {/* 🔥 TITLE */}
      <div className="title-section">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🍋 Lemon Essential Oil
        </motion.h1>

        <p className="typing">{text}</p>
      </div>

      {/* 🔥 PRODUCT IMAGE + BUTTON */}
      <motion.div
        className="product-section"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <div className="product-wrapper">
          <img
            src="/assets/images/category_essential_oil.png"
            alt="Lemon Oil"
            className="product-img"
          />

          <button
            className="shop-btn"
            onClick={() => navigate("/product/64")}
          >
            Shop Now
          </button>
        </div>
      </motion.div>

      {/* 🔥 USES */}
      <div className="uses-container">
        {uses.map((item, i) => (
          <motion.div
            key={i}
            className="use-card"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
          >
            <img src={item.img} alt={item.title} />

            <div className="overlay">
              <FaLeaf />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔥 CSS */}
      <style>{`

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');

.page {
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #f6f8f3, #eef5e9);
  min-height: 100vh;
}

/* TITLE */
.title-section {
  text-align: center;
  padding: 60px 20px 20px;
}

.title-section h1 {
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(45deg, #2e7d32, #81c784);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.typing {
  font-size: 1.2rem;
  color: #444;
  margin-top: 10px;
  min-height: 25px;
}

/* PRODUCT */
.product-section {
  text-align: center;
}

.product-wrapper {
  position: relative;
  display: inline-block;
}

.product-img {
  width: 320px;
  border-radius: 15px;
}

/* 🔥 BUTTON ON IMAGE */
.shop-btn {
  position: absolute;
  bottom: 20px;            /* 🔥 move to bottom */
  left: 50%;               /* 🔥 center horizontally */
  transform: translateX(-50%);
  
  padding: 10px 24px;
  font-size: 0.95rem;
  font-weight: 600;
  color: white;
  background: rgba(46,125,50,0.95);
  border: none;
  border-radius: 25px;
  cursor: pointer;
  backdrop-filter: blur(6px);
  transition: 0.3s;
}

.shop-btn:hover {
  background: #2e7d32;
}

.shop-btn:hover {
  background: #2e7d32;
}

/* GRID */
.uses-container {
  max-width: 1100px;
  margin: 50px auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* ✅ 3 per row */
  gap: 25px;
  padding: 20px;
}

/* CARD */
.use-card {
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  cursor: pointer;
}

/* IMAGE */
.use-card img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  transition: 0.4s;
}

.use-card:hover img {
  transform: scale(1.1);
}

/* OVERLAY */
.overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 18px;
  background: linear-gradient(transparent, rgba(0,0,0,0.9));
  color: white;
  text-align: center;
}

.overlay svg {
  font-size: 20px;
  margin-bottom: 5px;
}

.overlay h3 {
  font-size: 1.2rem;
}

.overlay p {
  font-size: 0.85rem;
}

/* MOBILE */
@media (max-width: 900px) {
  .uses-container {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .uses-container {
    grid-template-columns: 1fr;
  }

  .title-section h1 {
    font-size: 2rem;
  }

  .product-img {
    width: 240px;
  }
}

      `}</style>
    </div>
  );
}

/* DATA */
const uses = [
  {
    title: "Salad Dressing",
    desc: "Add lemon oil to salads for fresh flavor.",
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
    title: "Hair Care",
    desc: "Massage scalp for healthy hair.",
    img: "/assets/images/oil_hair.png",
  },
  {
    title: "Detox Drink",
    desc: "Mix with warm water & honey.",
    img: "/assets/images/oil_detox.png",
  },
];