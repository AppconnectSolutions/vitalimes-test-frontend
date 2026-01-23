// src/components/admin/EditCategory.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function EditCategory() {
  const API_URL = import.meta.env.VITE_API_URL || "https://api.appconnect.cloud";
  const { id } = useParams();
  const navigate = useNavigate();

  const fileRef = useRef(null);

  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState(""); // optional
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null);

  // this will store whatever backend returns (key/url)
  const [existingImage, setExistingImage] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ MinIO Public Base (bucket public endpoint)
  const MINIO_PUBLIC_BASE = useMemo(() => {
    return "https://minio.appconnect.cloud/vitalimes-images";
  }, []);

  // ✅ Convert DB value -> real usable image URL
  const toImageUrl = (val) => {
    if (!val) return "";
    const s = String(val).trim();
    if (!s) return "";

    // already full URL
    if (/^https?:\/\//i.test(s)) return s;

    // support values like:
    // "uploads/categories/abc.png" or "uploads/abc.png" or "abc.png"
    const idx = s.indexOf("uploads/");
    const key =
      idx >= 0 ? s.slice(idx) : s.startsWith("uploads/") ? s : `uploads/${s}`;

    const encoded = key
      .split("/")
      .map((p) => encodeURIComponent(p))
      .join("/");

    return `${MINIO_PUBLIC_BASE}/${encoded}`;
  };

  // ✅ Load existing category
  useEffect(() => {
    const loadCategory = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${API_URL}/api/categories/${id}`);
        const data = await res.json();

        // backend can return either:
        // A) { success:true, category:{...} }
        // B) { ...category fields... }
        const cat = data?.category || data;

        setCategoryName(cat?.category_name || cat?.name || "");
        setParentCategory(cat?.parent_category || "");
        setDate(cat?.date ? String(cat.date).substring(0, 10) : "");
        setStatus(cat?.status || "Active");

        // possible image fields
        const raw =
          cat?.category_icon ||
          cat?.image_url ||
          cat?.icon ||
          cat?.category_image ||
          cat?.image ||
          "";

        setExistingImage(raw || "");
      } catch (err) {
        console.error("Failed to load category:", err);
        alert("Failed to load category details");
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [API_URL, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;

    if (!categoryName.trim()) {
      alert("Category name is required");
      return;
    }

    const formData = new FormData();

    // ✅ IMPORTANT: backend-friendly field names
    formData.append("category_name", categoryName.trim());
    formData.append("parent_category", parentCategory || "");
    formData.append("date", date || "");
    formData.append("status", status);

    // ✅ IMPORTANT: file field name should be image (or icon if backend supports)
    if (image) formData.append("image", image);

    try {
      setSaving(true);

      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: "PUT",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        alert(data.error || "Failed to update category");
        return;
      }

      alert("✅ Category updated successfully!");
      navigate("/admin/categories");
    } catch (err) {
      console.error("Error updating category:", err);
      alert("Error updating category");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="main-content-wrapper">
        <div className="container py-5">
          <div className="alert alert-info mb-0">Loading category...</div>
        </div>
      </main>
    );
  }

  const existingImageUrl = toImageUrl(existingImage);

  return (
    <main className="main-content-wrapper">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="d-md-flex justify-content-between align-items-center">
              <h2 className="mb-0">Edit Category</h2>
              <div>
                <Link to="/admin/categories" className="btn btn-light">
                  Back to Categories
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="card mb-4 shadow border-0">
              <div className="card-body p-4">
                <h4 className="mb-4">Category Image</h4>

                {existingImageUrl ? (
                  <div className="mb-3">
                    <p className="mb-1">Current image:</p>
                    <img
                      src={existingImageUrl}
                      alt="Category"
                      style={{
                        height: "80px",
                        width: "80px",
                        borderRadius: "10px",
                        objectFit: "cover",
                        border: "1px solid #eee",
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                    <div className="small text-muted mt-2">
                      Stored: <code>{String(existingImage)}</code>
                    </div>
                  </div>
                ) : (
                  <div className="mb-3 text-muted">No image found.</div>
                )}

                <div className="mb-4">
                  <input
                    ref={fileRef}
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                  />
                  <small className="text-muted d-block mt-2">
                    Choose a new image only if you want to replace the existing one.
                  </small>
                </div>

                <h4 className="mb-3 mt-4">Category Information</h4>

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="mb-3 col-lg-6">
                      <label className="form-label">Category Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Category Name"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        required
                      />
                    </div>

                    {/* optional parent */}
                    <div className="mb-3 col-lg-6">
                      <label className="form-label">Parent Category (optional)</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Parent Category"
                        value={parentCategory}
                        onChange={(e) => setParentCategory(e.target.value)}
                      />
                    </div>

                    <div className="mb-3 col-lg-6">
                      <label className="form-label">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>

                    <div className="mb-3 col-lg-12">
                      <label className="form-label">Status</label>
                      <br />

                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="status"
                          value="Active"
                          checked={status === "Active"}
                          onChange={(e) => setStatus(e.target.value)}
                        />
                        <label className="form-check-label">Active</label>
                      </div>

                      <div className="form-check form-check-inline">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="status"
                          value="Disabled"
                          checked={status === "Disabled"}
                          onChange={(e) => setStatus(e.target.value)}
                        />
                        <label className="form-check-label">Disabled</label>
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={saving}
                      >
                        {saving ? "Updating..." : "Update Category"}
                      </button>

                      <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={() => navigate("/admin/categories")}
                        disabled={saving}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
