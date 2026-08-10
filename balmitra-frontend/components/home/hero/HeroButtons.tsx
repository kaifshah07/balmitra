import Link from "next/link";
import Button from "@/components/ui/button";

export default function HeroButtons() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Link href="/products">
        <Button>
          Shop Now
        </Button>
      </Link>

      <Link href="/become-a-vendor">
        <Button variant="outline">
          Become a Vendor
        </Button>
      </Link>
    </div>
  );
}