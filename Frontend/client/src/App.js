import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';
import OrderConfirmation from './pages/OrderConfirmation';

import Layout from './components/common/Layout';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/order-confirmation" element={<OrderConfirmation />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
