import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const exists = cartItems.find(
      (i) =>
        i._id === item._id &&
        i.selectedColor === item.selectedColor &&
        i.selectedSize === item.selectedSize
    );

    if (exists) {
      // if same variant, increase quantity
      setCartItems((prev) =>
        prev.map((i) =>
          i === exists ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems((prev) => [...prev, item]);
    }
  };

  const removeFromCart = (itemToRemove) => {
    setCartItems((prev) =>
      prev.filter((item) => item !== itemToRemove)
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    };
    
    const clearCart = () => setCartItems([]);


  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, getCartTotal, clearCart}}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
