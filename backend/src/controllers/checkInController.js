exports.validateCheckIn = async (req, res) => {
  const { eventId, guestId } = req.params;

  // Atomic update to prevent race conditions in chaotic environments
  const guest = await Guest.findOneAndUpdate(
    {
      _id: guestId,
      eventId: eventId,
      status: "approved",
      isCheckedIn: false,
    },
    {
      isCheckedIn: true,
      checkInTime: new Date(),
    },
    { new: true },
  );

  if (!guest) {
    return res.status(400).json({
      error: "Invalid QR, Not Approved, or Already Checked In",
    });
  }

  res.json({
    status: "success",
    name: guest.name,
    photo: guest.photoUrl,
    checkInTime: guest.checkInTime,
  });
};
