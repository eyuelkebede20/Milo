const express = require("express");
const router = express.Router();
const { createEvent, getEventBySlug } = require("../controllers/eventController");
const { authorize } = require("../middleware/auth");

// Public route for guest registration page to fetch event details
router.get("/public/:slug", getEventBySlug);

// Admin route to create events
router.post("/", authorize(["OrgAdmin"]), createEvent);

module.exports = router;
