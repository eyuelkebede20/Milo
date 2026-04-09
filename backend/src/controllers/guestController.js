const Guest = require('../models/Guest');
const AuditLog = require('../models/AuditLog');

exports.getGuests = async (req, res) => {
  const { eventId } = req.params;

  // Strict Data Isolation: Query MUST include agencyId from the authenticated user token
  // SuperAdmin bypasses this to see all
  const query = { eventId };
  if (req.user.role !== 'SuperAdmin') {
    query.agencyId = req.user.agencyId; 
  }

  const guests = await Guest.find(query);
  res.json(guests);
};

exports.checkInGuest = async (req, res) => {
  const { guestId } = req.params;

  const guest = await Guest.findOneAndUpdate(
    { _id: guestId, agencyId: req.user.agencyId }, // Isolation check
    { isCheckedIn: true, checkInTime: new Date() },
    { new: true }
  );

  if (!guest) return res.status(404).json({ error: 'Guest not found or unauthorized' });

  // Create immutable audit log
  await AuditLog.create({
    userId: req.user.id,
    agencyId: req.user.agencyId,
    action: 'CHECK_IN',
    details: `Checked in guest ${guestId}`
  });

  res.json(guest);
};