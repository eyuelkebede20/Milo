const express = require("express");
const router = express.Router();
const { authorize } = require("../middleware/auth");
const auth = require("../middleware/authMiddleware"); // Standard JWT verify middleware
const { createUser, getAdminEvents, getDashboardStats, approveGuest, getEventGuests } = require("../controllers/adminController");

// Require Manager or Admin for all routes
router.use(auth, authorize(["OrgAdmin", "EventManager"]));

router.get("/guests/:eventId", getEventGuests);
router.patch("/approve/:guestId", approveGuest);

router.get("/stats/:eventId", authorize(["OrgAdmin", "EventManager"]), getDashboardStats);

router.post("/users", authorize(["OrgAdmin"]), createUser);
router.get("/events", authorize(["OrgAdmin", "EventManager"]), getAdminEvents);
module.exports = router;
