"use client";

import { useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import {
  getProducts,
  deleteProduct,
} from "../services/api/products";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.products || data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      loadProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          Products
        </h1>

        <button
          onClick={() => {
            setSelectedProduct(null);
            setShowForm(true);
          }}
          className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg"
        >
          + Add Product
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Category</th>

              <th className="p-4 text-left">Price</th>

              <th className="p-4 text-left">Status</th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (

              <tr>

                <td
                  colSpan={5}
                  className="text-center p-10 text-gray-500"
                >
                  No Products Found
                </td>

              </tr>

            ) : (

              products.map((product) => (

                <tr
                  key={product.id}
                  className="border-t hover:bg-gray-50"
                >

                  <td className="p-4">
                    {product.name}
                  </td>

                  <td className="p-4">
                    {product.category?.name}
                  </td>

                  <td className="p-4">
                    ₹{product.price}
                  </td>

                  <td className="p-4">

<span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
Active
</span>

</td>


<td className="p-4 flex gap-3">


<button
className="text-blue-600"
onClick={()=>{

setSelectedProduct(product);
setShowForm(true);

}}
>
Edit
</button>



<button
className="text-red-600"
onClick={async()=>{

if(confirm("Delete this product?")){

await deleteProduct(product.id);

loadProducts();

}

}}
>
Delete
</button>


</td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() => {
                          setSelectedProduct(product);
                          setShowForm(true);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(product.id)
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))
            )}

          </tbody>

        </table>

      </div>

      {/* Product Form Modal */}

      {showForm && (

        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

          <div className="bg-white rounded-xl w-full max-w-3xl p-8 max-h-[90vh] overflow-y-auto">

            <ProductForm
              product={selectedProduct}
              onClose={() => setShowForm(false)}
              onSuccess={loadProducts}
            />

          </div>

        </div>

      )}

    </div>
  );
}