const QRCode = require("qrcode");

exports.generateGuestQR = async (eventId, guestId) => {
  const payload = `milo://event/${eventId}/guest/${guestId}`;
  // Returns base64 DataURI or saves to file
  return await QRCode.toDataURL(payload);
};
