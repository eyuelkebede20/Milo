const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    location: String,
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    organizationId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // OrgAdmin who owns it
    slug: { type: String, unique: true, required: true }, // For the public registration URL: milo.com/register/event-slug
    isActive: { type: Boolean, default: true },
    settings: {
      requireEmail: { type: Boolean, default: false },
      allowFayda: { type: Boolean, default: true },
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Event", EventSchema);
