const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  enrollment: { type: mongoose.Schema.Types.ObjectId, ref: "Enroll", required: true },
  amount: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "pending"
  },
  method: {
    type: String,
    enum: ["credit_card", "paypal", "stripe", "bank_transfer", "cash"],
    required: true
  },
  transactionId: { type: String }, 
  paymentDate: { type: Date, default: Date.now() }
});

module.exports = mongoose.model("Payment", paymentSchema);
