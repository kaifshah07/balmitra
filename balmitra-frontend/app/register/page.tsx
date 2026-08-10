"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerCustomer } from "../admin/services/api/customerAuth";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    const result = await registerCustomer(form);

    console.log("Registration response:", result);

    if (!result.success) {
      throw new Error(
        result.message || "Registration failed"
      );
    }

    if (result.data?.requiresVerification) {
      router.push(
        `/verify-otp?customerId=${result.data.customerId}&email=${encodeURIComponent(
          result.data.email
        )}`
      );

      return;
    }

    throw new Error(
      "Unexpected registration response"
    );

  } catch (error: any) {
    console.error(
      "Registration Error:",
      error
    );

    setError(
      error?.response?.data?.message ||
      error?.message ||
      "Registration failed"
    );

  } finally {
    setLoading(false);
  }
}

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-12">
      <div className="flex min-h-[80vh] items-center justify-center">

        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">

          <h1 className="text-3xl font-bold text-[#0B1220]">
            Create Account
          </h1>

          <p className="mt-2 text-gray-500">
            Create your Balmitra customer account.
          </p>

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-4"
          >

            {/* NAME */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Full Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                className="w-full rounded-lg border p-3 outline-none focus:border-[#C67C2E]"
              />
            </div>

            {/* EMAIL */}

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

            {/* PHONE */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Phone Number
              </label>

              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="10-digit mobile number"
                maxLength={10}
                required
                className="w-full rounded-lg border p-3 outline-none focus:border-[#C67C2E]"
              />
            </div>

            {/* PASSWORD */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Create a password"
                minLength={6}
                required
                className="w-full rounded-lg border p-3 outline-none focus:border-[#C67C2E]"
              />
            </div>

            {/* CONFIRM PASSWORD */}

            <div>
              <label className="mb-2 block text-sm font-medium">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                minLength={6}
                required
                className="w-full rounded-lg border p-3 outline-none focus:border-[#C67C2E]"
              />
            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#C67C2E] py-3 font-semibold text-white transition hover:bg-[#A7641E] disabled:cursor-not-allowed disabled:bg-gray-300"
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}

            <Link
              href="/login"
              className="font-semibold text-[#C67C2E]"
            >
              Login
            </Link>
          </p>

        </div>

      </div>
    </main>
  );
}