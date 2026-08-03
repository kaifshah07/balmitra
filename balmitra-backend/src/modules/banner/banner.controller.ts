import { Request, Response } from "express";
import { BannerService } from "./banner.service";

export class BannerController {

  static async create(req: Request, res: Response) {
    try {
      const banner = await BannerService.create({
        ...req.body,
        image: req.file?.filename,
      });

      return res.status(201).json({
        success: true,
        message: "Banner created successfully",
        data: banner,
      });
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  static async getAll(req: Request, res: Response) {
    const banners = await BannerService.getAll();

    return res.json({
      success: true,
      data: banners,
    });
  }

  static async getById(req: Request, res: Response) {
    const banner = await BannerService.getById(Number(req.params.id));

    return res.json({
      success: true,
      data: banner,
    });
  }

  static async update(req: Request, res: Response) {
    const banner = await BannerService.update(
      Number(req.params.id),
      {
        ...req.body,
        ...(req.file && { image: req.file.filename }),
      }
    );

    return res.json({
      success: true,
      message: "Banner updated successfully",
      data: banner,
    });
  }

  static async delete(req: Request, res: Response) {
    await BannerService.delete(Number(req.params.id));

    return res.json({
      success: true,
      message: "Banner deleted successfully",
    });
  }
}