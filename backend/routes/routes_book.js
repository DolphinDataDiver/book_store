import express from "express";
import {
  ReturnBooks,
  ReturnBookById,
  AddBook,
  ModifyBook,
  DeleteBook,
} from "../controllers/bookControllers.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", ReturnBooks);
router.get("/:id", ReturnBookById);
router.post("/", requireRole("admin"), AddBook);
router.put("/:id", requireRole("admin"), ModifyBook);
router.delete("/:id", requireRole("admin"), DeleteBook);

export default router;
