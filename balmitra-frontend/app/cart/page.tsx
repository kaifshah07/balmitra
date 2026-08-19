// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";

// type CartItem = {
//   productId: number;
//   name: string;
//   price: number;
//   quantity: number;
//   thumbnail?: string | null;
//   stock: number;
// };

// export default function CartPage() {
//   const [cart, setCart] = useState<CartItem[]>([]);
//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     loadCart();
//   }, []);

//   function loadCart() {
//     try {
//       const savedCart = JSON.parse(
//         localStorage.getItem("balmitra_cart") || "[]"
//       );

//       setCart(savedCart);
//     } catch (error) {
//       console.error("Cart Load Error:", error);
//       setCart([]);
//     } finally {
//       setLoaded(true);
//     }
//   }

//   function saveCart(updatedCart: CartItem[]) {
//     setCart(updatedCart);

//     localStorage.setItem(
//       "balmitra_cart",
//       JSON.stringify(updatedCart)
//     );

//     window.dispatchEvent(new Event("cartUpdated"));
//   }

//   function increaseQuantity(productId: number) {
//     const updatedCart = cart.map((item) => {
//       if (item.productId !== productId) {
//         return item;
//       }

//       if (item.quantity >= item.stock) {
//         return item;
//       }

//       return {
//         ...item,
//         quantity: item.quantity + 1,
//       };
//     });

//     saveCart(updatedCart);
//   }

//   function decreaseQuantity(productId: number) {
//     const updatedCart = cart.map((item) => {
//       if (item.productId !== productId) {
//         return item;
//       }

//       return {
//         ...item,
//         quantity: Math.max(1, item.quantity - 1),
//       };
//     });

//     saveCart(updatedCart);
//   }

//   function removeItem(productId: number) {
//     const updatedCart = cart.filter(
//       (item) => item.productId !== productId
//     );

//     saveCart(updatedCart);
//   }

//   const subtotal = cart.reduce(
//     (total, item) =>
//       total + Number(item.price) * item.quantity,
//     0
//   );

//   const shipping = subtotal >= 1000 || subtotal === 0
//     ? 0
//     : 50;

//   const total = subtotal + shipping;

//   if (!loaded) {
//     return (
//       <main className="mx-auto max-w-7xl px-6 py-20">
//         <p className="text-gray-500">
//           Loading cart...
//         </p>
//       </main>
//     );
//   }

//   if (cart.length === 0) {
//     return (
//       <main className="mx-auto max-w-7xl px-6 py-20">

//         <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

//           <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-50">
//             🛒
//           </div>

//           <h1 className="text-3xl font-bold text-[#0B1220]">
//             Your cart is empty
//           </h1>

//           <p className="mt-3 text-gray-500">
//             Add some products to your cart and come back here.
//           </p>

//           <Link
//             href="/"
//             className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#C67C2E] px-6 py-3 font-semibold text-white hover:bg-[#A7641E]"
//           >
//             <ArrowLeft size={18} />
//             Continue Shopping
//           </Link>

//         </div>

//       </main>
//     );
//   }

//   return (
//     <main className="mx-auto max-w-7xl px-6 py-12">

//       <div className="mb-8">

//         <Link
//           href="/"
//           className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#C67C2E]"
//         >
//           <ArrowLeft size={17} />
//           Continue Shopping
//         </Link>

//         <h1 className="mt-4 text-4xl font-bold text-[#0B1220]">
//           Shopping Cart
//         </h1>

//         <p className="mt-2 text-gray-500">
//           {cart.length} product
//           {cart.length !== 1 ? "s" : ""} in your cart
//         </p>

//       </div>

//       <div className="grid gap-8 lg:grid-cols-3">

//         {/* CART ITEMS */}

//         <div className="space-y-4 lg:col-span-2">

//           {cart.map((item) => {

//             const imageUrl = item.thumbnail
//               ? `http://localhost:5000/uploads/products/${item.thumbnail}`
//               : "/images/placeholder.png";

//             return (
//               <div
//                 key={item.productId}
//                 className="flex gap-5 rounded-2xl bg-white p-5 shadow-sm"
//               >

//                 {/* IMAGE */}

//                 <Link
//                   href={`/products/${item.productId}`}
//                   className="flex h-32 w-32 shrink-0 items-center justify-center rounded-xl bg-[#F7F5F1]"
//                 >
//                   <Image
//                     src={imageUrl}
//                     alt={item.name}
//                     width={120}
//                     height={120}
//                     unoptimized
//                     className="h-28 w-28 object-contain"
//                   />
//                 </Link>

//                 {/* DETAILS */}

//                 <div className="flex flex-1 flex-col justify-between">

//                   <div className="flex justify-between gap-4">

//                     <div>

//                       <Link
//                         href={`/products/${item.productId}`}
//                         className="text-lg font-bold text-[#0B1220] hover:text-[#C67C2E]"
//                       >
//                         {item.name}
//                       </Link>

//                       <p className="mt-1 text-sm text-gray-500">
//                         ₹{Number(item.price).toFixed(2)}
//                       </p>

//                     </div>

//                     <button
//                       type="button"
//                       onClick={() =>
//                         removeItem(item.productId)
//                       }
//                       className="text-gray-400 hover:text-red-500"
//                     >
//                       <Trash2 size={19} />
//                     </button>

//                   </div>

//                   <div className="mt-4 flex items-center justify-between">

//                     {/* QUANTITY */}

//                     <div className="flex items-center overflow-hidden rounded-lg border">

//                       <button
//                         type="button"
//                         onClick={() =>
//                           decreaseQuantity(item.productId)
//                         }
//                         className="p-2 hover:bg-gray-100"
//                       >
//                         <Minus size={15} />
//                       </button>

//                       <span className="min-w-10 text-center text-sm font-medium">
//                         {item.quantity}
//                       </span>

//                       <button
//                         type="button"
//                         onClick={() =>
//                           increaseQuantity(item.productId)
//                         }
//                         disabled={
//                           item.quantity >= item.stock
//                         }
//                         className="p-2 hover:bg-gray-100 disabled:opacity-30"
//                       >
//                         <Plus size={15} />
//                       </button>

//                     </div>

//                     {/* ITEM TOTAL */}

//                     <span className="font-bold text-[#C67C2E]">
//                       ₹
//                       {(
//                         Number(item.price) *
//                         item.quantity
//                       ).toFixed(2)}
//                     </span>

//                   </div>

//                 </div>

//               </div>
//             );
//           })}

//         </div>

//         {/* SUMMARY */}

//         <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">

//           <h2 className="text-xl font-bold text-[#0B1220]">
//             Order Summary
//           </h2>

//           <div className="mt-6 space-y-4">

//             <div className="flex justify-between text-gray-600">
//               <span>Subtotal</span>
//               <span>
//                 ₹{subtotal.toFixed(2)}
//               </span>
//             </div>

//             <div className="flex justify-between text-gray-600">
//               <span>Shipping</span>
//               <span>
//                 {shipping === 0
//                   ? "FREE"
//                   : `₹${shipping.toFixed(2)}`}
//               </span>
//             </div>

//             <div className="border-t pt-4">

//               <div className="flex justify-between text-lg font-bold">

//                 <span>Total</span>

//                 <span className="text-[#C67C2E]">
//                   ₹{total.toFixed(2)}
//                 </span>

//               </div>

//             </div>

//           </div>

//           <Link
//             href="/checkout"
//             className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#C67C2E] px-6 py-4 font-semibold text-white hover:bg-[#A7641E]"
//           >
//             Proceed to Checkout
//           </Link>

//         </div>

//       </div>

//     </main>
//   );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";

type CartItem = {
  productId: number;
  name: string;
  price: number;
  quantity: number;
  thumbnail?: string | null;
  stock: number;
};

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    loadCart();
  }, []);

  function loadCart() {
    const storedCart = JSON.parse(
      localStorage.getItem("balmitra_cart") || "[]"
    );

    setCart(storedCart);
  }

  function saveCart(updatedCart: CartItem[]) {
    setCart(updatedCart);

    localStorage.setItem(
      "balmitra_cart",
      JSON.stringify(updatedCart)
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

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 999 || subtotal === 0 ? 0 : 50;

  const total = subtotal + shipping;

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-6 py-12">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-10">

          <Link
            href="/"
            className="mb-5 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#C67C2E]"
          >
            <ArrowLeft size={18} />
            Continue Shopping
          </Link>

          <h1 className="text-4xl font-bold text-[#0B1220]">
            Your Cart
          </h1>

          <p className="mt-2 text-gray-500">
            Review your items before checkout.
          </p>

        </div>


        {/* EMPTY CART */}

        {cart.length === 0 ? (

          <div className="rounded-3xl bg-white p-12 text-center shadow-sm">

            <h2 className="text-2xl font-bold text-[#0B1220]">
              Your cart is empty
            </h2>

            <p className="mt-3 text-gray-500">
              Looks like you haven't added anything yet.
            </p>

            <Link
              href="/"
              className="mt-6 inline-block rounded-xl bg-[#C67C2E] px-6 py-3 font-semibold text-white hover:bg-[#A7641E]"
            >
              Start Shopping
            </Link>

          </div>

        ) : (

          <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

            {/* CART ITEMS */}

            <div className="space-y-4">

              {cart.map((item) => {

                const imageUrl = item.thumbnail
                  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/uploads/products/${item.thumbnail}`
                  : "/images/placeholder.png";

                return (

                  <div
                    key={item.productId}
                    className="flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center"
                  >

                    {/* IMAGE */}

                    <Link
                      href={`/products/${item.productId}`}
                      className="flex h-28 w-28 shrink-0 items-center justify-center rounded-xl bg-[#F7F5F1]"
                    >

                      <Image
                        src={imageUrl}
                        alt={item.name}
                        width={110}
                        height={110}
                        unoptimized
                        className="h-24 w-24 object-contain"
                      />

                    </Link>


                    {/* PRODUCT INFO */}

                    <div className="flex-1">

                      <Link
                        href={`/products/${item.productId}`}
                        className="text-lg font-bold text-[#0B1220] hover:text-[#C67C2E]"
                      >
                        {item.name}
                      </Link>

                      <p className="mt-2 text-lg font-semibold text-[#C67C2E]">
                        ₹{item.price.toFixed(2)}
                      </p>


                      {/* QUANTITY */}

                      <div className="mt-4 flex items-center gap-3">

                        <span className="text-sm text-gray-500">
                          Quantity
                        </span>

                        <div className="flex items-center overflow-hidden rounded-lg border">

                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item.productId)
                            }
                            className="p-2 hover:bg-gray-100"
                          >
                            <Minus size={15} />
                          </button>

                          <span className="min-w-10 text-center text-sm font-medium">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(item.productId)
                            }
                            disabled={
                              item.quantity >= item.stock
                            }
                            className="p-2 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Plus size={15} />
                          </button>

                        </div>

                      </div>

                    </div>


                    {/* ITEM TOTAL + REMOVE */}

                    <div className="flex items-center justify-between gap-6 sm:flex-col sm:items-end">

                      <p className="font-bold text-[#0B1220]">
                        ₹
                        {(
                          item.price * item.quantity
                        ).toFixed(2)}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          removeItem(item.productId)
                        }
                        className="flex items-center gap-2 text-sm text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                        Remove
                      </button>

                    </div>

                  </div>

                );
              })}

            </div>


            {/* ORDER SUMMARY */}

            <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold text-[#0B1220]">
                Order Summary
              </h2>


              <div className="mt-6 space-y-4">

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>
                    ₹{subtotal.toFixed(2)}
                  </span>
                </div>


                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>

                  <span>
                    {shipping === 0
                      ? "FREE"
                      : `₹${shipping.toFixed(2)}`}
                  </span>

                </div>


                <div className="border-t pt-4">

                  <div className="flex justify-between text-lg font-bold">

                    <span>Total</span>

                    <span className="text-[#C67C2E]">
                      ₹{total.toFixed(2)}
                    </span>

                  </div>

                </div>

              </div>


              <Link
                href="/checkout"
                className="mt-6 flex w-full items-center justify-center rounded-xl bg-[#C67C2E] px-6 py-4 font-semibold text-white transition hover:bg-[#A7641E]"
              >
                Proceed to Checkout
              </Link>


              <Link
                href="/"
                className="mt-3 flex w-full items-center justify-center rounded-xl border border-gray-200 px-6 py-4 font-semibold text-gray-700 hover:bg-gray-50"
              >
                Continue Shopping
              </Link>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}