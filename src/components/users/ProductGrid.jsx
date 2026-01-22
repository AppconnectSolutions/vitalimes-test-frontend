import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    import.meta.env.VITE_API_URL || "https://api.appconnect.cloud";

  const MINIO_PUBLIC_URL =
    import.meta.env.VITE_MINIO_PUBLIC_URL || "https://minio.appconnect.cloud";
  const MINIO_BUCKET =
    import.meta.env.VITE_MINIO_BUCKET || "vitalimes-images";

  // ✅ SAME safe normalizer
  const toImageUrl = (filename) => {
    if (!filename) return "";

    let key = String(filename).trim();

    key = key.replace(/^https?:\/\/[^/]+\/+/i, "");
    key = key.replace(/^\/+/, "");

    if (key.startsWith(`${MINIO_BUCKET}/`)) {
      key = key.slice(MINIO_BUCKET.length + 1);
    }

    if (!key.startsWith("uploads/")) {
      key = `uploads/${key}`;
    }

    key = key.split("/").map(encodeURIComponent).join("/");

    return `${MINIO_PUBLIC_URL}/${MINIO_BUCKET}/${key}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products?status=Active`);
        if (res.data.success && Array.isArray(res.data.products)) {
          setProducts(res.data.products.slice(0, 6));
        }
      } catch (err) {
        console.error("Product fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <h3>Loading Products...</h3>
      </Container>
    );
  }

  if (!products.length) {
    return (
      <Container className="text-center my-5">
        <h3>No products available.</h3>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h3 className="mb-4 text-center">Featured Products</h3>

      <Row className="g-4 justify-content-center">
        {products.map((product) => {
          const firstVariant = product.variants?.[0];

          return (
            <Col
              key={product.id}
              xs={12}
              sm={6}
              md={4}
              lg={4}
              className="d-flex justify-content-center"
            >
              <ProductCard
                product={{
                  id: product.id,
                  name: product.title,
                  price: firstVariant?.price || 0,
                  sale_price: firstVariant?.sale_price ?? null,
                  rating: 5,
                  image_url: toImageUrl(product.image1),
                  image_url2: toImageUrl(product.image2 || product.image1),
                  image_url3: toImageUrl(product.image3 || product.image1),
                }}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
