import api from "./api";

/*
|--------------------------------------------------------------------------
| PUBLIC PRODUCTS
|--------------------------------------------------------------------------
*/

// Get all public products
export const getPublicProducts = async () => {
  try {
    const { data } = await api.get(
      "/admin/products/public"
    );

    return data.data || [];
  } catch (error) {
    console.error(
      "Get Public Products Error:",
      error
    );

    throw error;
  }
};


// Get single public product
export const getPublicProduct = async (id) => {
  try {
    const { data } = await api.get(
      `/admin/products/public/${id}`
    );

    return data.data;
  } catch (error) {
    console.error(
      "Get Public Product Error:",
      error
    );

    throw error;
  }
};


/*
|--------------------------------------------------------------------------
| ADMIN PRODUCTS
|--------------------------------------------------------------------------
*/

// Get all admin products
export const getProducts = async () => {
  try {
    const { data } = await api.get(
      "/admin/products"
    );

    return data.data || data;
  } catch (error) {
    console.error(
      "Get Products Error:",
      error
    );

    throw error;
  }
};


// Create Product
export const createProduct = async (
  productData
) => {
  try {
    const { data } = await api.post(
      "/admin/products",
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    console.error(
      "Create Product Error:",
      error
    );

    throw error;
  }
};


// Update Product
export const updateProduct = async (
  id,
  productData
) => {
  try {
    const { data } = await api.put(
      `/admin/products/${id}`,
      productData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    console.error(
      "Update Product Error:",
      error
    );

    throw error;
  }
};


// Delete Product
export const deleteProduct = async (
  id
) => {
  try {
    const { data } = await api.delete(
      `/admin/products/${id}`
    );

    return data;
  } catch (error) {
    console.error(
      "Delete Product Error:",
      error
    );

    throw error;
  }
};