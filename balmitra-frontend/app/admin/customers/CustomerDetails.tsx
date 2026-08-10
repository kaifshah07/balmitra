"use client";

interface Props {
  customer: any;
  onClose: () => void;
}

export default function CustomerDetails({
  customer,
  onClose,
}: Props) {

  const totalSpent =
    customer.orders?.reduce(
      (sum: number, order: any) =>
        sum + Number(order.totalAmount),
      0
    ) || 0;

  return (
    <div>

      {/* Header */}

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-2xl font-bold">

          Customer Details

        </h2>

        <button
          onClick={onClose}
          className="text-3xl"
        >
          ×
        </button>

      </div>

      {/* Summary */}

      <div className="grid grid-cols-3 gap-5 mb-8">

        <div className="bg-orange-50 rounded-xl p-5">

          <p className="text-gray-500">
            Total Orders
          </p>

          <h2 className="text-3xl font-bold text-orange-600 mt-2">

            {customer.orders?.length || 0}

          </h2>

        </div>

        <div className="bg-green-50 rounded-xl p-5">

          <p className="text-gray-500">
            Total Spent
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">

            ₹{totalSpent}

          </h2>

        </div>

        <div className="bg-blue-50 rounded-xl p-5">

          <p className="text-gray-500">
            Status
          </p>

          <h2 className="text-2xl font-bold mt-2">

            {customer.isBlocked
              ? "Blocked"
              : "Active"}

          </h2>

        </div>

      </div>

      {/* Customer Info */}

      <div className="bg-white border rounded-xl p-6 mb-8">

        <h3 className="text-xl font-semibold mb-5">

          Customer Information

        </h3>

        <div className="grid grid-cols-2 gap-5">

          <div>

            <p className="text-gray-500">
              Name
            </p>

            <p className="font-semibold">

              {customer.name}

            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Email
            </p>

            <p className="font-semibold">

              {customer.email}

            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Phone
            </p>

            <p className="font-semibold">

              {customer.phone}

            </p>

          </div>

          <div>

            <p className="text-gray-500">
              Joined
            </p>

            <p className="font-semibold">

              {new Date(
                customer.createdAt
              ).toLocaleDateString()}

            </p>

          </div>

        </div>

      </div>

      {/* Orders */}

      <div className="bg-white border rounded-xl p-6">

        <h3 className="text-xl font-semibold mb-5">

          Order History

        </h3>

        {customer.orders?.length === 0 ? (

          <div className="text-center text-gray-500 py-10">

            No Orders Yet

          </div>

        ) : (

          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-3 text-left">

                  Order

                </th>

                <th className="p-3 text-left">

                  Amount

                </th>

                <th className="p-3 text-left">

                  Payment

                </th>

                <th className="p-3 text-left">

                  Status

                </th>

                <th className="p-3 text-left">

                  Date

                </th>

              </tr>

            </thead>

            <tbody>

              {customer.orders.map(
                (order: any) => (

                  <tr
                    key={order.id}
                    className="border-t"
                  >

                    <td className="p-3">

                      #{order.id}

                    </td>

                    <td className="p-3">

                      ₹{order.totalAmount}

                    </td>

                    <td className="p-3">

                      {order.paymentStatus}

                    </td>

                    <td className="p-3">

                      {order.orderStatus}

                    </td>

                    <td className="p-3">

                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        )}

      </div>

      {/* Footer */}

      <div className="flex justify-end mt-8">

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