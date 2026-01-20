import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "https://api.appconnect.cloud";

  // 🔐 SAME MinIO CONFIG AS ALLPRODUCTS
  const MINIO_PUBLIC_URL =
    import.meta.env.VITE_MINIO_PUBLIC_URL || "https://minio.appconnect.cloud";
  const MINIO_BUCKET =
    import.meta.env.VITE_MINIO_BUCKET || "vitalimes-images";

  // 🔁 SAME IMAGE LOGIC (INLINE)
  const toImageUrl = (filename) => {
    if (!filename) return "";

    let key = String(filename).trim();

    // if DB stored full URL → extract filename
    if (key.startsWith("http://") || key.startsWith("https://")) {
      key = key.split("/").pop();
    }

    // remove uploads/
    key = key.replace(/^uploads\//, "");

    // encode safely
    key = key.split("/").map(encodeURIComponent).join("/");

    return `${MINIO_PUBLIC_URL}/${MINIO_BUCKET}/uploads/${key}`;
  };

  // 🔄 LOAD PRODUCTS
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products`);
        setProducts(res.data.products || []);
      } catch (err) {
        console.error("Failed to load admin products", err);
      }
    };
    loadProducts();
  }, [API_URL]);

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">Products</h4>
        <button
          className="btn btn-warning fw-bold"
          onClick={() => navigate("/admin/add-product")}
        >
          + Add Product
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: "90px" }}>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>HSN</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img
                    src={toImageUrl(p.image1)}
                    alt={p.title}
                    style={{
                      width: "70px",
                      height: "70px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                    }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/70x70?text=No+Image";
                    }}
                  />
                </td>

                <td className="fw-semibold">{p.title}</td>

                <td>{p.category || "-"}</td>

                <td>{p.hsn || "-"}</td>

                <td>
                  <span
                    className={`badge ${
                      p.status === "Active" ? "bg-success" : "bg-secondary"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}

            {products.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
