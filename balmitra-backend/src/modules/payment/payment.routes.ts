import { Router } from "express";
import { PaymentController } from "./payment.controller";
import { authenticateAdmin } from "../../middleware/auth.middleware";

const router = Router();

router.get(
  "/",
  authenticateAdmin,
  PaymentController.getAll
);

router.get(
  "/:id",
  authenticateAdmin,
  PaymentController.getById
);

router.patch(
  "/:id/status",
  authenticateAdmin,
  PaymentController.updateStatus
);

router.patch(
  "/:id/refund",
  authenticateAdmin,
  PaymentController.refund
);

export default router;