import React, { useEffect } from "react";
import { motion } from "framer-motion";

export default function LemonJuiceRecipe() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: "#f6f8f3" }}>

      {/* 🔥 HERO BANNER */}
  

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

      {/* 🔥 CSS */}
      <style>{`

.banner-wrapper {
  width: 100%;
  background: #eef5e9;
  border-radius: 0 0 60px 60px;
  overflow: hidden;
}

.banner-img {
  width: 100%;
  display: block;
}

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

/* MOBILE */
@media (max-width: 768px) {

  .step-row {
    flex-direction: column !important;
    text-align: center;
    gap: 25px !important;
  }

  .step-img {
    width: 100% !important;
  }

  .step-card {
    padding: 30px 20px 25px !important;
    margin-top: 30px;
  }

  .step-number {
    left: 50% !important;
    transform: translateX(-50%);
    top: -35px;
  }

  .step-title {
    font-size: 1.4rem !important;
    margin-top: 15px;
  }

  .step-desc {
    font-size: 1rem !important;
  }
}

      `}</style>
    </div>
  );
}

/* 🍋 STEPS DATA */
const steps = [
  {
    title: "Add Lemon Powder",
    desc: "Take 1 sachet (5g) of lemon powder and add it into a glass.",
    img: "/assets/images/step1_add_lemon_powder.png",
  },
  {
    title: "Add Water",
    desc: "Pour 150–200 ml of cold or normal water into the glass.",
    img: "/assets/images/step2_add_water.png",
  },
  {
    title: "Mix Well",
    desc: "Stir properly until the powder is completely dissolved.",
    img: "/assets/images/step3_mix.png",
  },
  {
    title: "Serve & Enjoy",
    desc: "Your refreshing lemon juice is ready. Serve chilled and enjoy!",
    img: "/assets/images/step4_serve.png",
  },
];