const OTP = require("../models/OTP.js");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const { sendOTPEmail } = require("../utils/email.js");
const jwt = require("jsonwebtoken");

const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  let userExist = await User.findOne({ email });
  if (userExist) {
    return res.status(400).json({ message: "User already exists" });
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isVerified: false,
    });

    const otp = Math.floor(100000 * Math.random() * 999999).toString();
    console.log(`OTP for ${email}: ${otp}`);
    await OTP.create({ otp, email, action: "account_verification" });
    await sendOTPEmail(email, otp, "account_verification");

    res.status(201).json({
      message: "User registered successfully, check your email for OTP",
      email: user.email,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  if (!user.isVerified && user.role === "user") {
    const otp = Math.floor(100000 * Math.random() * 999999).toString();
    await OTP.deleteMany({ email, action: "account_verification" });
    await OTP.create({ otp, email, action: "account_verification" });
    await sendOTPEmail(email, otp, "account_verification");
    return res.status(403).json({ message: "User is not verified" });
  }

  res.json({
    message: "User logged in successfully",
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.role),
  });
};


// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  const otpRecord = await OTP.findOne({ email, otp, action: "account_verification" });
  if (!otpRecord) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const user = await User.findOneAndUpdate({ email }, { $set: { isVerified: true } });

  await OTP.deleteMany({ email, otp, action: "account_verification" });

  res.json({
    message: "User verified successfully",
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id, user.role),
  });
};