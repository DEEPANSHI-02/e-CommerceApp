import React, { useEffect, useState } from 'react';
import api from '../api/main'; 
import Loading from '../components/common/Loading';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await api.get('/orders/mine'); // Adjust endpoint if different
      setOrders(res.data);
    } catch (err) {
      console.error('Failed to fetch orders', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="border p-4 rounded shadow">
              <div><strong>Order ID:</strong> {order._id}</div>
              <div><strong>Total:</strong> ₹{order.total}</div>
              <div><strong>Status:</strong> {order.status}</div>
              <div><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

<Link
  to={`/orders/${Orders._id}`}
  className="text-blue-600 hover:underline text-sm"
>
  View Details
</Link>


export default Orders;
