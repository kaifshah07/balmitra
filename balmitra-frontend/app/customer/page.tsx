"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function CustomerPage() {
  const [customer, setCustomer] = useState<any>(null);

  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");

    if (storedCustomer) {
      try {
        setCustomer(JSON.parse(storedCustomer));
      } catch {
        localStorage.removeItem("customer");
      }
    }
  }, []);

  return (
    <div>

      {/* Welcome Section */}
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14">

          <p className="text-sm font-semibold uppercase tracking-wider text-[#C67C2E]">
            Welcome back
          </p>

          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#0B1220]">
            Hello{customer?.name ? `, ${customer.name}` : ""} 👋
          </h1>

          <p className="mt-3 max-w-xl text-gray-500">
            Discover products, explore categories, and manage
            your Balmitra orders from one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              href="/customer/products"
              className="rounded-lg bg-[#C67C2E] px-6 py-3 font-semibold text-white transition hover:bg-[#A7641E]"
            >
              Shop Products
            </Link>

            <Link
              href="/customer/orders"
              className="rounded-lg border border-gray-200 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:border-[#C67C2E] hover:text-[#C67C2E]"
            >
              View My Orders
            </Link>

          </div>

        </div>
      </section>

      {/* Quick Actions */}
      <section className="mx-auto max-w-7xl px-6 py-12">

        <h2 className="text-2xl font-bold text-[#0B1220]">
          Your Shopping
        </h2>

        <p className="mt-2 text-gray-500">
          Everything you need to manage your Balmitra experience.
        </p>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <Link
            href="/customer/products"
            className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-3xl">🛍️</div>

            <h3 className="mt-5 font-semibold text-[#0B1220]">
              Browse Products
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Explore products available on Balmitra.
            </p>
          </Link>

          <Link
            href="/customer/categories"
            className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-3xl">📦</div>

            <h3 className="mt-5 font-semibold text-[#0B1220]">
              Categories
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Explore products by category.
            </p>
          </Link>

          <Link
            href="/customer/cart"
            className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-3xl">🛒</div>

            <h3 className="mt-5 font-semibold text-[#0B1220]">
              My Cart
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Review products before checkout.
            </p>
          </Link>

          <Link
            href="/customer/profile"
            className="group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="text-3xl">👤</div>

            <h3 className="mt-5 font-semibold text-[#0B1220]">
              My Profile
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              Manage your account information.
            </p>
          </Link>

        </div>

      </section>

      {/* Account Information */}
      {customer && (
        <section className="mx-auto max-w-7xl px-6 pb-16">

          <div className="rounded-2xl bg-white p-8 shadow-sm">

            <h2 className="text-xl font-bold text-[#0B1220]">
              Account Information
            </h2>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">

              <div>
                <p className="text-sm text-gray-400">
                  Name
                </p>

                <p className="mt-1 font-medium text-gray-800">
                  {customer.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Email
                </p>

                <p className="mt-1 font-medium text-gray-800">
                  {customer.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Phone
                </p>

                <p className="mt-1 font-medium text-gray-800">
                  {customer.phone}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-400">
                  Account Status
                </p>

                <p className="mt-1 font-medium text-green-600">
                  Verified
                </p>
              </div>

            </div>

          </div>

        </section>
      )}

    </div>
  );
}

