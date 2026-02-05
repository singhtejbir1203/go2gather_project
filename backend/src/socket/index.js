import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

let io;

export const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth?.token;
      if (!token) throw new Error("No token");

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) throw new Error("User not found");

      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    // console.log("User connected:", socket.user._id.toString());

    socket.on("send_message", async ({ conversationId, text }) => {
      try {
        if (!text?.trim()) return;

        const conversation = await Conversation.findById(conversationId);
        if (
          !conversation ||
          !conversation.participants.includes(socket.user._id)
        ) {
          return;
        }

        const receiverId = conversation.participants.find(
          (id) => id.toString() !== socket.user._id.toString(),
        );

        const message = await Message.create({
          conversationId,
          senderId: socket.user._id,
          receiverId,
          text,
        });

        conversation.lastMessage = text;
        conversation.lastMessageAt = new Date();
        await conversation.save();

        io.to(conversationId.toString()).emit("new_message", message);

        io.to(receiverId.toString()).emit("inbox_unread_update", {
          conversationId,
          message,
        });
      } catch (err) {
        console.error("send_message error:", err.message);
      }
    });

    socket.join(socket.user._id.toString());

    socket.on("join_conversation", (conversationId) => {
      socket.join(conversationId);
    });

    socket.on("mark_read", async ({ conversationId }) => {
      await Message.updateMany(
        {
          conversationId,
          receiverId: socket.user._id,
          isRead: false,
        },
        { $set: { isRead: true } },
      );
    });

    socket.on("disconnect", () => {
      // console.log("User disconnected:", socket.user._id.toString());
    });
  });

  return io;
};

export const getIO = () => io;
