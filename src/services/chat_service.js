import { Chat } from "../models/chat_model.js";

/**
 * Create or get one-to-one chat
 */
export const accessPrivateChat = async (userId, otherUserId) => {
  if (!otherUserId) throw { status: 400, message: "Other User ID is required" };

  // Find chat where participants array contains BOTH IDs and is NOT a group
  let chat = await Chat.findOne({
    isGroup: false,
    participants: { $all: [userId, otherUserId] },
  }).populate("participants", "username email");

  if (chat) return chat;

  // If not found, create it
  const newChat = await Chat.create({
    participants: [userId, otherUserId],
    isGroup: false,
  });

  return Chat.findById(newChat._id).populate("participants", "username email");
};

/**
 * Create group chat
 */
export const createGroupChat = async (userId, name, participants) => {
  // Logic check: participants from body + the creator (userId)
  if (!participants || participants.length < 2) {
    throw {
      status: 400,
      message: "A group requires at least 2 other members.",
    };
  }

  const chat = await Chat.create({
    isGroup: true,
    name,
    participants: [userId, ...participants],
    admins: [userId],
  });

  return Chat.findById(chat._id).populate("participants", "username email");
};

/**
 * Get all chats for a specific user (their inbox)
 */
export const getUserChats = async (userId) => {
  return Chat.find({ participants: userId })
    .populate("participants", "username email")
    .populate({
      path: "lastMessage",
      populate: { path: "sender", select: "username email" }, // Shows who sent the preview msg
    })
    .sort({ updatedAt: -1 }); // Most recent activity at the top
};
