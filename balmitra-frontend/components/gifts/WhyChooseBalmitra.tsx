"use client";

import {
  Gift,
  ShieldCheck,
  Truck,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Gift,
    title: "Thoughtfully Curated",
    description:
      "Every product is handpicked to make every celebration meaningful and memorable.",
  },
  {
    icon: ShieldCheck,
    title: "Premium Quality",
    description:
      "Crafted with quality materials and beautiful finishing for every occasion.",
  },
  {
    icon: Truck,
    title: "Safe Delivery",
    description:
      "Carefully packed and securely delivered with attention to every detail.",
  },
  {
    icon: HeartHandshake,
    title: "Made with Care",
    description:
      "Designed to spread happiness, celebrate relationships, and create lasting memories.",
  },
];

export default function WhyChooseBalmitra() {
  return (
    <>
      {/* WHY CHOOSE */}
      <section className="bg-[#F8F9FC] py-16">
        <div className="container mx-auto px-6">

          <div className="mb-16 text-center">

            <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#FE7C02]">
              Why Balmitra
            </span>

            <h2 className="mt-4 text-4xl font-black text-[#111827] md:text-5xl">
              Crafted to Make Every Gift Special
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-500">
              More than gifts, we create memorable experiences with premium
              craftsmanship, thoughtful curation, and reliable service.
            </p>

          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="group rounded-[30px] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                >
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF4E9] transition-all duration-300 group-hover:bg-[#C67C2E]">

                    <Icon
                      size={30}
                      className="text-[#FE7C02] transition-all duration-300 group-hover:text-white"
                    />

                  </div>

                  <h3 className="mt-8 text-2xl font-bold text-[#111827]">
                    {feature.title}
                  </h3>

                  <p className="mt-4 leading-7 text-gray-500">
                    {feature.description}
                  </p>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PREMIUM CTA */}

      <section className="py-16">
        <div className="container mx-auto px-6">

          <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-[#FE7C02] to-[#F59E0B] px-10 py-20 text-center shadow-2xl">

            <h2 className="text-4xl font-black text-white md:text-5xl">
              Find the Perfect Gift Today
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90">
              Explore our premium collection of thoughtfully curated gifts
              designed to celebrate every special moment with elegance and joy.
            </p>

            <Link
              href="/products"
              className="mt-10 inline-flex items-center rounded-full bg-[#FCFBF8] px-8 py-4 font-semibold text-[#111827] transition hover:scale-105"
            >
              Explore Gifts

              <ArrowRight className="ml-2" />
            </Link>

          </div>

        </div>
      </section>
    </>
  );
}