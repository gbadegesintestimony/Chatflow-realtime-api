import { Message } from "../models/message_model.js";
import { Chat } from "../models/chat_model.js";

/**
 * Send a message and update the Chat's last message reference
 */
export const sendMessage = async (senderId, chatId, content, mediaUrl) => {
  // 1. Create the message
  const message = await Message.create({
    sender: senderId,
    chat: chatId,
    content,
    mediaUrl,
    readBy: [senderId],
  });

  // 2. Update the chat's last message so it appears at the top of the inbox
  await Chat.findByIdAndUpdate(chatId, {
    lastMessage: message._id,
  });

  return message.populate("sender", "username email");
};

/**
 * Get messages with pagination
 */
export const getMessages = async (
  chatId,
  page = 1,
  limit = 20,
  search = "",
) => {
  const parsedLimit = Number(limit);
  const skip = (Number(page) - 1) * parsedLimit;

  const query = {
    chat: chatId,
    ...(search && { content: { $regex: search, $options: "i" } }),
  };

  return Message.find(query)
    .populate("sender", "username email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parsedLimit);
};
