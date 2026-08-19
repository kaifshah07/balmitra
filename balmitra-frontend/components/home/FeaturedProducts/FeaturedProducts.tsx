"use client";

import Container from "@/components/ui/container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import ProductCard from "./ProductCard";
import { getPublicProducts } from "@/app/admin/services/api/products";

type Product = React.ComponentProps<typeof ProductCard>["product"];

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    getPublicProducts()
      .then((data) => setProducts(data.slice(0, 4)))
      .catch(() => setProducts([]));
  }, []);

  return (
    <section className="bg-[#FCFBF8] py-16 lg:py-20">

      <Container>


        {/* Header */}

        <div className="mb-10 flex items-end justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C67C2E]">
              Featured Collection
            </p>


            <h2 className="mt-3 text-4xl font-black text-[#0B1220]">
              Popular Picks
            </h2>


            <p className="mt-3 max-w-xl text-gray-500">
              Discover our most loved gifts and toys,
              thoughtfully selected to create memorable moments.
            </p>

          </div>



          <Link
            href="/customer/products"
            className="hidden items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-[#0B1220] transition hover:border-[#C67C2E] hover:text-[#C67C2E] md:flex"
          >

            View All

            <ArrowRight size={18} />

          </Link>


        </div>




        {/* Products */}

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">

          {products.map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

        </div>

        {!products.length && (
          <p className="mt-6 text-center text-sm text-gray-500">
            No products are available yet. Add and publish products from the admin dashboard.
          </p>
        )}


      </Container>

    </section>
  );
}
