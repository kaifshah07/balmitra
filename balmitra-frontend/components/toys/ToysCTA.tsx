"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ToysCTA() {
  return (
    <section className="bg-[#FCFBF8] py-16 lg:py-20">

      <div className="container mx-auto px-6">


        <div className="relative overflow-hidden rounded-[40px] bg-[linear-gradient(135deg,#FFF7ED_0%,#FCFBF8_50%,#F1F6FF_100%)] px-8 py-14 text-center shadow-sm lg:px-20">


          {/* Decorative Glow */}

          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-orange-200/40 blur-[120px]" />

          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-blue-200/40 blur-[120px]" />



          <div className="relative mx-auto max-w-3xl">


            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-[#E6D8C6] bg-white/80 px-5 py-2 backdrop-blur-md">

              <Sparkles
                size={16}
                className="text-[#C67C2E]"
              />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C67C2E]">
                Premium Toy Experience
              </span>

            </div>



            {/* Heading */}

            <h2 className="mt-8 text-4xl font-black leading-tight text-[#0B1220] lg:text-5xl">

              Make Every Moment

              <span className="block text-[#C67C2E]">
                Meaningful.
              </span>

            </h2>



            {/* Description */}

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-500">

              Discover premium toys that bring imagination to life,
              encourage learning, and create beautiful childhood memories
              that last forever.

            </p>



            {/* Button */}

            <div className="mt-10 flex justify-center">


              <Link
                href="#products"
                className="group inline-flex items-center rounded-full bg-[#C67C2E] px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#A7641E] hover:shadow-xl"
              >

                Explore Premium Toys

                <ArrowRight
                  size={18}
                  className="ml-2 transition group-hover:translate-x-1"
                />

              </Link>


            </div>


          </div>


        </div>


      </div>


    </section>
  );
}