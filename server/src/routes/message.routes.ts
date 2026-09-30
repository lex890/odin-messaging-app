import { Router } from "express";
import { requireAuth } from "../middleware/auth.middleware.js";
import { getMessages, createMessage } from "../controllers/message.controller.js";

const router = Router();

router.get("/:id/messages", requireAuth, getMessages);
router.post("/:id/messages", requireAuth, createMessage);

export default router;