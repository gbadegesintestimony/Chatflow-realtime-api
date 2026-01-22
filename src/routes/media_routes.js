import express from "express";
import { upload } from "../utils/upload.js";
import { uploadMedia } from "../controllers/media_controllers.js";
import { auth } from "../middlewares/auth_middleware.js";

const router = express.Router();

router.post("/upload", auth, upload.single("file"), uploadMedia);

export default router;
