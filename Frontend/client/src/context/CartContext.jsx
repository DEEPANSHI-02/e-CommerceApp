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
      setCartItems((prev) =>
        prev.map((i) =>
          i._id === exists._id &&
          i.selectedColor === exists.selectedColor &&
          i.selectedSize === exists.selectedSize
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setCartItems((prev) => [...prev, { ...item, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId, quantity, selectedColor, selectedSize) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === productId &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    );
  };

  const removeFromCart = (productId, selectedColor, selectedSize) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(
            item._id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          )
      )
    );
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        getCartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
