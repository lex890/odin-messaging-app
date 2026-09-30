import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { getConvos, createConvo, getConvoById } from "../controllers/convo.controller.js";

const router = Router();

router.get("/", requireAuth, getConvos);
router.post("/", requireAuth, createConvo);
router.get("/:id", requireAuth, getConvoById);

export default router;