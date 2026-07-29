// "use client";

// import Link from "next/link";
// import { Gift, Sparkles, ArrowRight } from "lucide-react";

// export default function GiftsHero() {
//   return (
//     <section className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-[#FFFDF8] via-[#FFF8EF] to-[#FFFFFF] py-20">
//       {/* Decorative Blurs */}
//       <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#FE7C02]/10 blur-[120px]" />
//       <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#D4A017]/10 blur-[140px]" />

//       <div className="container relative mx-auto px-6">
//         <div className="grid items-center gap-8 lg:grid-cols-2">
//           {/* Left Content */}
//           <div>
//             <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FE7C02]/20 bg-white/70 px-5 py-2 backdrop-blur-md">
//               <Sparkles className="h-4 w-4 text-[#FE7C02]" />
//               <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A017]">
//                 Premium Gift Collection
//               </span>
//             </div>

//             <h1 className="text-5xl font-black leading-tight text-[#0B1220] lg:text-6xl">
//               Every Gift
//               <span className="block text-[#FE7C02]">
//                 Tells a Story.
//               </span>
//             </h1>

//             <p className="mt-8 max-w-xl text-lg leading-8 text-gray-600">
//               Celebrate life's most meaningful moments with thoughtfully curated
//               gifts that inspire joy, create lasting memories, and leave a
//               beautiful impression on every occasion.
//             </p>

//             <div className="mt-10 flex flex-wrap gap-5">
//               <Link
//                 href="#featured"
//                 className="group inline-flex items-center rounded-full bg-[#FE7C02] px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-orange-300/40"
//               >
//                 Explore Collection
//                 <ArrowRight className="ml-2 transition group-hover:translate-x-1" />
//               </Link>

//               <Link
//                 href="#occasion"
//                 className="rounded-full border border-[#0B1220]/10 bg-white/60 px-8 py-4 font-semibold text-[#0B1220] backdrop-blur-lg transition hover:border-[#FE7C02] hover:text-[#FE7C02]"
//               >
//                 Shop by Occasion
//               </Link>
//             </div>
//           </div>

//           {/* Right Glass Card */}
//           <div className="relative">
//             <div className="rounded-[36px] border border-white/40 bg-white/30 p-10 shadow-2xl backdrop-blur-2xl">
//               <div className="flex flex-col items-center">
//                 <div className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-[#FE7C02] to-[#F9B233] shadow-xl">
//                   <Gift className="h-16 w-16 text-white" />
//                 </div>

//                 <h3 className="mt-8 text-3xl font-bold text-[#0B1220]">
//                   Crafted With Love
//                 </h3>

//                 <p className="mt-4 text-center leading-7 text-gray-600">
//                   Beautiful gifts designed to celebrate birthdays,
//                   anniversaries, festivals, baby showers, weddings, and every
//                   cherished milestone.
//                 </p>

//                 <div className="mt-8 grid w-full grid-cols-3 gap-4">
//                   <div className="rounded-2xl bg-white/70 p-4 text-center backdrop-blur-md">
//                     <h4 className="text-2xl font-bold text-[#FE7C02]">100+</h4>
//                     <p className="text-sm text-gray-500">Gift Ideas</p>
//                   </div>

//                   <div className="rounded-2xl bg-white/70 p-4 text-center backdrop-blur-md">
//                     <h4 className="text-2xl font-bold text-[#FE7C02]">12+</h4>
//                     <p className="text-sm text-gray-500">Occasions</p>
//                   </div>

//                   <div className="rounded-2xl bg-white/70 p-4 text-center backdrop-blur-md">
//                     <h4 className="text-2xl font-bold text-[#FE7C02]">100%</h4>
//                     <p className="text-sm text-gray-500">Premium</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Floating Badge */}
//             <div className="absolute -right-4 -top-6 rounded-full bg-white px-5 py-3 shadow-xl">
//               <span className="font-semibold text-[#FE7C02]">
//                 ✨ Best Seller
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

export default function GiftsHero() {
  return (
    <section className="relative overflow-hidden rounded-[36px] bg-[linear-gradient(135deg,#FFFDF9_0%,#F7F2EA_45%,#FCFBF8_100%)]">
      {/* Background Glow */}
      <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-orange-100 blur-[120px]" />
      <div className="absolute -right-40 bottom-0 h-[420px] w-[420px] rounded-full bg-amber-100 blur-[140px]" />

      <div className="container relative mx-auto px-6 py-12 lg:py-16">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#E6D8C6] bg-[#FFFDF9] px-5 py-2 shadow-sm">
              <Sparkles size={16} className="text-[#FE7C02]" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#FE7C02]">
                Curated Gift Collection
              </span>
            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight text-[#0B1220] lg:text-6xl">
              Every Gift
              <span className="block text-[#FE7C02]">
                Creates a Memory.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-gray-500">
              Explore thoughtfully curated gifts crafted to celebrate birthdays,
              anniversaries, festivals, baby showers, weddings, and every
              beautiful milestone with elegance and warmth.
            </p>

            <div className="mt-12 flex flex-wrap gap-5">

              <Link
                href="#featured"
                className="rounded-full bg-[#C67C2E] px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-[#A7641E] hover:shadow-xl"
              >
                Explore Collection
              </Link>

              <Link
                href="#occasion"
                className="group flex items-center rounded-full border border-gray-200 bg-white px-8 py-4 font-semibold text-[#0B1220] transition hover:border-[#FE7C02]"
              >
                Shop by Occasion

                <ArrowRight
                  size={18}
                  className="ml-2 transition group-hover:translate-x-1"
                />
              </Link>

            </div>

          </div>

          {/* RIGHT */}

          <div className="relative">

            {/* Main Card */}

            <div className="overflow-hidden rounded-[36px] border border-white bg-white p-4 shadow-2xl">

              <div className="relative h-[500px] overflow-hidden rounded-[28px]">

                <Image
  src="/images/gifts/hero.png"
  alt="Premium Gifts"
  fill
  className="object-cover"
  priority
/>

                {/* Overlay */}

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute bottom-8 left-8">

                  <p className="text-sm uppercase tracking-[0.3em] text-white/80">
                    Premium Collection
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-white">
                    Crafted with Love
                  </h3>

                </div>

              </div>

            </div>

            {/* Floating Badge */}

            <div className="absolute -left-5 top-8 rounded-2xl bg-white px-6 py-4 shadow-xl">

              <h4 className="text-2xl font-bold text-[#C67C2E]">
                100+
              </h4>

              <p className="text-sm text-gray-500">
                Curated Gifts
              </p>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}