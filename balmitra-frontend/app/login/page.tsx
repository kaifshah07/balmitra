"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginCustomer } from "../admin/services/api/customerAuth";

export default function LoginPage() {

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    try {

      setLoading(true);

      const result = await loginCustomer(form);

      console.log("Login response:", result);

      if (!result.success) {
        throw new Error(
          result.message || "Login failed"
        );
      }

      const token =
        result.data?.token;

      if (!token) {
        throw new Error(
          "Login successful but token was not returned"
        );
      }

      localStorage.setItem(
        "customer_token",
        token
      );

      const customer =
        result.data?.customer;

      if (customer) {
        localStorage.setItem(
          "customer",
          JSON.stringify(customer)
        );
      }

      router.push("/customer");

    } catch (error: any) {

      console.error(
        "Login Error:",
        error
      );

      alert(
        error?.response?.data?.message ||
        error?.message ||
        "Login failed"
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-6 py-12">

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">

        <h1 className="text-3xl font-bold text-[#0B1220]">
          Welcome Back
        </h1>

        <p className="mt-2 text-gray-500">
          Login to continue shopping.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="mb-2 block text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full rounded-lg border p-3 outline-none focus:border-[#C67C2E]"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="w-full rounded-lg border p-3 outline-none focus:border-[#C67C2E]"
            />

          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#C67C2E] px-6 py-3 font-semibold text-white transition hover:bg-[#A7641E] disabled:bg-gray-300"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>

        </form>

        <p className="mt-6 text-center text-sm text-gray-500">

          Don't have an account?{" "}

          <Link
            href="/register"
            className="font-semibold text-[#C67C2E]"
          >
            Create Account
          </Link>

        </p>

      </div>

    </main>
  );
}