import React, { useEffect, useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Edit2, Trash2 } from "react-feather";

export default function Categories() {
  const API_URL = import.meta.env.VITE_API_URL || "https://api.appconnect.cloud";
  const navigate = useNavigate();

  const [allCategories, setAllCategories] = useState([]);
  const [categories, setCategories] = useState([]);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);

  const entriesPerPage = 8;

  // ✅ MinIO public base URL (bucket path)
  const MINIO_PUBLIC_BASE = useMemo(() => {
    return "https://minio.appconnect.cloud/vitalimes-images";
  }, []);

  // ✅ Local fallback image (NO external DNS dependency)
  const FALLBACK_IMG = "/no-img.png";

  // ✅ Convert stored DB value -> usable image URL
  // Supports:
  // 1) full URL already (https://...)
  // 2) stored key with folders (uploads/x.png, categories/x.png, icons/x.png)
  // 3) stored bucket prefix (vitalimes-images/uploads/x.png)
  // 4) stored file only (x.png) -> assumes uploads/x.png
  const toImageUrl = (val) => {
    if (!val) return "";
    const s = String(val).trim();

    if (!s || s === "null" || s === "undefined") return "";

    // already full URL
    if (/^https?:\/\//i.test(s)) return s;

    // remove leading slashes
    let key = s.replace(/^\/+/, "");

    // strip bucket prefix if saved in DB
    key = key.replace(/^vitalimes-images\//, "");

    // if only filename, assume uploads/
    if (!key.includes("/")) key = `uploads/${key}`;

    // encode safely
    const encoded = key.split("/").map(encodeURIComponent).join("/");

    return `${MINIO_PUBLIC_BASE}/${encoded}`;
  };

  // ---------------- API LOAD ----------------
  const loadCategories = async () => {
    try {
      const res = await fetch(`${API_URL}/api/categories`);
      const data = await res.json();

      const list = Array.isArray(data) ? data : data.categories || [];
      setAllCategories(list);
    } catch (err) {
      console.error("Failed to load categories:", err);
      setAllCategories([]);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  // ---------------- FILTER + PAGINATION ----------------
  useEffect(() => {
    let filtered = [...allCategories];

    if (search.trim() !== "") {
      const term = search.toLowerCase();
      filtered = filtered.filter((c) =>
        (c.category_name || c.name || "").toLowerCase().includes(term)
      );
    }

    if (statusFilter) {
      filtered = filtered.filter((c) => c.status === statusFilter);
    }

    const start = (page - 1) * entriesPerPage;
    const end = start + entriesPerPage;

    setCategories(filtered.slice(start, end));
  }, [allCategories, search, statusFilter, page]);

  const totalEntries = allCategories.filter((c) => {
    let ok = true;

    if (search.trim() !== "") {
      ok =
        (c.category_name || c.name || "")
          .toLowerCase()
          .includes(search.toLowerCase());
    }

    if (statusFilter) ok = ok && c.status === statusFilter;

    return ok;
  }).length;

  const totalPages = Math.max(1, Math.ceil(totalEntries / entriesPerPage));

  // ---------------- Delete ----------------
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      const res = await fetch(`${API_URL}/api/categories/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success) {
        alert("Category Deleted");
        loadCategories();
      } else {
        alert(data.error || "Delete failed");
      }
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <main className="main-content-wrapper p-4">
      {/* PAGE HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Categories</h2>

        <Link to="/admin/add-category" className="btn btn-success px-4">
          + Add Category
        </Link>
      </div>

      {/* SEARCH FILTER ROW */}
      <div className="row g-3 mb-4">
        <div className="col-md-4 col-12">
          <input
            type="text"
            className="form-control"
            placeholder="Search Categories..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>

        <div className="col-md-2 col-6">
          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => loadCategories()}
          >
            Search
          </button>
        </div>

        <div className="col-md-2 col-6">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => {
              setPage(1);
              setStatusFilter(e.target.value);
            }}
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>
      </div>

      {/* TABLE CARD */}
      <div className="card shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Icon</th>
                  <th>Category Name</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>

              <tbody>
                {categories.length > 0 ? (
                  categories.map((cat) => {
                    // ✅ collect possible image fields from API
                    const raw =
                      cat.image_url ||
                      cat.icon ||
                      cat.category_icon ||
                      cat.image ||
                      cat.image1 ||
                      cat.category_image ||
                      cat.categoryImage ||
                      cat.category_icon_url ||
                      "";

                    const imgUrl = toImageUrl(raw);

                    // ✅ debug: you can see in console what value is coming and what URL is built
                    // remove later if you want
                    console.log("CATEGORY IMG RAW:", raw, "=> URL:", imgUrl);

                    return (
                      <tr key={cat.id}>
                        <td>
                          {imgUrl ? (
                            <img
                              src={imgUrl}
                              width="45"
                              height="45"
                              className="rounded"
                              style={{ objectFit: "cover" }}
                              alt={cat.category_name || cat.name || "Category"}
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = FALLBACK_IMG;
                              }}
                            />
                          ) : (
                            <img
                              src={FALLBACK_IMG}
                              width="45"
                              height="45"
                              className="rounded"
                              style={{ objectFit: "cover" }}
                              alt="No Image"
                              loading="lazy"
                            />
                          )}
                        </td>

                        <td className="fw-semibold">
                          {cat.category_name || cat.name}
                        </td>

                        <td>
                          <span
                            className={`badge ${
                              cat.status === "Active"
                                ? "bg-success"
                                : "bg-danger"
                            }`}
                          >
                            {cat.status}
                          </span>
                        </td>

                        <td className="text-end">
                          <button
                            className="btn btn-light border me-2 rounded-circle p-2"
                            onClick={() =>
                              navigate(`/admin/edit-category/${cat.id}`)
                            }
                          >
                            <Edit2 size={16} color="green" />
                          </button>

                          <button
                            className="btn btn-light border rounded-circle p-2"
                            onClick={() => handleDelete(cat.id)}
                          >
                            <Trash2 size={16} color="red" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="d-flex justify-content-between align-items-center p-3 border-top">
            <span>
              Showing {categories.length} of {totalEntries} entries
            </span>

            <div>
              <button
                className="btn btn-outline-secondary me-2"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>

              <button className="btn btn-success">{page}</button>

              <button
                className="btn btn-outline-secondary ms-2"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
