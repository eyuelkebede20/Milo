const Agency = require('../models/Agency');
const AuditLog = require('../models/AuditLog');

exports.deductPrintCredit = async (req, res) => {
  const { printCount } = req.body; 

  if (!printCount || printCount < 1) {
    return res.status(400).json({ error: 'Invalid print count' });
  }

  const agency = await Agency.findById(req.user.agencyId);
  
  if (agency.printCredits < printCount) {
    return res.status(402).json({ error: 'Insufficient print credits. Please recharge.' });
  }

  agency.printCredits -= printCount;
  await agency.save();

  await AuditLog.create({
    userId: req.user.id,
    agencyId: req.user.agencyId,
    action: 'PRINT_BADGE',
    details: `Printed ${printCount} badges. Remaining credits: ${agency.printCredits}`
  });

  res.json({ success: true, remainingCredits: agency.printCredits });
};