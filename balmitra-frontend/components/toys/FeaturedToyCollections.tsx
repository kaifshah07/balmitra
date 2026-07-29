"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";

const collections = [
  {
    title: "Wooden Wonders",
    description:
      "Natural toys crafted with care to inspire creativity, imagination, and endless exploration.",
    image: "/images/toys/collections/wooden.png",
  },
  {
    title: "Learning Games",
    description:
      "Playful experiences that make learning exciting while building important skills.",
    image: "/images/toys/collections/learning.png",
  },
  {
    title: "Building Blocks",
    description:
      "Create, build, and discover new possibilities through imaginative play.",
    image: "/images/toys/collections/building.png",
  },
  {
    title: "Creative Studio",
    description:
      "Art, craft, and imagination come together to create beautiful moments.",
    image: "/images/toys/collections/creative.png",
  },
];

export default function FeaturedToyCollections() {
  return (
    <section
      id="featured"
      className="bg-[#FCFBF8] py-16 lg:py-20"
    >

      <div className="container mx-auto px-6">


        {/* Section Heading */}

        <div className="mx-auto mb-12 max-w-3xl text-center">

          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C67C2E]">
            Explore Our Collection
          </p>


          <h2 className="mt-4 text-4xl font-black text-[#0B1220] lg:text-5xl">
            Curated Toy Collections
          </h2>


          <p className="mt-5 text-lg leading-8 text-gray-500">
            Discover thoughtfully designed toys that encourage creativity,
            curiosity, imagination, and meaningful play.
          </p>

        </div>



        {/* Collection Cards */}

        <div className="grid gap-8 md:grid-cols-2">


          {collections.map((item) => (

            <div
              key={item.title}
              className="group relative overflow-hidden rounded-[36px] bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
            >


              {/* Image */}

              <div className="relative h-[360px] overflow-hidden">


                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />


                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />



                {/* Content */}

                <div className="absolute bottom-0 left-0 right-0 p-8">


                  <h3 className="text-3xl font-bold text-white">
                    {item.title}
                  </h3>


                  <p className="mt-3 max-w-md text-sm leading-6 text-white/80">
                    {item.description}
                  </p>



                  <button
                    className="group mt-5 flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#0B1220] transition hover:bg-[#C67C2E] hover:text-white"
                  >

                    Explore Collection

                    <ArrowRight
                      size={16}
                      className="transition group-hover:translate-x-1"
                    />

                  </button>


                </div>


              </div>


            </div>

          ))}


        </div>


      </div>


    </section>
  );
}