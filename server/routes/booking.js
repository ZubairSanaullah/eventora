const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/auth.js");
const {
  bookEvent,
  getMyBookings,
  cancelBooking,
  sendBookingOTP,
  confirmBooking,
} = require("../controllers/bookingController.js");

// Book an event
router.post("/", protect, bookEvent);

// Verify booking
router.post("/send-otp", protect, sendBookingOTP);

// Get my bookings
router.get("/my", protect, getMyBookings);

// Confirm booking
router.put("/:id/confirm", protect, admin, confirmBooking);

// Cancel a booking
router.put("/:id", protect, cancelBooking);

module.exports = router;
