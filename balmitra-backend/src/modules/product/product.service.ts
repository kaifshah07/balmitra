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

  static async getById(id: number) {

    return prisma.product.findUnique({

      where: { id },

      include: {

        category: true,

      },

    });

  }

  static async update(id: number, data: any) {

    return prisma.product.update({

      where: { id },

      data,

    });

  }

  static async delete(id: number) {

    return prisma.product.delete({

      where: { id },

    });

  }

}