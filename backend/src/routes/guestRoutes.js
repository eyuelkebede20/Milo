const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/authMiddleware');
const { getGuests, checkInGuest } = require('../controllers/guestController');

router.use(protect); // Apply auth to all routes below

// Only Admins and Event Managers can view the full list
router.get('/:eventId/guests', restrictTo('SuperAdmin', 'AgencyAdmin', 'EventManager'), getGuests);

// Scanners can check people in, but cannot view the full list
router.post('/guests/:guestId/checkin', restrictTo('Scanner', 'EventManager', 'AgencyAdmin'), checkInGuest);

module.exports = router;