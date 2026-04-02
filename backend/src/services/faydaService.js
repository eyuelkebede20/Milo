const axios = require("axios");
const fs = require("fs");
const path = require("path");

exports.decodeFaydaQR = (base64Data) => {
  try {
    const decoded = Buffer.from(base64Data, "base64").toString("utf-8");
    const data = JSON.parse(decoded);
    return {
      name: data.fullName,
      dob: data.dateOfBirth,
      remotePhotoUrl: data.photoUrl,
      raw: data,
    };
  } catch (err) {
    throw new Error("Invalid Fayda QR format");
  }
};

exports.downloadAndStoreImage = async (url, guestId) => {
  const filename = `${guestId}_${Date.now()}.jpg`;
  const localPath = path.join(__dirname, "../../uploads", filename);
  const response = await axios({ url, responseType: "stream" });

  return new Promise((resolve, reject) => {
    response.data
      .pipe(fs.createWriteStream(localPath))
      .on("finish", () => resolve(`/uploads/${filename}`))
      .on("error", reject);
  });
};
