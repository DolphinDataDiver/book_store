import express from "express";
import {
  addOrderItem,
  ReturnOrderItemById,
} from "../controllers/orderitemControllers.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);

router.post("/", requireRole("admin"), addOrderItem);
router.get("/:id", ReturnOrderItemById);

export default router;
