const Guest = require("../models/Guest");
const { generateGuestQR } = require("../services/qrService");
const User = require("../models/User");
const Event = require("../models/Event");
const mongoose = require("mongoose");

exports.approveGuest = async (req, res) => {
  try {
    const { guestId } = req.params;

    // 1. Generate QR Code Content
    const guest = await Guest.findById(guestId);
    if (!guest) return res.status(404).json({ message: "Guest not found" });

    const qrBase64 = await generateGuestQR(guest.eventId, guest._id);

    // 2. Update status and store QR
    guest.status = "approved";
    guest.qrCodeUrl = qrBase64;
    await guest.save();

    res.json({ message: "Guest approved and QR generated", guest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getEventGuests = async (req, res) => {
  const { eventId } = req.params;
  const { status } = req.query;

  const filter = { eventId };
  if (status) filter.status = status;

  const guests = await Guest.find(filter).sort({ createdAt: -1 });
  res.json(guests);
};
exports.getDashboardStats = async (req, res) => {
  try {
    const { eventId } = req.params;

    const stats = await Guest.aggregate([
      { $match: { eventId: new mongoose.Types.ObjectId(eventId) } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          pending: { $sum: { $cond: [{ $eq: ["$status", "pending"] }, 1, 0] } },
          approved: { $sum: { $cond: [{ $eq: ["$status", "approved"] }, 1, 0] } },
          checkedIn: { $sum: { $cond: ["$isCheckedIn", 1, 0] } },
        },
      },
    ]);

    const defaultStats = { total: 0, pending: 0, approved: 0, checkedIn: 0 };
    res.json(stats[0] || defaultStats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, assignedEventId } = req.body;

    // Check if email exists
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already in use" });

    const user = new User({ name, email, password, role, assignedEventId });
    await user.save(); // Password hashed by pre-save hook

    res.status(201).json({ message: "User created successfully", id: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAdminEvents = async (req, res) => {
  try {
    const events = await Event.find().select("_id title");
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
