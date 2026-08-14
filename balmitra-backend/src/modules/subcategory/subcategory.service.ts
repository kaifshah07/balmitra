import { prisma } from "../../config/database";

export class SubCategoryService {
  // Get all subcategories
  static async getAll() {
    return prisma.subcategory.findMany({
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  }

  // Get subcategories by main category
  static async getByCategory(categoryId: number) {
    return prisma.subcategory.findMany({
      where: {
        categoryId,
        isActive: true,
      },
      orderBy: {
        displayOrder: "asc",
      },
    });
  }

  // Get single subcategory
  static async getById(id: number) {
    return prisma.subcategory.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });
  }

  // Create subcategory
  static async create(data: any) {
    const categoryId = Number(data.categoryId);

    // Make sure category exists
    const category = await prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      throw new Error("Category not found");
    }

    const slug = data.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    return prisma.subcategory.create({
      data: {
        name: data.name,
        slug,
        description: data.description || null,
        image: data.image || null,
        displayOrder: Number(data.displayOrder || 0),
        isActive:
          data.isActive === undefined
            ? true
            : data.isActive === true ||
              data.isActive === "true",
        categoryId,
      },
      include: {
        category: true,
      },
    });
  }

  // Update subcategory
  static async update(id: number, data: any) {
    const existing = await prisma.subcategory.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      throw new Error("Subcategory not found");
    }

    const updateData: any = {};

    if (data.name !== undefined) {
      updateData.name = data.name;

      updateData.slug = data.name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-");
    }

    if (data.description !== undefined) {
      updateData.description =
        data.description || null;
    }

    if (data.image !== undefined) {
      updateData.image =
        data.image || null;
    }

    if (data.displayOrder !== undefined) {
      updateData.displayOrder =
        Number(data.displayOrder);
    }

    if (data.isActive !== undefined) {
      updateData.isActive =
        data.isActive === true ||
        data.isActive === "true";
    }

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

    return prisma.subcategory.update({
      where: {
        id,
      },
      data: updateData,
      include: {
        category: true,
      },
    });
  }

  // Delete subcategory
  static async delete(id: number) {
    const existing = await prisma.subcategory.findUnique({
      where: {
        id,
      },
    });

    if (!existing) {
      throw new Error("Subcategory not found");
    }

    return prisma.subcategory.delete({
      where: {
        id,
      },
    });
  }
}