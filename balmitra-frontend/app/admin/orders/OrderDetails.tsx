"use client";

import { useState } from "react";
import {
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
} from "../services/api/orders";

interface Props {
  order: any;
  onClose: () => void;
}

export default function OrderDetails({
  order,
  onClose,
}: Props) {
  const [orderStatus, setOrderStatus] = useState(
    order.orderStatus
  );

  const [paymentStatus, setPaymentStatus] = useState(
    order.paymentStatus
  );

  const [loading, setLoading] = useState(false);

  const saveStatus = async () => {
    try {
      setLoading(true);

      await updateOrderStatus(
        order.id,
        orderStatus
      );

      await updatePaymentStatus(
        order.id,
        paymentStatus
      );

      alert("Order updated successfully");

      onClose();
    } catch (error) {
      console.error(error);
      alert("Failed to update order");
    } finally {
      setLoading(false);
    }
  };

  const cancelCurrentOrder = async () => {
    const ok = confirm(
      "Cancel this order?"
    );

    if (!ok) return;

    try {
      await cancelOrder(order.id);

      alert("Order Cancelled");

      onClose();
    } catch (error) {
      console.error(error);
      alert("Unable to cancel order");
    }
  };

  return (
    <div>

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold">
          Order Details
        </h2>

        <button
          onClick={onClose}
          className="text-2xl"
        >
          ×
        </button>

      </div>

      {/* Order Info */}

      <div className="grid grid-cols-2 gap-5 mb-8">

        <div>

          <p className="text-gray-500">
            Order Number
          </p>

          <p className="font-semibold">
            {order.orderNumber}
          </p>

        </div>

        <div>

          <p className="text-gray-500">
            Total Amount
          </p>

          <p className="font-semibold">
            ₹{order.totalAmount}
          </p>

        </div>

        <div>

          <p className="text-gray-500">
            Customer
          </p>

          <p className="font-semibold">
            {order.customerName}
          </p>

        </div>

        <div>

          <p className="text-gray-500">
            Email
          </p>

          <p className="font-semibold">
            {order.customerEmail}
          </p>

        </div>

        <div>

          <p className="text-gray-500">
            Phone
          </p>

          <p className="font-semibold">
            {order.customerPhone}
          </p>

        </div>

        <div>

          <p className="text-gray-500">
            Payment Method
          </p>

          <div>
  <p className="text-gray-500">
    Created On
  </p>

  <p className="font-semibold">
    {new Date(order.createdAt).toLocaleString()}
  </p>
</div>

<div>
  <p className="text-gray-500">
    Last Updated
  </p>

  <p className="font-semibold">
    {new Date(order.updatedAt).toLocaleString()}
  </p>
</div>

          <p className="font-semibold">
            {order.paymentMethod}
          </p>

        </div>

      </div>

      {/* Address */}

      <div className="mb-8">

        <h3 className="font-semibold mb-2">
          Shipping Address
        </h3>

        <div className="border rounded-lg p-4 bg-gray-50">
          {order.address}
        </div>

      </div>

      {/* Products */}

      <div className="bg-gray-50 rounded-xl p-6 mb-8">

<h3 className="font-semibold text-lg mb-4">

Order Summary

</h3>

<div className="flex justify-between py-2">

<span>

Items

</span>

<span>

{order.items?.length}

</span>

</div>

<div className="flex justify-between py-2">

<span>

Payment Method

</span>

<span>

{order.paymentMethod}

</span>

</div>

<div className="flex justify-between py-2">

<span>

Payment Status

</span>

<span className="font-semibold">

{paymentStatus}

</span>

</div>

<hr className="my-4"/>

<div className="flex justify-between text-xl font-bold">

<span>

Grand Total

</span>

<span>

₹{order.totalAmount}

</span>

</div>

</div>

      <div className="mb-8">

        <h3 className="font-semibold mb-3">
          Ordered Products
        </h3>

        <table className="w-full border">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3 text-left">
                Product
              </th>

              <th className="p-3">
                Qty
              </th>

              <th className="p-3">
                Price
              </th>

              <th className="p-3">
                Total
              </th>

            </tr>

          </thead>

          <tbody>

            {order.items?.map((item: any) => (

              <tr
                key={item.id}
                className="border-t"
              >

                <td className="p-3">

<div className="flex items-center gap-4">

<img
src={
item.product?.thumbnail ||
"/placeholder.png"
}
className="w-16 h-16 rounded-lg object-cover"
/>

<div>

<p className="font-semibold">

{item.product?.name}

</p>

<p className="text-sm text-gray-500">

ID #{item.product?.id}

</p>

</div>

</div>

</td>

                <td className="text-center">
                  {item.quantity}
                </td>

                <td className="text-center">
                  ₹{item.price}
                </td>

                <td className="text-center">
                  ₹
                  {Number(item.price) *
                    item.quantity}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Status */}

      <div className="grid grid-cols-2 gap-5 mb-8">

        <div>

          <label className="block mb-2 font-medium">
            Order Status
          </label>

          <select
            className="w-full border rounded-lg p-3"
            value={orderStatus}
            onChange={(e) =>
              setOrderStatus(
                e.target.value
              )
            }
          >

            <option>PENDING</option>
            <option>CONFIRMED</option>
            <option>PACKED</option>
            <option>SHIPPED</option>
            <option>DELIVERED</option>
            <option>CANCELLED</option>

          </select>

        </div>

        <div>

          <label className="block mb-2 font-medium">
            Payment Status
          </label>

          <select
            className="w-full border rounded-lg p-3"
            value={paymentStatus}
            onChange={(e) =>
              setPaymentStatus(
                e.target.value
              )
            }
          >

            <option>PENDING</option>
            <option>PAID</option>
            <option>FAILED</option>

          </select>

        </div>

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-4 mt-8">

<button
onClick={saveStatus}
disabled={loading}
className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
>
{loading ? "Saving..." : "Save Changes"}
</button>

<button
onClick={cancelCurrentOrder}
className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
>
Cancel Order
</button>

<button
onClick={onClose}
className="border px-6 py-3 rounded-lg"
>
Close
</button>

</div>

    </div>
  );
}