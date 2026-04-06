const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  agencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency', required: true },
  date: { type: Date, required: true },
  location: { type: String },
  status: { type: String, enum: ['Draft', 'Active', 'Completed'], default: 'Draft' }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);