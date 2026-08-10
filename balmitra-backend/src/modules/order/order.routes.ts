import { Router } from "express";

import { OrderController } from "./order.controller";

import { authenticateAdmin } from "../../middleware/auth.middleware";
import { authenticateCustomer } from "../customer-auth/customer-auth.middleware";

const router = Router();

// Customer places order
router.post(
  "/",
  authenticateCustomer,
  OrderController.create
);

// Customer orders
router.get(
  "/my-orders",
  authenticateCustomer,
  OrderController.getMyOrders
);

// Customer single order
router.get(
  "/my-orders/:id",
  authenticateCustomer,
  OrderController.getMyOrderById
);

// Admin APIs
router.get(
  "/",
  authenticateAdmin,
  OrderController.getAll
);

router.get(
  "/:id",
  authenticateAdmin,
  OrderController.getById
);

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

router.patch(
  "/:id/payment",
  authenticateAdmin,
  OrderController.updatePaymentStatus
);

router.patch(
  "/:id/cancel",
  authenticateAdmin,
  OrderController.cancelOrder
);

export default router;