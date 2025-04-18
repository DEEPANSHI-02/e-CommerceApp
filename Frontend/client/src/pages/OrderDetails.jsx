import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/main';
import Loading from '../components/common/Loading';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await api.get(`/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrder(res.data);
    } catch (err) {
      console.error('Failed to fetch order:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [id]);

  if (loading) return <Loading />;
  if (!order) return <p className="text-center">Order not found</p>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-2">
      <h2 className="text-xl font-bold mb-4">Order #{order._id}</h2>
      <p><strong>Status:</strong> {order.status}</p>
      <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

      <h3 className="text-lg font-semibold mt-4">Item Details:</h3>
      <div className="border p-3 rounded shadow-sm">
        <p><strong>Product:</strong> {order.productId?.name}</p>
        <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
      </div>
    </div>
  );
};

export default OrderDetails;
