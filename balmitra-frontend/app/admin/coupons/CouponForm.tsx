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
      className="space-y-5"
    >


      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold">

          {coupon
            ? "Edit Coupon"
            : "Add Coupon"}

        </h2>


        <button
          type="button"
          onClick={onClose}
          className="text-xl"
        >

          ✕

        </button>


      </div>



      <input

        name="code"

        value={form.code}

        onChange={handleChange}

        placeholder="Coupon Code"

        className="w-full border rounded-lg p-3"

        required

      />



      <textarea

        name="description"

        value={form.description}

        onChange={handleChange}

        placeholder="Description"

        className="w-full border rounded-lg p-3"

      />



      <select

        name="discountType"

        value={form.discountType}

        onChange={handleChange}

        className="w-full border rounded-lg p-3"

      >

        <option value="PERCENTAGE">
          Percentage
        </option>


        <option value="FIXED">
          Fixed Amount
        </option>


      </select>




      <input

        type="number"

        name="discountValue"

        value={form.discountValue}

        onChange={handleChange}

        placeholder="Discount Value"

        className="w-full border rounded-lg p-3"

        required

      />



      <input

        type="number"

        name="minOrderAmount"

        value={form.minOrderAmount}

        onChange={handleChange}

        placeholder="Minimum Order Amount"

        className="w-full border rounded-lg p-3"

      />



      <input

        type="number"

        name="maxDiscount"

        value={form.maxDiscount}

        onChange={handleChange}

        placeholder="Maximum Discount"

        className="w-full border rounded-lg p-3"

      />



      <input

        type="number"

        name="usageLimit"

        value={form.usageLimit}

        onChange={handleChange}

        placeholder="Usage Limit"

        className="w-full border rounded-lg p-3"

      />



      <input

        type="date"

        name="expiresAt"

        value={form.expiresAt}

        onChange={handleChange}

        className="w-full border rounded-lg p-3"

      />




      <div className="flex gap-4">


        <button

          disabled={loading}

          type="submit"

          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg"

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

          className="border px-6 py-3 rounded-lg"

        >

          Cancel

        </button>


      </div>



    </form>

  );

}