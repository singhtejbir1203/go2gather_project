import Conversation from "../models/Conversation.js";
import User from "../models/User.js";
import Message from "../models/Message.js";
import { getIO } from "../socket/index.js";

export const getOrCreateConversation = async (req, res) => {
  try {
    const { userId, relatedRideId = null } = req.body;

    if (!userId) {
      const err = new Error("Target userId is required");
      err.statusCode = 400;
      throw err;
    }

    if (userId === req.user._id.toString()) {
      const err = new Error("Cannot start chat with yourself");
      err.statusCode = 400;
      throw err;
    }

    const targetUser = await User.findById(userId);
    if (!targetUser) {
      const err = new Error("User not found");
      err.statusCode = 404;
      throw err;
    }

    let conversation = await Conversation.findOne({
      participants: {
        $all: [req.user._id, userId],
      },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [req.user._id, userId],
        relatedRideId,
      });
    }

    res.json(conversation);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { conversationId, text } = req.body;

    if (!text?.trim()) {
      const err = new Error("Message text required");
      err.statusCode = 400;
      throw err;
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation || !conversation.participants.includes(req.user._id)) {
      const err = new Error("Conversation not accessible");
      err.statusCode = 403;
      throw err;
    }

    const receiverId = conversation.participants.find(
      (id) => id.toString() !== req.user._id.toString(),
    );

    const message = await Message.create({
      conversationId,
      senderId: req.user._id,
      receiverId,
      text,
    });

    conversation.lastMessage = text;
    conversation.lastMessageAt = new Date();
    await conversation.save();

    getIO().to(conversationId.toString()).emit("new_message", message);

    getIO().to(receiverId.toString()).emit("inbox_unread_update", {
      conversationId,
      message,
    });

    res.status(201).json(message);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

// export const getMyConversations = async (req, res) => {
//   try {
//     const conversations = await Conversation.find({
//       participants: req.user._id,
//     })
//       .sort({ lastMessageAt: -1 })
//       .populate("participants", "name email")
//       .populate("relatedRideId", "from to startTime");

//     res.json(conversations);
//   } catch (err) {
//     err.statusCode = 500;
//     throw err;
//   }
// };

export const getMyConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      participants: req.user._id,
    })
      .sort({ lastMessageAt: -1 })
      .populate("participants", "name email")
      .populate("relatedRideId", "from to startTime")
      .lean();

    const conversationIds = conversations.map((c) => c._id);

    const unreadCounts = await Message.aggregate([
      {
        $match: {
          conversationId: { $in: conversationIds },
          receiverId: req.user._id,
          isRead: false,
        },
      },
      {
        $group: {
          _id: "$conversationId",
          count: { $sum: 1 },
        },
      },
    ]);

    const unreadMap = {};
    unreadCounts.forEach((u) => {
      unreadMap[u._id.toString()] = u.count;
    });

    const result = conversations.map((c) => ({
      ...c,
      unreadCount: unreadMap[c._id.toString()] || 0,
    }));

    res.json(result);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};

export const getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation || !conversation.participants.includes(req.user._id)) {
      const err = new Error("Conversation not accessible");
      err.statusCode = 403;
      throw err;
    }

    const messages = await Message.find({ conversationId }).sort({
      createdAt: 1,
    });

    res.json(messages);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

export const markConversationAsRead = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation || !conversation.participants.includes(req.user._id)) {
      const err = new Error("Conversation not accessible");
      err.statusCode = 403;
      throw err;
    }

    await Message.updateMany(
      {
        conversationId,
        receiverId: req.user._id,
        isRead: false,
      },
      { $set: { isRead: true } },
    );

    res.json({ success: true });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};
