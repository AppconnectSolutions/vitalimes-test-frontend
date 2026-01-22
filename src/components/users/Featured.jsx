import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function Featured() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "https://api.appconnect.cloud";

  // ✅ MinIO Public URL + Bucket
  const MINIO_PUBLIC_URL =
    import.meta.env.VITE_MINIO_PUBLIC_URL || "https://minio.appconnect.cloud";
  const MINIO_BUCKET =
    import.meta.env.VITE_MINIO_BUCKET || "vitalimes-images";

  // ✅ Convert DB filename/key/url -> correct public MinIO URL
  const toImageUrl = (filename) => {
    if (!filename) return "";

    let key = String(filename).trim();

    // If DB stored full URL already, return as-is
    if (key.startsWith("http://") || key.startsWith("https://")) {
      return key;
    }

    // Remove leading slashes
    key = key.replace(/^\/+/, "");

    // If DB stored "bucket/uploads/xxx", strip "bucket/"
    if (key.startsWith(`${MINIO_BUCKET}/`)) {
      key = key.slice(MINIO_BUCKET.length + 1);
    }

    // If key doesn't start with "uploads/", add it (your main case)
    if (!key.startsWith("uploads/")) {
      key = `uploads/${key}`;
    }

    // Encode safely
    key = key.split("/").map(encodeURIComponent).join("/");

    return `${MINIO_PUBLIC_URL}/${MINIO_BUCKET}/${key}`;
  };

  // Load featured products
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products?status=Active`);
        setProducts(res.data.products?.slice(0, 4) || []);
      } catch (error) {
        console.error("Failed to load featured products:", error);
      }
    };
    loadProducts();
  }, [API_URL]);

  return (
    <>
      <style>{`
        .product-card {
          width: 100%;
          max-width: 340px;
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid #e0e0e0;
          transition: 0.3s ease;
          cursor: pointer;
          background: #fff;
        }

        .product-card:hover {
          box-shadow: 0 8px 22px rgba(0,0,0,0.15);
        }

        .product-img-container {
          width: 100%;
          height: 330px;
          overflow: hidden;
          position: relative;
          border-bottom: 1px solid #ddd;
          background: #fff;
        }

        .product-img-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: absolute;
          top: 0;
          left: 0;
          opacity: 0;
          transition: opacity 0.4s ease-in-out;
        }

        /* ✅ Always show main image */
        .product-img-container img.main-img {
          opacity: 1 !important;
          z-index: 1;
        }

        .product-card:hover .hover-1 {
          opacity: 1;
          z-index: 2;
        }

        .product-card:hover .hover-2 {
          opacity: 1;
          z-index: 3;
        }

        .add-btn {
          background: #5b7f2b;
          color: white;
          border-radius: 6px;
          padding: 8px 16px;
          border: none;
          font-weight: 600;
        }

        .add-btn:hover {
          background: #4a6a22;
        }
      `}</style>

      <Container className="my-5">
        <h2
          className="fw-bold text-center mb-4"
          style={{ color: "#1f3b2f", fontSize: "32px" }}
        >
          Featured Products
        </h2>

        <Row className="g-4 justify-content-center">
          {products.map((product) => {
            const firstVariant = product.variants?.[0];

            const img1 = toImageUrl(product.image1);
            const img2 = toImageUrl(product.image2 || product.image1);
            const img3 = toImageUrl(product.image3 || product.image1);

            // ✅ Debug in console
            console.log("Featured image URL:", img1);

            return (
              <Col
                key={product.id}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="d-flex justify-content-center"
              >
                <div
                  className="product-card"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  <div className="product-img-container">
                    <img
                      src={img1}
                      className="main-img"
                      alt={product.title}
                      onError={(e) => (e.currentTarget.src = "/no-image.png")}
                    />
                    <img
                      src={img2}
                      className="hover-1"
                      alt={product.title}
                      onError={(e) => (e.currentTarget.src = "/no-image.png")}
                    />
                    <img
                      src={img3}
                      className="hover-2"
                      alt={product.title}
                      onError={(e) => (e.currentTarget.src = "/no-image.png")}
                    />
                  </div>

                  <div className="p-3">
                    <h6 className="fw-bold" style={{ minHeight: "40px" }}>
                      {product.title}
                      {product.units && (
                        <span
                          className="text-muted"
                          style={{ fontSize: "14px", marginLeft: "10px" }}
                        >
                          – Pack of ({product.units})
                        </span>
                      )}
                    </h6>

                    {firstVariant && (
                      <div>
                        <span className="text-muted text-decoration-line-through me-2">
                          ₹{firstVariant.price}
                        </span>
                        <span className="fw-bold">
                          From ₹{firstVariant.sale_price || firstVariant.price}
                        </span>
                      </div>
                    )}

                    <div className="mt-2 d-flex align-items-center">
                      <span style={{ color: "#ffcc00" }}>★★★★☆</span>
                      <span className="ms-2">4.4</span>
                    </div>

                    <button className="add-btn w-100 mt-3">ADD TO CART</button>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
}
