"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/lib/api";

type Product = {
id: number;
name: string;
thumbnail?: string | null;
};

type OrderItem = {
id: number;
productId: number;
quantity: number;
price: number | string;
product?: Product;
};

type Order = {
id: number;
orderNumber: string;
totalAmount: number | string;
paymentMethod: string;
paymentStatus: string;
orderStatus: string;
address: string;
createdAt: string;
items: OrderItem[];
};

export default function CustomerOrdersPage() {
const router = useRouter();

const [orders, setOrders] = useState<Order[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
loadOrders();
}, []);

async function loadOrders() {
try {
setLoading(true);
setError("");


  const token = localStorage.getItem("customer_token");

  if (!token) {
    router.replace("/login");
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

  const result = await response.json();

  if (response.status === 401) {
    localStorage.removeItem("customer_token");
    localStorage.removeItem("customer");
    router.replace("/login");
    return;
  }

  if (!response.ok || !result.success) {
    throw new Error(
      result.message || "Unable to load orders"
    );
  }

  setOrders(result.data || []);
} catch (error: any) {
  console.error("Customer Orders Error:", error);

  setError(
    error?.message ||
      "Unable to load your orders"
  );
} finally {
  setLoading(false);
}


}

function formatDate(date: string) {
return new Date(date).toLocaleDateString(
"en-IN",
{
day: "2-digit",
month: "short",
year: "numeric",
}
);
}

function formatStatus(status: string) {
return status
.replaceAll("_", " ")
.toLowerCase()
.replace(/\b\w/g, (char: string) =>
char.toUpperCase()
);
}

function getStatusClass(status: string) {
switch (status) {
case "DELIVERED":
return "bg-green-100 text-green-700";


  case "CANCELLED":
    return "bg-red-100 text-red-700";

  case "SHIPPED":
    return "bg-blue-100 text-blue-700";

  case "CONFIRMED":
    return "bg-purple-100 text-purple-700";

  case "PROCESSING":
    return "bg-yellow-100 text-yellow-700";

  default:
    return "bg-gray-100 text-gray-700";
}

}

function getPaymentStatusClass(status: string) {
switch (status) {
case "PAID":
return "bg-green-100 text-green-700";


  case "FAILED":
    return "bg-red-100 text-red-700";

  case "REFUNDED":
    return "bg-blue-100 text-blue-700";

  default:
    return "bg-yellow-100 text-yellow-700";
}


}

if (loading) {
return ( <main className="mx-auto max-w-7xl px-6 py-16"> <div className="flex min-h-[300px] items-center justify-center"> <div className="text-center"> <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#C67C2E]" /> <p className="mt-4 text-gray-500">
Loading your orders... </p> </div> </div> </main>
);
}

if (error) {
return ( <main className="mx-auto max-w-7xl px-6 py-16"> <div className="rounded-2xl bg-white p-10 text-center shadow-sm"> <h1 className="text-2xl font-bold text-[#0B1220]">
Unable to load orders </h1>


      <p className="mt-3 text-gray-500">
        {error}
      </p>

      <button
        type="button"
        onClick={loadOrders}
        className="mt-6 rounded-lg bg-[#C67C2E] px-6 py-3 font-semibold text-white transition hover:bg-[#A7641E]"
      >
        Try Again
      </button>
    </div>
  </main>
);


}

return ( <main className="mx-auto max-w-7xl px-6 py-12">


  {/* HEADER */}

  <div className="mb-10">
    <p className="text-sm font-semibold uppercase tracking-wider text-[#C67C2E]">
      Your Account
    </p>

    <h1 className="mt-2 text-4xl font-bold tracking-tight text-[#0B1220]">
      My Orders
    </h1>

    <p className="mt-3 text-gray-500">
      View and track all your Balmitra orders.
    </p>
  </div>

  {/* EMPTY STATE */}

  {!orders.length ? (
    <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

      <div className="text-6xl">
        📦
      </div>

      <h2 className="mt-6 text-2xl font-bold text-[#0B1220]">
        No orders yet
      </h2>

      <p className="mt-2 text-gray-500">
        You haven't placed any orders yet.
        Start shopping to see your orders here.
      </p>

      <Link
        href="/customer/products"
        className="mt-6 inline-flex rounded-lg bg-[#C67C2E] px-6 py-3 font-semibold text-white transition hover:bg-[#A7641E]"
      >
        Start Shopping
      </Link>

    </div>
  ) : (
    <div className="space-y-6">

      {orders.map((order) => (

        <div
          key={order.id}
          className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
        >

          {/* ORDER HEADER */}

          <div className="flex flex-col justify-between gap-4 border-b border-gray-100 pb-5 md:flex-row md:items-center">

            <div>

              <p className="text-sm text-gray-400">
                Order Number
              </p>

              <h2 className="mt-1 text-lg font-bold text-[#0B1220]">
                {order.orderNumber}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Placed on {formatDate(order.createdAt)}
              </p>

            </div>

            <div className="flex flex-wrap gap-2">

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                  order.orderStatus
                )}`}
              >
                {formatStatus(order.orderStatus)}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${getPaymentStatusClass(
                  order.paymentStatus
                )}`}
              >
                Payment:{" "}
                {formatStatus(order.paymentStatus)}
              </span>

            </div>

          </div>

          {/* ORDER CONTENT */}

          <div className="mt-5 grid gap-6 md:grid-cols-3">

            {/* ITEMS */}

            <div className="md:col-span-2">

              <p className="mb-3 text-sm font-semibold text-gray-700">
                Items
              </p>

              <div className="space-y-3">

                {order.items.map((item) => (

                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 p-4"
                  >

                    <div className="min-w-0">

                      <p className="truncate font-medium text-[#0B1220]">
                        {item.product?.name ||
                          `Product #${item.productId}`}
                      </p>

                      <p className="mt-1 text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>

                    </div>

                    <p className="shrink-0 font-semibold text-[#0B1220]">
                      ₹
                      {(
                        Number(item.price) *
                        item.quantity
                      ).toFixed(2)}
                    </p>

                  </div>

                ))}

              </div>

            </div>

            {/* SUMMARY */}

            <div className="rounded-xl border border-gray-100 p-5">

              <p className="text-sm text-gray-400">
                Order Total
              </p>

              <p className="mt-1 text-2xl font-bold text-[#C67C2E]">
                ₹
                {Number(
                  order.totalAmount
                ).toFixed(2)}
              </p>

              <p className="mt-4 text-sm text-gray-500">
                Payment Method
              </p>

              <p className="mt-1 font-medium text-gray-800">
                {formatStatus(
                  order.paymentMethod
                )}
              </p>

              <Link
                href={`/customer/orders/${order.id}`}
                className="mt-5 block w-full rounded-lg border border-[#C67C2E] px-4 py-3 text-center text-sm font-semibold text-[#C67C2E] transition hover:bg-orange-50"
              >
                View Order
              </Link>

            </div>

          </div>

        </div>

      ))}

    </div>
  )}

</main>

)
}
