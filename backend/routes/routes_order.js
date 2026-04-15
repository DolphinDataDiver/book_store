import express from "express";
import {
  ReturnOrders,
  ReturnOrderById,
  addOrder,
  DeleteOrder,
} from "../controllers/orderControllers.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", ReturnOrders);
router.get("/:id", ReturnOrderById);
router.post("/", requireRole("admin"), addOrder);
router.delete("/:id", requireRole("admin"), DeleteOrder);

export default router;
