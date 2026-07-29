"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    title: "Birthday Collection",
    description: "Thoughtfully curated gifts for birthdays.",
    image: "/images/gifts/birthday.png",
  },
  {
    title: "Anniversary Collection",
    description: "Elegant gifts for celebrating love.",
    image: "/images/gifts/anniversary.png",
  },
  {
    title: "Festival Collection",
    description: "Celebrate every festival with premium gifts.",
    image: "/images/gifts/festival.png",
  },
];

export default function FeaturedCollections() {
  return (
    <section
      id="featured"
      className="py-16 bg-[#FCFBF8]"
    >
      <div className="container mx-auto px-6">

        <div className="text-center mb-16">

          <span className="text-sm uppercase tracking-[0.35em] text-[#C67C2E] font-semibold">
            Featured
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#1E1E1E]">
            Curated Gift Collections
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg text-[#6B7280] leading-8">
            Discover beautifully crafted collections designed for life's most
            memorable occasions.
          </p>

        </div>

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Large Card */}

          <div className="group relative overflow-hidden rounded-[30px] lg:col-span-2">

            <div className="relative h-[500px]">

              <Image
                src={collections[0].image}
                alt={collections[0].title}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"/>

              <div className="absolute bottom-10 left-10 max-w-lg">

                <h3 className="text-4xl font-bold text-white">
                  {collections[0].title}
                </h3>

                <p className="mt-4 text-white/90 leading-8">
                  {collections[0].description}
                </p>

                <div className="mt-8 inline-flex items-center rounded-full bg-white px-6 py-3 font-semibold text-[#111827] transition group-hover:bg-[#C67C2E] group-hover:text-white">

                  Explore Collection

                  <ArrowRight className="ml-2"/>

                </div>

              </div>

            </div>

          </div>

          {/* Right Side */}

          <div className="flex flex-col gap-8">

            {collections.slice(1).map((item) => (

              <div
                
                key={item.title}
                className="group overflow-hidden rounded-[30px] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.08)]"
              >

                <div className="relative h-60">

                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>

                  <div className="absolute bottom-6 left-6">

                    <h3 className="text-2xl font-bold text-white">
                      {item.title}
                    </h3>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>
    </section>
  );
}