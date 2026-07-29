// import Button from "@/components/ui/button";

// export default function HeroButtons() {
//   return (
//     <div className="mt-5 flex flex-wrap gap-2">
//       <Button>Shop Now</Button>

//       <Button variant="outline">
//         Become a Vendor
//       </Button>

      
//     </div>
//   );
// }

import Button from "@/components/ui/button";

export default function HeroButtons() {
  return (
    <div className="flex flex-wrap gap-4">

      <Button>
        Shop Now
      </Button>

      <Button variant="outline">
        Become a Vendor
      </Button>

    </div>
  );
}