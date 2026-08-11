"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number | null;
  stock: number;
  thumbnail?: string | null;
};

export default function CustomerProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `http://localhost:5000/api/products/${params.id}`
        );

        if (!response.ok) {
          throw new Error("Unable to load product");
        }

        const result = await response.json();

        setProduct(result.data);
      } catch (error) {
        console.error("Product Details Error:", error);
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    }

    if (params.id) {
      loadProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-bold text-[#0B1220]">
          Product not found
        </h1>

        <p className="mt-2 text-gray-500">
          We couldn't find the product you're looking for.
        </p>

        <Link
          href="/customer/products"
          className="mt-6 rounded-xl bg-[#C67C2E] px-6 py-3 font-semibold text-white"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  const displayPrice =
    product.discountPrice ?? product.price;

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <div className="mx-auto max-w-7xl px-6 py-12">

        <button
          onClick={() => router.back()}
          className="mb-8 text-sm font-medium text-gray-600 hover:text-[#C67C2E]"
        >
          ← Back
        </button>

        <div className="grid gap-10 rounded-3xl bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">

          {/* Product Image */}
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl bg-[#F7F5F1] p-8">
            {product.thumbnail ? (
              <Image
                src={product.thumbnail}
                alt={product.name}
                width={500}
                height={500}
                className="max-h-[450px] w-auto object-contain"
              />
            ) : (
              <div className="text-gray-400">
                No image available
              </div>
            )}
          </div>

          {/* Product Information */}
          <div className="flex flex-col justify-center">

            <h1 className="text-3xl font-bold text-[#0B1220] md:text-4xl">
              {product.name}
            </h1>

            {product.description && (
              <p className="mt-5 leading-7 text-gray-500">
                {product.description}
              </p>
            )}

            <div className="mt-8">

              <p className="text-3xl font-bold text-[#C67C2E]">
                ₹{displayPrice}
              </p>

              {product.discountPrice && (
                <p className="mt-1 text-sm text-gray-400 line-through">
                  ₹{product.price}
                </p>
              )}

            </div>

            <div className="mt-6">
              {product.stock > 0 ? (
                <p className="text-sm font-medium text-green-600">
                  ✓ In Stock
                </p>
              ) : (
                <p className="text-sm font-medium text-red-500">
                  Out of Stock
                </p>
              )}
            </div>

            <button
              disabled={product.stock <= 0}
              className="mt-8 rounded-xl bg-[#C67C2E] px-8 py-4 font-semibold text-white transition hover:bg-[#A7641E] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              Add to Cart
            </button>

          </div>

        </div>
      </div>
    </main>
  );
}