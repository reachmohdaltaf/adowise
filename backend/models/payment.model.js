import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },   // Razorpay order id
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  receipt: { type: String },
  status: { type: String, default: "created" },
  createdAt: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional, if you link payment to user
  // you can add fields like paymentId, paymentStatus, etc. to track payment completion
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
