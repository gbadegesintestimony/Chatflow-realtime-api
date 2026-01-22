import {
  accessPrivateChat,
  createGroupChat,
  getUserChats,
} from "../services/chat_service.js";
import { sendMessage, getMessages } from "../services/message_service.js";

export const openChat = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const chat = await accessPrivateChat(req.user.id, userId);
    res.json(chat);
  } catch (err) {
    next(err);
  }
};

export const createGroup = async (req, res, next) => {
  try {
    const { name, participants } = req.body;
    const chat = await createGroupChat(req.user.id, name, participants);
    res.status(201).json(chat);
  } catch (err) {
    next(err);
  }
};

export const fetchChats = async (req, res, next) => {
  try {
    const chats = await getUserChats(req.user.id);
    res.json(chats);
  } catch (err) {
    next(err);
  }
};

export const postMessage = async (req, res, next) => {
  try {
    const { chatId, content } = req.body;
    const message = await sendMessage(req.user.id, chatId, content);
    res.status(201).json(message);
  } catch (err) {
    next(err);
  }
};

export const fetchMessages = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { page, limit, search } = req.query;

    const messages = await getMessages(chatId, page, limit, search);
    res.json(messages);
  } catch (err) {
    next(err);
  }
};

export const searchChatMessages = async (req, res) => {
  try {
    const { chatId, q, page, limit } = req.query;

    const messages = await searchMessages({
      chatId,
      query: q,
      page,
      limit,
    });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Search failed" });
  }
};
