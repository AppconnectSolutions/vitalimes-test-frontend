import React from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function LemonRicePremium() {
    useEffect(() => {
    window.scrollTo(0, 0); // ✅ scroll to top
  }, []);
  return (
    <div style={{ background: "#f6f8f3" }}>

      {/* 🔥 HERO BANNER */}
      <div className="banner-wrapper">
        <img
          src="/assets/images/lemon_banner.png"
          alt="banner"
          className="banner-img"
        />
      </div>

      {/* SPACE */}
      <div style={{ height: "80px" }} />

      {/* 🔥 STEPS */}
      <div className="steps-container">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: i % 2 === 0 ? -150 : 150 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className={`step-row ${i % 2 !== 0 ? "reverse" : ""}`}
          >
            {/* IMAGE */}
            <motion.img
              src={step.img}
              alt=""
              className="step-img"
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />

            {/* CONTENT */}
            <div className="step-card">
              <div className="step-number">{i + 1}</div>

              <h2 className="step-title">{step.title}</h2>
              <p className="step-desc">{step.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔥 RESPONSIVE CSS */}
      <style>{`

/* ---------------- BANNER ---------------- */
.banner-wrapper {
  width: 100%;
  background: #eef5e9;
  border-radius: 0 0 60px 60px;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  height: auto;
  display: block;
}

/* ---------------- STEPS ---------------- */
.steps-container {
  max-width: 1200px;
  margin: auto;
  padding: 0 20px 80px;
}

.step-row {
  display: flex;
  align-items: center;
  gap: 50px;
  margin-bottom: 100px;
}

.step-row.reverse {
  flex-direction: row-reverse;
}

.step-img {
  width: 50%;
  max-width: 520px;
  border-radius: 25px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.2);
}

.step-card {
  flex: 1;
  background: rgba(255,255,255,0.9);
  padding: 40px;
  border-radius: 60px 20px 60px 20px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.1);
  position: relative;
}

.step-number {
  position: absolute;
  top: -35px;
  left: -35px;
  background: #4caf50;
  color: white;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
}

/* TEXT */
.step-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 15px;
}

.step-desc {
  font-size: 1.2rem;
  color: #444;
  line-height: 1.7;
}

/* ---------------- TABLET ---------------- */
@media (max-width: 1024px) {
  .step-img {
    width: 45%;
  }

  .step-title {
    font-size: 1.7rem;
  }

  .step-desc {
    font-size: 1.1rem;
  }
}

/* ---------------- MOBILE ---------------- */
@media (max-width: 768px) {

  .step-row {
    flex-direction: column !important;
    text-align: center;
    gap: 25px !important;
  }

  .step-img {
    width: 100% !important;
    max-width: 100% !important;
  }

  .step-card {
    padding: 30px 20px 25px !important;
    margin-top: 30px; /* ✅ SPACE FOR NUMBER */
  }

  /* ✅ FIX NUMBER POSITION */
  .step-number {
    left: 50% !important;
    transform: translateX(-50%);
    top: -35px;
    z-index: 2;
  }

  .step-title {
    font-size: 1.4rem !important;
    margin-top: 15px; /* ✅ PUSH TEXT DOWN */
  }

  .step-desc {
    font-size: 1rem !important;
  }
}

      `}</style>
    </div>
  );
}

/* STEPS */
const steps = [
  {
    title: "Add Lemon Powder",
    desc: "Take 1 packet of lemon powder and add into a clean bowl.",
    img: "/assets/images/put_lemon.png",
  },
  {
    title: "Pour Water",
    desc: "Add 20ml water into the bowl and mix to form lemon paste.",
    img: "/assets/images/add_water.png",
  },
  {
    title: "Prepare Tempering",
    desc: "Heat oil, add mustard seeds & red chilli, then mix lemon paste.",
    img: "/assets/images/add_oil.png",
  },
  {
    title: "Mix with Rice",
    desc: "Combine the prepared lemon mix with cooked rice and serve.",
    img: "/assets/images/add_rice.png",
  },
];