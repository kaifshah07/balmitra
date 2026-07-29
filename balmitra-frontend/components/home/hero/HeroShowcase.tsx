import Image from "next/image";
import { Star, ShieldCheck } from "lucide-react";


export default function HeroShowcase() {
  return (
    <div className="relative h-[500px] w-full">


      {/* Background Glow */}

      <div
        className="
        absolute
        left-1/2
        top-1/2
        h-72
        w-72
        -translate-x-1/2
        -translate-y-1/2
        rounded-full
        bg-[#D4A017]/10
        blur-3xl
        "
      />



      {/* Main Product */}

      <div
        className="
        absolute
        left-1/2
        top-1/2
        z-20
        flex
        h-72
        w-72
        -translate-x-1/2
        -translate-y-1/2
        items-center
        justify-center
        rounded-3xl
        bg-white
        shadow-xl
        "
      >

        <Image
          src="/images/hero/speaker.jpg"
          alt="Electronic Product"
          width={250}
          height={250}
          className="object-contain"
        />

      </div>





      {/* Top Right Card */}

      <div
        className="
        absolute
        right-0
        top-10
        z-10
        h-36
        w-36
        rounded-3xl
        bg-white
        p-4
        shadow-lg
        "
      >

        <Image
          src="/images/hero/headphones.jpg"
          alt="Fashion"
          width={120}
          height={120}
          className="h-full w-full object-contain"
        />


      </div>





      {/* Bottom Left Card */}

      <div
        className="
        absolute
        bottom-20
        left-0
        z-10
        h-36
        w-36
        rounded-3xl
        bg-white
        p-4
        shadow-lg
        "
      >

        <Image
          src="/images/hero/watch.jpg"
          alt="Grocery"
          width={120}
          height={120}
          className="h-full w-full object-contain"
        />


      </div>






      {/* Floating Rating Card */}


      <div
        className="
        absolute
        bottom-10
        right-10
        z-30
        rounded-2xl
        bg-white
        px-5
        py-3
        shadow-lg
        "
      >

        <div className="flex items-center gap-2">

          <Star
            size={18}
            fill="#D4A017"
            stroke="#D4A017"
          />

          <span className="text-sm font-semibold">
            4.9 Rating
          </span>

        </div>


        <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">

          <ShieldCheck size={15}/>

          Verified Vendors

        </div>


      </div>


    </div>
  );
}