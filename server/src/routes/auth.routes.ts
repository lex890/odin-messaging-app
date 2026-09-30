import { Router } from "express";
import { createUser, login, logout } from "../controllers/auth.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.post("/register", createUser);
router.post("/login", login);
router.post("/logout", logout);

export default router;