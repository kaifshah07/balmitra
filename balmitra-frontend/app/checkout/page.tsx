"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  thumbnail?: string;
  stock: number;
};

export default function CheckoutPage() {
  const router = useRouter();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("balmitra_cart");

    if (!storedCart) {
      router.push("/cart");
      return;
    }

    const parsedCart = JSON.parse(storedCart);

    if (!parsedCart.length) {
      router.push("/cart");
      return;
    }

    setCart(parsedCart);

    const token = localStorage.getItem("customer_token");

    if (token) {
      loadCustomer(token);
    }
  }, [router]);

 async function loadCustomer(token: string) {
  try {
    const url =
      `${process.env.NEXT_PUBLIC_API_URL}/auth/customer/me`;

    console.log("Calling customer API:", url);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log("Customer API status:", response.status);
    console.log(
      "Customer API content type:",
      response.headers.get("content-type")
    );

    const text = await response.text();

    console.log(
      "Customer API raw response:",
      text
    );

    if (!response.ok) {
      throw new Error(
        `Customer API failed: ${response.status}`
      );
    }

    if (!text.trim().startsWith("{")) {
      throw new Error(
        "Customer API returned HTML instead of JSON"
      );
    }

    const result = JSON.parse(text);

    if (!result.success) {
      throw new Error(
        result.message || "Failed to load customer"
      );
    }

    const customer =
      result.data?.customer ||
      result.data;

    if (customer) {
      setForm((prev) => ({
        ...prev,
        name: customer.name || "",
        email: customer.email || "",
        phone: customer.phone || "",
      }));
    }

  } catch (error) {
    console.error(
      "Customer profile error:",
      error
    );
  }
}

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 500 ? 0 : 50;

  const total = subtotal + shipping;

  async function placeOrder() {
if (!form.name || !form.email || !form.phone) {
alert("Please fill customer details");
return;
}

if (
!form.address ||
!form.city ||
!form.state ||
!form.pincode
) {
alert("Please complete your delivery address");
return;
}

if (form.pincode.length !== 6) {
alert("Enter a valid pincode");
return;
}

const token = localStorage.getItem("customer_token");

if (!token) {
alert("Please login before placing the order");
router.push("/login");
return;
}

try {
setLoading(true);


const response = await fetch(
  "${process.env.NEXT_PUBLIC_API_URL}/orders",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      items: cart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
      address: `${form.address}, ${form.city}, ${form.state} - ${form.pincode}`,
      paymentMethod: "COD",
    }),
  }
);

const text = await response.text();

console.log("Order API status:", response.status);
console.log("Order API response:", text);

let result;

try {
  result = JSON.parse(text);
} catch {
  throw new Error(
    `Order API returned an invalid response (${response.status})`
  );
}

if (!response.ok || !result.success) {
  throw new Error(
    result.message || "Failed to place order"
  );
}

console.log("Order created:", result);

localStorage.removeItem("balmitra_cart");

const orderId =
  result.data?.order?.id ||
  result.data?.id;

if (!orderId) {
  throw new Error(
    "Order created but order ID was not returned"
  );
}

router.push(
  `/order-success?orderId=${orderId}`
);


} catch (error: any) {
console.error("Place Order Error:", error);


alert(
  error.message ||
  "Unable to place order"
);


} finally {
setLoading(false);
}
}


  if (!cart.length) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-20 text-center">
        <h1 className="text-3xl font-bold">
          Your cart is empty
        </h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8] py-12">
      <div className="mx-auto max-w-6xl px-6">

        <h1 className="mb-10 text-3xl font-bold text-[#0B1220]">
          Checkout
        </h1>

        <div className="grid gap-10 lg:grid-cols-3">

          {/* CUSTOMER DETAILS */}

          <div className="lg:col-span-2">

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="mb-6 text-xl font-bold">
                Delivery Details
              </h2>

              <div className="grid gap-4 md:grid-cols-2">

                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="rounded-lg border p-3"
                />

                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="rounded-lg border p-3"
                />

                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="rounded-lg border p-3"
                />

                <input
                  name="pincode"
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="Pincode"
                  maxLength={6}
                  className="rounded-lg border p-3"
                />

              </div>

              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Full Address"
                rows={4}
                className="mt-4 w-full rounded-lg border p-3"
              />

              <div className="mt-4 grid gap-4 md:grid-cols-2">

                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="rounded-lg border p-3"
                />

                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="rounded-lg border p-3"
                />

              </div>

            </div>

          </div>


          {/* ORDER SUMMARY */}

          <div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="mb-6 text-xl font-bold">
                Order Summary
              </h2>

              <div className="space-y-4">

                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex justify-between gap-4"
                  >

                    <div>
                      <p className="font-medium">
                        {item.name}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹
                      {(
                        item.price * item.quantity
                      ).toFixed(2)}
                    </p>

                  </div>
                ))}

              </div>

              <div className="my-6 border-t" />

              <div className="space-y-3">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>

                  <span>
                    {shipping === 0
                      ? "FREE"
                      : `₹${shipping}`}
                  </span>
                </div>

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>
                    ₹{total.toFixed(2)}
                  </span>
                </div>

              </div>

              <button
                type="button"
                onClick={placeOrder}
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-[#C67C2E] px-6 py-4 font-semibold text-white transition hover:bg-[#A7641E] disabled:bg-gray-300"
              >
                {loading
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}