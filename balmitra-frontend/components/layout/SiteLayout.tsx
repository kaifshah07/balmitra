"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isCustomerPage = pathname.startsWith("/customer");

  const isAdminPage = pathname.startsWith("/admin");

  const isOrderSuccessPage = pathname.startsWith("/order-success");

  /*
   * Customer pages have their own CustomerNavbar
   * through app/customer/layout.tsx.
   */
  if (isCustomerPage || isAdminPage) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />

      {children}
    </>
  );
}