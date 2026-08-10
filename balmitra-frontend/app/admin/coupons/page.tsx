"use client";

import { useEffect, useState } from "react";
import {
  getCoupons,
  deleteCoupon,
  activateCoupon,
  deactivateCoupon,
} from "../services/api/coupons";

import CouponForm from "./CouponForm";

export default function CouponsPage() {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [selectedCoupon, setSelectedCoupon] =
    useState<any>(null);

  const [filters, setFilters] = useState({
    search: "",
    page: 1,
  });

  useEffect(() => {
    loadCoupons();
  }, [filters]);

  async function loadCoupons() {
    try {
      setLoading(true);

      const data = await getCoupons(filters);

      setCoupons(data.coupons || []);

      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const ok = confirm(
      "Delete this coupon?"
    );

    if (!ok) return;

    try {
      await deleteCoupon(id);
      loadCoupons();
    } catch (error) {
      console.error(error);
      alert("Failed to delete coupon");
    }
  }

  async function toggleStatus(coupon: any) {
    try {
      if (coupon.isActive) {
        await deactivateCoupon(coupon.id);
      } else {
        await activateCoupon(coupon.id);
      }

      loadCoupons();
    } catch (error) {
      console.error(error);
      alert("Unable to update coupon");
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="w-12 h-12 rounded-full border-4 border-gray-300 border-t-orange-500 animate-spin"></div>
      </div>
    );
  }

  return (
    <div>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">
          Coupons
        </h1>

        <button
          onClick={() => {
            setSelectedCoupon(null);
            setShowForm(true);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Coupon
        </button>

      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-3 gap-5 mb-8">

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Total Coupons
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {coupons.length}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Active Coupons
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            {
              coupons.filter(
                (coupon) => coupon.isActive
              ).length
            }
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Inactive Coupons
          </p>

          <h2 className="text-3xl font-bold text-red-600 mt-2">
            {
              coupons.filter(
                (coupon) => !coupon.isActive
              ).length
            }
          </h2>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-5 mb-6">

        <input
          placeholder="Search Coupon..."
          value={filters.search}
          onChange={(e) =>
            setFilters({
              ...filters,
              search: e.target.value,
              page: 1,
            })
          }
          className="w-full border rounded-lg p-3"
        />

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">
                Code
              </th>

              <th className="p-4 text-left">
                Type
              </th>

              <th className="p-4 text-left">
                Value
              </th>

              <th className="p-4 text-left">
                Min Order
              </th>

              <th className="p-4 text-left">
                Expiry
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {coupons.length === 0 ? (

              <tr>

                <td
                  colSpan={7}
                  className="text-center p-16 text-gray-500"
                >

                  No Coupons Found

                </td>

              </tr>

            ) : (

              coupons.map((coupon) => (

                <tr
                  key={coupon.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4 font-semibold">
                    {coupon.code}
                  </td>

                  <td className="p-4">
                    {coupon.discountType}
                  </td>

                  <td className="p-4">
                    {coupon.discountValue}
                  </td>

                  <td className="p-4">
                    ₹{coupon.minOrderAmount ?? 0}
                  </td>

                  <td className="p-4">

                    {coupon.expiresAt
                      ? new Date(
                          coupon.expiresAt
                        ).toLocaleDateString()
                      : "-"}

                  </td>

                  <td className="p-4">

                    {coupon.isActive ? (

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                        Active

                      </span>

                    ) : (

                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">

                        Inactive

                      </span>

                    )}

                  </td>

                  <td className="p-4 flex gap-2">

                    <button
                      onClick={() => {
                        setSelectedCoupon(coupon);
                        setShowForm(true);
                      }}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        toggleStatus(coupon)
                      }
                      className={`px-3 py-1 rounded text-white ${
                        coupon.isActive
                          ? "bg-yellow-500 hover:bg-yellow-600"
                          : "bg-green-500 hover:bg-green-600"
                      }`}
                    >
                      {coupon.isActive
                        ? "Deactivate"
                        : "Activate"}
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(coupon.id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
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

      {/* Pagination */}

      {pagination && (

        <div className="flex justify-end items-center gap-4 mt-6">

          <button
            disabled={pagination.page === 1}
            onClick={() =>
              setFilters({
                ...filters,
                page: pagination.page - 1,
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
            disabled={
              pagination.page ===
              pagination.totalPages
            }
            onClick={() =>
              setFilters({
                ...filters,
                page: pagination.page + 1,
              })
            }
            className="border px-4 py-2 rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>

      )}

      {/* Coupon Form Modal */}

      {showForm && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white rounded-xl p-8 w-full max-w-2xl">

            <CouponForm
              coupon={selectedCoupon}
              onClose={() => setShowForm(false)}
              onSuccess={loadCoupons}
            />

          </div>

        </div>

      )}

    </div>
  );
}