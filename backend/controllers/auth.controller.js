import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt/generateToken.js";
// import { Calendar } from "../models/Calendar.model.js";

/**
 * @function signup
 * @description Registers a new user with hashed password
 * @route POST /api/signup
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Contains name, email, and password
 * @param {Object} res - Express response object
 * @param {Object} res - Cookies will be generated
 * @returns {Object} 201 Created with user data or error message
 */

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

   // Get first 3 characters of the name (or less if name is shorter)
const prefix = name.substring(0, 3).toLowerCase();

let username;
do {
  const randomNum = Math.floor(Math.random() * 1000); // 0 to 999
  username = `${prefix}${randomNum}`;
} while (await User.findOne({ username }));

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      username,
    });

    // Generate token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send user info without password
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @function login
 * @description Logs in a user with hashed password
 * @route POST /api/login
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Contains email and password
 * @param {Object} res - Express response object
 * @param {Object} res - Cookies will be generated
 * @returns {Object} 200 OK with user data or error message
 */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // @step Check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    // @step Hash the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    //@step generate token and save cookies
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    // @success Return created user
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @function logout
 * @description Logs out a user
 * @route POST /api/logout
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Object} 200 OK with success message or error message
 */

export const logout = async (req, res) => {
  try {
    // @step Clear cookies
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
    });
    // @success Return created user
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  res.status(200).json(req.user);
};
