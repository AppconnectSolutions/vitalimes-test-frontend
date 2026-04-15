import React, { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import environment from "../../environment.js"; // ✅ your existing env file

export default function AddCategory() {
  const API_URL = environment.API_URL || "https://api.appconnect.cloud";
  const navigate = useNavigate();

  const fileRef = useRef(null);

  const [categoryName, setCategoryName] = useState("");
  const [parentCategory, setParentCategory] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState(null);

  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);

  // Fetch categories (dropdown)
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`${API_URL}/api/categories`);
        const data = await res.json();
        const list = Array.isArray(data) ? data : data.categories || [];
        setCategories(list);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategories([]);
      }
    };
    fetchCategories();
  }, [API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (saving) return;

    if (!categoryName.trim()) {
      alert("Category name is required");
      return;
    }

    const formData = new FormData();

    // ✅ IMPORTANT: use backend-friendly field names
    formData.append("category_name", categoryName.trim());
    formData.append("parent_category", parentCategory || "");
    formData.append("date", date || "");
    formData.append("status", status);

    // ✅ IMPORTANT: file field name = "image"
    if (image) formData.append("image", image);

    try {
      setSaving(true);

      const res = await fetch(`${API_URL}/api/categories`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        alert(data.error || "Failed to add category");
        return;
      }

      alert("✅ Category created successfully!");

      // reset
      setCategoryName("");
      setParentCategory("");
      setDate("");
      setStatus("Active");
      setImage(null);
      if (fileRef.current) fileRef.current.value = "";

      // go back
      navigate("/admin/categories");
    } catch (err) {
      console.error("Error adding category:", err);
      alert("Failed to add category. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="main-content-wrapper">
      <div className="container">
        <div className="row mb-4">
          <div className="col-md-12 d-flex justify-content-between align-items-center">
            <h2 className="mb-0">Add New Category</h2>
            <Link to="/admin/categories" className="btn btn-light">
              Back to Categories
            </Link>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-12">
            <div className="card shadow border-0">
              <div className="card-body p-4">
                <h4 className="mb-4">Category Image</h4>

                <div className="mb-4">
                  <input
                    ref={fileRef}
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                  />
                  <small className="text-muted d-block mt-2">
                    Upload PNG/JPG/WebP. (Recommended 256x256)
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

                    <div className="mb-3 col-lg-6">
                      <label className="form-label">Parent Category</label>
                      <select
                        className="form-select"
                        value={parentCategory}
                        onChange={(e) => setParentCategory(e.target.value)}
                      >
                        <option value="">Select Parent</option>
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.category_name || cat.name}
                          </option>
                        ))}
                      </select>
                      <small className="text-muted">
                        We store parent as ID (recommended).
                      </small>
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
                        {saving ? "Saving..." : "Create Category"}
                      </button>

                      <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={() => {
                          setCategoryName("");
                          setParentCategory("");
                          setDate("");
                          setStatus("Active");
                          setImage(null);
                          if (fileRef.current) fileRef.current.value = "";
                        }}
                        disabled={saving}
                      >
                        Reset
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
