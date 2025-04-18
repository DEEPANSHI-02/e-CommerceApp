import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartSummary = () => {
  const { getCartTotal } = useCart();
  const navigate = useNavigate();

  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
      <p className="mb-2">Subtotal: ₹{getCartTotal()}</p>
      <button
        onClick={() => navigate('/checkout')}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
