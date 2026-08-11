import HeroShowcase from "./HeroShowcase";
import Container from "@/components/ui/container";
import HeroBadge from "./HeroBadge";
import HeroButtons from "./HeroButtons";
import HeroStats from "./HeroStats";
import HeroSlider from "./HeroSlider";

export default function Hero() {
  return (
    // <HeroSlider/>
    <section className="overflow-hidden bg-[#FAFAF8]">

      <HeroSlider />

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
