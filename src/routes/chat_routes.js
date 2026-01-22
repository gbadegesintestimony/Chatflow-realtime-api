import { Router } from "express";
import { auth } from "../middlewares/auth_middleware.js";
import {
  openChat,
  createGroup,
  fetchChats,
  postMessage,
  fetchMessages,
} from "../controllers/chat_controller.js";

const router = Router();

router.use(auth);

router.post("/private", openChat);
router.post("/group", createGroup);
router.get("/", fetchChats);

router.post("/message", postMessage);
router.get("/message/:chatId", fetchMessages);

export default router;
