const xlsx = require('xlsx');
const Guest = require('../models/Guest');
const { encrypt } = require('../utils/crypto');

exports.importGuests = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { eventId } = req.params;
    const agencyId = req.user.role === 'SuperAdmin' ? req.body.agencyId : req.user.agencyId;

    if (!agencyId) {
       return res.status(400).json({ error: 'Agency ID required' });
    }

    // Parse the buffer
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const data = xlsx.utils.sheet_to_json(sheet);

    // Map columns to schema
    const guestsToInsert = data.map(row => {
      return {
        eventId,
        agencyId,
        name: row.Name || row.name,
        role: row.Role || row.role || 'Guest',
        faydaDataEncrypted: row.FaydaString ? encrypt(row.FaydaString) : null,
        isCheckedIn: false
      };
    });

    // Bulk insert
    await Guest.insertMany(guestsToInsert);

    res.status(201).json({ 
      message: 'Import successful', 
      count: guestsToInsert.length 
    });

  } catch (error) {
    res.status(500).json({ error: 'Import failed', details: error.message });
  }
};