import { Router } from "express";
import bannerRoutes from "../modules/banner/banner.routes";
import adminRoutes from "../modules/admin/admin.routes";
import productRoutes from "../modules/product/product.routes";
import publicProductRoutes from "../modules/product/public-product.routes";
import categoryRoutes from "../modules/category/category.routes";
import orderRoutes from "../modules/order/order.routes";
import { customerRoutes } from "../modules/customer";
import { couponRoutes } from "../modules/coupon";
import { settingsRoutes } from "../modules/settings";
import paymentRoutes from "../modules/payment/payment.routes";
import customerAuthRoutes from "../modules/customer-auth/customer-auth.routes";
import vendorEnquiryRoutes from "../modules/vendor-enquiry/vendor-enquiry.routes";
import franchiseEnquiryRoutes from "../modules/franchise-enquiry/franchise-enquiry.routes";
import publicCategoryRoutes from "../modules/category/public-category.routes";
import subCategoryRoutes from "../modules/subcategory/subcategory.routes";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "API is healthy",
  });
});

router.use("/admin", adminRoutes);
router.use("/admin/categories", categoryRoutes);
router.use("/categories", publicCategoryRoutes);
router.use("/admin/products", productRoutes);
router.use(
  "/subcategories",
  subCategoryRoutes
); 
router.use("/products", publicProductRoutes);
router.use("/admin/banners", bannerRoutes);
router.use("/orders", orderRoutes);
router.use("/customers",customerRoutes);
router.use("/coupons", couponRoutes);
router.use("/settings", settingsRoutes);
router.use("/payments",paymentRoutes);
router.use("/auth/customer",customerAuthRoutes);
router.use("/vendor-enquiries",vendorEnquiryRoutes);
router.use("/franchise-enquiries",franchiseEnquiryRoutes);
router.use("/categories", categoryRoutes);

export default router;