"use client";

import {
  ShieldCheck,
  Brain,
  Sparkles,
  HeartHandshake,
} from "lucide-react";


const features = [
  {
    icon: ShieldCheck,
    title: "Safe Materials",
    description:
      "Every toy is carefully selected with child safety and quality materials in mind.",
    color: "#7BC47F",
  },
  {
    icon: Brain,
    title: "Educational Value",
    description:
      "Toys designed to encourage creativity, curiosity, and meaningful learning.",
    color: "#5B8DEF",
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    description:
      "Beautifully crafted toys that deliver lasting experiences and joyful moments.",
    color: "#C67C2E",
  },
  {
    icon: HeartHandshake,
    title: "Child Approved",
    description:
      "Loved by children and thoughtfully chosen to create memorable playtime.",
    color: "#F4A261",
  },
];


export default function WhyChooseToys() {
  return (
    <section className="bg-[#FCFBF8] py-16 lg:py-20">

      <div className="container mx-auto px-6">


        {/* Heading */}

        <div className="mx-auto mb-12 max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C67C2E]">
            Why Balmitra
          </p>


          <h2 className="mt-4 text-4xl font-black text-[#0B1220] lg:text-5xl">
            Toys Designed For Little Minds
          </h2>


          <p className="mt-5 text-lg leading-8 text-gray-500">
            We believe the best toys are more than entertainment.
            They inspire imagination, learning, and beautiful childhood memories.
          </p>

        </div>




        {/* Feature Cards */}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">


          {features.map((item) => {

            const Icon = item.icon;


            return (

              <div
                key={item.title}
                className="group rounded-[32px] border border-[#EEE5D8] bg-[#FFFDF9] p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >


                {/* Icon */}

                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{
                    backgroundColor: `${item.color}20`,
                  }}
                >

                  <Icon
                    size={28}
                    style={{
                      color: item.color,
                    }}
                  />

                </div>



                {/* Content */}

                <h3 className="mt-6 text-xl font-bold text-[#0B1220]">
                  {item.title}
                </h3>


                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {item.description}
                </p>


              </div>

            );

          })}


        </div>


      </div>


    </section>
  );
}