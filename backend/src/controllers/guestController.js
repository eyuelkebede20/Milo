const Guest = require("../models/Guest");
const Event = require("../models/Event");
const { decodeFaydaQR, downloadAndStoreImage } = require("../services/faydaService");

exports.registerGuest = async (req, res) => {
  try {
    const { eventSlug, type, name, phone, email, faydaBase64 } = req.body;

    const event = await Event.findOne({ slug: eventSlug });
    if (!event) return res.status(404).json({ message: "Event not found" });

    let guestData = {
      eventId: event._id,
      status: "pending",
    };

    if (type === "fayda") {
      const decoded = decodeFaydaQR(faydaBase64);
      guestData.name = decoded.name;
      guestData.faydaData = decoded.raw;

      // Initial save to get ID, then download photo
      const guest = await Guest.create(guestData);

      if (decoded.remotePhotoUrl) {
        const localPath = await downloadAndStoreImage(decoded.remotePhotoUrl, guest._id);
        guest.photoUrl = localPath;
        await guest.save();
      }
      return res.status(201).json({ message: "Registration pending admin approval", id: guest._id });
    }

    // Manual Registration
    if (!req.file) return res.status(400).json({ message: "Photo is required for manual entry" });

    guestData.name = name;
    guestData.phone = phone;
    guestData.email = email;
    guestData.photoUrl = `/uploads/${req.file.filename}`;

    const guest = await Guest.create(guestData);
    res.status(201).json({ message: "Registration pending admin approval", id: guest._id });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};
