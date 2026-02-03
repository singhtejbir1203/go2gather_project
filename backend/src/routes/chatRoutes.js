import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  getOrCreateConversation,
  sendMessage,
  getMyConversations,
  getMessages,
  markConversationAsRead,
} from "../controllers/chatController.js";

const router = express.Router();

router.post("/conversation", protect, getOrCreateConversation);
router.get("/conversations", protect, getMyConversations);
router.post("/message", protect, sendMessage);
router.get("/messages/:conversationId", protect, getMessages);
router.patch(
  "/conversations/:conversationId/read",
  protect,
  markConversationAsRead,
);

export default router;
