"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { productImageUrl } from "@/lib/api";

type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  thumbnail?: string;
  stock: number;
};

export default function CustomerCartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();

    const handleCartUpdate = () => {
      loadCart();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener(
        "cartUpdated",
        handleCartUpdate
      );
    };
  }, []);

  function loadCart() {
    try {
      const storedCart =
        localStorage.getItem("balmitra_cart");

      if (!storedCart) {
        setCart([]);
        return;
      }

      const parsedCart = JSON.parse(storedCart);

      if (Array.isArray(parsedCart)) {
        setCart(parsedCart);
      } else {
        setCart([]);
      }
    } catch (error) {
      console.error("Cart Load Error:", error);
      setCart([]);
    }
  }

  function saveCart(updatedCart: CartItem[]) {
    setCart(updatedCart);

    localStorage.setItem(
      "balmitra_cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  }

  function increaseQuantity(productId: number) {
    const updatedCart = cart.map((item) => {
      if (item.productId !== productId) {
        return item;
      }

      if (item.quantity >= item.stock) {
        return item;
      }

      return {
        ...item,
        quantity: item.quantity + 1,
      };
    });

    saveCart(updatedCart);
  }

  function decreaseQuantity(productId: number) {
    const updatedCart = cart
      .map((item) => {
        if (item.productId !== productId) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity - 1,
        };
      })
      .filter((item) => item.quantity > 0);

    saveCart(updatedCart);
  }

  function removeItem(productId: number) {
    const updatedCart = cart.filter(
      (item) => item.productId !== productId
    );

    saveCart(updatedCart);
  }

  function clearCart() {
    saveCart([]);
  }

  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const shipping = subtotal >= 500 ? 0 : 50;

  const total = subtotal + shipping;

  if (!cart.length) {
    return (
      <main className="min-h-[70vh] bg-[#FAFAF8]">
        <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">

          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-4xl shadow-sm">
            🛒
          </div>

          <h1 className="mt-6 text-3xl font-bold text-[#0B1220]">
            Your Cart is Empty
          </h1>

          <p className="mt-3 max-w-md text-gray-500">
            Looks like you haven't added anything to your
            cart yet. Explore our products and find
            something you love.
          </p>

          <Link
            href="/customer/products"
            className="mt-8 rounded-xl bg-[#C67C2E] px-7 py-3 font-semibold text-white transition hover:bg-[#A7641E]"
          >
            Start Shopping
          </Link>

        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#FAFAF8]">

      <div className="mx-auto max-w-7xl px-6 py-12">

        {/* HEADER */}

        <div className="mb-10">

          <Link
            href="/customer/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#C67C2E]"
          >
            <ArrowLeft size={17} />
            Continue Shopping
          </Link>

          <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

            <div>
              <h1 className="text-4xl font-bold text-[#0B1220]">
                My Cart
              </h1>

              <p className="mt-2 text-gray-500">
                {cart.length}{" "}
                {cart.length === 1
                  ? "item"
                  : "items"}{" "}
                in your cart
              </p>
            </div>

            <button
              type="button"
              onClick={clearCart}
              className="text-sm font-medium text-red-500 transition hover:text-red-700"
            >
              Clear Cart
            </button>

          </div>

        </div>

        {/* CONTENT */}

        <div className="grid gap-8 lg:grid-cols-3">

          {/* CART ITEMS */}

          <div className="space-y-4 lg:col-span-2">

            {cart.map((item) => (

              <div
                key={item.productId}
                className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"
              >

                <div className="flex gap-5">

                  {/* IMAGE */}

                  <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F7F5F1]">

                    {item.thumbnail ? (
                      <Image
                        src={productImageUrl(item.thumbnail)}
                        alt={item.name}
                        width={120}
                        height={120}
                        unoptimized
                        className="h-full w-full object-contain"
                      />
                    ) : (
                      <span className="text-3xl">
                        🧸
                      </span>
                    )}

                  </div>

                  {/* DETAILS */}

                  <div className="flex min-w-0 flex-1 flex-col justify-between">

                    <div className="flex justify-between gap-4">

                      <div>

                        <h2 className="font-semibold text-[#0B1220]">
                          {item.name}
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                          ₹{Number(item.price).toFixed(2)}
                        </p>

                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.productId)
                        }
                        className="text-gray-400 transition hover:text-red-500"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                    <div className="mt-5 flex items-center justify-between">

                      {/* QUANTITY */}

                      <div className="flex items-center overflow-hidden rounded-lg border border-gray-200">

                        <button
                          type="button"
                          onClick={() =>
                            decreaseQuantity(
                              item.productId
                            )
                          }
                          className="p-2.5 transition hover:bg-gray-100"
                        >
                          <Minus size={15} />
                        </button>

                        <span className="min-w-10 text-center text-sm font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          disabled={
                            item.quantity >= item.stock
                          }
                          onClick={() =>
                            increaseQuantity(
                              item.productId
                            )
                          }
                          className="p-2.5 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-300"
                        >
                          <Plus size={15} />
                        </button>

                      </div>

                      {/* ITEM TOTAL */}

                      <p className="font-semibold text-[#0B1220]">
                        ₹
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toFixed(2)}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* ORDER SUMMARY */}

          <div>

            <div className="sticky top-28 rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-[#0B1220]">
                Order Summary
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Subtotal
                  </span>

                  <span className="font-medium">
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">
                    Shipping
                  </span>

                  <span className="font-medium">
                    {shipping === 0
                      ? "FREE"
                      : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="border-t border-gray-100 pt-4">

                  <div className="flex justify-between">

                    <span className="text-lg font-bold text-[#0B1220]">
                      Total
                    </span>

                    <span className="text-xl font-bold text-[#C67C2E]">
                      ₹{total.toFixed(2)}
                    </span>

                  </div>

                </div>

              </div>

              {subtotal < 500 && (
                <p className="mt-5 rounded-lg bg-orange-50 p-3 text-sm text-[#A7641E]">
                  Add ₹
                  {(500 - subtotal).toFixed(2)}
                  {" "}more to get free shipping.
                </p>
              )}

              <Link
                href="/checkout"
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#C67C2E] px-6 py-4 font-semibold text-white transition hover:bg-[#A7641E]"
              >
                Proceed to Checkout
              </Link>

              <Link
                href="/customer/products"
                className="mt-3 flex w-full items-center justify-center rounded-xl border border-gray-200 px-6 py-3 font-medium text-gray-700 transition hover:border-[#C67C2E] hover:text-[#C67C2E]"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}
