"use client";

import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="bg-[#FCFBF8] pt-16">
      <div className="container mx-auto px-6">

        <div className="overflow-hidden rounded-[40px] bg-[linear-gradient(135deg,#FFF7ED_0%,#FCFBF8_50%,#F7F2EA_100%)] px-8 py-12 shadow-sm lg:px-16">

          <div className="grid items-center gap-10 lg:grid-cols-2">

            <div>

              <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C67C2E]">
                Stay Connected
              </span>

              <h2 className="mt-4 text-4xl font-black text-[#0B1220]">
                Join the Balmitra Family
              </h2>

              <p className="mt-5 max-w-xl text-lg leading-8 text-gray-500">
                Be the first to discover new gifts, educational toys,
                exclusive collections and exciting offers.
              </p>

            </div>

            <div>

              <div className="flex flex-col gap-4 sm:flex-row">

                <input
                  type="email"
                  placeholder="Enter your email"
                  className="h-14 flex-1 rounded-full border border-[#E7DED2] bg-white px-6 outline-none transition focus:border-[#C67C2E]"
                />

                <button className="group flex h-14 items-center justify-center rounded-full bg-[#C67C2E] px-8 font-semibold text-white transition hover:bg-[#A7641E]">

                  Subscribe

                  <ArrowRight
                    size={18}
                    className="ml-2 transition group-hover:translate-x-1"
                  />

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}