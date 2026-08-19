"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { productImageUrl } from "@/lib/api";

type Product = {
  id: number;
  name: string;
  price: number | string;
  discountPrice?: number | string | null;
  thumbnail?: string | null;
  category?: {
    id: number;
    name: string;
    slug: string;
  } | null;
};

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const imageUrl = productImageUrl(product.thumbnail);

  const displayPrice =
    product.discountPrice !== null &&
    product.discountPrice !== undefined
      ? Number(product.discountPrice)
      : Number(product.price);

  return (
    <div className="group overflow-hidden rounded-[28px] border border-orange-100/70 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl">

      {/* IMAGE */}

      <div className="relative flex h-64 items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFF8EF] via-[#F7F5F1] to-[#F1E9DE]">

        <button
          type="button"
          className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow-sm transition hover:text-[#C67C2E]"
        >
          <Heart size={17} />
        </button>

        <Link
          href={`/products/${product.id}`}
          className="flex h-full w-full items-center justify-center"
        >
          <Image
            src={imageUrl}
            alt={product.name}
            width={250}
            height={250}
            unoptimized
            className="h-52 w-52 object-contain drop-shadow-xl transition duration-500 group-hover:scale-110"
          />
        </Link>

      </div>

      {/* CONTENT */}

      <div className="p-5">

        <div className="mb-3 flex items-center gap-1">

          <Star
            size={15}
            fill="#D4AF37"
            stroke="#D4AF37"
          />

          <span className="text-sm font-medium text-gray-600">
            Curated pick
          </span>

        </div>

        <Link href={`/products/${product.id}`}>

          <h3 className="line-clamp-1 text-lg font-bold text-[#0B1220] hover:text-[#C67C2E]">
            {product.name}
          </h3>

        </Link>

        <p className="mt-1 text-sm text-gray-500">
          {product.category?.name || "Product"}
        </p>

        <div className="mt-5 flex items-center justify-between">

          <div>

            {product.discountPrice !== null &&
              product.discountPrice !== undefined && (
                <span className="mr-2 text-sm text-gray-400 line-through">
                  ₹{Number(product.price).toFixed(2)}
                </span>
              )}

            <span className="text-lg font-bold text-[#C67C2E]">
              ₹{displayPrice.toFixed(2)}
            </span>

          </div>

          <Link
            href={`/products/${product.id}`}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C67C2E] text-white transition hover:scale-110 hover:bg-[#A7641E]"
          >
            <ShoppingCart size={18} />
          </Link>

        </div>

      </div>

    </div>
  );
}
