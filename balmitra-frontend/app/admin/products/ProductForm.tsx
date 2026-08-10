"use client";

import { useEffect, useState } from "react";
import { getCategories } from "../services/api/categories";
import {
  createProduct,
  updateProduct,
} from "../services/api/products";


interface ProductFormProps {
  product?: any;
  onClose: () => void;
  onSuccess: () => void;
}


interface Category {
  id: number;
  name: string;
}


export default function ProductForm({
  product,
  onClose,
  onSuccess,
}: ProductFormProps) {


  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(false);


  const [form, setForm] = useState<any>({
    name: "",
    description: "",
    categoryId: "",
    price: "",
    discountPrice: "",
    stock: "",
    isFeatured: false,
    isTrending: false,
    isNewArrival: false,
    thumbnail: null,
  });



  useEffect(() => {

    loadCategories();


    if(product){

      setForm({

        name: product.name || "",

        description: product.description || "",

        categoryId: product.categoryId || "",

        price: product.price || "",

        discountPrice: product.discountPrice || "",

        stock: product.stock || "",

        isFeatured: product.isFeatured || false,

        isTrending: product.isTrending || false,

        isNewArrival: product.isNewArrival || false,

        thumbnail:null

      });

    }


  },[product]);





  const loadCategories = async()=>{

    try{

      const data = await getCategories();

      setCategories(data);

    }
    catch(error){

      console.log("Category Error",error);

    }

  };






  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  )=>{


    const target = e.target as HTMLInputElement;


    const {
      name,
      value,
      checked,
      type
    } = target;



    setForm((prev:any)=>({

      ...prev,

      [name]:
        type==="checkbox"
        ? checked
        : value

    }));


  };






  const handleImage = (
    e: React.ChangeEvent<HTMLInputElement>
  )=>{


    setForm((prev:any)=>({

      ...prev,

      thumbnail:e.target.files?.[0] || null

    }));


  };







  const handleSubmit = async(
    e: React.FormEvent<HTMLFormElement>
  )=>{


    e.preventDefault();


    try{


      setLoading(true);


      const data = new FormData();



      Object.keys(form).forEach((key)=>{


        if(form[key] !== null){


          if(
            typeof form[key] === "boolean"
          ){

            data.append(
              key,
              String(form[key])
            );


          }
          else{

            data.append(
              key,
              form[key]
            );

          }


        }


      });




      if(product){

        await updateProduct(
          product.id,
          data
        );

      }
      else{

        await createProduct(data);

      }




      onSuccess();

      onClose();



    }
    catch(error: unknown){


      console.error(
        "Product Save Error:",
        error
      );


      alert(
        "Failed to save product"
      );


    }
    finally{

      setLoading(false);

    }


  };








return (

<form
onSubmit={handleSubmit}
className="space-y-5 bg-white rounded-xl p-8"
>


<h2 className="text-2xl font-bold">

{
product
?
"Edit Product"
:
"Add Product"
}

</h2>





<input

name="name"

value={form.name}

onChange={handleChange}

placeholder="Product Name"

className="w-full border rounded-lg p-3"

/>





<textarea

name="description"

value={form.description}

onChange={handleChange}

placeholder="Description"

className="w-full border rounded-lg p-3"

/>







<select

name="categoryId"

value={form.categoryId}

onChange={handleChange}

className="w-full border rounded-lg p-3"

>


<option value="">
Select Category
</option>



{
categories.map((cat)=>(
<option
key={cat.id}
value={cat.id}
>

{cat.name}

</option>
))
}


</select>







<input

type="number"

name="price"

value={form.price}

onChange={handleChange}

placeholder="Price"

className="w-full border rounded-lg p-3"

/>






<input

type="number"

name="discountPrice"

value={form.discountPrice}

onChange={handleChange}

placeholder="Discount Price"

className="w-full border rounded-lg p-3"

/>







<input

type="number"

name="stock"

value={form.stock}

onChange={handleChange}

placeholder="Stock"

className="w-full border rounded-lg p-3"

/>






<input

type="file"

accept="image/*"

onChange={handleImage}

/>







<label className="flex gap-2">

<input

type="checkbox"

name="isFeatured"

checked={form.isFeatured}

onChange={handleChange}

/>

Featured

</label>






<label className="flex gap-2">

<input

type="checkbox"

name="isTrending"

checked={form.isTrending}

onChange={handleChange}

/>

Trending

</label>






<label className="flex gap-2">

<input

type="checkbox"

name="isNewArrival"

checked={form.isNewArrival}

onChange={handleChange}

/>

New Arrival

</label>







<div className="flex gap-4">


<button

type="submit"

className="bg-orange-500 text-white px-6 py-3 rounded-lg"

>


{
loading
?
"Saving..."
:
"Save"
}


</button>




<button

type="button"

onClick={onClose}

className="border px-6 py-3 rounded-lg"

>

Cancel

</button>



</div>




</form>


);



}