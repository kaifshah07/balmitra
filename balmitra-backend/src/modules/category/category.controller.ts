import { Request, Response } from "express";
import { CategoryService } from "./category.service";
import { uploadToCloudinary } from "../../utils/cloudinaryUpload";

export class CategoryController {

  static async create(req: Request, res: Response) {
    try {
      const image = req.file
        ? (await uploadToCloudinary(req.file.buffer, "balmitra/categories")).secure_url
        : undefined;
      const category = await CategoryService.create({ ...req.body, ...(image && { image }) });

      return res.status(201).json({
        success: true,
        message: "Category created successfully",
        data: category,
      });

    } catch (error: any) {

      return res.status(400).json({
        success: false,
        message: error.message,
      });

    }
  }

  static async getAll(req: Request, res: Response) {

    const categories = await CategoryService.getAll();

    return res.json({
      success: true,
      data: categories,
    });

  }

  static async getById(req: Request, res: Response) {

    const id = Number(req.params.id);

    const category = await CategoryService.getById(id);

    if (!category) {

      return res.status(404).json({
        success: false,
        message: "Category not found",
      });

    }

    return res.json({
      success: true,
      data: category,
    });

  }

  static async update(req: Request, res: Response) {

    const id = Number(req.params.id);

    const image = req.file
      ? (await uploadToCloudinary(req.file.buffer, "balmitra/categories")).secure_url
      : undefined;
    const category = await CategoryService.update(id, { ...req.body, ...(image && { image }) });

    return res.json({
      success: true,
      message: "Category updated successfully",
      data: category,
    });

  }

  static async delete(req: Request, res: Response) {

    const id = Number(req.params.id);

    await CategoryService.delete(id);

    return res.json({
      success: true,
      message: "Category deleted successfully",
    });

  }

}
