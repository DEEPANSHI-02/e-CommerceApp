import React from 'react';
import { useCart } from '../../context/CartContext';

const OrderSummary = () => {
  const { cartItems, getCartTotal } = useCart();

  return (
    <div className="border p-4 rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">Order Summary</h2>
      {cartItems.map((item, idx) => (
        <div key={idx} className="flex justify-between">
          <div>
            <p>{item.name}</p>
            <p className="text-sm text-gray-500">
              {item.selectedSize}, {item.selectedColor}
            </p>
          </div>
          <p>₹{item.price * item.quantity}</p>
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
