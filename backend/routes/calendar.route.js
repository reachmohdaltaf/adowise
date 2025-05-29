import express from 'express'
import authMiddleware from '../middleware/auth.middleware.js'
import { getCalendar } from '../controllers/calendar.controller.js'
const router = express.Router()

router.get('/', authMiddleware, getCalendar)


export default router