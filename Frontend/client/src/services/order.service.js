import axios from 'axios';

const ORDER_API = 'http://localhost:5000/api/orders'; // use your actual backend URL

export const createOrder = async (orderData) => {
  const res = await axios.post(ORDER_API, orderData);
  return res.data;
};
