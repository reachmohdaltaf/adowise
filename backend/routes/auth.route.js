import express from 'express';
import { 
  checkAuth, 
  login, 
  logout, 
  sendOtp, 
  verifyOtp, 
  completeSignup,
  resendOtp 
} from '../controllers/auth.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// OTP-based signup flow
router.post('/send-otp', sendOtp);           // Step 1: Send OTP to email
router.post('/verify-otp', verifyOtp);       // Step 2: Verify OTP
router.post('/complete-signup', completeSignup); // Step 3: Complete signup with name & password
router.post('/resend-otp', resendOtp);       // Resend OTP if needed

// Regular auth routes
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', authMiddleware, checkAuth);

export default router;