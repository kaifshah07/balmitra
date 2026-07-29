import Container from "@/components/ui/container";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "./categoryData";

export default function Categories() {
  return (
    <section className="py-12">
      <Container>
        {/* Heading */}
        <div className="mb-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#D4A017]">
            Our Collections
          </p>

          <h2 className="mt-3 text-3xl font-black text-[#0B1220] md:text-4xl">
            Curated for Every Special Moment
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-gray-500">
            Explore our thoughtfully curated collections of premium Gifts and
            Toys, crafted to inspire joy and create unforgettable memories for
            every celebration.
          </p>
        </div>

        {/* Category Cards */}
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-2">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.name}
                href={category.href}
                className="group rounded-3xl border border-[#F3F3F3] bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF4E6] transition-all duration-300 group-hover:bg-[#FE7C02]">
                  <Icon
                    size={34}
                    className="text-[#FE7C02] transition-all duration-300 group-hover:text-white"
                  />
                </div>

                <h3 className="text-2xl font-bold text-[#0B1220]">
                  {category.name}
                </h3>

                <p className="mt-3 leading-7 text-gray-500">
                  {category.products}
                </p>

                <div className="mt-8 flex items-center font-semibold text-[#FE7C02]">
                  Explore Collection
                  <ArrowRight
                    size={18}
                    className="ml-2 transition-transform duration-300 group-hover:translate-x-2"
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}