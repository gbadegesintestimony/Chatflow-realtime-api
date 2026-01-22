// src/config/chat_socket.js
import { Message } from "../models/message_model.js";
import { Chat } from "../models/chat_model.js";
import { setUserOnline, setUserOffline } from "../services/presence_service.js";
import { encryptMessage } from "../utils/encryption.js";
import { sendMessageSchema } from "../utils/socket_schema.js";

export const chatSocket = async (io, socket) => {
  const userId = socket.user.id;

  console.log("User connected:", userId);

  // MARK USER ONLINE
  await setUserOnline(userId, socket.id);

  // JOIN USER ROOMS
  const chats = await Chat.find({ participants: userId });
  chats.forEach((chat) => socket.join(chat._id.toString()));

  // ------------------- TYPING -------------------
  socket.on("typing", ({ chatId }) => {
    socket.to(chatId).emit("typing", { userId });
  });

  socket.on("stop_typing", ({ chatId }) => {
    socket.to(chatId).emit("stop_typing", { userId });
  });

  // ------------------- SEND MESSAGE (COMBINED) -------------------
  socket.on("send_message", async (payload) => {
    try {
      // Validate payload
      sendMessageSchema.parse(payload);

      const { chatId, content } = payload;

      // Encrypt message
      const encrypted = encryptMessage(content);

      // Create message
      const msg = await Message.create({
        chat: chatId,
        sender: userId,
        content: encrypted,
        deliveredTo: [userId],
        readBy: [userId],
      });

      // Update chat's last message
      await Chat.findByIdAndUpdate(chatId, { lastMessage: msg._id });

      // Emit to room
      io.to(chatId).emit("new_message", msg);

      // Send delivery acknowledgment
      socket.emit("message_delivered", {
        messageId: msg._id,
      });
    } catch (err) {
      console.error("Message send error:", err);
      socket.emit("error", err.message || "Message failed");
    }
  });

  // ------------------- READ RECEIPT -------------------
  socket.on("read_message", async ({ messageId }) => {
    try {
      await Message.findByIdAndUpdate(messageId, {
        $addToSet: { readBy: userId },
      });

      io.emit("message_read", { messageId, userId });
    } catch (err) {
      console.error("Read receipt error:", err);
    }
  });

  // ------------------- DISCONNECT -------------------
  socket.on("disconnect", async () => {
    console.log("User disconnected:", userId);
    await setUserOffline(userId);
  });
};
