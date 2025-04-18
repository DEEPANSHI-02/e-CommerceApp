import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-md py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-xl font-bold text-blue-600">FanShop</Link>

        <nav className="flex gap-4 items-center">
          <Link to="/cart" className="hover:underline">Cart</Link>

          {user ? (
            <>
              <Link to="/orders" className="hover:underline text-sm">My Orders</Link>
              <span className="text-sm text-gray-700">
                Hi, {user.name} ({user.role})
              </span>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline text-sm"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:underline">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
