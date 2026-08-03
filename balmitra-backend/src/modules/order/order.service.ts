import { prisma } from "../../config/database";
import { Prisma } from "@prisma/client";
import { CreateOrderDTO } from "./order.types";

export class OrderService {
  static async create(data: CreateOrderDTO) {
    return await prisma.$transaction(async (tx) => {

      let totalAmount = new Prisma.Decimal(0);

      const orderItems: {
        productId: number;
        quantity: number;
        price: Prisma.Decimal;
      }[] = [];

      // Validate Products & Calculate Total
      for (const item of data.items) {

        const product = await tx.product.findUnique({
          where: {
            id: item.productId,
          },
        });

        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        if (product.stock < item.quantity) {
          throw new Error(
            `${product.name} has only ${product.stock} items left`
          );
        }

        totalAmount = totalAmount.plus(
          product.price.mul(item.quantity)
        );

        orderItems.push({
          productId: product.id,
          quantity: item.quantity,
          price: product.price,
        });
      }

      // Generate Order Number
      const orderNumber =
        "ORD-" +
        Date.now().toString().slice(-8);

      // Create Order
      const order = await tx.order.create({
        data: {
          orderNumber,

          customerName: data.customerName,

          customerEmail: data.customerEmail,

          customerPhone: data.customerPhone,

          address: data.address,

          paymentMethod: data.paymentMethod,

          totalAmount,

          items: {
            create: orderItems,
          },
        },

        include: {
          items: true,
        },
      });

      // Reduce Stock
      for (const item of orderItems) {

        await tx.product.update({

          where: {
            id: item.productId,
          },

          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }

      return order;
    });
  }

  static async getAll(query: any) {
  const {
    page = 1,
    limit = 10,
    search = "",
    orderStatus,
    paymentStatus,
    sort = "desc",
  } = query;

  const skip = (Number(page) - 1) * Number(limit);

  const where: any = {};

  if (search) {
    where.OR = [
      {
        orderNumber: {
          contains: search,
        },
      },
      {
        customerName: {
          contains: search,
        },
      },
      {
        customerEmail: {
          contains: search,
        },
      },
    ];
  }

  if (orderStatus) {
    where.orderStatus = orderStatus;
  }

  if (paymentStatus) {
    where.paymentStatus = paymentStatus;
  }

  const [orders, total] = await Promise.all([
    prisma.order.findMany({
      where,
      skip,
      take: Number(limit),

      include: {
        items: {
          include: {
            product: true,
          },
        },
      },

      orderBy: {
        createdAt: sort === "asc" ? "asc" : "desc",
      },
    }),

    prisma.order.count({
      where,
    }),
  ]);

  return {
    orders,

    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / Number(limit)),
    },
  };
}

  static async getById(id: number) {
    return prisma.order.findUnique({
      where: {
        id,
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  static async updateStatus(
    id: number,
    orderStatus: any
  ) {
    return prisma.order.update({
      where: {
        id,
      },
      data: {
        orderStatus,
      },
    });
  }

  static async delete(id: number) {
    return prisma.order.delete({
      where: {
        id,
      },
    });
  }
}