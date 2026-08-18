"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  verifyCustomerOtp,
  resendCustomerOtp,
} from "../admin/services/api/customerAuth";

function VerifyOtpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const customerId = searchParams.get("customerId");
  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!customerId) {
      router.replace("/register");
    }
  }, [customerId, router]);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();

    if (!customerId) {
      setError("Invalid verification request");
      return;
    }

    if (otp.length !== 6) {
      setError("Please enter the 6-digit OTP");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setMessage("");

      const result = await verifyCustomerOtp(
        Number(customerId),
        otp
      );

      if (!result.success) {
        throw new Error(
          result.message || "OTP verification failed"
        );
      }

      const token = result.data?.token;

      if (!token) {
        throw new Error(
          "Verification successful but token was not returned"
        );
      }

      localStorage.setItem("customer_token", token);

      if (result.data?.customer) {
        localStorage.setItem(
          "customer",
          JSON.stringify(result.data.customer)
        );
      }

      router.push("/customer");
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
        error?.message ||
        "OTP verification failed"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!customerId) return;

    try {
      setResending(true);
      setError("");
      setMessage("");

      const result = await resendCustomerOtp(
        Number(customerId)
      );

      if (!result.success) {
        throw new Error(
          result.message || "Unable to resend OTP"
        );
      }

      setMessage(
        "A new verification OTP has been sent to your email."
      );
    } catch (error: any) {
      setError(
        error?.response?.data?.message ||
        error?.message ||
        "Unable to resend OTP"
      );
    } finally {
      setResending(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAFAF8] px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-[#0B1220]">
          Verify Your Email
        </h1>

        <p className="mt-2 text-gray-500">
          We sent a 6-digit verification code to
        </p>

        <p className="mt-1 font-semibold text-[#C67C2E]">
          {email}
        </p>

        {error && (
          <div className="mt-6 rounded-lg bg-red-100 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mt-6 rounded-lg bg-green-100 p-3 text-sm text-green-700">
            {message}
          </div>
        )}

        <form
          onSubmit={handleVerify}
          className="mt-8 space-y-5"
        >
          <div>
            <label className="mb-2 block text-sm font-medium">
              Verification OTP
            </label>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) =>
                setOtp(
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6)
                )
              }
              placeholder="Enter 6-digit OTP"
              className="w-full rounded-lg border p-3 text-center text-xl tracking-[0.4em] outline-none focus:border-[#C67C2E]"
            />
          </div>

          <button
            type="submit"
            disabled={loading || otp.length !== 6}
            className="w-full rounded-lg bg-[#C67C2E] px-6 py-3 font-semibold text-white transition hover:bg-[#A7641E] disabled:bg-gray-300"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Didn't receive the OTP?
          </p>

          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="mt-2 font-semibold text-[#C67C2E] hover:underline disabled:text-gray-400"
          >
            {resending ? "Sending..." : "Resend OTP"}
          </button>
        </div>
      </div>
    </main>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpContent />
    </Suspense>
  );
}