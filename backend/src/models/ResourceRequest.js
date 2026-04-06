const mongoose = require('mongoose');

const resourceRequestSchema = new mongoose.Schema({
  eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
  agencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency', required: true },
  requestedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  claimedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['Chairs', 'Rides', 'PrintCredits', 'Other'], required: true },
  quantity: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Claimed', 'Fulfilled', 'Denied'], default: 'Pending' }
}, { timestamps: true });

module.exports = mongoose.model('ResourceRequest', resourceRequestSchema);