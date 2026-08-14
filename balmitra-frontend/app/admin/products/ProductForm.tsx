"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { getCategories } from "../services/api/categories";
import {
  createProduct,
  updateProduct,
} from "../services/api/products";

interface ProductFormProps {
  product?: any;
  onClose: () => void;
  onSuccess: () => void;
}

interface Category {
  id: number;
  name: string;
}

export default function ProductForm({
  product,
  onClose,
  onSuccess,
}: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [form, setForm] = useState<any>({
    name: "",
    description: "",
    categoryId: "",
    price: "",
    discountPrice: "",
    stock: "",
    isFeatured: false,
    isTrending: false,
    isNewArrival: false,
    isActive: true,
    thumbnail: null,
  });

  // --------------------------------------------------
  // LOAD CATEGORIES + EXISTING PRODUCT
  // --------------------------------------------------

  useEffect(() => {
    loadCategories();

    if (product) {
      setForm({
        name: product.name || "",
        description: product.description || "",
        categoryId: product.categoryId || "",
        price: product.price || "",
        discountPrice: product.discountPrice || "",
        stock: product.stock ?? "",
        isFeatured: product.isFeatured || false,
        isTrending: product.isTrending || false,
        isNewArrival: product.isNewArrival || false,
        isActive:
          product.isActive !== undefined
            ? product.isActive
            : true,
        thumbnail: null,
      });

      // Existing product image
      if (product.thumbnail) {
        setImagePreview(
          `http://localhost:5000/uploads/products/${product.thumbnail}`
        );
      }
    } else {
      setImagePreview(null);
    }
  }, [product]);

  // --------------------------------------------------
  // LOAD CATEGORIES
  // --------------------------------------------------

  const loadCategories = async () => {
    try {
      const data = await getCategories();

      setCategories(data || []);
    } catch (error) {
      console.error("Category Error:", error);
    }
  };

  // --------------------------------------------------
  // HANDLE INPUT
  // --------------------------------------------------

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement;

    const { name, value, checked, type } = target;

    setForm((prev: any) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // --------------------------------------------------
  // HANDLE IMAGE
  // --------------------------------------------------

  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // 5MB validation
    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB.");
      return;
    }

    // Image type validation
    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }

    setForm((prev: any) => ({
      ...prev,
      thumbnail: file,
    }));

    // Preview
    const previewUrl = URL.createObjectURL(file);

    setImagePreview(previewUrl);
  };

  // --------------------------------------------------
  // REMOVE IMAGE
  // --------------------------------------------------

  const removeImage = () => {
    setForm((prev: any) => ({
      ...prev,
      thumbnail: null,
    }));

    setImagePreview(null);
  };

  // --------------------------------------------------
  // SUBMIT
  // --------------------------------------------------

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Basic validation
    if (!form.name.trim()) {
      alert("Please enter product name.");
      return;
    }

    if (!form.categoryId) {
      alert("Please select a category.");
      return;
    }

    if (!form.price) {
      alert("Please enter product price.");
      return;
    }

    if (form.stock === "") {
      alert("Please enter product stock.");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      // Product information
      data.append("name", form.name);
      data.append("description", form.description);
      data.append("categoryId", String(form.categoryId));
      data.append("price", String(form.price));
      data.append(
        "discountPrice",
        form.discountPrice !== ""
          ? String(form.discountPrice)
          : ""
      );
      data.append("stock", String(form.stock));

      // Product flags
      data.append(
        "isFeatured",
        String(form.isFeatured)
      );

      data.append(
        "isTrending",
        String(form.isTrending)
      );

      data.append(
        "isNewArrival",
        String(form.isNewArrival)
      );

      data.append(
        "isActive",
        String(form.isActive)
      );

      // Image
      if (form.thumbnail) {
        data.append("thumbnail", form.thumbnail);
      }

      // CREATE
      if (product) {
        await updateProduct(product.id, data);
      } else {
        await createProduct(data);
      }

      onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Product Save Error:", error);

      const message =
        error?.response?.data?.message ||
        "Failed to save product.";

      alert(message);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <form
      onSubmit={handleSubmit}
      className="overflow-hidden rounded-2xl bg-white"
    >
      {/* HEADER */}

      <div className="border-b border-gray-100 px-8 py-6">
        <h2 className="text-2xl font-bold text-[#0B1220]">
          {product ? "Edit Product" : "Add New Product"}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          {product
            ? "Update product information, pricing and inventory."
            : "Add a new product to your Balmitra store."}
        </p>
      </div>

      {/* FORM BODY */}

      <div className="space-y-8 p-8">
        {/* BASIC INFORMATION */}

        <section>
          <div className="mb-5">
            <h3 className="text-base font-semibold text-[#0B1220]">
              Basic Information
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Enter the main information customers will see.
            </p>
          </div>

          <div className="space-y-5">
            {/* PRODUCT NAME */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Product Name
                <span className="text-red-500"> *</span>
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="e.g. Educational Building Blocks"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#C67C2E] focus:ring-2 focus:ring-[#C67C2E]/10"
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Product Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe the product, features, materials, usage, etc."
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#C67C2E] focus:ring-2 focus:ring-[#C67C2E]/10"
              />

              <p className="mt-1 text-xs text-gray-400">
                Provide useful information that helps customers understand
                the product.
              </p>
            </div>
          </div>
        </section>

        {/* CATEGORY */}

        <section className="border-t border-gray-100 pt-8">
          <div className="mb-5">
            <h3 className="text-base font-semibold text-[#0B1220]">
              Product Classification
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Organize the product so customers can find it easily.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* CATEGORY */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Category
                <span className="text-red-500"> *</span>
              </label>

              <select
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#C67C2E] focus:ring-2 focus:ring-[#C67C2E]/10"
              >
                <option value="">
                  Select Category
                </option>

                {categories.map((category) => (
                  <option
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* SUBCATEGORY PLACEHOLDER */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Subcategory
              </label>

              <select
                disabled
                className="w-full cursor-not-allowed rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-400"
              >
                <option>
                  Subcategories coming next
                </option>
              </select>

              <p className="mt-1 text-xs text-gray-400">
                Subcategory module will be connected after the backend
                subcategory API is added.
              </p>
            </div>
          </div>
        </section>

        {/* PRODUCT IMAGE */}

        <section className="border-t border-gray-100 pt-8">
          <div className="mb-5">
            <h3 className="text-base font-semibold text-[#0B1220]">
              Product Image
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Upload the primary image customers will see on product cards.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[220px_1fr]">
            {/* IMAGE PREVIEW */}

            <div className="flex h-52 items-center justify-center overflow-hidden rounded-2xl border border-gray-200 bg-[#F7F5F1]">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Product preview"
                  width={220}
                  height={220}
                  unoptimized
                  className="h-full w-full object-contain p-4"
                />
              ) : (
                <div className="text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                    📷
                  </div>

                  <p className="text-sm font-medium text-gray-500">
                    No image selected
                  </p>
                </div>
              )}
            </div>

            {/* UPLOAD */}

            <div className="flex flex-col justify-center">
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 px-6 py-8 text-center transition hover:border-[#C67C2E] hover:bg-orange-50/30">
                <div className="mb-3 text-3xl">
                  ⬆️
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  Click to upload product image
                </p>

                <p className="mt-1 text-xs text-gray-400">
                  PNG, JPG or WEBP • Maximum 5MB
                </p>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImage}
                  className="hidden"
                />
              </label>

              {imagePreview && (
                <button
                  type="button"
                  onClick={removeImage}
                  className="mt-3 self-start text-sm font-medium text-red-500 hover:text-red-600"
                >
                  Remove selected image
                </button>
              )}
            </div>
          </div>
        </section>

        {/* PRICING & INVENTORY */}

        <section className="border-t border-gray-100 pt-8">
          <div className="mb-5">
            <h3 className="text-base font-semibold text-[#0B1220]">
              Pricing & Inventory
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Configure pricing and available stock.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {/* PRICE */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Regular Price
                <span className="text-red-500"> *</span>
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  ₹
                </span>

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-4 text-sm outline-none focus:border-[#C67C2E] focus:ring-2 focus:ring-[#C67C2E]/10"
                />
              </div>
            </div>

            {/* DISCOUNT */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Sale Price
              </label>

              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  ₹
                </span>

                <input
                  type="number"
                  name="discountPrice"
                  value={form.discountPrice}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  placeholder="Optional"
                  className="w-full rounded-xl border border-gray-200 py-3 pl-9 pr-4 text-sm outline-none focus:border-[#C67C2E] focus:ring-2 focus:ring-[#C67C2E]/10"
                />
              </div>
            </div>

            {/* STOCK */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Stock Quantity
                <span className="text-red-500"> *</span>
              </label>

              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                min="0"
                placeholder="e.g. 50"
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-[#C67C2E] focus:ring-2 focus:ring-[#C67C2E]/10"
              />
            </div>
          </div>
        </section>

        {/* PRODUCT VISIBILITY */}

        <section className="border-t border-gray-100 pt-8">
          <div className="mb-5">
            <h3 className="text-base font-semibold text-[#0B1220]">
              Product Visibility
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Control where this product appears throughout the store.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* FEATURED */}

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-[#C67C2E]">
              <input
                type="checkbox"
                name="isFeatured"
                checked={form.isFeatured}
                onChange={handleChange}
                className="mt-1 h-4 w-4 accent-[#C67C2E]"
              />

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Featured Product
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Show this product in featured sections.
                </p>
              </div>
            </label>

            {/* TRENDING */}

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-[#C67C2E]">
              <input
                type="checkbox"
                name="isTrending"
                checked={form.isTrending}
                onChange={handleChange}
                className="mt-1 h-4 w-4 accent-[#C67C2E]"
              />

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Trending Product
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Include this product in trending products.
                </p>
              </div>
            </label>

            {/* NEW ARRIVAL */}

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-[#C67C2E]">
              <input
                type="checkbox"
                name="isNewArrival"
                checked={form.isNewArrival}
                onChange={handleChange}
                className="mt-1 h-4 w-4 accent-[#C67C2E]"
              />

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  New Arrival
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Mark this product as a newly added item.
                </p>
              </div>
            </label>

            {/* ACTIVE */}

            <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4 transition hover:border-[#C67C2E]">
              <input
                type="checkbox"
                name="isActive"
                checked={form.isActive}
                onChange={handleChange}
                className="mt-1 h-4 w-4 accent-[#C67C2E]"
              />

              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Active Product
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Allow customers to see and purchase this product.
                </p>
              </div>
            </label>
          </div>
        </section>
      </div>

      {/* FOOTER */}

      <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50 px-8 py-5">
        <button
          type="button"
          onClick={onClose}
          disabled={loading}
          className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[#C67C2E] px-7 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#A7641E] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Saving Product..."
            : product
            ? "Update Product"
            : "Create Product"}
        </button>
      </div>
    </form>
  );
}