import { Router } from "express";
import { CategoryController } from "./category.controller";
import { authenticateAdmin } from "../../middleware/auth.middleware";

const router = Router();

// Admin: create category
router.post(
"/",
authenticateAdmin,
CategoryController.create
);

// Public: get all categories
router.get(
"/",
CategoryController.getAll
);

// Public: get single category
router.get(
"/:id",
CategoryController.getById
);

// Admin: update category
router.put(
"/:id",
authenticateAdmin,
CategoryController.update
);

// Admin: delete category
router.delete(
"/:id",
authenticateAdmin,
CategoryController.delete
);

export default router;
