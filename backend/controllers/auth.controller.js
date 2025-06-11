import { User } from "../models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwt/generateToken.js";
import { Calendar } from "../models/calendar.model.js";
import Otp from "../models/otp.model.js"; // Your OTP model
import crypto from "crypto";
import nodemailer from "nodemailer"; // You'll need to install this
import { OAuth2Client } from 'google-auth-library';


dotenv.config();

// Configure your email transporter

const transporter = nodemailer.createTransport({
  // Configure based on your email service
  service: 'gmail', // or your email service
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
  
});

/**
 * @function sendOtp
 * @description Sends OTP to user's email for verification
 * @route POST /api/send-otp
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Contains email
 * @param {Object} res - Express response object
 * @returns {Object} 200 OK with success message or error message
 */
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    // Debug: Check if credentials are loaded
    console.log("EMAIL_USER:", process.env.EMAIL_USER ? "✓ Loaded" : "✗ Missing");
    console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "✓ Loaded" : "✗ Missing");

    // Validate email
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    
    // Set expiration time (5 minutes from now)
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Delete any existing OTP for this email
    await Otp.deleteMany({ email });

    // Save OTP to database
    await Otp.create({
      email,
      otp,
      expiresAt,
    });

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP for Account Verification',
      html: `
        <h2>Account Verification</h2>
        <p>Your OTP for account verification is:</p>
        <h1 style="color: #007bff; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: "OTP sent successfully to your email",
      email // Send back email for frontend reference
    });

  } catch (error) {
    console.error("Send OTP error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @function verifyOtp
 * @description Verifies the OTP sent to user's email
 * @route POST /api/verify-otp
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Contains email and otp
 * @param {Object} res - Express response object
 * @returns {Object} 200 OK with success message or error message
 */
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate required fields
    if (!email || !otp) {
      return res.status(400).json({ error: "Email and OTP are required" });
    }

    // Find OTP record
    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) {
      return res.status(400).json({ error: "OTP not found or expired" });
    }

    // Check if OTP is expired
    if (new Date() > otpRecord.expiresAt) {
      // Delete expired OTP
      await Otp.deleteOne({ email });
      return res.status(400).json({ error: "OTP has expired. Please request a new one." });
    }

    // Verify OTP
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    // OTP is valid - delete it from database
    await Otp.deleteOne({ email });

    res.status(200).json({ 
      message: "OTP verified successfully",
      email,
      verified: true
    });

  } catch (error) {
    console.error("Verify OTP error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @function completeSignup
 * @description Completes the signup process after OTP verification
 * @route POST /api/complete-signup
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Contains email, name, and password
 * @param {Object} res - Express response object
 * @returns {Object} 201 Created with user data or error message
 */
export const completeSignup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    // Check for required fields
    if (!email || !name || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Double-check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a unique username
    const prefix = name.substring(0, 3).toLowerCase();
    let username;
    do {
      const randomNum = Math.floor(Math.random() * 1000);
      username = `${prefix}${randomNum}`;
    } while (await User.findOne({ username }));

    // Create the user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      username,
    });

    // Create calendar for the user
    await Calendar.create({
      userId: user._id,
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

    // Remove password before sending response
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(201).json({
      message: "Account created successfully",
      user: userWithoutPassword
    });

  } catch (error) {
    console.error("Complete signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * @function resendOtp
 * @description Resends OTP to user's email
 * @route POST /api/resend-otp
 * @access Public
 *
 * @param {Object} req - Express request object
 * @param {Object} req.body - Contains email
 * @param {Object} res - Express response object
 * @returns {Object} 200 OK with success message or error message
 */
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    // Generate new OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Delete existing OTP and create new one
    await Otp.deleteMany({ email });
    await Otp.create({
      email,
      otp,
      expiresAt,
    });

    // Send OTP via email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your New OTP for Account Verification',
      html: `
        <h2>Account Verification</h2>
        <p>Your new OTP for account verification is:</p>
        <h1 style="color: #007bff; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
        <p>This OTP will expire in 5 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ 
      message: "New OTP sent successfully to your email",
      email
    });

  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Keep your existing functions
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    
    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
    });
    
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const GoogleSignup = async (req, res) => {
  const { credential } = req.body; // this is the Google JWT token from frontend

  try {
    // Verify token
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { email, name, sub: googleId } = payload;

    // Check if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create unique username
      const prefix = name.substring(0, 3).toLowerCase();
      let username;
      do {
        const randomNum = Math.floor(Math.random() * 1000);
        username = `${prefix}${randomNum}`;
      } while (await User.findOne({ username }));

      // Create new user
      user = await User.create({
        name,
        email,
        googleId,
        username,
      });

      // Create calendar for the new Google user
      await Calendar.create({
        userId: user._id,
      });
    }

    // Create token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Return user (without password)
    const { password, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: "Google login/signup successful",
      user: userWithoutPassword
    });

  } catch (error) {
    console.error("GoogleSignup error:", error);
    res.status(500).json({ error: "Google authentication failed" });
  }
};

export const GoogleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email } = payload;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found. Please sign up first." });
    }

    // Create token
    const token = generateToken(user._id);

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const { password, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: "Google login successful",
      user: userWithoutPassword,
    });

  } catch (error) {
    console.error("GoogleLogin error:", error);
    res.status(500).json({ error: "Google login failed" });
  }
};


export const checkAuth = (req, res) => {
  res.status(200).json(req.user);
};

