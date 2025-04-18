import axios from 'axios';

const API_URL = 'http://localhost:5000/api/products'; // your actual backend URL

export const getAllProducts = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getProductById = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};
