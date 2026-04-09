const Event = require('../models/Event');

exports.createEvent = async (req, res) => {
  const event = await Event.create({
    ...req.body,
    agencyId: req.user.agencyId
  });
  res.status(201).json(event);
};

exports.getEvents = async (req, res) => {
  // SuperAdmin sees all, Agency sees only their own
  const query = req.user.role === 'SuperAdmin' ? {} : { agencyId: req.user.agencyId };
  const events = await Event.find(query);
  res.json(events);
};