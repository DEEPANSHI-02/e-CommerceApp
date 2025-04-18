import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { createOrder } from '../../services/order.service';

const CheckoutForm = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isValidPhone = (phone) => {
    return /^[0-9]{10}$/.test(phone); // simple 10-digit validation
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.phone) {
      return alert('Please fill all fields');
    }

    if (!isValidPhone(formData.phone)) {
      return alert('Enter a valid 10-digit phone number');
    }

    const orderData = {
      customerInfo: formData,
      items: cartItems,
      total: getCartTotal(),
    };

    try {
      setSubmitting(true);
      await createOrder(orderData);
      clearCart();
      navigate('/order-confirmation');
    } catch (err) {
      console.error('Order failed:', err);
      alert(err?.response?.data?.message || 'Something went wrong!');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded shadow">
      <h2 className="text-lg font-semibold">Shipping Details</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />

      <input
        type="text"
        name="address"
        placeholder="Shipping Address"
        value={formData.address}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />

      <input
        type="text"
        name="phone"
        placeholder="Phone Number"
        value={formData.phone}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
      >
        {submitting ? 'Placing Order...' : 'Place Order'}
      </button>
    </form>
  );
};

export default CheckoutForm;
