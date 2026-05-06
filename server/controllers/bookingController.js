const Booking = require("../models/Booking.js");
const Event = require("../models/Event.js");
const OTP = require("../models/OTP.js");
const { sendOTPEmail, sendBookingEmail } = require("../utils/email.js");

// Generate OTP
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP for booking
exports.sendBookingOTP = async (req, res) => {
  const otp = generateOtp();

  await OTP.findOneAndDelete({
    email: req.user.email,
    action: "event_booking",
  });
  await OTP.create({ email: req.user.email, otp, action: "event_booking" });
  await sendOTPEmail(req.user.email, otp, "event_booking");

  res.json({ message: "OTP sent successfully" });
};

// Create a new booking
exports.bookEvent = async (req, res) => {
  const { eventId, otp } = req.body;

  const otpRecord = await OTP.findOne({
    email: req.user.email,
    action: "event_booking",
  });
  if (!otpRecord || otpRecord.otp !== otp) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const event = await Event.findById(eventId);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  if (event.totalSeats <= 0) {
    return res.status(400).json({ message: "No seats available" });
  }

  const existingBooking = await Booking.findOne({
    userId: req.user._id,
    eventId: eventId,
  });
  if (existingBooking) {
    return res
      .status(400)
      .json({ message: "You have already booked this event" });
  }

  const booking = await Booking.create({
    userId: req.user._id,
    eventId: eventId,
    amount: event.ticketPrice,
    paymentStatus: "non-paid",
    status: "pending",
  });

  await OTP.deleteMany({
    email: req.user.email,
    action: "event_booking",
  });
  res.status(201).json({ message: "Booking created successfully", booking });
};

// Get bookings for the logged-in user
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate(
      "event",
    );
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Confirm a booking
exports.confirmBooking = async (req, res) => {
  try {
    const paymentStatus = req.body.paymentStatus;
    if (!["paid", "non-paid"].includes(paymentStatus)) {
      return res.status(400).json({ message: "Invalid payment status" });
    }

    const booking = await Booking.findById(req.params.id).populate("eventId");
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.status === "confirmed") {
      return res.status(400).json({ error: "Booking is already confirmed" });
    }

    const event = await Event.findById(booking.eventId._id);
    if (event.totalSeats <= 0) {
      return res.status(400).json({ error: "No seats available" });
    }

    booking.status = "confirmed";
    if (paymentStatus) {
      booking.paymentStatus = paymentStatus;
    }
    await booking.save();
    event.totalSeats--;
    await event.save();

    //Admin confirmation
    await sendBookingEmail(req.user.email, event.title, booking._id);

    res.json({ message: "Booking confirmed successfully", booking });
  } catch (error) {
    res.status(500).json({ error: "Failed to confirm booking" });
  }
};

// Get bookings
exports.getMyBookings = async (req, res) => {
  const bookings = await Booking.find({ userId: req.user._id }).populate(
    "eventId",
  );
  res.json(bookings);
};

// Cancel a booking
exports.cancelBooking = async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ message: "booking not found" });
  }

  if (booking.userId.toString() !== req.user._id.toString()) {
    return res.status(403).json({ message: "unauthorized" });
  }

  booking.status = "cancelled";
  await booking.save();

  if (booking.status === "confirmed") {
    const event = await Event.findById(booking.eventId._id);
    event.totalSeats++;
    await event.save();
  }

  await booking.remove();
  res.json({ message: "booking cancelled successfully" });
};
