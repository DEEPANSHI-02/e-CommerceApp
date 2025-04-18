import React from 'react';

const CartItem = ({ item, updateQuantity, removeFromCart }) => {
  const quantity = item.quantity || 1;

  return (
    <div className="flex flex-col md:flex-row justify-between items-center border-b pb-4">
      <div className="text-left">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600">
          Size: {item.size || 'N/A'} | Color: {item.color || 'N/A'}
        </p>
        <div className="flex items-center mt-2">
          <label className="mr-2 text-sm">Qty:</label>
          <input
            type="number"
            min={1}
            value={quantity}
            onChange={(e) =>
              updateQuantity(item._id, parseInt(e.target.value))
            }
            className="w-16 border rounded px-2 py-1"
          />
        </div>
      </div>
      <div className="text-right mt-4 md:mt-0">
        <p className="text-blue-600 font-semibold">
          ₹{(item.price * quantity).toFixed(2)}
        </p>
        <button
          onClick={() => removeFromCart(item._id)}
          className="text-red-500 text-sm mt-2"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
