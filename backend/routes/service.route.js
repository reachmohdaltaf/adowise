import express from 'express'
import { CreateService, DeleteServiceById,  GetServiceById, MyServices, UpdateServiceById } from '../controllers/service.controller.js'
import authMiddleware from '../middleware/auth.middleware.js'
const router = express.Router()

router.get('/myservices', authMiddleware, MyServices)
router.get('/:serviceId', authMiddleware, GetServiceById)
router.post('/create',  authMiddleware,CreateService)
router.put('/update/:serviceId', authMiddleware, UpdateServiceById)
router.delete('/delete/:serviceId', authMiddleware, DeleteServiceById)


export default router