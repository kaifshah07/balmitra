import { Router } from "express";
import { OrderController } from "./order.controller";
import { authenticateAdmin } from "../../middleware/auth.middleware";

const router = Router();

// Customer places order
router.post("/", OrderController.create);

// Admin APIs
router.get("/", authenticateAdmin, OrderController.getAll);

router.get("/:id", authenticateAdmin, OrderController.getById);

router.patch(
  "/:id/status",
  authenticateAdmin,
  OrderController.updateStatus
);

router.delete(
  "/:id",
  authenticateAdmin,
  OrderController.delete
);

export default router;