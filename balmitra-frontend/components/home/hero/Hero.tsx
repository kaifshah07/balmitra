// import Image from "next/image";

// import Container from "@/components/ui/container";
// import HeroBadge from "./HeroBadge";
// import HeroButtons from "./HeroButtons";
// import HeroStats from "./HeroStats";

// export default function Hero() {
//   return (
//     <section className="relative overflow-hidden bg-[#FAFAF8] py-20 lg:py-0">
//       <Container>
//         <div className="grid items-center gap-0 lg:grid-cols-2">
//           {/* Left */}
//           <div>
//             <HeroBadge />

//             <h1 className="mt-3 text-5xl font-black leading-tight text-[#0B1220] lg:text-3xl">
//               Buy Smarter.
              
//               Sell Faster.
//             </h1>

//             <p className="mt-3 max-w-xl text-lg leading-5 text-gray-600">
//               Balmitra connects customers with trusted vendors across India,
//               making shopping faster, safer, and more reliable.
//             </p>

//             <HeroButtons />

//             <HeroStats />
//           </div>

//           {/* Right */}
//           <div className="relative flex justify-center">
//             <div className="absolute h-40 w-40 rounded-full bg-[#D4A017]/10 blur-3xl" />

//             <Image
//               src="/images/hero/hero.png"
//               alt="Balmitra Marketplace"
//               width={300}
//               height={300}
//               priority
//               className="relative z-5 w-full max-w-sm"
//             />
//           </div>
//         </div>
//       </Container>
//     </section>
//   );
// }

import HeroShowcase from "./HeroShowcase";

import Container from "@/components/ui/container";
import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section className="overflow-hidden bg-[#FAFAF8]">

      <Container>

        <div className="grid min-h-[75vh] items-center gap-10 lg:grid-cols-2">


          {/* LEFT */}

          <div className="max-w-xl">


            <HeroBadge />


            <h1 className="mt-5 text-3xl font-black leading-snug text-[#0B1220] lg:text-4xl">

              Buy Smarter.
              <br />

              Sell Faster.

            </h1>


            <p className="mt-4 max-w-md text-base leading-7 text-gray-600">

              Balmitra connects customers with trusted vendors,
              making online shopping simple, secure and reliable.

            </p>


            <div className="mt-7">

              <HeroButtons />

            </div>


            <div className="mt-10">

              <HeroStats />

            </div>


          </div>




          {/* RIGHT */}


          <div className="relative">

    <HeroShowcase />

  </div>
</div>


      </Container>


    </section>
  );
}