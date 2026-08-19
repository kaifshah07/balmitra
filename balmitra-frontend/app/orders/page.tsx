"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { API_URL } from "@/lib/api";

type Order = {
  id: number;
  orderNumber: string;
  totalAmount: number | string;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  address: string;
  createdAt: string;
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const token = localStorage.getItem("customer_token");

      if (!token) {
        window.location.href = "/login";
        return;
      }

      const response = await fetch(
        `${API_URL}/orders/my-orders`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const contentType = response.headers.get("content-type");

      console.log("Orders API Status:", response.status);
      console.log("Orders API Content-Type:", contentType);

      // Don't try JSON parsing if backend returned HTML
      if (!contentType?.includes("application/json")) {
        const text = await response.text();

        console.error(
          "Backend returned non-JSON response:",
          text
        );

        throw new Error(
          `Server returned ${response.status} instead of JSON`
        );
      }

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to load orders"
        );
      }

      setOrders(
        Array.isArray(result.data)
          ? result.data
          : result.data?.orders || []
      );

    } catch (error: any) {

      console.error("Orders Error:", error);

      setError(
        error.message || "Unable to load orders"
      );

    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF8]">
        <p className="text-gray-500">
          Loading orders...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-6 py-12">

      <div className="mx-auto max-w-6xl">

        <h1 className="text-4xl font-bold text-[#0B1220]">
          My Orders
        </h1>

        <p className="mt-2 text-gray-500">
          Track your Balmitra orders.
        </p>

        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
            {error}
          </div>
        )}

        {!error && !orders.length ? (

          <div className="mt-10 rounded-2xl bg-white p-10 text-center shadow-sm">

            <h2 className="text-2xl font-bold">
              No Orders Yet
            </h2>

            <p className="mt-2 text-gray-500">
              You haven't placed any orders yet.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-xl bg-[#C67C2E] px-6 py-3 font-semibold text-white"
            >
              Start Shopping
            </Link>

          </div>

        ) : (

          <div className="mt-10 space-y-5">

            {orders.map((order) => (

              <div
                key={order.id}
                className="rounded-2xl bg-white p-6 shadow-sm"
              >

                <div className="flex flex-col justify-between gap-5 md:flex-row">

                  <div>

                    <p className="text-sm text-gray-500">
                      Order Number
                    </p>

                    <h2 className="mt-1 text-xl font-bold">
                      {order.orderNumber}
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </p>

                  </div>

                  <div className="text-left md:text-right">

                    <p className="text-sm text-gray-500">
                      Total
                    </p>

                    <p className="text-xl font-bold text-[#C67C2E]">
                      ₹
                      {Number(
                        order.totalAmount
                      ).toFixed(2)}
                    </p>

                  </div>

                </div>

                <div className="mt-6 grid gap-4 border-t pt-5 sm:grid-cols-3">

                  <div>
                    <p className="text-xs text-gray-500">
                      Payment
                    </p>

                    <p className="mt-1 font-semibold">
                      {order.paymentMethod}
                    </p>

                    <p className="text-sm text-gray-500">
                      {order.paymentStatus}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Order Status
                    </p>

                    <p className="mt-1 font-semibold">
                      {order.orderStatus}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Delivery Address
                    </p>

                    <p className="mt-1 text-sm text-gray-600">
                      {order.address}
                    </p>
                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </main>
  );
}
