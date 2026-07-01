import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  getAllOrders,
  updateOrderStatus,
  getAllCustomers,
  getDashboardStats,
} from "../../controllers/admin/admin.js";
import { adminOnly, protectRoute } from "../../middleware/auth.js";

const router = Router();
router.use(protectRoute, adminOnly);

// PRODUCTS PART
router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.put("/products/:id", updateProduct);

// ORDERS PART
router.get("/orders", getAllOrders);
router.patch("/orders/:orderId/status", updateOrderStatus);
//put used for all product card but patch for updadting a specific part only
router.get("/customers", getAllCustomers);
router.get("/stats", getDashboardStats);
export default router;
