"use client";

import { useEffect, useState } from "react";
import {
  getOrders,
  deleteOrder,
} from "../services/api/orders";

import OrderDetails from "./OrderDetails";
import { getOrderById } from "../services/api/orders";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<any>(null);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const [filters, setFilters] = useState({
    search: "",
    orderStatus: "",
    paymentStatus: "",
    page: 1,
  });

  useEffect(() => {
    loadOrders();
  }, [filters]);

  async function loadOrders() {
  try {
    setLoading(true);

    const data = await getOrders(filters);

    setOrders(data.orders || []);
    setPagination(data.pagination);
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

  async function handleDelete(id: number) {
    const confirmDelete = confirm(
      "Delete this order?"
    );

    if (!confirmDelete) return;

    try {
      await deleteOrder(id);
      loadOrders();
    } catch (error) {
      console.error(error);
      alert("Failed to delete order");
    }
  }
  if (loading) {
  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-orange-500"></div>
    </div>
  );
}

const handleView = async (id: number) => {
  try {
    const order = await getOrderById(id);
    setSelectedOrder(order);
  } catch (error) {
    console.error(error);
    alert("Failed to load order");
  }
};

  return (
    <div>

      <div className="flex justify-between items-center mb-8">

        <div className="grid grid-cols-4 gap-5 mt-8 mb-8">

<div className="bg-white rounded-xl shadow p-6">

<p className="text-gray-500">
Total Orders
</p>

<h2 className="text-3xl font-bold mt-2">
{orders.length}
</h2>

</div>

<div className="bg-white rounded-xl shadow p-6">

<p className="text-gray-500">
Pending
</p>

<h2 className="text-3xl font-bold text-yellow-600 mt-2">

{
orders.filter(

o=>o.orderStatus==="PENDING"

).length
}

</h2>

</div>

<div className="bg-white rounded-xl shadow p-6">

<p className="text-gray-500">
Delivered
</p>

<h2 className="text-3xl font-bold text-green-600 mt-2">

{
orders.filter(

o=>o.orderStatus==="DELIVERED"

).length
}

</h2>

</div>

<div className="bg-white rounded-xl shadow p-6">

<p className="text-gray-500">
Revenue
</p>

<h2 className="text-3xl font-bold text-orange-500 mt-2">

₹{

orders.reduce(

(sum,o)=>

sum+Number(o.totalAmount),

0

)

}

</h2>

</div>

</div>

      </div>

      {/* Filters */}

      <div className="bg-white rounded-xl shadow p-5 mb-6 flex gap-4">

        <input
          placeholder="Search Order..."
          value={filters.search}
          onChange={(e) =>
            setFilters({
              ...filters,
              search: e.target.value,
            })
          }
          className="border rounded-lg p-3 flex-1"
        />

        <select
          className="border rounded-lg p-3"
          value={filters.orderStatus}
          onChange={(e) =>
            setFilters({
              ...filters,
              orderStatus: e.target.value,
            })
          }
        >
          <option value="">All Status</option>
          <option value="PENDING">Pending</option>
          <option value="CONFIRMED">Confirmed</option>
          <option value="PACKED">Packed</option>
          <option value="SHIPPED">Shipped</option>
          <option value="DELIVERED">Delivered</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <select
          className="border rounded-lg p-3"
          value={filters.paymentStatus}
          onChange={(e) =>
            setFilters({
              ...filters,
              paymentStatus: e.target.value,
            })
          }
        >
          <option value="">Payment</option>
          <option value="PENDING">Pending</option>
          <option value="PAID">Paid</option>
          <option value="FAILED">Failed</option>
        </select>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Order</th>

              <th className="p-4 text-left">Customer</th>

              <th className="p-4 text-left">Phone</th>

              <th className="p-4 text-left">Amount</th>

              <th className="p-4 text-left">Payment</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {orders.length === 0 ? (

              <tr>

                <td
colSpan={7}
className="text-center p-16"
>

<div className="flex flex-col items-center">

<div className="text-6xl mb-4">

📦

</div>

<h2 className="text-xl font-semibold">

No Orders Yet

</h2>

<p className="text-gray-500 mt-2">

Orders will appear here after customers place them.

</p>

</div>

</td>

              </tr>

            ) : (

              orders.map((order) => (

                <tr
                  key={order.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">
                    {order.orderNumber}
                  </td>

                  <td className="p-4">
                    {order.customerName}
                  </td>

                  <td className="p-4">
                    {order.customerPhone}
                  </td>

                  <td className="p-4">
                    ₹{order.totalAmount}
                  </td>

                  <td className="p-4">
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium
      ${
        order.paymentStatus === "PAID"
          ? "bg-green-100 text-green-700"
          : order.paymentStatus === "FAILED"
          ? "bg-red-100 text-red-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
  >
    {order.paymentStatus}
  </span>
</td>

<td className="p-4">
  <span
    className={`px-3 py-1 rounded-full text-sm font-medium
      ${
        order.orderStatus === "DELIVERED"
          ? "bg-green-100 text-green-700"
          : order.orderStatus === "CANCELLED"
          ? "bg-red-100 text-red-700"
          : order.orderStatus === "SHIPPED"
          ? "bg-blue-100 text-blue-700"
          : order.orderStatus === "PACKED"
          ? "bg-purple-100 text-purple-700"
          : order.orderStatus === "CONFIRMED"
          ? "bg-indigo-100 text-indigo-700"
          : "bg-yellow-100 text-yellow-700"
      }`}
  >
    {order.orderStatus}
  </span>
</td>

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() => handleView(order.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      View
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(order.id)
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

      {selectedOrder && (

        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white rounded-xl p-8 max-w-3xl w-full">

            <OrderDetails
              order={selectedOrder}
              onClose={() =>
                setSelectedOrder(null)
              }
            />

          </div>

        </div>

      )}

      {pagination && (

<div className="flex justify-end items-center gap-4 mt-6">

<button
disabled={pagination.page===1}
onClick={()=>

setFilters({
...filters,
page:pagination.page-1
})

}
className="border px-4 py-2 rounded disabled:opacity-50"
>

Previous

</button>

<span>

Page {pagination.page} of {pagination.totalPages}

</span>

<button
disabled={pagination.page===pagination.totalPages}
onClick={()=>

setFilters({
...filters,
page:pagination.page+1
})

}
className="border px-4 py-2 rounded disabled:opacity-50"
>

Next

</button>

</div>

)}

    </div>

    
  )
  
  ;
}