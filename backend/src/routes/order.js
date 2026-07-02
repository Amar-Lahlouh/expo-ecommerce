import Router from "express";
import { protectRoute } from "../middleware/auth.js";
import { createOrder, getUserOrders } from "../controllers/order.js";

const router = Router();

router.post("/", protectRoute, createOrder);
router.get("/", protectRoute, getUserOrders);
export default router;
