"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/admin" },
  { name: "Products", href: "/admin/products" },
  { name: "Categories", href: "/admin/categories" },
  { name: "Orders", href: "/admin/orders" },
  { name: "Customers", href: "/admin/customers" },
  { name: "Coupons", href: "/admin/coupons" },
  { name: "Settings", href: "/admin/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#1E293B] text-white min-h-screen">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold">Balmitra</h1>
        <p className="text-sm text-slate-400">Admin Panel</p>
      </div>

      <nav className="mt-6 flex flex-col">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`px-6 py-4 transition ${
              pathname === item.href
                ? "bg-orange-500"
                : "hover:bg-slate-700"
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}