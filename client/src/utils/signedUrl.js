import { getData } from "./fetchData";

// Utility function to clean the image key
const cleanKey = (image) => image?.replace("uploads/", "");

// Fetch a single signed URL
export const fetchSignedUrl = async (image) => {
  try {
    const cleanedKey = cleanKey(image);
    const response = await getData(`images/${cleanedKey}`);
    return response?.signedUrl || null;
  } catch (error) {
    console.error("Error fetching signed URL:", error);
    return null; // Or throw the error based on your needs
  }
};

// Fetch multiple signed URLs
export const fetchSignedUrls = async (images) => {
  return Promise.all(
    images.map(async (image) => fetchSignedUrl(image)) // Reuse fetchSignedUrl
  );
};
