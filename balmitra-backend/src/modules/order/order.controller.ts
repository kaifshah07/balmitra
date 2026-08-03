import { Request, Response } from "express";
import { OrderService } from "./order.service";

export class OrderController {

  static async create(req: Request, res: Response) {
    try {

      const order = await OrderService.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Order created successfully",
        data: order,
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  }

  static async getAll(req: Request, res: Response) {
  try {

    const data = await OrderService.getAll(req.query);

    return res.status(200).json({
      success: true,
      ...data,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
}

  static async getById(req: Request, res: Response) {

    const order = await OrderService.getById(
      Number(req.params.id)
    );

    return res.json({
      success: true,
      data: order,
    });

  }

  static async updateStatus(req: Request, res: Response) {

    const order = await OrderService.updateStatus(
      Number(req.params.id),
      req.body.orderStatus
    );

    return res.json({
      success: true,
      message: "Order status updated",
      data: order,
    });

  }

  static async delete(req: Request, res: Response) {

    await OrderService.delete(Number(req.params.id));

    return res.json({
      success: true,
      message: "Order deleted successfully",
    });

  }
}