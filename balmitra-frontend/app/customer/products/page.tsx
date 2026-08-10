"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, ArrowRight } from "lucide-react";

import { getPublicProducts } from "@/app/admin/services/api/products";

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
  category?: {
    id: number;
    name: string;
    slug: string;
  } | null;
};

export default function CustomerProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      setError("");

      const result = await getPublicProducts();

      setProducts(result || []);
    } catch (error) {
      console.error("Customer Products Error:", error);
      setError("Unable to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function addToCart(product: Product) {
    if (product.stock <= 0) {
      alert("This product is out of stock.");
      return;
    }

    const existingCart = JSON.parse(
      localStorage.getItem("balmitra_cart") || "[]"
    );

    const existingItem = existingCart.find(
      (item: any) => item.productId === product.id
    );

    let updatedCart;

    const price =
      product.discountPrice !== null &&
      product.discountPrice !== undefined
        ? Number(product.discountPrice)
        : Number(product.price);

    if (existingItem) {
      updatedCart = existingCart.map((item: any) =>
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

    window.dispatchEvent(new Event("cartUpdated"));

    alert("Product added to cart");
  }

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6">
        <p className="text-gray-500">
          Loading products...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-6">
        <p className="text-red-500">
          {error}
        </p>

        <button
          onClick={loadProducts}
          className="mt-4 rounded-lg bg-[#C67C2E] px-5 py-2 text-sm font-semibold text-white hover:bg-[#A7641E]"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* PAGE HEADER */}

      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12">

          <p className="text-sm font-semibold uppercase tracking-wider text-[#C67C2E]">
            Balmitra Store
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#0B1220]">
            Explore Products
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500">
            Discover toys, gifts, learning products and more
            from the Balmitra marketplace.
          </p>

        </div>
      </section>

      {/* PRODUCTS */}

      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-8 flex items-center justify-between">

          <div>
            <h2 className="text-2xl font-bold text-[#0B1220]">
              All Products
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {products.length} products available
            </p>
          </div>

          <Link
            href="/customer/cart"
            className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-[#C67C2E] hover:text-[#C67C2E]"
          >
            <ShoppingCart size={17} />
            View Cart
          </Link>

        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
            <p className="text-gray-500">
              No products available right now.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {products.map((product) => {

              const originalPrice = Number(product.price);

              const finalPrice =
                product.discountPrice !== null &&
                product.discountPrice !== undefined
                  ? Number(product.discountPrice)
                  : originalPrice;

              const hasDiscount =
                product.discountPrice !== null &&
                product.discountPrice !== undefined;

              const imageUrl = product.thumbnail
                ? `http://localhost:5000/uploads/products/${product.thumbnail}`
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
                    <div className="relative flex h-64 items-center justify-center overflow-hidden bg-[#F7F5F1]">

                      <Image
                        src={imageUrl}
                        alt={product.name}
                        width={300}
                        height={300}
                        unoptimized
                        className="h-full w-full object-contain p-6 transition duration-300 group-hover:scale-105"
                      />

                      {isOutOfStock && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-red-500">
                            Out of Stock
                          </span>
                        </div>
                      )}

                    </div>
                  </Link>

                  {/* DETAILS */}

                  <div className="p-5">

                    {product.category?.name && (
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#C67C2E]">
                        {product.category.name}
                      </p>
                    )}

                    <Link
                      href={`/products/${product.id}`}
                    >
                      <h3 className="mt-2 line-clamp-2 min-h-[48px] text-lg font-semibold text-[#0B1220] transition hover:text-[#C67C2E]">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="mt-4">

                      {hasDiscount && (
                        <span className="mr-2 text-sm text-gray-400 line-through">
                          ₹{originalPrice.toFixed(2)}
                        </span>
                      )}

                      <span className="text-xl font-bold text-[#C67C2E]">
                        ₹{finalPrice.toFixed(2)}
                      </span>

                    </div>

                    <button
                      type="button"
                      disabled={isOutOfStock}
                      onClick={() => addToCart(product)}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#C67C2E] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#A7641E] disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      <ShoppingCart size={17} />

                      {isOutOfStock
                        ? "Out of Stock"
                        : "Add to Cart"}
                    </button>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* CONTINUE SHOPPING */}

        {products.length > 0 && (
          <div className="mt-12 text-center">

            <Link
              href="/customer/categories"
              className="inline-flex items-center gap-2 font-semibold text-[#C67C2E] hover:underline"
            >
              Explore Categories
              <ArrowRight size={17} />
            </Link>

          </div>
        )}

      </section>

    </div>
  );
}

