import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-xl font-bold text-blue-600">FanShop</Link>
        <nav className="flex gap-4">
          <Link to="/cart" className="hover:underline">Cart</Link>
          <Link to="/login" className="hover:underline">Login</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
