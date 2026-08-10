"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/components/layout/logo/logo";

interface Customer {
  name?: string;
  email?: string;
}

export default function CustomerNavbar() {
  const router = useRouter();

  const [customer, setCustomer] = useState<Customer | null>(null);

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

  function handleLogout() {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer");

    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-[#FAFAF8]/95 backdrop-blur-xl">
      <div className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between gap-6 px-6">

        {/* Logo */}
        <Logo href="/customer" />

        {/* Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/customer"
            className="text-sm font-medium text-gray-700 transition hover:text-[#C67C2E]"
          >
            Home
          </Link>

          <Link
            href="/customer/categories"
            className="text-sm font-medium text-gray-700 transition hover:text-[#C67C2E]"
          >
            Categories
          </Link>

          <Link
            href="/customer/products"
            className="text-sm font-medium text-gray-700 transition hover:text-[#C67C2E]"
          >
            Products
          </Link>

          <Link
            href="/customer/orders"
            className="text-sm font-medium text-gray-700 transition hover:text-[#C67C2E]"
          >
            My Orders
          </Link>
        </nav>

        {/* Customer Actions */}
        <div className="flex items-center gap-3">

          <Link
            href="/customer/cart"
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-[#C67C2E] hover:text-[#C67C2E]"
          >
            Cart
          </Link>

          <Link
            href="/customer/profile"
            className="hidden rounded-lg bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 md:block"
          >
            {customer?.name || "Account"}
          </Link>

          <button
            onClick={handleLogout}
            className="rounded-lg bg-[#C67C2E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#A7641E]"
          >
            Logout
          </button>

        </div>
      </div>
    </header>
  );
}

