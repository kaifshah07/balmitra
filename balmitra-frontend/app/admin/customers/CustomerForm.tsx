"use client";

import { useState } from "react";
import {
  createCustomer,
  updateCustomer,
} from "../services/api/customers";

interface Props {
  customer?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CustomerForm({
  customer,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: customer?.name || "",
    email: customer?.email || "",
    phone: customer?.phone || "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  async function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      if (customer) {
        await updateCustomer(
          customer.id,
          form
        );
      } else {
        await createCustomer(form);
      }

      onSuccess();
      onClose();

    } catch (error) {
      console.error(error);
      alert("Failed to save customer");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <h2 className="text-2xl font-bold">

        {customer
          ? "Edit Customer"
          : "Add Customer"}

      </h2>

      <div>

        <label className="block mb-2 font-medium">

          Customer Name

        </label>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

      </div>

      <div>

        <label className="block mb-2 font-medium">

          Email

        </label>

        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

      </div>

      <div>

        <label className="block mb-2 font-medium">

          Phone Number

        </label>

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded-lg p-3"
          required
        />

      </div>

      <div className="flex justify-end gap-4">

        <button
          type="button"
          onClick={onClose}
          className="border px-6 py-3 rounded-lg"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"
        >
          {loading
            ? "Saving..."
            : customer
            ? "Update Customer"
            : "Create Customer"}
        </button>

      </div>

    </form>
  );
}