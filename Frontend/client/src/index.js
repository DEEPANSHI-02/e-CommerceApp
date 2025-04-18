import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="311394880480-ki0u7srbvt0idjt0eka1b7q64mf0244f.apps.googleusercontent.com">
    <CartProvider>
    <App />
      </CartProvider>
      </GoogleOAuthProvider>
  </React.StrictMode>,
);



