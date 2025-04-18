import React from 'react';

const CartSummary = ({ items }) => {
  const subtotal = items.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  return (
    <div className="bg-white shadow-md p-6 rounded-lg h-fit">
      <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
      <p className="mb-2">Subtotal: ₹{subtotal.toFixed(2)}</p>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;
