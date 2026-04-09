const express = require('express');
const router = express.Router();
const { protect, restrictTo } = require('../middleware/authMiddleware');
const { createRequest, getRequests, updateRequestStatus } = require('../controllers/resourceController');

router.use(protect);

// Staff and Event Managers can create requests
router.post('/requests', restrictTo('Staff', 'EventManager', 'AgencyAdmin'), createRequest);

// Logistics, Event Managers, and Admins can view requests
router.get('/events/:eventId/requests', restrictTo('Logistics', 'EventManager', 'AgencyAdmin'), getRequests);

// Only Logistics and Event Managers can update status (claim/fulfill)
router.patch('/requests/:requestId', restrictTo('Logistics', 'EventManager', 'AgencyAdmin'), updateRequestStatus);

module.exports = router;