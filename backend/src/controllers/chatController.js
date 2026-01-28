import Conversation from "../models/Conversation.js";
import Ride from "../models/Ride.js";
import Message from "../models/Message.js";

export const getOrCreateConversation = async (req, res) => {
  try {
    const { rideId } = req.body;

    const ride = await Ride.findById(rideId);
    if (!ride) {
      const err = new Error("Ride not found");
      err.statusCode = 404;
      throw err;
    }

    if (ride.driverId.toString() === req.user._id.toString()) {
      const err = new Error("You cannot chat with yourself");
      err.statusCode = 400;
      throw err;
    }

    let conversation = await Conversation.findOne({
      rideId,
      passengerId: req.user._id,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        rideId,
        driverId: ride.driverId,
        passengerId: req.user._id,
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
      const err = new Error("Message cannot be empty");
      err.statusCode = 400;
      throw err;
    }

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      const err = new Error("Conversation not found");
      err.statusCode = 404;
      throw err;
    }

    const isParticipant =
      conversation.driverId.toString() === req.user._id.toString() ||
      conversation.passengerId.toString() === req.user._id.toString();

    if (!isParticipant) {
      const err = new Error("Not authorized to send message");
      err.statusCode = 403;
      throw err;
    }

    const receiverId =
      conversation.driverId.toString() === req.user._id.toString()
        ? conversation.passengerId
        : conversation.driverId;

    const message = await Message.create({
      conversationId,
      senderId: req.user._id,
      receiverId,
      text,
    });

    conversation.lastMessage = text;
    conversation.lastMessageAt = new Date();
    await conversation.save();

    res.status(201).json(message);
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

export const getMyConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      $or: [{ driverId: req.user._id }, { passengerId: req.user._id }],
    })
      .sort({ lastMessageAt: -1 })
      .populate("rideId", "from to startTime")
      .populate("driverId", "name")
      .populate("passengerId", "name");

    res.json(conversations);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
};

export const getConversationMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const page = Number(req.query.page || 1);
    const limit = 20;
    const skip = (page - 1) * limit;

    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      const err = new Error("Conversation not found");
      err.statusCode = 404;
      throw err;
    }

    const isParticipant =
      conversation.driverId.toString() === req.user._id.toString() ||
      conversation.passengerId.toString() === req.user._id.toString();

    if (!isParticipant) {
      const err = new Error("Unauthorized access");
      err.statusCode = 403;
      throw err;
    }

    const messages = await Message.find({ conversationId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json(messages.reverse());
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};
