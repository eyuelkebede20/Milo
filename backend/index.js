const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

// Route Imports
const authRoutes = require("./src/routes/authRoutes");
const guestRoutes = require("./src/routes/guestRoutes");
const eventRoutes = require("./src/routes/eventRoutes");
const adminRoutes = require("./src/routes/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static Files (For stored guest photos)
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// DB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ DB Connection Error:", err));

// Route Mounting
app.use("/api/auth", authRoutes);
app.use("/api/guests", guestRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/guests', guestRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/import', importRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Milo Server running on port ${PORT}`);
});
