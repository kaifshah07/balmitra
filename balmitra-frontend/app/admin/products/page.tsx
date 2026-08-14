"use client";

import { useEffect, useMemo, useState } from "react";
import ProductForm from "./ProductForm";

import {
  getProducts,
  deleteProduct,
} from "../services/api/products";

import {
  Search,
  Plus,
  Pencil,
  Trash2,
  Package,
  Eye,
  X,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  slug?: string;
  sku?: string;

  price: number | string;
  discountPrice?: number | string | null;

  stock: number;

  thumbnail?: string | null;

  isActive?: boolean;
  isFeatured?: boolean;
  isTrending?: boolean;
  isNewArrival?: boolean;

  category?: {
    id: number;
    name: string;
  } | null;

  subcategory?: {
    id: number;
    name: string;
  } | null;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data.products || data || []);
    } catch (error) {
      console.error("Products loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      await loadProducts();
    } catch (error) {
      console.error("Delete product error:", error);

      alert("Failed to delete product.");
    }
  };

  const openAddProduct = () => {
    setSelectedProduct(null);
    setShowForm(true);
  };

  const openEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowForm(true);
  };

  const categories = useMemo(() => {
    const categoryMap = new Map<number, string>();

    products.forEach((product) => {
      if (product.category) {
        categoryMap.set(
          product.category.id,
          product.category.name
        );
      }
    });

    return Array.from(categoryMap.entries()).map(
      ([id, name]) => ({
        id,
        name,
      })
    );
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        !searchValue ||
        product.name.toLowerCase().includes(searchValue) ||
        product.sku?.toLowerCase().includes(searchValue);

      const matchesCategory =
        categoryFilter === "all" ||
        String(product.category?.id) === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  const getImageUrl = (thumbnail?: string | null) => {
    if (!thumbnail) {
      return "/images/placeholder.png";
    }

    if (thumbnail.startsWith("http")) {
      return thumbnail;
    }

    return `http://localhost:5000/uploads/products/${thumbnail}`;
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] p-6 lg:p-8">

      {/* HEADER */}

      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-100">
              <Package
                size={22}
                className="text-orange-600"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Products
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage your Balmitra product catalogue
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={openAddProduct}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C67C2E] px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#A7641E]"
        >
          <Plus size={18} />
          Add Product
        </button>

      </div>

      {/* SUMMARY CARDS */}

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Products
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {products.length}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Active Products
          </p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {
              products.filter(
                (product) => product.isActive !== false
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Out of Stock
          </p>

          <p className="mt-2 text-2xl font-bold text-red-500">
            {
              products.filter(
                (product) => product.stock <= 0
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Categories
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {categories.length}
          </p>
        </div>

      </div>

      {/* FILTER BAR */}

      <div className="mb-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">

        <div className="flex flex-col gap-3 md:flex-row">

          {/* SEARCH */}

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search products by name or SKU..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-orange-400 focus:bg-white"
            />

          </div>

          {/* CATEGORY */}

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
            className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none focus:border-orange-400"
          >

            <option value="all">
              All Categories
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

      </div>

      {/* PRODUCT TABLE */}

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[950px]">

            <thead className="border-b border-gray-100 bg-gray-50">

              <tr>
                <th className="p-4 text-left">Image</th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Product
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Category
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Subcategory
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Price
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Stock
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {loading ? (

                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-16 text-center text-gray-500"
                  >
                    Loading products...
                  </td>
                </tr>

              ) : filteredProducts.length === 0 ? (

                <tr>
                  <td
                    colSpan={7}
                    className="px-5 py-16 text-center"
                  >

                    <Package
                      size={36}
                      className="mx-auto text-gray-300"
                    />

                    <p className="mt-3 font-medium text-gray-700">
                      No products found
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      Try changing your search or filters.
                    </p>

                  </td>
                </tr>

              ) : (

                filteredProducts.map((product) => {

                  const price =
                    Number(product.price);

                  const discountPrice =
                    product.discountPrice !== null &&
                    product.discountPrice !== undefined
                      ? Number(product.discountPrice)
                      : null;

                  const isOutOfStock =
                    product.stock <= 0;

                  const isActive =
                    product.isActive !== false;

                  return (

                    <tr
                      key={product.id}
                      className="border-b border-gray-100 last:border-0 hover:bg-gray-50/70"
                    >

                      {/* PRODUCT */}

                      <td className="px-5 py-4">

                        <div className="flex items-center gap-4">

                          <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-[#F7F5F1]">

                            <img
                              src={getImageUrl(
                                product.thumbnail
                              )}
                              alt={product.name}
                              className="h-full w-full object-contain p-1"
                            />

                          </div>

                          <div className="min-w-0">

                            <p className="max-w-[240px] truncate font-semibold text-gray-900">
                              {product.name}
                            </p>

                            {product.sku && (
                              <p className="mt-1 text-xs text-gray-400">
                                SKU: {product.sku}
                              </p>
                            )}

                          </div>

                        </div>

                      </td>

                      {/* CATEGORY */}

                      <td className="px-5 py-4">

                        <span className="rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700">
                          {product.category?.name ||
                            "—"}
                        </span>

                      </td>

                      {/* SUBCATEGORY */}

                      <td className="px-5 py-4">

                        <span className="text-sm text-gray-600">
                          {product.subcategory?.name ||
                            "—"}
                        </span>

                      </td>

                      {/* PRICE */}

                      <td className="px-5 py-4">

                        <div>

                          {discountPrice !== null && (
                            <p className="text-xs text-gray-400 line-through">
                              ₹{price.toFixed(2)}
                            </p>
                          )}

                          <p className="font-semibold text-gray-900">
                            ₹
                            {(discountPrice ??
                              price
                            ).toFixed(2)}
                          </p>

                        </div>

                      </td>

                      {/* STOCK */}

                      <td className="px-5 py-4">

                        <span
                          className={
                            isOutOfStock
                              ? "text-sm font-semibold text-red-500"
                              : product.stock <= 5
                              ? "text-sm font-semibold text-orange-500"
                              : "text-sm font-semibold text-gray-700"
                          }
                        >
                          {product.stock}
                        </span>

                      </td>

                      {/* STATUS */}

                      <td className="px-5 py-4">

                        <span
                          className={
                            isActive
                              ? "inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700"
                              : "inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500"
                          }
                        >
                          {isActive
                            ? "Active"
                            : "Inactive"}
                        </span>

                      </td>

                      {/* ACTIONS */}

                      <td className="px-5 py-4">

                        <div className="flex items-center justify-center gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              openEditProduct(product)
                            }
                            title="Edit product"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(product.id)
                            }
                            title="Delete product"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </button>

                        </div>

                      </td>

                    </tr>

                  );
                })

              )}

            </tbody>

          </table>

        </div>

        {/* TABLE FOOTER */}

        {!loading && products.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50 px-5 py-3">

            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {filteredProducts.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {products.length}
              </span>{" "}
              products
            </p>

          </div>
        )}

      </div>

      {/* PRODUCT FORM MODAL */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

          <div className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* CLOSE BUTTON */}

            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="absolute right-5 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200 hover:text-gray-800"
            >
              <X size={18} />
            </button>

            <ProductForm
              product={selectedProduct}
              onClose={() => setShowForm(false)}
              onSuccess={loadProducts}
            />

          </div>

        </div>

      )}

    </div>
  );
}