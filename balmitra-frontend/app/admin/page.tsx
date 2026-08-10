"use client";

import { useEffect, useState } from "react";
import { getDashboard } from "./services/api/dashboard";

interface Product {
  id: number;
  name: string;
  stock: number;
  category?: {
    name: string;
  };
}

interface DashboardData {
  statistics: {
    totalProducts: number;
    totalCategories: number;
    totalOrders: number;
    totalCustomers: number;
    totalRevenue: number;
    pendingOrders: number;
    completedOrders: number;
  };

  recentProducts: Product[];

  lowStockProducts: Product[];
}

export default function AdminDashboard() {

  
  const [loading, setLoading] = useState(true);

  const [dashboard, setDashboard] = useState<DashboardData>({
  statistics: {
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    completedOrders: 0,
  },

  recentProducts: [],

  lowStockProducts: [],
});

  

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      setLoading(true);

      const data = await getDashboard();

      if (data.success) {
        setDashboard(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="text-xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <h1 className="text-4xl font-bold">
        Dashboard
      </h1>

      {/* Statistics */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Products
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {dashboard.statistics.totalProducts}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Categories
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {dashboard.statistics.totalCategories}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Orders
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {dashboard.statistics.totalOrders}
          </h2>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-gray-500">
            Revenue
          </p>

          <h2 className="text-3xl font-bold mt-2">
            ₹{dashboard.statistics.totalRevenue}
          </h2>
        </div>

      </div>

      {/* Recent Products */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-semibold mb-4">
          Recent Products
        </h2>

        {dashboard.recentProducts.length === 0 ? (
          <p className="text-gray-500">
            No products found.
          </p>
        ) : (
          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Name
                </th>

                <th className="text-left py-3">
                  Category
                </th>

                <th className="text-left py-3">
                  Stock
                </th>

              </tr>

            </thead>

            <tbody>

              {dashboard.recentProducts.map((product) => (

                <tr
                  key={product.id}
                  className="border-b"
                >

                  <td className="py-3">
                    {product.name}
                  </td>

                  <td className="py-3">
                    {product.category?.name}
                  </td>

                  <td className="py-3">
                    {product.stock}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

      </div>

      {/* Low Stock */}

      <div className="bg-white rounded-xl shadow p-6">

        <h2 className="text-2xl font-semibold mb-4">
          Low Stock Products
        </h2>

        {dashboard.lowStockProducts.length === 0 ? (
          <p className="text-gray-500">
            No low stock products.
          </p>
        ) : (
          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="text-left py-3">
                  Name
                </th>

                <th className="text-left py-3">
                  Stock
                </th>

              </tr>

            </thead>

            <tbody>

              {dashboard.lowStockProducts.map((product) => (

                <tr
                  key={product.id}
                  className="border-b"
                >

                  <td className="py-3">
                    {product.name}
                  </td>

                  <td className="py-3 text-red-600 font-semibold">
                    {product.stock}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}