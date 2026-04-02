export function decodeFaydaBase64(data) {
  try {
    const decoded = atob(data);

    // Example parsing (adjust based on real format)
    const [name, dob] = decoded.split("|");

    return {
      name,
      dob,
      rawBase64: data,
    };
  } catch (err) {
    return null;
  }
}
