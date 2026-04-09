const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
  name: { type: String, required: true },
  printCredits: { type: Number, default: 0 },
  branding: {
    logoUrl: { type: String },
    primaryColor: { type: String, default: '#8cc63f' } // Milo Green
  }
}, { timestamps: true });

module.exports = mongoose.model('Agency', agencySchema);