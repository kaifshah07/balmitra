"use client";

import { useState } from "react";

import {
  updatePaymentStatus,
  refundPayment,
} from "../services/api/payments";

interface Props {
  payment: any;
  onClose: () => void;
}

export default function PaymentDetails({
  payment,
  onClose,
}: Props) {

  const [status, setStatus] = useState(
    payment.paymentStatus
  );

  const [loading, setLoading] =
    useState(false);

  async function saveStatus() {

    try {

      setLoading(true);

      await updatePaymentStatus(
        payment.id,
        status
      );

      alert("Payment Updated");

      onClose();

    } catch (error) {

      console.error(error);

      alert("Unable to update payment");

    } finally {

      setLoading(false);

    }

  }

  async function handleRefund() {

    const ok = confirm(
      "Refund this payment?"
    );

    if (!ok) return;

    try {

      await refundPayment(
        payment.id
      );

      alert("Refund Successful");

      onClose();

    } catch (error) {

      console.error(error);

      alert("Refund Failed");

    }

  }

  return (

    <div>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-2xl font-bold">

          Payment Details

        </h2>

        <button
          onClick={onClose}
          className="text-2xl"
        >

          ✕

        </button>

      </div>

      {/* Payment Information */}

      <div className="grid grid-cols-2 gap-6 mb-8">

        <div>

          <p className="text-gray-500">

            Payment ID

          </p>

          <p className="font-semibold">

            {payment.paymentId}

          </p>

        </div>

        <div>

          <p className="text-gray-500">

            Amount

          </p>

          <p className="font-semibold">

            ₹{payment.amount}

          </p>

        </div>

        <div>

          <p className="text-gray-500">

            Payment Method

          </p>

          <p className="font-semibold">

            {payment.paymentMethod}

          </p>

        </div>

        <div>

          <p className="text-gray-500">

            Transaction ID

          </p>

          <p className="font-semibold">

            {payment.transactionId || "-"}

          </p>

        </div>

        <div>

          <p className="text-gray-500">

            Razorpay Order ID

          </p>

          <p className="font-semibold break-all">

            {payment.razorpayOrderId || "-"}

          </p>

        </div>

        <div>

          <p className="text-gray-500">

            Razorpay Payment ID

          </p>

          <p className="font-semibold break-all">

            {payment.razorpayPaymentId || "-"}

          </p>

        </div>

      </div>

      {/* Customer */}

      <div className="mb-8">

        <h3 className="font-semibold mb-3">

          Customer

        </h3>

        <div className="bg-gray-50 rounded-lg p-5">

          <p>

            <strong>Name :</strong>{" "}
            {payment.order?.customer?.name}

          </p>

          <p>

            <strong>Email :</strong>{" "}
            {payment.order?.customer?.email}

          </p>

          <p>

            <strong>Phone :</strong>{" "}
            {payment.order?.customer?.phone}

          </p>

        </div>

      </div>

      {/* Order */}

      <div className="mb-8">

        <h3 className="font-semibold mb-3">

          Order

        </h3>

        <div className="bg-gray-50 rounded-lg p-5">

          <p>

            <strong>Order Number :</strong>{" "}
            {payment.order?.orderNumber}

          </p>

          <p>

            <strong>Total :</strong> ₹
            {payment.order?.totalAmount}

          </p>

          <p>

            <strong>Order Status :</strong>{" "}
            {payment.order?.orderStatus}

          </p>

        </div>

      </div>

      {/* Products */}

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

              <th>

                Qty

              </th>

              <th>

                Price

              </th>

              <th>

                Total

              </th>

            </tr>

          </thead>

          <tbody>

            {

              payment.order?.items?.map(
                (item:any)=>(
                  <tr
                    key={item.id}
                    className="border-t"
                  >

                    <td className="p-3">

                      {item.product?.name}

                    </td>

                    <td className="text-center">

                      {item.quantity}

                    </td>

                    <td className="text-center">

                      ₹{item.price}

                    </td>

                    <td className="text-center">

                      ₹{
                        Number(item.price) *
                        item.quantity
                      }

                    </td>

                  </tr>
                )
              )

            }

          </tbody>

        </table>

      </div>

      {/* Status */}

      <div className="mb-8">

        <label className="block mb-2 font-medium">

          Payment Status

        </label>

        <select

          value={status}

          onChange={(e)=>
            setStatus(e.target.value)
          }

          className="w-full border rounded-lg p-3"

        >

          <option value="PENDING">

            PENDING

          </option>

          <option value="PAID">

            PAID

          </option>

          <option value="FAILED">

            FAILED

          </option>

          <option value="REFUNDED">

            REFUNDED

          </option>

        </select>

      </div>

      {/* Buttons */}

      <div className="flex gap-4">

        <button

          onClick={saveStatus}

          disabled={loading}

          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"

        >

          {loading
            ? "Saving..."
            : "Save Changes"}

        </button>

        <button

          onClick={handleRefund}

          className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"

        >

          Refund

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