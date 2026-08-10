console.log("✅ Product Routes Loaded");

import { Router } from "express";
import { ProductController } from "./product.controller";
import { authenticateAdmin } from "../../middleware/auth.middleware";
import { upload } from "./upload.middleware";

const router = Router();

/*
|--------------------------------------------------------------------------
| PUBLIC PRODUCT ROUTES
|--------------------------------------------------------------------------
*/

// Public: Get all products
router.get(
  "/public",
  ProductController.getAll
);

// Public: Get single product
router.get(
  "/public/:id",
  ProductController.getById
);


/*
|--------------------------------------------------------------------------
| ADMIN PRODUCT ROUTES
|--------------------------------------------------------------------------
*/

// Admin: Create Product
router.post(
  "/",
  authenticateAdmin,
  upload.single("thumbnail"),
  ProductController.create
);

// Admin: Get All Products
router.get(
  "/",
  authenticateAdmin,
  ProductController.getAll
);

// Admin: Get Single Product
router.get(
  "/:id",
  ProductController.getById
);

// Admin: Update Product
router.put(
  "/:id",
  authenticateAdmin,
  upload.single("thumbnail"),
  ProductController.update
);

// Admin: Delete Product
router.delete(
  "/:id",
  authenticateAdmin,
  ProductController.delete
);

export default router;