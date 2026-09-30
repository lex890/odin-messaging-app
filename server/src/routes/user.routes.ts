import { Router } from "express";
import { getCurrentUser, updateCurrentUser, getUserById } from "../controllers/user.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/me", requireAuth, getCurrentUser);
router.patch("/me", requireAuth, updateCurrentUser);
router.get("/:id", requireAuth, getUserById);

export default router;