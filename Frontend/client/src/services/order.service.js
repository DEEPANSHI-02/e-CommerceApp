import axios from 'axios';

const ORDER_API = 'http://localhost:5000/api/orders';

export const createOrder = async (orderData) => {
  const token = localStorage.getItem('token');

  const res = await axios.post(ORDER_API, orderData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getUserOrders = async () => {
  const token = localStorage.getItem('token');

  const res = await axios.get(`${ORDER_API}/my-orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
