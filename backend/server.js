import express from 'express'
import authRoutes from './routes/auth.route.js'
import connectDB from './config/db/db.js'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import serviceRoutes from './routes/service.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import calendarRoutes from './routes/calendar.route.js';
import paymentRoutes from './routes/payment.route.js';
import bookingRoutes from './routes/booking.route.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


dotenv.config()
const PORT = process.env.PORT || 5000




const app = express()

const allowedOrigins = ['http://localhost:5173', process.env.FRONTEND_URL]
app.use(cors({origin: allowedOrigins, credentials: true}));
app.use(cookieParser()); 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes 
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)
app.use('/api/v1/service', serviceRoutes)
app.use('/api/v1/calendar', calendarRoutes)
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/bookings", bookingRoutes);


if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "../frontend/dist")));

	app.get(/^\/(?!api).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});
}


app.listen(PORT, () => {
    connectDB()
    console.log(`Server running on port ${PORT}`)
})