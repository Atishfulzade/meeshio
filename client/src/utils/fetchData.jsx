import axios from "axios";

export const getData = async (endpoint) => {
  const baseURL = "https://api.escuelajs.co/api/v1";
  try {
    const response = await axios.get(`${baseURL}/${endpoint}`);
    return response.data; // No need for .json()
  } catch (error) {
    console.log(error);
  }
};

export const sendData = async (endpoint, data) => {
  const baseURL = "https://api.escuelajs.co/api/v1/";
  try {
    const response = await axios.post(`${baseURL}/${endpoint}`, data);
    return response.data; // No need for .json()
  } catch (error) {
    console.log(error);
  }
};

export const updateData = async (endpoint, data) => {
  const baseURL = "https://api.escuelajs.co/api/v1/";
  try {
    const response = await axios.put(`${baseURL}/${endpoint}`, data);
    return response.data; // No need for .json()
  } catch (error) {
    console.log(error);
  }
};
