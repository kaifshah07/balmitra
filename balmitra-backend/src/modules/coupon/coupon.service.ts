import { prisma } from "../../config/database";

export class CouponService {

  static async create(data: any) {

    const coupon = await prisma.coupon.create({
      data: {
        code: data.code.toUpperCase(),
        description: data.description,
        discountType: data.discountType,
        discountValue: data.discountValue,
        minOrderAmount: data.minOrderAmount,
        maxDiscount: data.maxDiscount,
        usageLimit: data.usageLimit,
        expiresAt: data.expiresAt
          ? new Date(data.expiresAt)
          : null,
      },
    });

    return coupon;
  }

  static async getAll(page = 1, limit = 10, search = "") {

    const skip = (page - 1) * limit;

    const where = search
      ? {
          code: {
            contains: search,
          },
        }
      : {};

    const [coupons, total] = await Promise.all([

      prisma.coupon.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),

      prisma.coupon.count({
        where,
      }),

    ]);

    return {
      coupons,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  static async getById(id: number) {

    return prisma.coupon.findUnique({
      where: {
        id,
      },
    });

  }

  static async update(id: number, data: any) {

    return prisma.coupon.update({
      where: {
        id,
      },
      data: {
        code: data.code?.toUpperCase(),
        description: data.description,
        discountType: data.discountType,
        discountValue: data.discountValue,
        minOrderAmount: data.minOrderAmount,
        maxDiscount: data.maxDiscount,
        usageLimit: data.usageLimit,
        expiresAt: data.expiresAt
          ? new Date(data.expiresAt)
          : undefined,
      },
    });

  }

  static async activate(id: number) {

    return prisma.coupon.update({
      where: {
        id,
      },
      data: {
        isActive: true,
      },
    });

  }

  static async deactivate(id: number) {

    return prisma.coupon.update({
      where: {
        id,
      },
      data: {
        isActive: false,
      },
    });

  }

  static async delete(id: number) {

    return prisma.coupon.delete({
      where: {
        id,
      },
    });

  }

}