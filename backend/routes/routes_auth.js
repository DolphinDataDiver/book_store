import express from "express";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/profile", requireAuth, (req, res) => {
  res.json({
    username: req.auth.username,
    email: req.auth.email,
    name: req.auth.name,
    roles: req.auth.roles,
  });
});

export default router;
