const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// 1. Define the Schema first
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["OrgAdmin", "EventManager", "Scanner"], required: true },
  assignedEventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
});

// 2. Attach the hook to the defined Schema
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  } catch (err) {
    throw err;
  }
});

// 3. Add methods
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// 4. Export the model
module.exports = mongoose.model("User", UserSchema);
