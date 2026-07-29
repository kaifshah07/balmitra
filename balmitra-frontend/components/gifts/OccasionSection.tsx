// "use client";

// import {
//   Cake,
//   HeartHandshake,
//   Baby,
//   Gift,
//   PartyPopper,
//   Building2,
//   Home,
//   GraduationCap,
//   ArrowRight,
// } from "lucide-react";

// const occasions = [
//   {
//     title: "Birthday",
//     description: "Make birthdays unforgettable with thoughtful gifts.",
//     icon: Cake,
//     color: "from-pink-500 to-rose-400",
//   },
//   {
//     title: "Anniversary",
//     description: "Celebrate love with timeless keepsakes.",
//     icon: HeartHandshake,
//     color: "from-red-500 to-pink-500",
//   },
//   {
//     title: "Baby Shower",
//     description: "Warm gifts for the newest beginnings.",
//     icon: Baby,
//     color: "from-sky-500 to-cyan-400",
//   },
//   {
//     title: "Wedding",
//     description: "Elegant gifts for beautiful unions.",
//     icon: Gift,
//     color: "from-amber-500 to-yellow-400",
//   },
//   {
//     title: "Festivals",
//     description: "Celebrate traditions with premium gifting.",
//     icon: PartyPopper,
//     color: "from-orange-500 to-amber-400",
//   },
//   {
//     title: "Corporate",
//     description: "Professional gifts that leave an impression.",
//     icon: Building2,
//     color: "from-slate-600 to-slate-400",
//   },
//   {
//     title: "Housewarming",
//     description: "Thoughtful gifts for a new beginning.",
//     icon: Home,
//     color: "from-green-500 to-emerald-400",
//   },
//   {
//     title: "Graduation",
//     description: "Celebrate achievements with meaningful gifts.",
//     icon: GraduationCap,
//     color: "from-indigo-500 to-purple-500",
//   },
// ];

// export default function OccasionSection() {
//   return (
//     <section
//       id="occasion"
//       className="relative overflow-hidden py-24"
//     >
//       {/* Background */}
//       <div className="absolute inset-0 bg-gradient-to-b from-[#FFFDF9] via-[#FFF8EF] to-white" />

//       <div className="absolute left-0 top-40 h-72 w-72 rounded-full bg-[#FE7C02]/10 blur-[120px]" />
//       <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-[#D4A017]/10 blur-[120px]" />

//       <div className="container relative mx-auto px-6">

//         {/* Heading */}

//         <div className="mb-16 text-center">

//           <span className="rounded-full border border-[#FE7C02]/20 bg-white/70 px-5 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#D4A017] backdrop-blur-md">
//             Curated Collections
//           </span>

//           <h2 className="mt-6 text-4xl font-black text-[#0B1220] md:text-5xl">
//             Shop By Occasion
//           </h2>

//           <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-500">
//             Every celebration deserves a meaningful gift. Discover carefully
//             curated collections designed to make every special moment even more
//             memorable.
//           </p>

//         </div>

//         {/* Cards */}

//         <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

//           {occasions.map((item) => {
//             const Icon = item.icon;

//             return (
//               <div
//                 key={item.title}
//                 className="group relative overflow-hidden rounded-[32px] border border-white/50 bg-white/50 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
//               >
//                 {/* Glow */}

//                 <div className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${item.color} opacity-10 blur-3xl transition group-hover:opacity-30`} />

//                 <div
//                   className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-lg`}
//                 >
//                   <Icon
//                     className="text-white"
//                     size={30}
//                   />
//                 </div>

//                 <h3 className="mt-8 text-2xl font-bold text-[#0B1220]">
//                   {item.title}
//                 </h3>

//                 <p className="mt-4 leading-7 text-gray-500">
//                   {item.description}
//                 </p>

//                 <button className="mt-8 flex items-center font-semibold text-[#FE7C02]">
//                   Explore

//                   <ArrowRight
//                     size={18}
//                     className="ml-2 transition group-hover:translate-x-2"
//                   />
//                 </button>

//               </div>
//             );
//           })}
//         </div>

//       </div>
//     </section>
//   );
// }





"use client";

import Link from "next/link";
import {
  Cake,
  Heart,
  Gift,
  Baby,
  PartyPopper,
  Building2,
  Home,
  GraduationCap,
  ArrowRight,
} from "lucide-react";

const occasions = [
  {
    title: "Birthday",
    description: "Thoughtfully curated gifts to celebrate unforgettable birthdays.",
    icon: Cake,
    href: "/gifts/birthday",
  },
  {
    title: "Anniversary",
    description: "Elegant keepsakes crafted for timeless celebrations.",
    icon: Heart,
    href: "/gifts/anniversary",
  },
  {
    title: "Wedding",
    description: "Premium gifting ideas for life's most beautiful union.",
    icon: Gift,
    href: "/gifts/wedding",
  },
  {
    title: "Baby Shower",
    description: "Adorable gifts welcoming precious new beginnings.",
    icon: Baby,
    href: "/gifts/baby-shower",
  },
  {
    title: "Festivals",
    description: "Celebrate every festive season with meaningful gifts.",
    icon: PartyPopper,
    href: "/gifts/festivals",
  },
  {
    title: "Corporate",
    description: "Professional gifts designed to leave a lasting impression.",
    icon: Building2,
    href: "/gifts/corporate",
  },
  {
    title: "Housewarming",
    description: "Beautiful gifts that make every new house feel like home.",
    icon: Home,
    href: "/gifts/housewarming",
  },
  {
    title: "Graduation",
    description: "Celebrate achievements with memorable gifts.",
    icon: GraduationCap,
    href: "/gifts/graduation",
  },
];

export default function OccasionSection() {
  return (
    <section
      id="occasion"
      className="bg-[#F8F9FC] py-16"
    >
      <div className="container mx-auto px-6">

        {/* Heading */}

        <div className="mb-16 text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.35em] text-[#FE7C02]">
            Collections
          </span>

          <h2 className="mt-4 text-4xl font-black text-[#111827] md:text-5xl">
            Shop by Occasion
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-gray-500">
            Whether it's a birthday, anniversary, wedding, or festive celebration,
            discover carefully selected gifts crafted to create lasting memories.
          </p>

        </div>

        {/* Cards */}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {occasions.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                href={item.href}
                key={item.title}
                className="group rounded-[28px] border border-gray-100 bg-[#F7F5F1] p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF5EC] transition-all duration-300 group-hover:bg-bg-[#FE7C02]">

                  <Icon
                    size={30}
                    className="text-[#FE7C02] transition-all duration-300 group-hover:text-white"
                  />

                </div>

                <h3 className="mt-8 text-2xl font-bold text-[#111827]">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-500">
                  {item.description}
                </p>

                <div className="mt-8 flex items-center font-semibold text-[#FE7C02]">

                  Explore Collection

                  <ArrowRight
                    size={18}
                    className="ml-2 transition group-hover:translate-x-1"
                  />

                </div>

              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}