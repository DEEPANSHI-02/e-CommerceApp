import React from 'react';
import { useCart } from '../../context/CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  return (
    <div className="flex items-center justify-between border-b py-4">
      <div className="flex items-center gap-4">
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-24 h-24 object-cover rounded"
        />
        <div>
          <h2 className="font-semibold">{item.name}</h2>
          <p className="text-sm text-gray-500">
            Size: {item.selectedSize} | Color: {item.selectedColor}
          </p>
          <p className="text-sm">Qty: {item.quantity}</p>
          <p className="text-blue-600 font-semibold mt-1">
            ₹{item.price * item.quantity}
          </p>
        </div>
      </div>
      <button
        onClick={() => removeFromCart(item)}
        className="text-red-500 hover:underline"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
