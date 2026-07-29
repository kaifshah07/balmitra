import { Heart, ShoppingCart, User } from "lucide-react";

export default function UserActions() {
  return (
    <div className="flex items-center gap-5">
      <button className="relative">
        <Heart size={22} />
      </button>

      <button className="relative">
        <ShoppingCart size={22} />

        <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
          2
        </span>
      </button>

      <button>
        <User size={22} />
      </button>
    </div>
  );
}