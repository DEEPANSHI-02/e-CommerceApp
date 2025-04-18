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
      const res = await api.get(`/orders/${id}`);
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
      <p><strong>Total:</strong> ₹{order.total}</p>
      <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>

      <h3 className="text-lg font-semibold mt-4">Items:</h3>
      <ul className="list-disc pl-5">
        {order.products?.map((item, index) => (
          <li key={index}>
            {item.product.name} — {item.quantity} × ₹{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
