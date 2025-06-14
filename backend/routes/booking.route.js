import express from "express";
import { createBooking, bookingsAsSeeker } from "../controllers/booking.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createBooking);
router.get('/seeker', authMiddleware, bookingsAsSeeker)


export default router;