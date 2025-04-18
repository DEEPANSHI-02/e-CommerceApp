import React from 'react';
import { useCart } from '../../context/CartContext';

const OrderSummary = () => {
  const { cartItems, getCartTotal } = useCart();

  return (
    <div className="border p-4 rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      {cartItems.map((item, idx) => (
        <div key={idx} className="flex justify-between items-start">
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">
              {item.selectedSize || 'N/A'}, {item.selectedColor || 'N/A'}
            </p>
            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
          </div>
          <p className="font-medium">₹{item.price * item.quantity}</p>
        </div>
      ))}
      <hr />
      <div className="flex justify-between font-bold">
        <span>Total:</span>
        <span>₹{getCartTotal()}</span>
      </div>
    </div>
  );
};

export default OrderSummary;
