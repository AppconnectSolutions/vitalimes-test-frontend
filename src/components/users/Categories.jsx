import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";

export default function ShopByCategory() {
  const [categories, setCategories] = useState([]);

  const base =
    typeof process !== "undefined" && process.env && process.env.PUBLIC_URL
      ? process.env.PUBLIC_URL
      : "";

  // ✅ API config (same as products)
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const MINIO_PUBLIC_URL =
    import.meta.env.VITE_MINIO_PUBLIC_URL || "https://minio.appconnect.cloud";

  const MINIO_BUCKET =
    import.meta.env.VITE_MINIO_BUCKET || "vitalimes-images";

  // ✅ Convert DB image -> full MinIO URL (same as products)
  const toImageUrl = (filename) => {
    if (!filename) return "";

    let key = String(filename).trim();

    if (key.startsWith("http")) {
      return key.replace(
        "https://minio.vitalimes.com",
        "https://minio.appconnect.cloud"
      );
    }

    key = key.replace(/^\/+/, "");
    key = key.replace(/^vitalimes-images\//, "");

    key = key.split("/").map(encodeURIComponent).join("/");

    return `${MINIO_PUBLIC_URL}/${MINIO_BUCKET}/${key}`;
  };

  // ✅ Fetch categories from backend
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/categories`);

        const formatted = res.data.map((item) => ({
          title: item.category_name,
          img: toImageUrl(item.image_url),
          link: "/products",
        }));

        setCategories(formatted);
      } catch (error) {
        console.error("Failed to load categories:", error);
      }
    };

    loadCategories();
  }, [API_URL]);

  return (
    <section style={{ padding: "2rem 0", background: "#fdfdfd" }}>
      <Container>
        <h3 className="text-center mb-5">Shop by Category</h3>

        <style>{`
          .category-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 2rem;
          }

          @media (max-width: 992px) {
            .category-grid { grid-template-columns: repeat(2, 1fr); }
          }

          @media (max-width: 576px) {
            .category-grid { grid-template-columns: 1fr; }
          }

          .category-card {
            width: 100%;
            height: 360px;
            border-radius: 18px;
            overflow: hidden;
            position: relative;
            background: #000;
            cursor: pointer;
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
            transition: 0.3s ease;
          }

          .category-bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-size: cover !important;
            background-position: center !important;
            background-repeat: no-repeat !important;
            transition: transform 0.4s ease;
          }

          .category-card:hover .category-bg {
            transform: scale(1.08);
          }

          .category-title {
            position: absolute;
            bottom: 0;
            width: 100%;
            padding: 1rem 0;
            text-align: center;
            font-size: 1.45rem;
            font-weight: 900;
            letter-spacing: 0.6px;
            color: #ffffff !important;
            background: linear-gradient(
              to top,
              rgba(0,0,0,0.85),
              rgba(0,0,0,0.4),
              transparent
            );
            text-shadow: 0px 0px 6px rgba(0,0,0,0.9);
          }
        `}</style>

        <div className="category-grid">
          {categories.map((cat, i) => (
            <a href={cat.link} key={i} className="category-card">
              <div
                className="category-bg"
                style={{ backgroundImage: `url(${base}${cat.img})` }}
              ></div>

              <div className="category-title">{cat.title}</div>
            </a>
          ))}
        </div>
      </Container>
    </section>
  );
}