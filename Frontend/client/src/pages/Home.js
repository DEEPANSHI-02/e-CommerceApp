import React from 'react';
import ProductList from '../components/products/ProductList';

const Home = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      <ProductList />
    </div>
  );
};

export default Home;
