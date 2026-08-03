console.log("✅ Product Routes Loaded");
import { Router } from "express";
import { ProductController } from "./product.controller";
import { authenticateAdmin } from "../../middleware/auth.middleware";
import { upload } from "./upload.middleware";


const router = Router();

// Create Product
router.post(
  "/",
  authenticateAdmin,
  upload.single("thumbnail"),
  ProductController.create
);

// Get All Products
router.get(
  "/",
  authenticateAdmin,
  ProductController.getAll
);

// Get Single Product
router.get(
  "/:id",
  authenticateAdmin,
  ProductController.getById
);

// Update Product
router.put(
  "/:id",
  authenticateAdmin,
  upload.single("thumbnail"),
  ProductController.update
);

// Delete Product
router.delete(
  "/:id",
  authenticateAdmin,
  ProductController.delete
);

export default router;