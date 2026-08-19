"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const banners = [
  {
    id: 1,
    image: "/images/slider/banner1.jpeg",
  },
  {
    id: 2,
    image: "/images/slider/banner2.jpeg",
  },
  {
    id: 3,
    image: "/images/slider/banner3.jpeg",
  },
  {
    id: 4,
    image: "/images/slider/banner4.jpeg",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? banners.length - 1 : prev - 1
    );
  };

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-white">
      
      {/* Slider viewport */}
      <div className="relative aspect-[5/1] min-h-[160px] w-full overflow-hidden sm:min-h-[220px]">

        {/* Horizontal slides */}
        <div
          className="flex h-full transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${current * 100}%)`,
          }}
        >
          {banners.map((banner) => (
            <div
              key={banner.id}
              className="relative h-full min-w-full flex-shrink-0"
            >
              <div className="relative h-full w-full">
                <Image
                  src={banner.image}
                  alt={`Balmitra Banner ${banner.id}`}
                  fill
                  sizes="100vw"
                  priority={banner.id === 1}
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* LEFT ARROW */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous banner"
          className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md transition hover:bg-white"
        >
          <ChevronLeft size={24} />
        </button>

        {/* RIGHT ARROW */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next banner"
          className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-md transition hover:bg-white"
        >
          <ChevronRight size={24} />
        </button>

        {/* DOTS */}
        <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              aria-label={`Go to banner ${index + 1}`}
              onClick={() => setCurrent(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                current === index
                  ? "w-8 bg-[#C67C2E]"
                  : "w-2.5 bg-white/80"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
