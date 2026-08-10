"use client";

import { useEffect, useState } from "react";
import { User, Mail, Phone, MapPin, ArrowLeft } from "lucide-react";
import Link from "next/link";

type Customer = {
  id?: number;
  name?: string;
  email?: string;
  mobile?: string;
  phone?: string;
  address?: string;
};

export default function CustomerProfilePage() {
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    const storedCustomer = localStorage.getItem("customer");

    if (storedCustomer) {
      try {
        setCustomer(JSON.parse(storedCustomer));
      } catch (error) {
        console.error("Failed to parse customer:", error);
      }
    }
  }, []);

  return (
    <div className="min-h-[80vh] bg-[#FAFAF8] px-4 py-10">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/customer"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#C67C2E]"
          >
            <ArrowLeft size={16} />
            Back to Account
          </Link>

          <h1 className="text-3xl font-bold text-[#0B1220]">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your account information.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-black/5 bg-white shadow-sm">
          {/* Profile Header */}
          <div className="border-b border-gray-100 bg-[#F7F5F1] px-6 py-8 sm:px-8">
            <div className="flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#C67C2E] text-2xl font-bold text-white">
                {customer?.name
                  ? customer.name.charAt(0).toUpperCase()
                  : "U"}
              </div>

              <div>
                <h2 className="text-xl font-bold text-[#0B1220]">
                  {customer?.name || "Customer"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  {customer?.email || "No email available"}
                </p>
              </div>
            </div>
          </div>

          {/* Information */}
          <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
            <ProfileItem
              icon={<User size={19} />}
              label="Full Name"
              value={customer?.name || "Not available"}
            />

            <ProfileItem
              icon={<Mail size={19} />}
              label="Email"
              value={customer?.email || "Not available"}
            />

            <ProfileItem
              icon={<Phone size={19} />}
              label="Phone"
              value={
                customer?.mobile ||
                customer?.phone ||
                "Not available"
              }
            />

            <ProfileItem
              icon={<MapPin size={19} />}
              label="Address"
              value={customer?.address || "Not available"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-100 bg-[#FAFAF8] p-5">
      <div className="flex items-center gap-3 text-[#C67C2E]">
        {icon}

        <span className="text-sm font-semibold text-gray-500">
          {label}
        </span>
      </div>

      <p className="mt-3 break-words font-medium text-[#0B1220]">
        {value}
      </p>
    </div>
  );
}