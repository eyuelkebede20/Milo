const Event = require("../models/Event");
const slugify = require("slugify"); // npm install slugify

exports.createEvent = async (req, res) => {
  try {
    const { title, description, location, startDate, endDate, settings } = req.body;

    // Generate unique slug for the public link
    const slug = `${slugify(title, { lower: true })}-${Math.random().toString(36).substring(2, 7)}`;

    const newEvent = new Event({
      title,
      description,
      location,
      startDate,
      endDate,
      organizationId: req.user.id, // From Auth middleware
      slug,
      settings,
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: "Error creating event", error: err.message });
  }
};

exports.getEventBySlug = async (req, res) => {
  const event = await Event.findOne({ slug: req.params.slug, isActive: true });
  if (!event) return res.status(404).json({ message: "Event not found" });
  res.json(event);
};
