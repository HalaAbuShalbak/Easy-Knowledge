// controllers/paymentController.js
const Payment = require("../models/paymentSchema");
const Enrollment = require("../models/enrollmentSchema");

// Create a new payment
const createPayment = async (req, res) => {
  try {
    const { enrollmentId, amount, method, transactionId } = req.body;
  const {userId} = req.token; 


    // Make sure the enrollment exists and belongs to the user
    const enrollment = await Enrollment.findOne({ _id: enrollmentId, user: userId });
    if (!enrollment) {
      return res.status(404).json({ success: false, message: "Enrollment not found or not yours" });
    }

    const newPayment = new Payment({
      enrollment: enrollmentId,
      amount,
      method,
      transactionId,
      status: "completed", 
    });

    const savedPayment = await newPayment.save();

    res.status(201).json({
      success: true,
      message: "Payment recorded",
      payment: savedPayment,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// Get all payments for current user
const getUserPayments = async (req, res) => {
  try {
    const {userId} = req.token; 


    const payments = await Payment.find()
      .populate({
        path: "enrollment",
        match: { user: userId },
        populate: { path: "course", select: "title" },
      })
      .lean();

    // Filter out payments with no matched enrollment (e.g. from other users)
    const filtered = payments.filter(p => p.enrollment !== null);

    res.status(200).json({
      success: true,
      payments: filtered,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

// Get a single payment by ID (optional)
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate({
        path: "enrollment",
        populate: { path: "course user", select: "title name email" }
      });

    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }

    // Ensure the payment belongs to the logged-in user
    if (String(payment.enrollment.user._id) !== String(req.user._id)) {
      return res.status(403).json({ success: false, message: "Unauthorized access" });
    }

    res.status(200).json({ success: true, payment });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = {
  createPayment,
  getUserPayments,
  getPaymentById,
};
