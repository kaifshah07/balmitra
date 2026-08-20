"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getCategories } from "@/app/admin/services/api/categories";

type Category = {
id: number;
name: string;
slug: string;
description?: string | null;
image?: string | null;
displayOrder?: number;
};

export default function CustomerCategoriesPage() {
const [categories, setCategories] = useState<Category[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
loadCategories();
}, []);

async function loadCategories() {
try {
setLoading(true);
setError("");


  const data = await getCategories();

  setCategories(data || []);
} catch (err) {
  console.error("Load Categories Error:", err);
  setError("Unable to load categories.");
} finally {
  setLoading(false);
}


}

function getImageUrl(image?: string | null) {
if (!image) {
return "/images/placeholder.png";
}


if (image.startsWith("http")) {
  return image;
}

return `https://balmitra.onrender.com/uploads/categories/${image}`;
}

if (loading) {
return ( <main className="min-h-screen bg-[#FAFAF8]"> <div className="mx-auto max-w-7xl px-6 py-16"> <div className="animate-pulse"> <div className="h-8 w-64 rounded bg-gray-200" /> <div className="mt-3 h-4 w-96 max-w-full rounded bg-gray-200" />


        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl bg-white shadow-sm"
            >
              <div className="h-52 bg-gray-200" />

              <div className="p-5">
                <div className="h-5 w-32 rounded bg-gray-200" />
                <div className="mt-3 h-4 w-full rounded bg-gray-200" />
                <div className="mt-2 h-4 w-3/4 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </main>
);


}

if (error) {
return ( <main className="min-h-screen bg-[#FAFAF8]"> <div className="mx-auto max-w-7xl px-6 py-20 text-center"> <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm"> <div className="text-4xl">⚠️</div>


        <h1 className="mt-4 text-2xl font-bold text-[#0B1220]">
          Unable to load categories
        </h1>

        <p className="mt-2 text-gray-500">
          Something went wrong while loading the categories.
        </p>

        <button
          type="button"
          onClick={loadCategories}
          className="mt-6 rounded-lg bg-[#C67C2E] px-6 py-3 font-semibold text-white transition hover:bg-[#A7641E]"
        >
          Try Again
        </button>
      </div>
    </div>
  </main>
);


}

if (!categories.length) {
return ( <main className="min-h-screen bg-[#FAFAF8]"> <div className="mx-auto max-w-7xl px-6 py-20 text-center"> <div className="text-5xl">📦</div>


      <h1 className="mt-5 text-2xl font-bold text-[#0B1220]">
        No Categories Available
      </h1>

      <p className="mt-2 text-gray-500">
        Categories will appear here once they are added.
      </p>

      <Link
        href="/customer"
        className="mt-6 inline-block rounded-lg bg-[#C67C2E] px-6 py-3 font-semibold text-white transition hover:bg-[#A7641E]"
      >
        Back to Home
      </Link>
    </div>
  </main>
);


}

return ( <main className="min-h-screen bg-[#FAFAF8]">
{/* Header */} <section className="border-b border-gray-100 bg-white"> <div className="mx-auto max-w-7xl px-6 py-14"> <p className="text-sm font-semibold uppercase tracking-wider text-[#C67C2E]">
Shop by category </p>


      <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#0B1220]">
        Explore Categories
      </h1>

      <p className="mt-3 max-w-2xl text-gray-500">
        Find the perfect products for every occasion, interest, and
        little moment of joy.
      </p>
    </div>
  </section>

  {/* Categories */}
  <section className="mx-auto max-w-7xl px-6 py-12">
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/customer/products?category=${category.id}`}
          className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
          {/* Image */}
          <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[#F7F5F1]">
            <Image
              src={getImageUrl(category.image)}
              alt={category.name}
              width={400}
              height={300}
              unoptimized
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/5" />
          </div>

          {/* Content */}
          <div className="p-5">
            <h2 className="text-xl font-bold text-[#0B1220] transition group-hover:text-[#C67C2E]">
              {category.name}
            </h2>

            <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
              {category.description ||
                `Explore our ${category.name.toLowerCase()} collection.`}
            </p>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-[#C67C2E]">
                Explore Products
              </span>

              <span className="text-lg text-gray-400 transition group-hover:translate-x-1 group-hover:text-[#C67C2E]">
                →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </section>
</main>


);
}
