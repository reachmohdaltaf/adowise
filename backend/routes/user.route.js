import express from 'express'
import { UpdateUserRole } from '../controllers/user.controller.js'
const router = express.Router()

router.put('/updateRole', UpdateUserRole)


export default router