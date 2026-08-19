"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ShoppingCart,
  SlidersHorizontal,
  X,
} from "lucide-react";

import HeroSlider from "@/components/home/hero/HeroSlider";
import { getPublicProducts } from "@/app/admin/services/api/products";
import { getPublicCategories } from "@/app/admin/services/api/publicCategories";

type Category = {
  id: number;
  name: string;
  slug: string;
};

type Product = {
  id: number;
  name: string;
  slug: string;
  sku: string;
  description?: string | null;
  shortDescription?: string | null;
  price: number | string;
  discountPrice?: number | string | null;
  stock: number;
  thumbnail?: string | null;
  category?: Category | null;
};

export default function CustomerPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [mobileFilterOpen, setMobileFilterOpen] =
    useState(false);

  useEffect(() => {
    loadStore();
  }, []);

  async function loadStore() {
    try {
      setLoading(true);
      setError("");

      const [productsResult, categoriesResult] =
        await Promise.all([
          getPublicProducts(),
          getPublicCategories(),
        ]);

      setProducts(productsResult || []);
      setCategories(categoriesResult || []);
    } catch (error) {
      console.error("Customer Store Error:", error);

      setError(
        "Unable to load the store. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return products;
    }

    return products.filter(
      (product) =>
        product.category?.id === selectedCategory
    );
  }, [products, selectedCategory]);

  function addToCart(product: Product) {
    if (product.stock <= 0) {
      alert("This product is out of stock.");
      return;
    }

    const existingCart = JSON.parse(
      localStorage.getItem("balmitra_cart") || "[]"
    );

    const existingItem = existingCart.find(
      (item: any) =>
        item.productId === product.id
    );

    const price =
      product.discountPrice !== null &&
      product.discountPrice !== undefined
        ? Number(product.discountPrice)
        : Number(product.price);

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map(
        (item: any) =>
          item.productId === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  product.stock
                ),
              }
            : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          productId: product.id,
          name: product.name,
          price,
          quantity: 1,
          thumbnail: product.thumbnail,
          stock: product.stock,
        },
      ];
    }

    localStorage.setItem(
      "balmitra_cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    alert("Product added to cart");
  }

  function selectCategory(id: number | null) {
    setSelectedCategory(id);
    setMobileFilterOpen(false);
  }

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-sm font-medium text-gray-500">
          Loading Balmitra Store...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <p className="text-gray-500">{error}</p>

        <button
          onClick={loadStore}
          className="mt-5 rounded-xl bg-[#C67C2E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#A7641E]"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* HERO */}
      <HeroSlider />

      {/* STORE */}
      <section className="mx-auto max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="mb-8 flex items-center justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#C67C2E]">
              Balmitra Store
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#0B1220] sm:text-4xl">
              Shop Everything
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Discover toys, gifts, learning products and more.
            </p>
          </div>

          {/* MOBILE FILTER */}
          <button
            onClick={() =>
              setMobileFilterOpen(true)
            }
            className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm lg:hidden"
          >
            <SlidersHorizontal size={17} />
            Filters
          </button>

        </div>

        <div className="grid gap-8 lg:grid-cols-[230px_1fr]">

          {/* DESKTOP SIDEBAR */}
          <aside className="hidden lg:block">

            <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">

              <h2 className="text-base font-bold text-[#0B1220]">
                Categories
              </h2>

              <div className="mt-5 space-y-1">

                <button
                  onClick={() =>
                    selectCategory(null)
                  }
                  className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                    selectedCategory === null
                      ? "bg-[#C67C2E] text-white"
                      : "text-gray-600 hover:bg-[#F7F5F1] hover:text-[#C67C2E]"
                  }`}
                >
                  All Products
                </button>

                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() =>
                      selectCategory(category.id)
                    }
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium transition ${
                      selectedCategory === category.id
                        ? "bg-[#C67C2E] text-white"
                        : "text-gray-600 hover:bg-[#F7F5F1] hover:text-[#C67C2E]"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}

              </div>

            </div>

          </aside>

          {/* PRODUCTS */}
          <div>

            {/* PRODUCT TOP BAR */}
            <div className="mb-5 flex items-center justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-800">
                    {filteredProducts.length}
                  </span>{" "}
                  products
                </p>
              </div>

              {selectedCategory && (
                <button
                  onClick={() =>
                    selectCategory(null)
                  }
                  className="hidden items-center gap-1.5 text-sm font-medium text-[#C67C2E] sm:flex"
                >
                  Clear filter
                  <X size={15} />
                </button>
              )}

            </div>

            {filteredProducts.length === 0 ? (
              <div className="rounded-2xl border border-gray-100 bg-white py-20 text-center">

                <p className="font-medium text-gray-600">
                  No products found.
                </p>

                <button
                  onClick={() =>
                    selectCategory(null)
                  }
                  className="mt-4 text-sm font-semibold text-[#C67C2E]"
                >
                  View all products
                </button>

              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

                {filteredProducts.map(
                  (product) => {

                    const originalPrice =
                      Number(product.price);

                    const finalPrice =
                      product.discountPrice !== null &&
                      product.discountPrice !== undefined
                        ? Number(
                            product.discountPrice
                          )
                        : originalPrice;

                    const hasDiscount =
                      product.discountPrice !== null &&
                      product.discountPrice !== undefined;

                    const imageUrl =
                      product.thumbnail
                        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/products/${product.thumbnail}`
                        : "/images/placeholder.png";

                    const isOutOfStock =
                      product.stock <= 0;

                    return (
                      <div
                        key={product.id}
                        className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                      >

                        {/* IMAGE */}
                        <Link
                          href={`/products/${product.id}`}
                          className="block"
                        >
                          <div className="relative flex h-60 items-center justify-center overflow-hidden bg-[#F7F5F1]">

                            <Image
                              src={imageUrl}
                              alt={product.name}
                              width={300}
                              height={300}
                              unoptimized
                              className="h-full w-full object-contain p-5 transition duration-300 group-hover:scale-105"
                            />

                            {isOutOfStock && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                <span className="rounded-full bg-white px-4 py-2 text-xs font-semibold text-red-500">
                                  Out of Stock
                                </span>
                              </div>
                            )}

                          </div>
                        </Link>

                        {/* DETAILS */}
                        <div className="p-5">

                          {product.category?.name && (
                            <p className="text-[11px] font-bold uppercase tracking-wider text-[#C67C2E]">
                              {product.category.name}
                            </p>
                          )}

                          <Link
                            href={`/products/${product.id}`}
                          >
                            <h3 className="mt-2 line-clamp-2 min-h-[44px] text-base font-semibold text-[#0B1220] transition hover:text-[#C67C2E]">
                              {product.name}
                            </h3>
                          </Link>

                          <div className="mt-3">

                            {hasDiscount && (
                              <span className="mr-2 text-sm text-gray-400 line-through">
                                ₹
                                {originalPrice.toFixed(
                                  2
                                )}
                              </span>
                            )}

                            <span className="text-lg font-bold text-[#C67C2E]">
                              ₹
                              {finalPrice.toFixed(
                                2
                              )}
                            </span>

                          </div>

                          <button
                            type="button"
                            disabled={isOutOfStock}
                            onClick={() =>
                              addToCart(product)
                            }
                            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C67C2E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#A7641E] disabled:cursor-not-allowed disabled:bg-gray-300"
                          >
                            <ShoppingCart
                              size={16}
                            />

                            {isOutOfStock
                              ? "Out of Stock"
                              : "Add to Cart"}
                          </button>

                        </div>

                      </div>
                    );
                  }
                )}

              </div>
            )}

          </div>

        </div>

      </section>

      {/* MOBILE FILTER DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">

          <div
            className="absolute inset-0 bg-black/40"
            onClick={() =>
              setMobileFilterOpen(false)
            }
          />

          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white p-6 shadow-xl">

            <div className="flex items-center justify-between">

              <h2 className="text-lg font-bold text-[#0B1220]">
                Categories
              </h2>

              <button
                onClick={() =>
                  setMobileFilterOpen(false)
                }
                className="rounded-lg p-2 hover:bg-gray-100"
              >
                <X size={20} />
              </button>

            </div>

            <div className="mt-6 space-y-1">

              <button
                onClick={() =>
                  selectCategory(null)
                }
                className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium ${
                  selectedCategory === null
                    ? "bg-[#C67C2E] text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                All Products
              </button>

              {categories.map(
                (category) => (
                  <button
                    key={category.id}
                    onClick={() =>
                      selectCategory(
                        category.id
                      )
                    }
                    className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium ${
                      selectedCategory ===
                      category.id
                        ? "bg-[#C67C2E] text-white"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {category.name}
                  </button>
                )
              )}

            </div>

          </div>

        </div>
      )}

    </div>
  );
}