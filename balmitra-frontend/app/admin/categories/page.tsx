"use client";

import { useEffect, useState } from "react";
import CategoryForm from "./CategoryForm";
import {
  getCategories,
  deleteCategory,
} from "../services/api/categories";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.categories || data);
    } catch (error) {
      console.error("Failed to load categories:", error);
      alert("Failed to load categories");
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      await deleteCategory(id);
      loadCategories();
    } catch (error) {
      console.error(error);
      alert("Failed to delete category");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
            Catalog Management
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Categories
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Create the main groups customers use to browse your catalogue.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedCategory(null);
            setShowForm(true);
          }}
          className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
        >
          + Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categories.length === 0 ? (
          <div className="col-span-full rounded-2xl bg-white p-12 text-center text-gray-500 shadow-sm">
            No categories found. Create your first category to begin adding products.
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              {category.image && (
                <img
                  src={category.image}
                  alt={category.name}
                  className="mb-5 h-36 w-full rounded-xl object-cover"
                />
              )}
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-xl font-semibold text-gray-900">
                {category.name}
                </h2>
                <span className={category.isActive !== false ? "rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700" : "rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500"}>
                  {category.isActive !== false ? "Active" : "Inactive"}
                </span>
              </div>

              <p className="mt-3 min-h-12 text-sm leading-6 text-gray-500">
                {category.description || "No description"}
              </p>

              <p className="mt-4 text-xs font-medium text-gray-400">
                Display Order: {category.displayOrder}
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowForm(true);
                  }}
                  className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(category.id)}
                  className="rounded-lg border border-red-100 bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl">
            <CategoryForm
              category={selectedCategory}
              onClose={() => setShowForm(false)}
              onSuccess={loadCategories}
            />
          </div>
        </div>
      )}
    </div>
  );
}
