import { Router } from "express";
import { isAuthenticated } from "../middleware/authMiddleware.js";
import {
  addChat,
  addMessage,
  getChat,
  getChats,
  readChat,
} from "../controllers/chatController.js";

const router = Router();

router.get("/", isAuthenticated, getChats);
router.get("/:id", isAuthenticated, getChat);
router.post("/", isAuthenticated, addChat);
router.post("/message/:chatId", isAuthenticated, addMessage);
router.put("/read/:id", isAuthenticated, readChat);

export default router;
