import { Request, Response } from "express";
import { ProductService } from "./product.service";

  export class ProductController {
    static async create(req: Request, res: Response) {
      try {
        const product = await ProductService.create({
          ...req.body,
          thumbnail: req.file?.filename,
        });

        return res.status(201).json({
          success: true,
          message: "Product created successfully",
          data: product,
        });
      } catch (error: any) {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    }

    static async getAll(req: Request, res: Response) {
      const products = await ProductService.getAll();

      return res.json({
        success: true,
        data: products,
      });
    }


    static async update(req: Request, res: Response) {
      const product = await ProductService.update(Number(req.params.id), {
        ...req.body,
        ...(req.file && { thumbnail: req.file.filename }),
      });

      return res.json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    }

    static async delete(req: Request, res: Response) {
      await ProductService.delete(Number(req.params.id));

      return res.json({
        success: true,
        message: "Product deleted successfully",
      });
    }

    static async getById(req: Request, res: Response) {
  try {

    const product =
      await ProductService.getById(
        Number(req.params.id)
      );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      data: product,
    });

  } catch (error: any) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
}

static async getPublicProducts(req: Request, res: Response) {
  try {
    const products = await ProductService.getPublicProducts();

    return res.json({
      success: true,
      data: products,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

static async getPublicProductById(req: Request, res: Response) {
  try {
    const product = await ProductService.getPublicProductById(
      Number(req.params.id)
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.json({
      success: true,
      data: product,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
}