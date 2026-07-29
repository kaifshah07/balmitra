import Image from "next/image";
import { Heart, ShoppingCart, Star } from "lucide-react";


type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
};


interface ProductCardProps {
  product: Product;
}



export default function ProductCard({
  product,
}: ProductCardProps) {


  return (

    <div
      className="group overflow-hidden rounded-[32px] bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
    >


      {/* Image */}

      <div className="relative flex h-60 items-center justify-center overflow-hidden bg-[#F7F5F1]">


        <button
          className="absolute right-4 top-4 z-10 rounded-full bg-white p-2 shadow-sm transition hover:text-[#C67C2E]"
        >

          <Heart size={17}/>

        </button>



        <Image
          src={product.image}
          alt={product.name}
          width={250}
          height={250}
          className="h-48 w-48 object-contain transition duration-500 group-hover:scale-110"
        />


      </div>



      {/* Content */}

      <div className="p-5">


        <div className="mb-3 flex items-center gap-1">

          <Star
            size={15}
            fill="#D4AF37"
            stroke="#D4AF37"
          />


          <span className="text-sm font-medium text-gray-600">
            {product.rating}
          </span>


        </div>




        <h3 className="text-lg font-bold text-[#0B1220]">

          {product.name}

        </h3>



        <p className="mt-1 text-sm text-gray-500">

          {product.category}

        </p>




        <div className="mt-5 flex items-center justify-between">


          <span className="text-lg font-bold text-[#C67C2E]">

            ₹{product.price}

          </span>



          <button
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#C67C2E] text-white transition hover:scale-110 hover:bg-[#A7641E]"
          >

            <ShoppingCart size={18}/>

          </button>


        </div>


      </div>


    </div>

  );
}