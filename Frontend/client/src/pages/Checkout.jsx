import React from 'react';
import OrderSummary from '../components/checkout/OrderSummary';
import CheckoutForm from '../components/checkout/CheckoutForm';

const Checkout = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-2 gap-6">
      <CheckoutForm />
      <OrderSummary />
    </div>
  );
};

export default Checkout;
