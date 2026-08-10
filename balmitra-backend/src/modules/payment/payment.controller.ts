import { Request, Response } from "express";
import { PaymentService } from "./payment.service";

export class PaymentController {

  static async getAll(
    req: Request,
    res: Response
  ) {

    const page = Number(req.query.page) || 1;

    const limit = Number(req.query.limit) || 10;

    const search = String(req.query.search || "");

    const result =
      await PaymentService.getAll(
        page,
        limit,
        search
      );

    return res.json({

      success: true,

      ...result,

    });

  }

  static async getById(
    req: Request,
    res: Response
  ) {

    const payment =
      await PaymentService.getById(
        Number(req.params.id)
      );

    return res.json({

      success: true,

      data: payment,

    });

  }

  static async updateStatus(
    req: Request,
    res: Response
  ) {

    
    const payment =
  await PaymentService.updateStatus(
    String(req.params.id),
    req.body.paymentStatus
  );

    return res.json({

      success: true,

      message: "Payment Updated",

      data: payment,

    });

  }

  static async refund(
    req: Request,
    res: Response
  ) {

    const payment =
      await PaymentService.refund(
        Number(req.params.id)
      );

    return res.json({

      success: true,

      message: "Refund Successful",

      data: payment,

    });

  }

}