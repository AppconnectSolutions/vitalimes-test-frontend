import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQty,
    getSubtotal,
    cartOpen,
    closeCart,
    addToCart,
  } = useCart();

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "https://api.appconnect.cloud";

  /* ================= MINIO CONFIG ================= */
  const MINIO_PUBLIC_URL =
    import.meta.env.VITE_MINIO_PUBLIC_URL ||
    "https://minio.appconnect.cloud";

  const MINIO_BUCKET =
    import.meta.env.VITE_MINIO_BUCKET || "vitalimes-images";

  /* ===== Convert DB filename → MinIO HTTPS URL ===== */
  const toImageUrl = (filename) => {
    if (!filename) return "";

    let key = String(filename).trim();

    // If DB stored full URL, extract only filename
    if (key.startsWith("http://") || key.startsWith("https://")) {
      key = key.split("/").pop();
    }

    // Remove uploads/ if already stored
    key = key.replace(/^uploads\//, "");

    // Encode safely
    key = key.split("/").map(encodeURIComponent).join("/");

    return `${MINIO_PUBLIC_URL}/${MINIO_BUCKET}/uploads/${key}`;
  };

  /* ================= RECOMMENDED PRODUCTS ================= */
  const [recommend, setRecommend] = useState([]);
  const [canvasInstance, setCanvasInstance] = useState(null);

  useEffect(() => {
    loadRecommended();
  }, []);

  const loadRecommended = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/products?status=Active&limit=6`
      );
      setRecommend(res.data.products || []);
    } catch (err) {
      console.error("Failed to load recommended products", err);
      setRecommend([]);
    }
  };

  /* ================= OFFCANVAS CONTROL ================= */
  useEffect(() => {
    const drawer = document.getElementById("cartDrawer");
    if (drawer && !canvasInstance) {
      const instance = new window.bootstrap.Offcanvas(drawer);
      setCanvasInstance(instance);
    }
  }, []);

  useEffect(() => {
    if (!canvasInstance) return;
    cartOpen ? canvasInstance.show() : canvasInstance.hide();
  }, [cartOpen, canvasInstance]);

  /* ================= STYLES ================= */
  const recommendCardStyle = {
    display: "flex",
    gap: "12px",
    padding: "10px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    alignItems: "center",
    minHeight: "90px",
  };

  const recommendImgStyle = {
    width: "65px",
    height: "65px",
    borderRadius: "6px",
    objectFit: "cover",
  };

  const priceStyle = {
    color: "#5C3A1E",
    fontWeight: "600",
  };

  const addBtnStyle = {
    background: "#5C3A1E",
    color: "white",
    width: "30px",
    height: "30px",
    borderRadius: "5px",
    fontWeight: "bold",
  };

  return (
    <div
      className="offcanvas offcanvas-end"
      id="cartDrawer"
      tabIndex="-1"
      style={{ width: "100%", maxWidth: "600px" }}
    >
      {/* ================= HEADER ================= */}
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title fw-bold">
          Your Cart ({cart.length})
        </h5>
        <button
          type="button"
          className="btn-close"
          onClick={closeCart}
        />
      </div>

      {/* ================= BODY ================= */}
      <div className="offcanvas-body d-flex flex-column flex-md-row gap-4">
        {/* ===== CART ITEMS ===== */}
        <div className="flex-grow-1">
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.weight}`}
              className="d-flex gap-3 border-bottom pb-3 mb-4"
            >
              <img
                src={toImageUrl(item.img)}
                alt={item.title}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />

              <div className="flex-grow-1">
                <div className="d-flex justify-content-between">
                  <strong className="small">{item.title}</strong>
                  <strong>₹{(item.price * item.qty).toFixed(2)}</strong>
                </div>

                <small className="text-muted">
                  ₹{item.price} × {item.qty}
                </small>

                <div className="d-flex align-items-center gap-2 mt-2">
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={() =>
                      updateQty(item.id, item.weight, item.qty - 1)
                    }
                  >
                    -
                  </button>

                  <strong>{item.qty}</strong>

                  <button
                    className="btn btn-sm"
                    style={addBtnStyle}
                    onClick={() =>
                      updateQty(item.id, item.weight, item.qty + 1)
                    }
                  >
                    +
                  </button>

                  <button
                    className="btn btn-sm text-danger ms-auto"
                    onClick={() =>
                      removeFromCart(item.id, item.weight)
                    }
                  >
                    <i className="bi bi-trash fs-5"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* ===== TOTAL ===== */}
          {cart.length > 0 && (
            <>
              <div className="p-3 bg-light border rounded mb-3">
                <div className="d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>₹{getSubtotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                className="btn w-100 fw-bold"
                style={{ background: "#5C3A1E", color: "white" }}
                onClick={() => {
                  closeCart();
                  setTimeout(() => navigate("/checkout"), 300);
                }}
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </div>

        {/* ===== RECOMMENDED ===== */}
        <div className="w-100 w-md-50">
          <h6 className="fw-bold mb-3">You'll love this too</h6>

          <div className="d-flex flex-column gap-3">
            {recommend.map((p) => {
              const price =
                p.variants?.[0]?.sale_price ||
                p.variants?.[0]?.price ||
                0;

              return (
                <div key={p.id} style={recommendCardStyle}>
                  <img
                    src={toImageUrl(p.image1)}
                    alt={p.title}
                    style={recommendImgStyle}
                  />

                  <div className="flex-grow-1">
                    <div className="small fw-semibold">{p.title}</div>

                    <div className="d-flex justify-content-between align-items-center mt-1">
                      <span style={priceStyle}>₹{price}</span>

                      <button
                        className="btn btn-sm"
                        style={addBtnStyle}
                        onClick={() =>
                          addToCart(
                            {
                              id: p.id,
                              title: p.title,
                              price,
                              img: p.image1,
                              weight:
                                p.variants?.[0]?.weight || "1unit",
                            },
                            1,
                            { openCart: true }
                          )
                        }
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            {recommend.length === 0 && (
              <p className="text-muted small">
                No recommendations available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
