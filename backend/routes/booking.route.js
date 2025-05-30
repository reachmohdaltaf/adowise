import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { book, getMyBookings, getBookingById, rescheduleBooking, confirmBooking, cancelBooking, deleteBooking } from "../controllers/booking.controller.js";
const router = express.Router();

router.post("/book", authMiddleware, book);
router.get("/my-bookings", authMiddleware, getMyBookings);
router.get("/:id", authMiddleware, getBookingById);
router.put("/:id/reschedule", authMiddleware, rescheduleBooking);
router.put("/:id/confirm", authMiddleware, confirmBooking);
router.put("/:id/cancel", authMiddleware, cancelBooking);
router.delete("/:id", authMiddleware, deleteBooking);

export default router;
