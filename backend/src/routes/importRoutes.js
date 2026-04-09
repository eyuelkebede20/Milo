const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect, restrictTo } = require('../middleware/authMiddleware');
const { importGuests } = require('../controllers/importController');

// Use memory storage so the file is not saved to disk
const upload = multer({ storage: multer.memoryStorage() });

router.use(protect);

router.post(
  '/events/:eventId/import', 
  restrictTo('SuperAdmin', 'AgencyAdmin', 'EventManager'), 
  upload.single('file'), 
  importGuests
);

module.exports = router;