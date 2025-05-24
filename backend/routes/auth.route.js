import express from 'express'
import { checkAuth, login, logout, signup } from '../controllers/auth.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'
const router = express.Router()

// router.post('/send-otp', sendOtp)
// router.post('/verify-otp', verifyOtp)
router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.get('/me', authMiddleware, checkAuth)



export default router   