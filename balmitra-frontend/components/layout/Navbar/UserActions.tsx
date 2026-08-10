"use client";

import Link from "next/link";
import { ShoppingCart, User } from "lucide-react";
import { useEffect, useState } from "react";

type CartItem = {
  productId: number;
  quantity: number;
};

export default function UserActions() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function loadCartCount() {
      const cart: CartItem[] = JSON.parse(
        localStorage.getItem("balmitra_cart") || "[]"
      );

      const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
      );

      setCartCount(count);
    }

    loadCartCount();

    window.addEventListener("cartUpdated", loadCartCount);
    window.addEventListener("storage", loadCartCount);

    return () => {
      window.removeEventListener("cartUpdated", loadCartCount);
      window.removeEventListener("storage", loadCartCount);
    };
  }, []);

  return (
    <div className="flex items-center gap-5">

      {/* CART */}

      <Link
        href="/cart"
        className="relative flex items-center justify-center"
      >
        <ShoppingCart
          size={22}
          className="transition hover:text-[#C67C2E]"
        />

        {cartCount > 0 && (
          <span className="absolute -right-3 -top-3 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#C67C2E] px-1 text-xs font-semibold text-white">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </Link>

      <Link
  href="/orders"
  className="..."
>
  My Orders
</Link>


      {/* USER */}

      <Link
        href="/login"
        className="transition hover:text-[#C67C2E]"
      >
        <User size={22} />
      </Link>

    </div>
  );
}