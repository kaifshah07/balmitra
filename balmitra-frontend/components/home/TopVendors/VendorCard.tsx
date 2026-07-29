import Image from "next/image";
import { ArrowRight, BadgeCheck, Star } from "lucide-react";

type Vendor = {
  id: number;
  name: string;
  category: string;
  rating: number;
  products: number;
  image: string;
};

interface VendorCardProps {
  vendor: Vendor;
}

export default function VendorCard({
  vendor,
}: VendorCardProps) {
  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">

      {/* Banner */}

      <div className="h-24 bg-gradient-to-r from-[#0B1220] to-[#1E293B]" />

      {/* Avatar */}

      <div className="-mt-10 flex justify-center">
        <Image
          src={vendor.image}
          alt={vendor.name}
          width={80}
          height={80}
          className="rounded-full border-4 border-white bg-white object-cover"
        />
      </div>

      {/* Content */}

      <div className="p-5 text-center">

        <div className="flex items-center justify-center gap-1">

          <h3 className="text-lg font-semibold text-[#0B1220]">
            {vendor.name}
          </h3>

          <BadgeCheck
            size={18}
            className="text-blue-600"
          />

        </div>

        <p className="mt-2 text-sm text-gray-500">
          {vendor.category}
        </p>

        <div className="mt-4 flex items-center justify-center gap-4 text-sm">

          <div className="flex items-center gap-1">

            <Star
              size={15}
              fill="#D4A017"
              stroke="#D4A017"
            />

            <span>{vendor.rating}</span>

          </div>

          <span className="text-gray-300">|</span>

          <span className="text-gray-600">
            {vendor.products} Products
          </span>

        </div>

        <button className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#0B1220] px-5 py-2 text-sm font-medium text-[#0B1220] transition hover:bg-[#0B1220] hover:text-white">

          Visit Store

          <ArrowRight size={16} />

        </button>

      </div>
    </div>
  );
}