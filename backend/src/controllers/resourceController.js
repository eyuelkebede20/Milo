const ResourceRequest = require('../models/ResourceRequest');

exports.createRequest = async (req, res) => {
  const { eventId, type, quantity } = req.body;

  const request = await ResourceRequest.create({
    eventId,
    agencyId: req.user.agencyId,
    requestedBy: req.user.id,
    type,
    quantity
  });

  res.status(201).json(request);
};

exports.getRequests = async (req, res) => {
  const { eventId } = req.params;
  
  // Isolate to agency
  const requests = await ResourceRequest.find({ 
    eventId, 
    agencyId: req.user.agencyId 
  }).populate('requestedBy claimedBy', 'name role');

  res.json(requests);
};

exports.updateRequestStatus = async (req, res) => {
  const { requestId } = req.params;
  const { status } = req.body; // 'Claimed', 'Fulfilled', 'Denied'

  const updateData = { status };
  if (status === 'Claimed' || status === 'Fulfilled') {
    updateData.claimedBy = req.user.id;
  }

  const request = await ResourceRequest.findOneAndUpdate(
    { _id: requestId, agencyId: req.user.agencyId },
    updateData,
    { new: true }
  );

  if (!request) return res.status(404).json({ error: 'Request not found' });
  
  res.json(request);
};