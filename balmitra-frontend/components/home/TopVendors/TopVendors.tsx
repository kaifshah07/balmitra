import Container from "@/components/ui/container";
import { ArrowRight } from "lucide-react";

import VendorCard from "./VendorCard";
import { vendors } from "./vendorData";

export default function TopVendors() {
  return (
    <section className="py-10">
      <Container>

        <div className="mb-8 flex items-center justify-between">

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-[#D4A017]">
              Trusted Sellers
            </p>

            <h2 className="mt-2 text-2xl font-black text-[#0B1220]">
              Top Vendors
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Shop confidently from our highest-rated vendors.
            </p>

          </div>

          <button className="hidden items-center gap-2 text-sm font-semibold text-[#0B1220] transition hover:gap-3 md:flex">

            View All

            <ArrowRight size={18} />

          </button>

        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {vendors.map((vendor) => (

            <VendorCard
              key={vendor.id}
              vendor={vendor}
            />

          ))}

        </div>

      </Container>
    </section>
  );
}