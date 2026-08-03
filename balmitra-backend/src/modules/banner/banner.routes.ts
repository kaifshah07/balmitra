import { Router } from "express";
import { BannerController } from "./banner.controller";
import { authenticateAdmin } from "../../middleware/auth.middleware";
import { uploadBanner } from "./upload.middleware";

const router = Router();

router.post(
  "/",
  authenticateAdmin,
  uploadBanner.single("image"),
  BannerController.create
);

router.get("/", authenticateAdmin, BannerController.getAll);

router.get("/:id", authenticateAdmin, BannerController.getById);

router.put(
  "/:id",
  authenticateAdmin,
  uploadBanner.single("image"),
  BannerController.update
);

router.delete("/:id", authenticateAdmin, BannerController.delete);

export default router;