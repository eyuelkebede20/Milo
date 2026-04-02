const mongoose = require("mongoose");

const GuestSchema = new mongoose.Schema(
  {
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    name: { type: String, required: true },
    phone: String,
    email: String,
    photoUrl: String, // Local or S3 path
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    isCheckedIn: { type: Boolean, default: false },
    checkInTime: Date,
    faydaData: Object, // Raw decoded data for audit
    qrCodeUrl: String,
  },
  { timestamps: true },
);

GuestSchema.index({ eventId: 1, status: 1 });
module.exports = mongoose.model("Guest", GuestSchema);
