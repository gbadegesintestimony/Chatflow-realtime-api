import { User } from "../models/user_model.js";

const onlineUsers = new Map();

export const setUserOnline = async (userId, socketId) => {
  try {
    onlineUsers.set(userId.toString(), socketId);

    // Update user status in database
    await User.findByIdAndUpdate(userId, {
      isOnline: true,
      lastSeen: new Date(),
    });

    console.log(`User ${userId} is now online`);
    return true;
  } catch (error) {
    console.error("Error setting user online:", error);
    return false;
  }
};

export const setUserOffline = async (userId) => {
  try {
    onlineUsers.delete(userId.toString());

    // Update user status in database
    await User.findByIdAndUpdate(userId, {
      isOnline: false,
      lastSeen: new Date(),
    });

    console.log(`User ${userId} is now offline`);
    return true;
  } catch (error) {
    console.error("Error setting user offline:", error);
    return false;
  }
};

export const isUserOnline = (userId) => {
  return onlineUsers.has(userId.toString());
};

export const getUserSocketId = (userId) => {
  return onlineUsers.get(userId.toString());
};

export const getOnlineUsers = () => {
  return Array.from(onlineUsers.keys());
};
