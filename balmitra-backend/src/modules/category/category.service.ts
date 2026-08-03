import { prisma } from "../../config/database";

export class CategoryService {
  static async create(data: {
    name: string;
    description?: string;
    image?: string;
    displayOrder?: number;
  }) {
    const slug = data.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");

    const existing = await prisma.category.findFirst({
      where: {
        OR: [
          { name: data.name },
          { slug }
        ]
      }
    });

    if (existing) {
      throw new Error("Category already exists");
    }

    return prisma.category.create({
      data: {
        ...data,
        slug,
      },
    });
  }

  static async getAll() {
    return prisma.category.findMany({
      orderBy: {
        displayOrder: "asc",
      },
    });
  }

  static async getById(id: number) {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  static async update(id: number, data: any) {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  static async delete(id: number) {
    return prisma.category.delete({
      where: { id },
    });
  }
}