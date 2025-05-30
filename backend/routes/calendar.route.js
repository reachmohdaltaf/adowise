import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import { getCalendar, updateCalendar,  getCalendarByUserId    } from '../controllers/calendar.controller.js'
const router = express.Router()

router.get('/mycalendar', authMiddleware, getCalendar)
router.post('/update', authMiddleware, updateCalendar)
router.get('/:id', authMiddleware, getCalendarByUserId)


export default router