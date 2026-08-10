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
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Categories
        </h1>

        <button
          onClick={() => {
            setSelectedCategory(null);
            setShowForm(true);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Category
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length === 0 ? (
          <div className="col-span-full bg-white rounded-xl shadow p-10 text-center text-gray-500">
            No Categories Found
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="bg-white shadow rounded-xl p-6"
            >
              <h2 className="text-xl font-semibold">
                {category.name}
              </h2>

              <p className="text-gray-500 mt-2">
                {category.description || "No description"}
              </p>

              <p className="text-sm text-gray-400 mt-2">
                Display Order: {category.displayOrder}
              </p>

              <div className="mt-5 flex gap-3">
                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowForm(true);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(category.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
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
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-8 w-full max-w-2xl">
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