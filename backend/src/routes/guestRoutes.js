const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { registerGuest } = require("../controllers/guestController");

// Public route: Handles both JSON (Fayda) and Multi-part (Manual)
router.post("/register", upload.single("photo"), registerGuest);

module.exports = router;
