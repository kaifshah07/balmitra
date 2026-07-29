"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function ToysHero() {
  return (
    <section className="relative overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#FFFDF9_0%,#F7F2EA_45%,#FCFBF8_100%)]">

      {/* Background Glow */}
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-100 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-orange-100 blur-[140px]" />


      <div className="container relative mx-auto px-6 py-12 lg:py-16">

        <div className="grid items-center gap-16 lg:grid-cols-2">


          {/* LEFT CONTENT */}

          <div>


            {/* Badge */}

            <div className="inline-flex items-center gap-2 rounded-full border border-[#E6D8C6] bg-[#FFFDF9] px-5 py-2 shadow-sm">

              <Sparkles 
                size={16} 
                className="text-[#C67C2E]" 
              />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#C67C2E]">
                Premium Toy Collection
              </span>

            </div>



            {/* Heading */}

            <h1 className="mt-8 text-5xl font-black leading-tight text-[#0B1220] lg:text-6xl">

              Where Play

              <span className="block text-[#5B8DEF]">
                Creates Wonder.
              </span>

            </h1>



            {/* Description */}

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-500">

              Discover thoughtfully designed toys that inspire imagination,
              creativity, curiosity, and meaningful learning moments while
              bringing endless joy to every childs journey.

            </p>



            {/* Buttons */}

            <div className="mt-12 flex flex-wrap gap-5">


              <Link
                href="#featured"
                className="rounded-full bg-[#C67C2E] px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#A7641E] hover:shadow-xl"
              >
                Explore Toys
              </Link>



              <Link
                href="#age"
                className="group flex items-center rounded-full border border-gray-200 bg-white px-8 py-4 font-semibold text-[#0B1220] transition hover:border-[#5B8DEF]"
              >

                Shop by Age

                <ArrowRight
                  size={18}
                  className="ml-2 transition group-hover:translate-x-1"
                />

              </Link>


            </div>


          </div>




          {/* RIGHT IMAGE */}

          <div className="relative">


            {/* Main Image Card */}

            <div className="overflow-hidden rounded-[36px] border border-white bg-white p-4 shadow-2xl">


              <div className="relative h-[500px] overflow-hidden rounded-[28px]">


                <Image
                  src="/images/toys/hero.jpg"
                  alt="Premium Toys"
                  fill
                  priority
                  sizes="(max-width:1024px)100vw,50vw"
                  className="object-cover"
                />


                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />



                {/* Image Text */}

                <div className="absolute bottom-8 left-8">


                  <p className="text-sm uppercase tracking-[0.3em] text-white/80">
                    Curated Toy Collection
                  </p>


                  <h3 className="mt-2 text-3xl font-bold text-white">
                    Learn Through Play
                  </h3>


                </div>


              </div>


            </div>




            {/* Floating Badge */}

            <div className="absolute -left-5 top-8 rounded-2xl bg-white px-6 py-4 shadow-xl">


              <h4 className="text-3xl font-bold text-[#C67C2E]">
                250+
              </h4>


              <p className="text-sm text-gray-500">
                Premium Toys
              </p>


            </div>


          </div>



        </div>

      </div>


    </section>
  );
}