import { Router } from "express";
import { CategoryController } from "./category.controller";
import { authenticateAdmin } from "../../middleware/auth.middleware";

const router = Router();

router.post("/", authenticateAdmin, CategoryController.create);

router.get("/", authenticateAdmin, CategoryController.getAll);

router.get("/:id", authenticateAdmin, CategoryController.getById);

router.put("/:id", authenticateAdmin, CategoryController.update);

router.delete("/:id", authenticateAdmin, CategoryController.delete);

export default router;