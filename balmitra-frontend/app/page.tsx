import Hero from "@/components/home/hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TopVendors from "@/components/home/TopVendors";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <TopVendors />
      <Categories />
    </>
  );
}
