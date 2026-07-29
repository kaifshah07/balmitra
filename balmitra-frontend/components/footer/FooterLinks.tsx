"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

export default function FooterLinks() {
  return (
    <footer className="bg-[#FCFBF8]">

      <div className="container mx-auto px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}

          <div>

            <h2 className="text-3xl font-black text-[#0B1220]">
              Balmitra
            </h2>

            <p className="mt-5 leading-8 text-gray-500">
              Creating joyful childhood memories with thoughtfully
              curated gifts and educational toys designed to inspire,
              learn and celebrate every special moment.
            </p>

            <div className="mt-8 flex gap-4">

              {[FaFacebookF, FaInstagram, FaLinkedinIn].map((Icon, index) => (

                <button
                  key={index}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#E8DED2] transition hover:border-[#C67C2E] hover:bg-[#C67C2E] hover:text-white"
                >
                  <Icon size={18} />
                </button>

              ))}

            </div>

          </div>

          {/* Shop */}

          <div>

            <h3 className="text-lg font-bold text-[#0B1220]">
              Shop
            </h3>

            <div className="mt-5 space-y-4">

              <Link href="/public/gifts" className="block text-gray-500 transition hover:text-[#C67C2E]">
                Gifts
              </Link>

              <Link href="/public/toys" className="block text-gray-500 transition hover:text-[#C67C2E]">
                Toys
              </Link>

              <Link href="/products" className="block text-gray-500 transition hover:text-[#C67C2E]">
                New Arrivals
              </Link>

              <Link href="/products" className="block text-gray-500 transition hover:text-[#C67C2E]">
                Best Sellers
              </Link>

            </div>

          </div>

          {/* Quick Links */}

          <div>

            <h3 className="text-lg font-bold text-[#0B1220]">
              Quick Links
            </h3>

            <div className="mt-5 space-y-4">

              <Link href="/about" className="block text-gray-500 hover:text-[#C67C2E]">
                About Us
              </Link>

              <Link href="/contact" className="block text-gray-500 hover:text-[#C67C2E]">
                Contact
              </Link>

              <Link href="/faq" className="block text-gray-500 hover:text-[#C67C2E]">
                FAQs
              </Link>

              <Link href="/privacy-policy" className="block text-gray-500 hover:text-[#C67C2E]">
                Privacy Policy
              </Link>

              <Link href="/terms" className="block text-gray-500 hover:text-[#C67C2E]">
                Terms & Conditions
              </Link>

            </div>

          </div>

          {/* Contact */}

          <div>

            <h3 className="text-lg font-bold text-[#0B1220]">
              Contact
            </h3>

            <div className="mt-5 space-y-5">

              <div className="flex gap-3">

                <Mail className="mt-1 text-[#C67C2E]" size={18} />

                <span className="text-gray-500">
                  hello@balmitra.com
                </span>

              </div>

              <div className="flex gap-3">

                <Phone className="mt-1 text-[#C67C2E]" size={18} />

                <span className="text-gray-500">
                  +91 98765 43210
                </span>

              </div>

              <div className="flex gap-3">

                <MapPin className="mt-1 text-[#C67C2E]" size={18} />

                <span className="text-gray-500">
                  Maharashtra, India
                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="mt-5 border-t border-[#E7DED2] ">

          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row">

            <p className="text-sm text-gray-500">
              © 2026 Balmitra. All rights reserved.
            </p>

            <p className="text-sm text-gray-500">
              Crafted with ❤️ for joyful childhood memories.
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}