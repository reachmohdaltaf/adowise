import express from 'express'
import { updateProfile, UpdateUserRole } from '../controllers/user.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'
const router = express.Router()


router.put('/updateRole', authMiddleware, UpdateUserRole)
router.put('/updateProfile', authMiddleware, updateProfile)


export default router