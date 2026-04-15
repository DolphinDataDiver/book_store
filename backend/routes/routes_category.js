import express from "express";
import { AddCategory, DeleteCategory } from "../controllers/categoryControllers.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);

router.post("/", requireRole("admin"), AddCategory);
router.delete("/:id", requireRole("admin"), DeleteCategory);

export default router; 
