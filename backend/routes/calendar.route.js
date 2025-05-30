import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import { getCalendar, updateCalendar } from '../controllers/calendar.controller.js'
const router = express.Router()

router.get('/mycalendar', authMiddleware, getCalendar)
router.post('/update', authMiddleware, updateCalendar)


export default router