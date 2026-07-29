import {
  ToysHero,
  FeaturedToyCollections,
  BestSellers,
  WhyChooseToys,
  ToysCTA,
} from "@/components/toys";


export default function ToysPage() {
  return (
    <>
      <ToysHero />

      <FeaturedToyCollections />

      <BestSellers />

      <WhyChooseToys />

      <ToysCTA />
    </>
  );
}