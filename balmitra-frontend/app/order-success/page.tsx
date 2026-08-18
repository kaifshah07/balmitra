// "use client";

// import Link from "next/link";
// import { useSearchParams } from "next/navigation";
// import { CheckCircle, ShoppingBag, Package } from "lucide-react";
// "use client";

// export const dynamic = "force-dynamic";

// export default function OrderSuccessPage() {
// const searchParams = useSearchParams();
// const orderId = searchParams.get("orderId");

// return ( <main className="min-h-screen bg-[#FAFAF8] px-4 py-16"> <div className="mx-auto w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">


//     <div className="flex justify-center">
//       <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
//         <CheckCircle
//           size={48}
//           className="text-green-600"
//         />
//       </div>
//     </div>

//     <h1 className="mt-6 text-3xl font-bold text-[#0B1220]">
//       Order Placed Successfully!
//     </h1>

//     <p className="mt-3 text-gray-500">
//       Thank you for shopping with Balmitra.
//       Your order has been successfully placed.
//     </p>

//     {orderId && (
//       <div className="mt-6 rounded-xl bg-[#F7F5F1] p-4">
//         <p className="text-sm text-gray-500">
//           Order ID
//         </p>

//         <p className="mt-1 text-xl font-bold text-[#C67C2E]">
//           #{orderId}
//         </p>
//       </div>
//     )}

//     <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

//       <Link
//         href="/customer/products"
//         className="flex items-center justify-center gap-2 rounded-xl bg-[#C67C2E] px-6 py-3 font-semibold text-white transition hover:bg-[#A7641E]"
//       >
//         <ShoppingBag size={18} />
//         Continue Shopping
//       </Link>

//       {orderId && (
//         <Link
//           href={`/customer/orders/${orderId}`}
//           className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
//         >
//           <Package size={18} />
//           View Order
//         </Link>
//       )}

//     </div>

//   </div>
// </main>


// );
// }

"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ShoppingBag, Package } from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-16">
      <div className="mx-auto w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-sm">

        <div className="flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle size={48} className="text-green-600" />
          </div>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-[#0B1220]">
          Order Placed Successfully!
        </h1>

        <p className="mt-3 text-gray-500">
          Thank you for shopping with Balmitra.
          Your order has been successfully placed.
        </p>

        {orderId && (
          <div className="mt-6 rounded-xl bg-[#F7F5F1] p-4">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="mt-1 text-xl font-bold text-[#C67C2E]">
              #{orderId}
            </p>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/customer/products"
            className="flex items-center justify-center gap-2 rounded-xl bg-[#C67C2E] px-6 py-3 font-semibold text-white"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>

          {orderId && (
            <Link
              href={`/customer/orders/${orderId}`}
              className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-700"
            >
              <Package size={18} />
              View Order
            </Link>
          )}
        </div>

      </div>
    </main>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
