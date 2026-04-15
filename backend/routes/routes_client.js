import express from "express";
import {
  ReturnClients,
  ReturnClientById,
  AddClient,
  DeleteClient,
} from "../controllers/clientControllers.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", ReturnClients);
router.get("/:id", ReturnClientById);
router.post("/", requireRole("admin"), AddClient);
router.delete("/:id", requireRole("admin"), DeleteClient);

export default router;
