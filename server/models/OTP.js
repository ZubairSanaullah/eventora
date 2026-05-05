const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  otp: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
    enum: ["account_verification", "event_booking"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300, // OTP will expire in 5 minutes
  },
});

module.exports = mongoose.model("OTP", otpSchema);
