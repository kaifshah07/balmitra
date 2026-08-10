"use client";

import { useEffect, useState } from "react";
import {
  getCustomers,
  getCustomer,
  deleteCustomer,
  blockCustomer,
  unblockCustomer,
} from "../services/api/customers";

import CustomerForm from "./CustomerForm";
import CustomerDetails from "./CustomerDetails";

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  const [selectedCustomer, setSelectedCustomer] =
    useState<any>(null);

  const [filters, setFilters] = useState({
    search: "",
    page: 1,
  });

  useEffect(() => {
    loadCustomers();
  }, [filters]);

  async function loadCustomers() {
    try {
      setLoading(true);

      const data = await getCustomers(filters);

      setCustomers(data.customers || []);

      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete customer?")) return;

    await deleteCustomer(id);

    loadCustomers();
  }

  async function toggleBlock(customer: any) {
    if (customer.isBlocked) {
      await unblockCustomer(customer.id);
    } else {
      await blockCustomer(customer.id);
    }

    loadCustomers();
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-orange-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">

          Customers

        </h1>

        <button
          onClick={() => {
            setSelectedCustomer(null);
            setShowForm(true);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Customer
        </button>

      </div>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-3 gap-5 mb-8">

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Total Customers
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {customers.length}
          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Active
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">

            {
              customers.filter(
                (c) => !c.isBlocked
              ).length
            }

          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <p className="text-gray-500">
            Blocked
          </p>

          <h2 className="text-3xl font-bold text-red-600 mt-2">

            {
              customers.filter(
                (c) => c.isBlocked
              ).length
            }

          </h2>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-5 mb-6">

        <input
          placeholder="Search customer..."
          value={filters.search}
          onChange={(e) =>
            setFilters({
              ...filters,
              search: e.target.value,
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
                Name
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Phone
              </th>

              <th className="p-4 text-left">
                Orders
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

            {customers.length === 0 ? (

              <tr>

                <td
                  colSpan={6}
                  className="text-center p-16"
                >

                  No Customers Found

                </td>

              </tr>

            ) : (

              customers.map((customer) => (

                <tr
                  key={customer.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">
                    {customer.name}
                  </td>

                  <td className="p-4">
                    {customer.email}
                  </td>

                  <td className="p-4">
                    {customer.phone}
                  </td>

                  <td className="p-4">
                    {customer.orders?.length || 0}
                  </td>

                  <td className="p-4">

                    {customer.isBlocked ? (

                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">

                        Blocked

                      </span>

                    ) : (

                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                        Active

                      </span>

                    )}

                  </td>

                  <td className="p-4 flex gap-2">

                    <button
  onClick={async () => {
    try {
      const fullCustomer = await getCustomer(customer.id);

      setSelectedCustomer(fullCustomer);
    } catch (error) {
      console.error(error);
      alert("Unable to load customer details");
    }
  }}
  className="bg-blue-500 text-white px-3 py-1 rounded"
>
  View
</button>

                    <button
                      onClick={() =>
                        toggleBlock(customer)
                      }
                      className={`px-3 py-1 rounded text-white ${
                        customer.isBlocked
                          ? "bg-green-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {customer.isBlocked
                        ? "Unblock"
                        : "Block"}
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(customer.id)
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

      {/* Pagination */}

      {pagination && (

        <div className="flex justify-end gap-4 mt-6">

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

      {/* Customer Form */}

      {showForm && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white rounded-xl p-8 w-full max-w-2xl">

            <CustomerForm
              customer={selectedCustomer}
              onClose={() => setShowForm(false)}
              onSuccess={loadCustomers}
            />

          </div>

        </div>

      )}

      {/* Customer Details */}

      {selectedCustomer && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white rounded-xl p-8 w-full max-w-4xl max-h-[90vh] overflow-y-auto">

            <CustomerDetails
              customer={selectedCustomer}
              onClose={() =>
                setSelectedCustomer(null)
              }
            />

          </div>

        </div>

      )}

    </div>
  );
}