"use client";

import { useState } from "react";
import {
  createCoupon,
  updateCoupon,
} from "../services/api/coupons";

interface Props {
  coupon?: any;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CouponForm({
  coupon,
  onClose,
  onSuccess,
}: Props) {

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({

    code: coupon?.code || "",

    description:
      coupon?.description || "",

    discountType:
      coupon?.discountType || "PERCENTAGE",

    discountValue:
      coupon?.discountValue || 0,

    minOrderAmount:
      coupon?.minOrderAmount || 0,

    maxDiscount:
      coupon?.maxDiscount || 0,

    usageLimit:
      coupon?.usageLimit || 0,

    expiresAt:
      coupon?.expiresAt
        ? coupon.expiresAt.substring(0,10)
        : "",

  });


  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ){

    const {name,value}=e.target;


    setForm(prev=>({

      ...prev,

      [name]:

        [
          "discountValue",
          "minOrderAmount",
          "maxDiscount",
          "usageLimit"
        ].includes(name)

        ? Number(value)

        : value

    }));

  }



  async function handleSubmit(
    e: React.FormEvent
  ){

    e.preventDefault();


    try{

      setLoading(true);


      if(coupon){

        await updateCoupon(
          coupon.id,
          form
        );

      }
      else{

        await createCoupon(form);

      }


      onSuccess();

      onClose();


    }
    catch(error){

      console.error(error);

      alert(
        "Failed to save coupon"
      );

    }
    finally{

      setLoading(false);

    }

  }



  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl bg-white"
    >


      <div className="flex items-start justify-between border-b border-gray-100 pb-5">

        <div>
        <h2 className="text-2xl font-bold text-gray-900">

          {coupon
            ? "Edit Coupon"
            : "Add Coupon"}

        </h2>
        <p className="mt-1 text-sm text-gray-500">Set the code, discount rules, and expiry for this promotion.</p>
        </div>


        <button
          type="button"
          onClick={onClose}
          className="rounded-lg px-3 py-2 text-xl text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
        >

          ✕

        </button>


      </div>



      <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">Coupon code <span className="text-red-500">*</span></label>
      <input

        name="code"

        value={form.code}

        onChange={handleChange}

        placeholder="Coupon Code"

        className="w-full rounded-xl border border-gray-200 p-3 uppercase outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"

        required

      />
      <p className="mt-1 text-xs text-gray-400">Example: WELCOME10</p>
      </div>



      <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">Customer-facing description</label>
      <textarea

        name="description"

        value={form.description}

        onChange={handleChange}

        placeholder="Description"

        rows={3}
        className="w-full resize-none rounded-xl border border-gray-200 p-3 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"

      />
      </div>



      <div className="grid gap-5 sm:grid-cols-2">
      <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">Discount type</label>
      <select

        name="discountType"

        value={form.discountType}

        onChange={handleChange}

        className="w-full rounded-xl border border-gray-200 bg-white p-3 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"

      >

        <option value="PERCENTAGE">
          Percentage
        </option>


        <option value="FIXED">
          Fixed Amount
        </option>


      </select>
      </div>




      <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">Discount value <span className="text-red-500">*</span></label>
      <input

        type="number"

        name="discountValue"

        value={form.discountValue}

        onChange={handleChange}

        placeholder="Discount Value"

        min="0"
        className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"

        required

      />
      </div>
      </div>



      <div className="grid gap-5 sm:grid-cols-2">
      <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">Minimum order amount</label>
      <input

        type="number"

        name="minOrderAmount"

        value={form.minOrderAmount}

        onChange={handleChange}

        placeholder="Minimum Order Amount"

        min="0"
        className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"

      />
      </div>



      <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">Maximum discount amount</label>
      <input

        type="number"

        name="maxDiscount"

        value={form.maxDiscount}

        onChange={handleChange}

        placeholder="Maximum Discount"

        min="0"
        className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"

      />
      </div>
      </div>



      <div className="grid gap-5 sm:grid-cols-2">
      <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">Usage limit</label>
      <input

        type="number"

        name="usageLimit"

        value={form.usageLimit}

        onChange={handleChange}

        placeholder="Usage Limit"

        min="0"
        className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"

      />
      </div>



      <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">Expiry date</label>
      <input

        type="date"

        name="expiresAt"

        value={form.expiresAt}

        onChange={handleChange}

        className="w-full rounded-xl border border-gray-200 p-3 outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"

      />
      </div>
      </div>




      <div className="flex gap-4">


        <button

          disabled={loading}

          type="submit"

          className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50"

        >

          {
            loading
              ? "Saving..."
              : "Save Coupon"
          }


        </button>



        <button

          type="button"

          onClick={onClose}

          className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"

        >

          Cancel

        </button>


      </div>



    </form>

  );

}
