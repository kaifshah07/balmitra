"use client";

import Link from "next/link";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] px-6 py-16">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-[#0B1220]">
            Checkout
          </h1>

          <p className="mt-3 text-gray-500">
            Checkout page is currently being configured.
          </p>

          <Link
            href="/customer/cart"
            className="mt-6 inline-block rounded-xl bg-[#C67C2E] px-6 py-3 font-semibold text-white hover:bg-[#A7641E]"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    </main>
  );
}