"use client";

import { useEffect, useState } from "react";

import {
  getPayments,
} from "../services/api/payments";

import PaymentDetails from "./PaymentDetails";

export default function PaymentsPage() {

  const [payments, setPayments] = useState<any[]>([]);

  const [pagination, setPagination] =
    useState<any>();

  const [selectedPayment, setSelectedPayment] =
    useState<any>(null);

  const [filters, setFilters] =
    useState({

      search: "",

      page: 1,

    });

  useEffect(() => {

    loadPayments();

  }, [filters]);

  async function loadPayments() {

    const data =
      await getPayments(filters);

    setPayments(data.payments);

    setPagination(data.pagination);

  }

  return (

    <div>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold">

          Payments

        </h1>

      </div>

      {/* Dashboard */}

      <div className="grid grid-cols-4 gap-5 mb-8">

        <div className="bg-white rounded-xl shadow p-6">

          <p>Total Payments</p>

          <h2 className="text-3xl font-bold">

            {payments.length}

          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <p>Paid</p>

          <h2 className="text-3xl font-bold text-green-600">

            {
              payments.filter(
                p =>
                  p.paymentStatus === "PAID"
              ).length
            }

          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <p>Pending</p>

          <h2 className="text-3xl font-bold text-yellow-600">

            {
              payments.filter(
                p =>
                  p.paymentStatus === "PENDING"
              ).length
            }

          </h2>

        </div>

        <div className="bg-white rounded-xl shadow p-6">

          <p>Refunded</p>

          <h2 className="text-3xl font-bold text-red-600">

            {
              payments.filter(
                p =>
                  p.paymentStatus === "REFUNDED"
              ).length
            }

          </h2>

        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-xl shadow p-5 mb-6">

        <input

          placeholder="Search Payment"

          value={filters.search}

          onChange={(e)=>

            setFilters({

              ...filters,

              search:e.target.value

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

              <th className="p-4">

                Payment ID

              </th>

              <th>

                Customer

              </th>

              <th>

                Amount

              </th>

              <th>

                Method

              </th>

              <th>

                Status

              </th>

              <th>

                Action

              </th>

            </tr>

          </thead>

          <tbody>

            {

              payments.map(payment=>(

                <tr
                  key={payment.id}
                  className="border-t"
                >

                  <td className="p-4">

                    {payment.paymentId}

                  </td>

                  <td>

                    {
                      payment.order
                      ?.customer?.name
                    }

                  </td>

                  <td>

                    ₹{payment.amount}

                  </td>

                  <td>

                    {payment.paymentMethod}

                  </td>

                  <td>

                    {payment.paymentStatus}

                  </td>

                  <td>

                    <button

                      onClick={()=>

                        setSelectedPayment(payment)

                      }

                      className="bg-blue-500 text-white px-3 py-1 rounded"

                    >

                      View

                    </button>

                  </td>

                </tr>

              ))

            }

          </tbody>

        </table>

      </div>

      {/* Pagination */}

      {

        pagination && (

          <div className="flex justify-end gap-4 mt-6">

            <button

              disabled={pagination.page===1}

              onClick={()=>setFilters({

                ...filters,

                page:pagination.page-1

              })}

              className="border px-4 py-2 rounded"

            >

              Previous

            </button>

            <span>

              Page

              {pagination.page}

              /

              {pagination.totalPages}

            </span>

            <button

              disabled={

                pagination.page===pagination.totalPages

              }

              onClick={()=>setFilters({

                ...filters,

                page:pagination.page+1

              })}

              className="border px-4 py-2 rounded"

            >

              Next

            </button>

          </div>

        )

      }

      {/* Details Modal */}

      {

        selectedPayment && (

          <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

            <div className="bg-white rounded-xl p-8 w-full max-w-4xl">

              <PaymentDetails

                payment={selectedPayment}

                onClose={()=>{

                  setSelectedPayment(null);

                  loadPayments();

                }}

              />

            </div>

          </div>

        )

      }

    </div>

  );

}