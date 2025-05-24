import express from 'express'
import { updateProfile, UpdateUserRole } from '../controllers/user.controller.js'
const router = express.Router()

router.put('/updateRole', UpdateUserRole)
router.put('/updateProfile', updateProfile)


export default router