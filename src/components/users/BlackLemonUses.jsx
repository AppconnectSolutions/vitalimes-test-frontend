import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUtensils } from "react-icons/fa";

export default function BlackLemonUses() {

  const [text, setText] = useState("");
  const fullText = "Enhance your dishes with natural sour flavor 🍋";

  useEffect(() => {
    window.scrollTo(0, 0);

    // 🔥 Typing Effect
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) clearInterval(interval);
    }, 40);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="page">

      {/* 🔥 HERO */}
      <div className="hero">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          🍋 Black Lemon Powder
        </motion.h1>

        <p className="typing">{text}</p>
      </div>

      {/* 🔥 PRODUCT IMAGE */}
      <motion.div
        className="product-section"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <img
          src="/assets/images/Blacklemon_powder_2.png"
          alt="Black Lemon"
          className="product-img"
        />
      </motion.div>

      {/* 🔥 USES GRID */}
      <div className="uses-container">
        {uses.map((item, i) => (
          <motion.div
            key={i}
            className="use-card"
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
          >
            <img src={item.img} alt={item.title} />

            <div className="overlay">
              <FaUtensils />
              <h3>{item.title}</h3>
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
  position: relative;
  overflow: hidden;
}

/* 🔥 BACKGROUND ANIMATION */
.page::before {
  content: "";
  position: absolute;
  width: 400px;
  height: 400px;
  background: rgba(76, 175, 80, 0.2);
  filter: blur(120px);
  top: -100px;
  left: -100px;
  animation: float 6s infinite alternate;
}

@keyframes float {
  from { transform: translateY(0); }
  to { transform: translateY(40px); }
}

/* HERO */
.hero {
  text-align: center;
  padding: 70px 20px 30px;
}

.hero h1 {
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

.product-img {
  width: 300px;
  border-radius: 15px;
  transition: 0.3s;
}

.product-img:hover {
  transform: scale(1.05);
}

/* GRID */
.uses-container {
  max-width: 1200px;
  margin: 60px auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
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
  height: 300px;
  object-fit: cover;
  transition: 0.4s;
}

/* ZOOM */
.use-card:hover img {
  transform: scale(1.1);
}

/* 🔥 GLOW EFFECT */
.use-card::after {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(255,255,255,0.1);
  opacity: 0;
  transition: 0.3s;
}

.use-card:hover::after {
  opacity: 1;
}

/* OVERLAY */
.overlay {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 25px;
  background: linear-gradient(transparent, rgba(0,0,0,0.85));
  color: white;
  text-align: center;
}

.overlay svg {
  font-size: 26px;
  margin-bottom: 5px;
}

/* TITLE */
.overlay h3 {
  font-size: 1.4rem;
  font-weight: 700;
}

/* MOBILE */
@media (max-width: 768px) {
  .hero h1 {
    font-size: 2rem;
  }

  .product-img {
    width: 220px;
  }
}

      `}</style>
    </div>
  );
}

/* DATA */
const uses = [
  {
    title: "Chutneys",
    img: "/assets/images/chutney.png",
  },
  {
    title: "Biryani",
    img: "/assets/images/biryani.png",
  },
  {
    title: "Gravy",
    img: "/assets/images/gravy.png",
  },
  {
    title: "Soups",
    img: "/assets/images/soup.png",
  },
];