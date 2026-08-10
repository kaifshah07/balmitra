import { prisma } from "../../config/database";

export class PaymentService {

  static async getAll(
    page = 1,
    limit = 10,
    search = "",
    paymentStatus = ""
  ) {

    const skip = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where.OR = [
        {
          paymentId: {
            contains: search,
          },
        },
        {
          razorpayPaymentId: {
            contains: search,
          },
        },
        {
          transactionId: {
            contains: search,
          },
        },
      ];
    }

    if (paymentStatus) {
      where.paymentStatus = paymentStatus;
    }

    const [payments, total] = await Promise.all([

      prisma.payment.findMany({

        where,

        skip,

        take: limit,

        include: {

          order: {

            include: {

              customer: true,

            },

          },

        },

        orderBy: {

          createdAt: "desc",

        },

      }),

      prisma.payment.count({

        where,

      }),

    ]);

    return {

      payments,

      pagination: {

        total,

        page,

        limit,

        totalPages: Math.ceil(total / limit),

      },

    };

  }

  static async getById(id: number) {

    return prisma.payment.findUnique({

      where: {

        id,

      },

      include: {

        order: {

          include: {

            customer: true,

            items: {

              include: {

                product: true,

              },

            },

          },

        },

      },

    });

  }

  static async refund(id: number) {

    return prisma.payment.update({

      where: {

        id,

      },

      data: {

        refunded: true,

        refundDate: new Date(),

        paymentStatus: "REFUNDED",

      },

    });

  }

  static async updateStatus(
  paymentId: string,
  status: "PENDING" | "PAID" | "FAILED" | "REFUNDED"
) {
  const payment = await prisma.payment.findUnique({
    where: {
      paymentId,
    },
  });

  if (!payment) {
    throw new Error("Payment not found");
  }

  const updatedPayment = await prisma.payment.update({
    where: {
      paymentId,
    },
    data: {
      paymentStatus: status,
    },
  });

  // Keep Order payment status synchronized
  await prisma.order.update({
    where: {
      id: payment.orderId,
    },
    data: {
      paymentStatus: status,
    },
  });

  return updatedPayment;
}

}