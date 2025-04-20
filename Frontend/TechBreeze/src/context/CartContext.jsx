import { createContext, useState, useEffect } from 'react'

export const CartContext = createContext(null)

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartTotal, setCartTotal] = useState(0)

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(parsedCart)
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error)
      }
    }
  }, [])

  // Update cart total whenever cart items change
  useEffect(() => {
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    setCartTotal(total)
    
    // Save cart to localStorage
    localStorage.setItem('cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product, quantity = 1, selectedColor = null, selectedSize = null) => {
    setCartItems(prevItems => {
      // Check if item already exists with same product id, color and size
      const existingItemIndex = prevItems.findIndex(item => 
        item.id === product.id && 
        item.color === selectedColor && 
        item.size === selectedSize
      )

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        return prevItems.map((item, index) => 
          index === existingItemIndex 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        )
      } else {
        // Add new item
        return [...prevItems, {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          color: selectedColor,
          size: selectedSize,
          quantity
        }]
      }
    })
  }

  const updateQuantity = (index, quantity) => {
    setCartItems(prevItems => 
      prevItems.map((item, i) => 
        i === index ? { ...item, quantity } : item
      )
    )
  }

  const removeItem = (index) => {
    setCartItems(prevItems => prevItems.filter((_, i) => i !== index))
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('cart')
  }

  return (
    <CartContext.Provider value={{
      cartItems,
      cartTotal,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      itemCount: cartItems.length
    }}>
      {children}
    </CartContext.Provider>
  )
}