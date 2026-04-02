export const decodeFaydaBase64 = (base64String) => {
  try {
    const jsonString = atob(base64String);
    const data = JSON.parse(jsonString);
    return {
      name: data.fullName,
      dob: data.dateOfBirth,
      photo: data.photoUrl, // URL to be handled by backend
      raw: data,
    };
  } catch (e) {
    console.error("Decoding failed", e);
    return null;
  }
};
