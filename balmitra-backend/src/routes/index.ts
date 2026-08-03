import { Router } from "express";
import bannerRoutes from "../modules/banner/banner.routes";
import adminRoutes from "../modules/admin/admin.routes";
import productRoutes from "../modules/product/product.routes";
import categoryRoutes from "../modules/category/category.routes";
import orderRoutes from "../modules/order/order.routes";



const router = Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
  });
});

router.use("/admin", adminRoutes);
router.use("/admin/categories", categoryRoutes);
router.use("/admin/products", productRoutes);
router.use("/admin/banners", bannerRoutes);
router.use("/orders", orderRoutes);

export default router;