"use client";

import { useEffect, useState } from "react";
import {
  createCategory,
  updateCategory,
} from "../services/api/categories";

interface Props {
  category?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CategoryForm({
  category,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    displayOrder: 0,
    isActive: true,
  });

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name || "",
        description: category.description || "",
        displayOrder: category.displayOrder || 0,
        isActive: category.isActive ?? true,
      });
    } else {
      setForm({
        name: "",
        description: "",
        displayOrder: 0,
        isActive: true,
      });
    }
  }, [category]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const target = e.target as HTMLInputElement;

    const { name, value, checked, type } = target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : name === "displayOrder"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (category) {
        await updateCategory(category.id, form);
      } else {
        await createCategory(form);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Category Save Error:", error);
      alert("Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white rounded-xl"
    >
      <h2 className="text-2xl font-bold">
        {category ? "Edit Category" : "Add Category"}
      </h2>

      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Category Name"
        className="w-full border rounded-lg p-3"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border rounded-lg p-3"
        rows={4}
      />

      <input
        type="number"
        name="displayOrder"
        value={form.displayOrder}
        onChange={handleChange}
        placeholder="Display Order"
        className="w-full border rounded-lg p-3"
      />

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
        />
        Active Category
      </label>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="border px-6 py-3 rounded-lg"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}