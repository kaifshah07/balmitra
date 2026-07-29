"use client";

import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";

const products = [
  {
    name: "Creative Wooden Puzzle",
    description: "A beautifully crafted puzzle designed to improve creativity and problem solving.",
    price: "₹799",
    rating: "4.9",
    image: "/images/toys/products/puzzle.png",
  },
  {
    name: "Learning Building Blocks",
    description: "Fun construction blocks that encourage imagination and logical thinking.",
    price: "₹999",
    rating: "4.8",
    image: "/images/toys/products/blocks.png",
  },
  {
    name: "Art & Craft Studio Kit",
    description: "A creative kit that helps children explore colors and imagination.",
    price: "₹699",
    rating: "4.9",
    image: "/images/toys/products/art-kit.png",
  },
  {
    name: "Educational Discovery Game",
    description: "Interactive learning games designed for meaningful play.",
    price: "₹899",
    rating: "4.7",
    image: "/images/toys/products/game.png",
  },
];

export default function BestSellers() {
  return (
    <section
      id="products"
      className="bg-[#F7F5F1] py-16 lg:py-20"
    >

      <div className="container mx-auto px-6">


        {/* Heading */}

        <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">


          <div>

            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C67C2E]">
              Customer Favorites
            </p>


            <h2 className="mt-4 text-4xl font-black text-[#0B1220] lg:text-5xl">
              Best Selling Toys
            </h2>


            <p className="mt-4 max-w-xl text-lg text-gray-500">
              Discover our most loved toys designed to bring learning,
              creativity, and happiness together.
            </p>

          </div>


        </div>



        {/* Products Grid */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">


          {products.map((product) => (

            <div
              key={product.name}
              className="group overflow-hidden rounded-[32px] bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
            >


              {/* Image */}

              <div className="relative h-64 overflow-hidden bg-[#FFFDF9]">


                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />


                {/* Rating */}

                <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-2 shadow-md">

                  <Star
                    size={14}
                    className="fill-[#D4AF37] text-[#D4AF37]"
                  />

                  <span className="text-sm font-semibold text-gray-700">
                    {product.rating}
                  </span>

                </div>


              </div>




              {/* Details */}

              <div className="p-6">


                <h3 className="text-xl font-bold text-[#0B1220]">
                  {product.name}
                </h3>


                <p className="mt-3 text-sm leading-6 text-gray-500">
                  {product.description}
                </p>



                <div className="mt-5 flex items-center justify-between">


                  <span className="text-xl font-bold text-[#C67C2E]">
                    {product.price}
                  </span>



                  <button
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C67C2E] text-white transition hover:scale-110 hover:bg-[#A7641E]"
                  >

                    <ShoppingCart size={18} />

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