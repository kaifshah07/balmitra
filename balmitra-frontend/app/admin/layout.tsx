"use client";

import Sidebar from "./components/Sidebar";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!isLoginPage && !localStorage.getItem("adminToken")) {
      router.replace("/admin/login");
    }
  }, [isLoginPage, router]);

  if (isLoginPage) return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
