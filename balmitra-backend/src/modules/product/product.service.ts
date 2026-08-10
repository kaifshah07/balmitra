import { prisma } from "../../config/database";

export class ProductService {

  static async create(data: any) {

    const slug = data.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const sku = `BAL-${Date.now()}`;

    const categoryId = Number(data.categoryId);

    const category = await prisma.category.findUnique({
        where: {
        id: categoryId,
              },
          });

    if (!category) {
      throw new Error("Category not found");
    }

    return prisma.product.create({
  data: {
    ...data,

    categoryId,

    price: Number(data.price),

    discountPrice: data.discountPrice
      ? Number(data.discountPrice)
      : null,

    stock: Number(data.stock),

    isFeatured: data.isFeatured === "true",

    isTrending: data.isTrending === "true",

    isNewArrival: data.isNewArrival === "true",

    slug,

    sku,
  },

  include: {
    category: true,
  },
});

  }

  static async getAll() {

    return prisma.product.findMany({

      include: {

        category: true,

      },

      orderBy: {

        createdAt: "desc",

      },

    });

  }


  
static async update(id: number, data: any) {
  const existingProduct = await prisma.product.findUnique({
    where: { id },
  });

  if (!existingProduct) {
    throw new Error("Product not found");
  }

  const updateData: any = {};

  // Basic fields
  if (data.name !== undefined) {
    updateData.name = data.name;
  }

  if (data.description !== undefined) {
    updateData.description = data.description;
  }

  // Category
  if (data.categoryId !== undefined) {
    const categoryId = Number(data.categoryId);

    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    updateData.categoryId = categoryId;
  }

  // Price
  if (data.price !== undefined) {
    updateData.price = Number(data.price);
  }

  // Discount Price
  if (data.discountPrice !== undefined) {
    updateData.discountPrice =
      data.discountPrice === "" ||
      data.discountPrice === null
        ? null
        : Number(data.discountPrice);
  }

  // Stock
  if (data.stock !== undefined) {
    updateData.stock = Number(data.stock);
  }

  // Boolean fields
  if (data.isFeatured !== undefined) {
    updateData.isFeatured =
      data.isFeatured === true ||
      data.isFeatured === "true";
  }

  if (data.isTrending !== undefined) {
    updateData.isTrending =
      data.isTrending === true ||
      data.isTrending === "true";
  }

  if (data.isNewArrival !== undefined) {
    updateData.isNewArrival =
      data.isNewArrival === true ||
      data.isNewArrival === "true";
  }

  if (data.isActive !== undefined) {
    updateData.isActive =
      data.isActive === true ||
      data.isActive === "true";
  }

  // Thumbnail
  if (data.thumbnail !== undefined) {
    updateData.thumbnail = data.thumbnail;
  }

  // Update slug if name changed
  if (data.name !== undefined) {
    updateData.slug = data.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");
  }

  return prisma.product.update({
    where: {
      id,
    },
    data: updateData,
    include: {
      category: true,
    },
  });
}



  static async delete(id: number) {

    return prisma.product.delete({

      where: { id },

    });

  }

  static async getById(id: number) {
  return prisma.product.findUnique({
    where: {
      id,
    },
    include: {
      category: true,
      gallery: true,
      orderItems: true,
    },
  });
}

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
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

static async getPublicProductById(id: number) {
  return prisma.product.findFirst({
    where: {
      id,
      isActive: true,
    },
    include: {
      category: true,
      gallery: true,
    },
  });
}
}