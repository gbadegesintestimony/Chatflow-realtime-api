import { Router } from "express";
import authRoutes from "../routes/auth_routes.js";
import chatRoutes from "../routes/chat_routes.js";
import mediaRoutes from "../routes/media_routes.js";

const router = Router();

router.get("/health", (_, res) => {
  res.json({ status: "OK", services: "ChatFlow API" });
});

router.use("/auth", authRoutes);
router.use("/chat", chatRoutes);
router.use("/media", mediaRoutes);

export default router;
