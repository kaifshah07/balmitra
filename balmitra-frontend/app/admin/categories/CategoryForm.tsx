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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
      setImagePreview(category.image || null);
    } else {
      setForm({
        name: "",
        description: "",
        displayOrder: 0,
        isActive: true,
      });
      setImagePreview(null);
    }
    setImageFile(null);
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      alert("Choose an image smaller than 5MB in JPG, PNG, or WEBP format.");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("displayOrder", String(form.displayOrder));
      data.append("isActive", String(form.isActive));
      if (imageFile) data.append("image", imageFile);

      if (category) {
        await updateCategory(category.id, data);
      } else {
        await createCategory(data);
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
      className="space-y-6 rounded-2xl bg-white"
    >
      <div className="border-b border-gray-100 pb-5">
      <h2 className="text-2xl font-bold text-gray-900">
        {category ? "Edit Category" : "Add Category"}
      </h2>
      <p className="mt-1 text-sm text-gray-500">Create the main catalogue group customers will browse.</p>
      </div>

      <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">Category name <span className="text-red-500">*</span></label>
      <input
        type="text"
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Category Name"
        className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        required
      />
      </div>

      <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">Description</label>
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full resize-none rounded-xl border border-gray-200 p-3 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        rows={4}
      />
      </div>

      <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">Display order</label>
      <input
        type="number"
        name="displayOrder"
        value={form.displayOrder}
        onChange={handleChange}
        placeholder="Display Order"
        min="0"
        className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
      />
      <p className="mt-1 text-xs text-gray-400">Lower numbers appear first in category lists.</p>
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">Category image</label>
        <div className="flex items-center gap-4 rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4">
          {imagePreview ? (
            <img src={imagePreview} alt="Category preview" className="h-16 w-16 rounded-lg object-cover" />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-white text-xs text-gray-400">No image</div>
          )}
          <label className="cursor-pointer rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-50">
            Upload image
            <input type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageChange} className="hidden" />
          </label>
        </div>
        <p className="mt-1 text-xs text-gray-400">Optional. JPG, PNG, or WEBP, up to 5MB.</p>
      </div>

      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 p-4">
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
        />
        <span><span className="block text-sm font-semibold text-gray-700">Active category</span><span className="block text-xs text-gray-400">Inactive categories remain hidden from customers.</span></span>
      </label>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save"}
        </button>

        <button
          type="button"
          onClick={onClose}
          className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
