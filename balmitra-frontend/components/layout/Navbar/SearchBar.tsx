import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative hidden lg:block w-full max-w-md">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
      />

      <input
        type="text"
        placeholder="Search products..."
        className="w-full rounded-full border border-gray-200 bg-white py-3 pl-11 pr-5 text-sm outline-none transition duration-300 focus:border-black" 
      />
    </div>
  );
}