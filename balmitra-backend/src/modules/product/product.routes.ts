import { Router } from "express";

import { ProductController } from "./product.controller";

import { authenticateAdmin } from "../../middleware/auth.middleware";

import { upload } from "../../middleware/upload.middleware";

const router = Router();

// CREATE
router.post(
  "/",
  authenticateAdmin,
  upload.single("thumbnail"),
  ProductController.create
);

// GET ALL
router.get(
  "/",
  authenticateAdmin,
  ProductController.getAll
);

// GET ONE
router.get(
  "/:id",
  authenticateAdmin,
  ProductController.getById
);

// UPDATE
router.put(
  "/:id",
  authenticateAdmin,
  upload.single("thumbnail"),
  ProductController.update
);

// DELETE
router.delete(
  "/:id",
  authenticateAdmin,
  ProductController.delete
);

export default router;