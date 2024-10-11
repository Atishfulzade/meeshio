import axios from "axios";

// const baseURL = "http://localhost:3000/api/v1";
const baseURL = "https://meeshio.onrender.com/api/v1";

// Helper function to attach the token to the Authorization header
const getAuthHeaders = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// GET request for fetching data with Authorization token
export const getData = async (endpoint) => {
  const token = window.localStorage.getItem("token");

  try {
    const response = await axios.get(
      `${baseURL}/${endpoint}`,
      getAuthHeaders(token)
    );
    return response?.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// POST request for creating a resource with or without file upload
export const sendData = async (endpoint, data) => {
  const token = window.localStorage.getItem("token");

  try {
    const response = await axios.post(
      `${baseURL}/${endpoint}`,
      data,
      getAuthHeaders(token)
    );
    return response?.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// PUT request for updating a resource with or without file upload
export const updateData = async (endpoint, data) => {
  const token = window.localStorage.getItem("token");

  try {
    const response = await axios.put(
      `${baseURL}/${endpoint}`,
      data,
      getAuthHeaders(token)
    );
    return response?.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// DELETE request for removing a resource with Authorization token
export const deleteData = async (endpoint) => {
  const token = window.localStorage.getItem("token");

  try {
    const response = await axios.delete(
      `${baseURL}/${endpoint}`,

      getAuthHeaders(token)
    );
    return response?.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// Error handling function
const handleError = (error) => {
  if (error.response) {
    console.error("Error status", error.response.status);
    console.error("Error data", error.response.data);
  } else {
    console.error("Error message", error.message);
  }
};
