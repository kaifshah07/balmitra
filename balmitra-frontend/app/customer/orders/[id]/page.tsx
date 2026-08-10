"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

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

const statusSteps = [
"PENDING",
"CONFIRMED",
"PROCESSING",
"SHIPPED",
"DELIVERED",
];

export default function OrderDetailsPage() {
const params = useParams();
const router = useRouter();

const [order, setOrder] = useState<Order | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
loadOrder();
}, []);

async function loadOrder() {
try {
const token = localStorage.getItem("customer_token");

  if (!token) {
    router.replace("/login");
    return;
  }

  const orderId = params.id;

  if (!orderId) {
    throw new Error("Invalid order ID");
  }

  const response = await fetch(
    `http://localhost:5000/api/orders/my-orders/${orderId}`,
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
      result.message || "Order not found"
    );
  }

  setOrder(result.data);
} catch (error: any) {
  console.error("Order Details Error:", error);

  setError(
    error?.message ||
      "Unable to load order details"
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
month: "long",
year: "numeric",
}
);
}

function formatDateTime(date: string) {
return new Date(date).toLocaleString(
"en-IN",
{
day: "2-digit",
month: "short",
year: "numeric",
hour: "2-digit",
minute: "2-digit",
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

function getCurrentStep() {
if (!order) return -1;


if (order.orderStatus === "CANCELLED") {
  return -1;
}

return statusSteps.indexOf(
  order.orderStatus
);


}

if (loading) {
return ( <main className="mx-auto max-w-7xl px-6 py-16"> <div className="flex min-h-[300px] items-center justify-center"> <div className="text-center"> <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-[#C67C2E]" />


        <p className="mt-4 text-gray-500">
          Loading order...
        </p>
      </div>
    </div>
  </main>
);


}

if (error || !order) {
return ( <main className="mx-auto max-w-7xl px-6 py-16"> <div className="rounded-2xl bg-white p-10 text-center shadow-sm">


      <div className="text-5xl">
        📦
      </div>

      <h1 className="mt-5 text-2xl font-bold text-[#0B1220]">
        Order not found
      </h1>

      <p className="mt-2 text-gray-500">
        {error ||
          "We couldn't find this order."}
      </p>

      <Link
        href="/customer/orders"
        className="mt-6 inline-flex rounded-lg bg-[#C67C2E] px-6 py-3 font-semibold text-white transition hover:bg-[#A7641E]"
      >
        Back to Orders
      </Link>

    </div>
  </main>
);


}

const currentStep = getCurrentStep();

return ( <main className="mx-auto max-w-7xl px-6 py-12">


  {/* BACK */}

  <Link
    href="/customer/orders"
    className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-[#C67C2E]"
  >
    <ArrowLeft size={18} />
    Back to Orders
  </Link>

  {/* HEADER */}

  <div className="mb-8">

    <p className="text-sm font-semibold uppercase tracking-wider text-[#C67C2E]">
      Order Details
    </p>

    <div className="mt-2 flex flex-col justify-between gap-4 md:flex-row md:items-end">

      <div>

        <h1 className="text-4xl font-bold tracking-tight text-[#0B1220]">
          {order.orderNumber}
        </h1>

        <p className="mt-2 text-gray-500">
          Placed on{" "}
          {formatDateTime(
            order.createdAt
          )}
        </p>

      </div>

      <span
        className={`w-fit rounded-full px-4 py-2 text-sm font-semibold ${
          order.orderStatus ===
          "DELIVERED"
            ? "bg-green-100 text-green-700"
            : order.orderStatus ===
              "CANCELLED"
            ? "bg-red-100 text-red-700"
            : "bg-orange-100 text-orange-700"
        }`}
      >
        {formatStatus(
          order.orderStatus
        )}
      </span>

    </div>

  </div>

  {/* TRACKING */}

  <div className="mb-8 rounded-2xl bg-white p-8 shadow-sm">

    <h2 className="text-xl font-bold text-[#0B1220]">
      Order Status
    </h2>

    {order.orderStatus ===
    "CANCELLED" ? (

      <div className="mt-6 rounded-xl bg-red-50 p-5 text-red-700">
        <p className="font-semibold">
          This order has been cancelled.
        </p>

        <p className="mt-1 text-sm">
          Please contact support if you
          have any questions.
        </p>
      </div>

    ) : (

      <div className="mt-8">

        <div className="hidden md:flex">

          {statusSteps.map(
            (status, index) => {

              const completed =
                index <= currentStep;

              return (
                <div
                  key={status}
                  className="flex flex-1 items-start"
                >

                  <div className="flex flex-1 flex-col items-center">

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                        completed
                          ? "bg-[#C67C2E] text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {index + 1}
                    </div>

                    <p
                      className={`mt-3 text-center text-sm font-medium ${
                        completed
                          ? "text-[#0B1220]"
                          : "text-gray-400"
                      }`}
                    >
                      {formatStatus(
                        status
                      )}
                    </p>

                  </div>

                  {index <
                    statusSteps.length -
                      1 && (
                    <div
                      className={`mt-5 h-1 flex-1 ${
                        index <
                        currentStep
                          ? "bg-[#C67C2E]"
                          : "bg-gray-100"
                      }`}
                    />
                  )}

                </div>
              );
            }
          )}

        </div>

        <div className="space-y-4 md:hidden">

          {statusSteps.map(
            (status, index) => {

              const completed =
                index <= currentStep;

              return (
                <div
                  key={status}
                  className="flex items-center gap-4"
                >

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      completed
                        ? "bg-[#C67C2E] text-white"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {index + 1}
                  </div>

                  <p
                    className={`text-sm font-medium ${
                      completed
                        ? "text-[#0B1220]"
                        : "text-gray-400"
                    }`}
                  >
                    {formatStatus(
                      status
                    )}
                  </p>

                </div>
              );
            }
          )}

        </div>

      </div>
    )}

  </div>

  {/* ORDER CONTENT */}

  <div className="grid gap-8 lg:grid-cols-3">

    {/* ITEMS */}

    <div className="lg:col-span-2">

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h2 className="text-xl font-bold text-[#0B1220]">
          Ordered Items
        </h2>

        <div className="mt-6 divide-y">

          {order.items.map(
            (item) => (

              <div
                key={item.id}
                className="flex items-center justify-between gap-5 py-5 first:pt-0 last:pb-0"
              >

                <div className="min-w-0">

                  <p className="font-semibold text-[#0B1220]">
                    {item.product?.name ||
                      `Product #${item.productId}`}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Quantity:{" "}
                    {item.quantity}
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    Price: ₹
                    {Number(
                      item.price
                    ).toFixed(2)}
                  </p>

                </div>

                <p className="shrink-0 font-bold text-[#0B1220]">
                  ₹
                  {(
                    Number(
                      item.price
                    ) *
                    item.quantity
                  ).toFixed(2)}
                </p>

              </div>

            )
          )}

        </div>

      </div>

    </div>

    {/* SUMMARY */}

    <div className="space-y-6">

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h2 className="text-xl font-bold text-[#0B1220]">
          Order Summary
        </h2>

        <div className="mt-6 space-y-4">

          <div className="flex justify-between gap-4">

            <span className="text-gray-500">
              Items
            </span>

            <span className="font-medium">
              {order.items.reduce(
                (
                  total,
                  item
                ) =>
                  total +
                  item.quantity,
                0
              )}
            </span>

          </div>

          <div className="flex justify-between gap-4">

            <span className="text-gray-500">
              Payment
            </span>

            <span className="font-medium">
              {formatStatus(
                order.paymentMethod
              )}
            </span>

          </div>

          <div className="flex justify-between gap-4">

            <span className="text-gray-500">
              Payment Status
            </span>

            <span className="font-medium">
              {formatStatus(
                order.paymentStatus
              )}
            </span>

          </div>

          <div className="border-t pt-4">

            <div className="flex justify-between text-lg font-bold">

              <span>
                Total
              </span>

              <span className="text-[#C67C2E]">
                ₹
                {Number(
                  order.totalAmount
                ).toFixed(2)}
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* DELIVERY ADDRESS */}

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h2 className="text-xl font-bold text-[#0B1220]">
          Delivery Address
        </h2>

        <p className="mt-4 whitespace-pre-line text-sm leading-6 text-gray-600">
          {order.address}
        </p>

      </div>

    </div>

  </div>

</main>


);
}
