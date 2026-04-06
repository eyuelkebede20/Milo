const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  agencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency', required: false }, // Null for SuperAdmin
  role: { 
    type: String, 
    enum: ['SuperAdmin', 'AgencyAdmin', 'EventManager', 'Logistics', 'Scanner'], 
    required: true 
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);