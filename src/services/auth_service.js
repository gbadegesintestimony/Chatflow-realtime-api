import bcrypt from "bcrypt";
import { User } from "../models/user_model.js";
import { signToken } from "../utils/jwt.js";

export const registerUser = async ({ username, email, password }) => {
  const existing = await user.findOne({
    $or: [{ email }, { username }],
  });
  if (existing) {
    throw {
      status: 400,
      message: "User already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = signToken({ id: user._id });

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      createdAT: user.createdAt,
    },
    token,
  };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw {
      status: 401,
      message: "Invalid credentials",
    };
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw {
      status: 401,
      message: "Invalid credentials",
    };
  }

  const token = signToken({ id: user._id });

  return {
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  };
};
