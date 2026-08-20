import { prisma } from "../../config/database";
import cloudinary from "../../config/cloudinary";
import { uploadToCloudinary } from "../../utils/cloudinaryUploads";

export class ProductService {
  // =========================================================
  // CREATE PRODUCT
  // =========================================================

static async create(data: any) {
  
console.log("=== PRODUCT CREATE STARTED ===");
let thumbnailUrl: string | null = null;
let thumbnailPublicId: string | null = null;

if (data.file) {

  console.log(
    "FILE RECEIVED:",
    !!data.file
  );

  console.log(
    "FILE SIZE:",
    data.file?.buffer?.length
  );

  const uploaded =
    await uploadToCloudinary(
      data.file.buffer,
      "balmitra/products"
    );

  console.log(
    "CLOUDINARY RESPONSE:",
    uploaded
  );

  thumbnailUrl =
    uploaded.secure_url;

  thumbnailPublicId =
    uploaded.public_id;
}
    const slug = data.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const sku = `BAL-${Date.now()}`;

    const categoryId = Number(data.categoryId);

    // Check main category
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    // Check subcategory if provided
    let subcategoryId: number | null = null;

    if (
      data.subcategoryId !== null &&
      data.subcategoryId !== undefined &&
      data.subcategoryId !== ""
    ) {
      subcategoryId = Number(data.subcategoryId);

      const subcategory = await prisma.subcategory.findUnique({
        where: {
          id: subcategoryId,
        },
      });

      if (!subcategory) {
        throw new Error("Subcategory not found");
      }

      // Make sure subcategory belongs to selected category
      if (subcategory.categoryId !== categoryId) {
        throw new Error(
          "Selected subcategory does not belong to the selected category"
        );
      }
    }

    return prisma.product.create({
      data: {
        name: data.name,

        description: data.description || null,

        shortDescription:
          data.shortDescription || null,

        brand:
          data.brand || null,

        ageGroup:
          data.ageGroup || null,

        categoryId,

        subcategoryId,

        price: Number(data.price),

        discountPrice:
          data.discountPrice !== undefined &&
          data.discountPrice !== "" &&
          data.discountPrice !== null
            ? Number(data.discountPrice)
            : null,

        stock: Number(data.stock),

        thumbnail: thumbnailUrl,
        thumbnailPublicId: thumbnailPublicId,

        isFeatured:
          data.isFeatured === true ||
          data.isFeatured === "true",

        isTrending:
          data.isTrending === true ||
          data.isTrending === "true",

        isNewArrival:
          data.isNewArrival === true ||
          data.isNewArrival === "true",

        isActive:
          data.isActive === undefined
            ? true
            : data.isActive === true ||
              data.isActive === "true",

        metaTitle:
          data.metaTitle || null,

        metaDescription:
          data.metaDescription || null,

        slug,

        sku,
      },

      include: {
        category: true,
        subcategory: true,
      },
    });
  }

  // =========================================================
  // GET ALL PRODUCTS - ADMIN
  // =========================================================

  static async getAll() {
    return prisma.product.findMany({
      include: {
        category: true,
        subcategory: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // =========================================================
  // UPDATE PRODUCT
  // =========================================================


  static async update(id: number, data: any) {
    const existingProduct =
      await prisma.product.findUnique({
        where: {
          id,
        },
      });

    if (!existingProduct) {
      throw new Error("Product not found");
    }

    const updateData: any = {};

    

    // -------------------------------------------------------
    // Basic fields
    // -------------------------------------------------------

    if (data.name !== undefined) {
      updateData.name = data.name;
    }

    if (data.description !== undefined) {
      updateData.description =
        data.description || null;
    }

    if (data.shortDescription !== undefined) {
      updateData.shortDescription =
        data.shortDescription || null;
    }

    if (data.brand !== undefined) {
      updateData.brand =
        data.brand || null;
    }

    if (data.ageGroup !== undefined) {
      updateData.ageGroup =
        data.ageGroup || null;
    }

    // -------------------------------------------------------
    // Category
    // -------------------------------------------------------

    let categoryId =
      existingProduct.categoryId;

    if (data.categoryId !== undefined) {
      categoryId = Number(data.categoryId);

      const category =
        await prisma.category.findUnique({
          where: {
            id: categoryId,
          },
        });

      if (!category) {
        throw new Error(
          "Category not found"
        );
      }

      updateData.categoryId =
        categoryId;
    }

    // -------------------------------------------------------
    // Subcategory
    // -------------------------------------------------------

    if (data.subcategoryId !== undefined) {
      if (
        data.subcategoryId === "" ||
        data.subcategoryId === null
      ) {
        updateData.subcategoryId = null;
      } else {
        const subcategoryId =
          Number(data.subcategoryId);

        const subcategory =
          await prisma.subcategory.findUnique({
            where: {
              id: subcategoryId,
            },
          });

        if (!subcategory) {
          throw new Error(
            "Subcategory not found"
          );
        }

        // Make sure subcategory belongs
        // to selected main category
        if (
          subcategory.categoryId !==
          categoryId
        ) {
          throw new Error(
            "Selected subcategory does not belong to the selected category"
          );
        }

        updateData.subcategoryId =
          subcategoryId;
      }
    }

    // -------------------------------------------------------
    // Price
    // -------------------------------------------------------

    if (data.price !== undefined) {
      updateData.price =
        Number(data.price);
    }

    // -------------------------------------------------------
    // Discount Price
    // -------------------------------------------------------

    if (
      data.discountPrice !== undefined
    ) {
      updateData.discountPrice =
        data.discountPrice === "" ||
        data.discountPrice === null
          ? null
          : Number(data.discountPrice);
    }

    // -------------------------------------------------------
    // Stock
    // -------------------------------------------------------

    if (data.stock !== undefined) {
      updateData.stock =
        Number(data.stock);
    }

    // -------------------------------------------------------
    // Boolean fields
    // -------------------------------------------------------

    if (
      data.isFeatured !== undefined
    ) {
      updateData.isFeatured =
        data.isFeatured === true ||
        data.isFeatured === "true";
    }

    if (
      data.isTrending !== undefined
    ) {
      updateData.isTrending =
        data.isTrending === true ||
        data.isTrending === "true";
    }

    if (
      data.isNewArrival !== undefined
    ) {
      updateData.isNewArrival =
        data.isNewArrival === true ||
        data.isNewArrival === "true";
    }

    if (
      data.isActive !== undefined
    ) {
      updateData.isActive =
        data.isActive === true ||
        data.isActive === "true";
    }

    // -------------------------------------------------------
    // Thumbnail
    // -------------------------------------------------------

    if (data.thumbnail !== undefined) {
      updateData.thumbnail =
        data.thumbnail;
    }

    // -------------------------------------------------------
    // SEO
    // -------------------------------------------------------

    if (data.metaTitle !== undefined) {
      updateData.metaTitle =
        data.metaTitle || null;
    }

    if (
      data.metaDescription !== undefined
    ) {
      updateData.metaDescription =
        data.metaDescription || null;
    }

    // -------------------------------------------------------
    // Update slug when name changes
    // -------------------------------------------------------

    if (data.name !== undefined) {
      updateData.slug = data.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");
    }
    // -------------------------------------------------------
// Upload new image
// -------------------------------------------------------

if (data.imageFile) {
  console.log("===== PRODUCT UPLOAD START =====");
console.log("File Name:", data.file?.originalname);
console.log("File Size:", data.file?.size);
console.log("Mime Type:", data.file?.mimetype);
  const uploaded = await uploadToCloudinary(
    data.imageFile.buffer,
    "balmitra/products"
  );

  updateData.thumbnail = uploaded.secure_url;
  updateData.thumbnailPublicId = uploaded.public_id;
}

    // -------------------------------------------------------
    // Update database
    // -------------------------------------------------------

    return prisma.product.update({
      where: {
        id,
      },

      data: updateData,

      include: {
        category: true,
        subcategory: true,
      },
    });
  }

  // =========================================================
  // DELETE PRODUCT
  // =========================================================

  static async delete(id: number) {
    return prisma.product.delete({
      where: {
        id,
      },
    });
  }

  // =========================================================
  // GET PRODUCT BY ID
  // =========================================================

  static async getById(id: number) {
    return prisma.product.findUnique({
      where: {
        id,
      },

      include: {
        category: true,
        subcategory: true,
        gallery: true,
        orderItems: true,
      },
    });
  }

  // =========================================================
  // GET PUBLIC PRODUCTS
  // =========================================================

  static async getPublicProducts() {
    return prisma.product.findMany({
      where: {
        isActive: true,

        stock: {
          gt: 0,
        },
      },

      include: {
        category: true,
        subcategory: true,
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // =========================================================
  // GET PUBLIC PRODUCT BY ID
  // =========================================================

  static async getPublicProductById(
    id: number
  ) {
    return prisma.product.findFirst({
      where: {
        id,

        isActive: true,
      },

      include: {
        category: true,
        subcategory: true,
        gallery: true,
      },
    });
  }
}
