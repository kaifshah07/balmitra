"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingCart, Minus, Plus } from "lucide-react";
import { API_URL, productImageUrl } from "@/lib/api";

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

export default function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProduct();
  }, []);

  async function loadProduct() {
    try {
      const { id } = await params;

      const response = await fetch(
        `${API_URL}/products/${id}`
      );

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.message || "Product not found");
      }

      setProduct(result.data);
    } catch (err) {
      console.error(err);
      setError("Unable to load product");
    } finally {
      setLoading(false);
    }
  }

  function increaseQuantity() {
    if (!product) return;

    if (quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    }
  }

  function decreaseQuantity() {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  }

  function addToCart() {
    if (!product) return;

    const existingCart = JSON.parse(
      localStorage.getItem("balmitra_cart") || "[]"
    );

    const existingItem = existingCart.find(
      (item: any) => item.productId === product.id
    );

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item: any) =>
        item.productId === product.id
          ? {
              ...item,
              quantity: Math.min(
                item.quantity + quantity,
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
          price:
            product.discountPrice !== null &&
            product.discountPrice !== undefined
              ? Number(product.discountPrice)
              : Number(product.price),
          quantity,
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
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">
          Product not found
        </h1>

        <Link
          href="/"
          className="text-[#C67C2E]"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  const imageUrl = productImageUrl(product.thumbnail);

  const originalPrice = Number(product.price);

  const finalPrice =
    product.discountPrice !== null &&
    product.discountPrice !== undefined
      ? Number(product.discountPrice)
      : originalPrice;

  const isOutOfStock = product.stock <= 0;

  return (
    <main className="min-h-screen bg-[#FAFAF8] py-12">

      <div className="mx-auto max-w-7xl px-6">

        {/* Back */}

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#C67C2E]"
        >
          <ArrowLeft size={18} />
          Back to products
        </Link>


        <div className="grid gap-12 rounded-3xl bg-white p-8 shadow-sm md:grid-cols-2">

          {/* IMAGE */}

          <div className="flex min-h-[500px] items-center justify-center rounded-2xl bg-[#F7F5F1]">

            <Image
              src={imageUrl}
              alt={product.name}
              width={500}
              height={500}
              unoptimized
              className="max-h-[450px] w-auto object-contain"
            />

          </div>


          {/* DETAILS */}

          <div className="flex flex-col justify-center">

            <p className="mb-3 text-sm uppercase tracking-wider text-[#C67C2E]">
              {product.category?.name || "Product"}
            </p>

            <h1 className="text-4xl font-bold text-[#0B1220]">
              {product.name}
            </h1>

            <p className="mt-3 text-sm text-gray-500">
              SKU: {product.sku}
            </p>


            {/* PRICE */}

            <div className="mt-6">

              {product.discountPrice !== null &&
                product.discountPrice !== undefined && (
                  <span className="mr-3 text-lg text-gray-400 line-through">
                    ₹{originalPrice.toFixed(2)}
                  </span>
                )}

              <span className="text-3xl font-bold text-[#C67C2E]">
                ₹{finalPrice.toFixed(2)}
              </span>

            </div>


            {/* DESCRIPTION */}

            <p className="mt-6 leading-7 text-gray-600">
              {product.description ||
                product.shortDescription ||
                "A wonderful product for kids."}
            </p>


            {/* STOCK */}

            <div className="mt-6">

              {isOutOfStock ? (
                <span className="font-semibold text-red-500">
                  Out of stock
                </span>
              ) : (
                <span className="font-semibold text-green-600">
                  {product.stock} items available
                </span>
              )}

            </div>


            {/* QUANTITY */}

            {!isOutOfStock && (
              <div className="mt-6 flex items-center gap-4">

                <span className="font-medium">
                  Quantity
                </span>

                <div className="flex items-center overflow-hidden rounded-lg border">

                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    className="p-3 hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="min-w-12 text-center">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    className="p-3 hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>

                </div>

              </div>
            )}


            {/* ADD CART */}

            <button
              type="button"
              disabled={isOutOfStock}
              onClick={addToCart}
              className="mt-8 flex w-full items-center justify-center gap-3 rounded-xl bg-[#C67C2E] px-6 py-4 font-semibold text-white transition hover:bg-[#A7641E] disabled:cursor-not-allowed disabled:bg-gray-300"
            >

              <ShoppingCart size={20} />

              {isOutOfStock
                ? "Out of Stock"
                : "Add to Cart"}

            </button>


            {/* BUY NOW */}

            {!isOutOfStock && (
              <Link
  href="/checkout"
  onClick={addToCart}
  className="mt-3 flex w-full items-center justify-center rounded-xl border border-[#C67C2E] px-6 py-4 font-semibold text-[#C67C2E] transition hover:bg-orange-50"
>
  Buy Now
</Link>
            )}

          </div>

        </div>

      </div>

    </main>
  );
}
