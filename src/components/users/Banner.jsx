import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Banner.css";

export default function Banner() {

  const BASE_URL = "https://minio-console.appconnect.cloud/vitalimes-images/uploads";

const slides = [
  {
    img: `${BASE_URL}/update_bg_1.jpeg`,
    title: "Healthy Living Starts",
    sub: "Nature’s Freshness Delivered to Your Home",
    pos: { top: "20%", left: "7%", textAlign: "left", width: "45%" }
  },
  {
    img: `${BASE_URL}/update_bg_2.jpeg`,
    title: "Instant Lemon Refreshment",
    sub: "Beat the Heat with Vitalimes Lemon Powder",
    pos: { top: "22%", right: "7%", textAlign: "right", width: "40%" }
  },
  {
    img: `${BASE_URL}/update_3.png`,
    title: "Pure Relief in Every Drop",
    sub: "Natural Breathing Support for Your Family",
    pos: { top: "15%", right: "6%", textAlign: "right", width: "40%" }
  },
  {
    img: `${BASE_URL}/update_bg_4.jpeg`,
    title: "Sip the Sun. Taste the Zest.",
    sub: "Cool Down with Pure Lemon Bliss",
    pos: { top: "28%", right: "6%", textAlign: "right", width: "40%" }
  },
  {
    img: `${BASE_URL}/bg_5.jpeg`,
    title: "Care for Your Heart Naturally",
    sub: "Daily Wellness with Black Lemon Powder",
    pos: { top: "22%", right: "6%", textAlign: "right", width: "40%" }
  },
];
  return (
    <main>
      <Carousel fade interval={4000} controls indicators>
        {slides.map((s, index) => (
          <Carousel.Item key={index}>
            <div className="banner-slide">

              {/* IMAGE */}
              <img src={s.img} alt="" className="banner-img" />

              {/* TEXT BLOCK */}
              <div
                className="banner-text-block"
                style={{
                  ...s.pos,
                  position: "absolute",
                  fontSize: "3.2vw"
                }}
              >
                {s.title}

                <div
                  className="banner-sub"
                  style={{ fontSize: "1.6vw" }}
                >
                  {s.sub}
                </div>
              </div>

            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </main>
  );
}
