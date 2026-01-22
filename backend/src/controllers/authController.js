import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { logDbOperation } from "../utils/dbLogger.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      const err = new Error("All fields are required");
      err.statusCode = 400;
      throw err;
    }

    const userExists = await User.findOne({
      $or: [{ email }, { phone }],
    });

    if (userExists) {
      const err = new Error("User already exists");
      err.statusCode = 400;
      throw err;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      phone,
      passwordHash,
    });

    logDbOperation({
      operation: "CREATE",
      model: "User",
      documentId: user._id,
      userId: user._id,
    });

    res.status(201).json({
      message: "Registration successful. Please login with your credentials.",
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      throw err;
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      throw err;
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role),
    });
  } catch (err) {
    err.statusCode = err.statusCode || 500;
    throw err;
  }
};
