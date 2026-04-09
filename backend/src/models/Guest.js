const mongoose = require('mongoose');

const guestSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  agencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency', required: true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  faydaDataEncrypted: { type: String }, // Store PII encrypted at rest
  isCheckedIn: { type: Boolean, default: false },
  checkInTime: { type: Date }
}, { timestamps: true });

// Enforce tenant isolation at the DB index level
guestSchema.index({ agencyId: 1, eventId: 1 });

module.exports = mongoose.model('Guest', guestSchema);