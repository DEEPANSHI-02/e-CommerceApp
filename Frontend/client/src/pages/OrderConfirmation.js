import React from 'react';
import { Link } from 'react-router-dom';

const OrderConfirmation = () => {
  return (
    <div className="max-w-xl mx-auto p-8 text-center border rounded shadow">
      <h1 className="text-2xl font-bold text-green-600 mb-4">🎉 Order Confirmed!</h1>
      <p className="text-gray-700 mb-6">
        Thank you for your purchase. Your order has been placed successfully.
      </p>

      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmation;
