"use client";

import { useEffect, useState } from "react";

import {
  getSubCategories,
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
} from "../services/api/subcategories";

import { getCategories } from "../services/api/categories";

type Category = {
  id: number;
  name: string;
};

type SubCategory = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  displayOrder: number;
  isActive: boolean;
  categoryId: number;
  category?: Category;
};

export default function SubCategoriesPage() {
  const [subCategories, setSubCategories] =
    useState<SubCategory[]>([]);

  const [categories, setCategories] =
    useState<Category[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [showForm, setShowForm] =
    useState(false);

  const [editing, setEditing] =
    useState<SubCategory | null>(null);

  const [form, setForm] = useState({
    name: "",
    categoryId: "",
    description: "",
    displayOrder: "0",
    isActive: true,
  });

  // =====================================================
  // LOAD DATA
  // =====================================================

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [
        subCategoryData,
        categoryData,
      ] = await Promise.all([
        getSubCategories(),
        getCategories(),
      ]);

      setSubCategories(
        subCategoryData || []
      );

      setCategories(
        categoryData || []
      );
    } catch (error) {
      console.error(
        "Subcategory loading error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // FORM
  // =====================================================

  const resetForm = () => {
    setForm({
      name: "",
      categoryId: "",
      description: "",
      displayOrder: "0",
      isActive: true,
    });

    setEditing(null);
  };

  const openCreateForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (
    subCategory: SubCategory
  ) => {
    setEditing(subCategory);

    setForm({
      name: subCategory.name || "",
      categoryId:
        String(subCategory.categoryId),
      description:
        subCategory.description || "",
      displayOrder:
        String(
          subCategory.displayOrder ?? 0
        ),
      isActive:
        subCategory.isActive,
    });

    setShowForm(true);
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!form.name.trim()) {
      alert(
        "Please enter a subcategory name."
      );
      return;
    }

    if (!form.categoryId) {
      alert(
        "Please select a parent category."
      );
      return;
    }

    try {
      const payload = {
        name: form.name.trim(),
        categoryId: Number(
          form.categoryId
        ),
        description:
          form.description.trim() ||
          undefined,
        displayOrder: Number(
          form.displayOrder
        ),
        isActive: form.isActive,
      };

      if (editing) {
        await updateSubCategory(
          editing.id,
          payload
        );
      } else {
        await createSubCategory(
          payload
        );
      }

      setShowForm(false);

      resetForm();

      await loadData();
    } catch (error: any) {
      console.error(
        "Subcategory save error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Unable to save subcategory."
      );
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (
    id: number
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this subcategory?"
      );

    if (!confirmed) return;

    try {
      await deleteSubCategory(id);

      await loadData();
    } catch (error: any) {
      console.error(
        "Subcategory delete error:",
        error
      );

      alert(
        error?.response?.data?.message ||
          "Unable to delete subcategory."
      );
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-gray-500">
          Loading subcategories...
        </p>
      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-500">
            Catalog Management
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
            Subcategories
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Organize products into structured
            categories and subcategories.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600"
        >
          + Add Subcategory
        </button>

      </div>

      {/* STATS */}

      <div className="grid gap-4 sm:grid-cols-3">

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Total Subcategories
          </p>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {subCategories.length}
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Active
          </p>

          <p className="mt-2 text-2xl font-bold text-green-600">
            {
              subCategories.filter(
                (item) =>
                  item.isActive
              ).length
            }
          </p>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Parent Categories
          </p>

          <p className="mt-2 text-2xl font-bold text-orange-500">
            {categories.length}
          </p>
        </div>

      </div>

      {/* TABLE */}

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead className="border-b border-gray-100 bg-gray-50">

              <tr>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Subcategory
                </th>

                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Parent Category
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Order
                </th>

                <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Status
                </th>

                <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-gray-100">

              {subCategories.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="px-6 py-16 text-center"
                  >
                    <p className="font-medium text-gray-700">
                      No subcategories found
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                      Create your first
                      subcategory to organize
                      products.
                    </p>
                  </td>

                </tr>

              ) : (

                subCategories.map(
                  (subCategory) => (

                    <tr
                      key={
                        subCategory.id
                      }
                      className="transition hover:bg-gray-50"
                    >

                      <td className="px-6 py-4">

                        <div>

                          <p className="font-semibold text-gray-900">
                            {
                              subCategory.name
                            }
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            /
                            {
                              subCategory.slug
                            }
                          </p>

                        </div>

                      </td>

                      <td className="px-6 py-4">

                        <span className="inline-flex rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-600">
                          {
                            subCategory
                              .category
                              ?.name ||
                            "Unknown"
                          }
                        </span>

                      </td>

                      <td className="px-6 py-4 text-center text-sm text-gray-600">
                        {
                          subCategory.displayOrder
                        }
                      </td>

                      <td className="px-6 py-4 text-center">

                        {subCategory.isActive ? (

                          <span className="inline-flex rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                            Active
                          </span>

                        ) : (

                          <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                            Inactive
                          </span>

                        )}

                      </td>

                      <td className="px-6 py-4">

                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              openEditForm(
                                subCategory
                              )
                            }
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                subCategory.id
                              )
                            }
                            className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* FORM MODAL */}

      {showForm && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">

          <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">

              <div>

                <h2 className="text-xl font-bold text-gray-900">
                  {editing
                    ? "Edit Subcategory"
                    : "Add Subcategory"}
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Define where this subcategory
                  belongs.
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowForm(false)
                }
                className="rounded-lg px-3 py-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
              >
                ✕
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6"
            >

              {/* NAME */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Subcategory Name
                </label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. Educational Toys"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />

              </div>

              {/* CATEGORY */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Parent Category
                </label>

                <select
                  value={
                    form.categoryId
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      categoryId:
                        e.target.value,
                    })
                  }
                  className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                >

                  <option value="">
                    Select category
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={
                          category.id
                        }
                        value={
                          category.id
                        }
                      >
                        {
                          category.name
                        }
                      </option>
                    )
                  )}

                </select>

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Description
                  <span className="ml-1 font-normal text-gray-400">
                    (Optional)
                  </span>
                </label>

                <textarea
                  rows={3}
                  value={
                    form.description
                  }
                  onChange={(e) =>
                    setForm({
                      ...form,
                      description:
                        e.target.value,
                    })
                  }
                  placeholder="Short description of this subcategory"
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                />

              </div>

              {/* ORDER + STATUS */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Display Order
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={
                      form.displayOrder
                    }
                    onChange={(e) =>
                      setForm({
                        ...form,
                        displayOrder:
                          e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Status
                  </label>

                  <label className="flex h-[46px] cursor-pointer items-center gap-3 rounded-xl border border-gray-200 px-4">

                    <input
                      type="checkbox"
                      checked={
                        form.isActive
                      }
                      onChange={(e) =>
                        setForm({
                          ...form,
                          isActive:
                            e.target
                              .checked,
                        })
                      }
                      className="h-4 w-4 accent-orange-500"
                    />

                    <span className="text-sm font-medium text-gray-700">
                      Active
                    </span>

                  </label>

                </div>

              </div>

              {/* BUTTONS */}

              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">

                <button
                  type="button"
                  onClick={() => {
                    setShowForm(
                      false
                    );
                    resetForm();
                  }}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600"
                >
                  {editing
                    ? "Update Subcategory"
                    : "Create Subcategory"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}