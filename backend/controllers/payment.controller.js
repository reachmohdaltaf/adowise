import Payment from "../models/payment.model.js";
import { razorpayInstance } from "../utils/razorpay.js";

export const createRazorpayOrder = async (req, res) => {
  try {
    const { amount, userId } = req.body;  // Assume userId is sent in the request

    const options = {
      amount: amount * 100, // Razorpay expects amount in paise
      currency: "INR",
      receipt: `rcptid_${Date.now()}`,
    };

    // Create order in Razorpay
    const order = await razorpayInstance.orders.create(options);

    // Save order info in your DB
    const payment = new Payment({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status,
      userId: userId,  // link payment to user (optional)
    });

    await payment.save();

    // Respond with Razorpay order data
    res.status(200).json(order);
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    res.status(500).json({ error: "Razorpay order creation failed" });
  }
};
