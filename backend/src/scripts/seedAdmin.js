const mongoose = require("mongoose");
const User = require("../models/User");
require("dotenv").config();

const seedAdmin = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  const adminExists = await User.findOne({ email: "admin@milo.com" });
  if (adminExists) {
    console.log("Admin already exists");
    process.exit();
  }

  const admin = new User({
    name: "Super Admin",
    email: "admin@milo.com",
    password: "securepassword123", // Will be hashed by the pre-save hook
    role: "OrgAdmin",
  });

  await admin.save();
  console.log("Admin created successfully");
  process.exit();
};

seedAdmin();
