import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { XMarkIcon } from '@heroicons/react/24/outline'

const CartPage = () => {
  const { cartItems, cartTotal, updateQuantity, removeItem } = useCart()
  const navigate = useNavigate()
  const [isUpdating, setIsUpdating] = useState(false)

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) newQuantity = 1
    updateQuantity(index, newQuantity)
    
    // Show brief updating animation
    setIsUpdating(true)
    setTimeout(() => {
      setIsUpdating(false)
    }, 500)
  }

  const handleRemoveItem = (index) => {
    if (confirm('Are you sure you want to remove this item from your cart?')) {
      removeItem(index)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="rounded-lg bg-white p-8 text-center shadow">
          <h2 className="mb-4 text-2xl font-semibold">Your cart is empty</h2>
          <p className="mb-6 text-gray-600">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/products" className="btn-primary px-6 py-2 text-base">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className={`rounded-lg bg-white p-6 shadow transition-opacity ${isUpdating ? 'opacity-75' : 'opacity-100'}`}>
              {/* Table Header - Desktop */}
              <div className="hidden border-b border-gray-200 pb-4 md:grid md:grid-cols-6">
                <div className="col-span-3 font-medium">Product</div>
                <div className="text-center font-medium">Price</div>
                <div className="text-center font-medium">Quantity</div>
                <div className="text-right font-medium">Total</div>
              </div>
              
              {/* Cart Items */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item, index) => (
                  <div key={index} className="py-4">
                    <div className="md:grid md:grid-cols-6 md:items-center">
                      {/* Product - Mobile & Desktop */}
                      <div className="col-span-3 flex items-center">
                        <div className="mr-4 h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-base font-medium">{item.name}</h3>
                          {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                          {item.color && (
                            <div className="mt-1 flex items-center">
                              <span className="mr-2 text-sm text-gray-500">Color:</span>
                              <span 
                                className="h-4 w-4 rounded-full border border-gray-300" 
                                style={{ backgroundColor: item.color }}
                              ></span>
                            </div>
                          )}
                          <p className="mt-1 md:hidden text-sm font-medium">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                      
                      {/* Price - Desktop Only */}
                      <div className="hidden text-center md:block">
                        ${item.price.toFixed(2)}
                      </div>
                      
                      {/* Quantity - Mobile & Desktop */}
                      <div className="mt-4 flex justify-between md:mt-0 md:block md:text-center">
                        <div className="flex md:justify-center">
                          <div className="flex w-32 items-center">
                            <button
                              onClick={() => handleQuantityChange(index, item.quantity - 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(index, parseInt(e.target.value) || 1)}
                              className="h-8 w-10 border-y border-gray-300 bg-white text-center text-gray-900"
                            />
                            <button
                              onClick={() => handleQuantityChange(index, item.quantity + 1)}
                              className="flex h-8 w-8 items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        
                        {/* Total - Mobile */}
                        <div className="flex items-center md:hidden">
                          <p className="text-base font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                          <button 
                            onClick={() => handleRemoveItem(index)}
                            className="ml-4 text-gray-400 hover:text-gray-600"
                          >
                            <XMarkIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Total - Desktop Only */}
                      <div className="hidden items-center justify-end md:flex">
                        <p className="text-base font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        <button 
                          onClick={() => handleRemoveItem(index)}
                          className="ml-4 text-gray-400 hover:text-gray-600"
                        >
                          <XMarkIcon className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 border-t border-gray-200 pt-4">
                <Link to="/products" className="text-primary-600 hover:text-primary-800">
                  &larr; Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div>
            <div className="rounded-lg bg-white p-6 shadow">
              <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
              <div className="border-b border-gray-200 pb-4">
                <div className="flex justify-between py-2">
                  <p className="text-gray-600">Subtotal</p>
                  <p className="font-medium">${cartTotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between py-2">
                  <p className="text-gray-600">Shipping</p>
                  <p className="font-medium">$0.00</p>
                </div>
                <div className="flex justify-between py-2">
                  <p className="text-gray-600">Tax</p>
                  <p className="font-medium">${(cartTotal * 0.1).toFixed(2)}</p>
                </div>
              </div>
              <div className="flex justify-between py-4">
                <p className="text-lg font-bold">Total</p>
                <p className="text-lg font-bold">${(cartTotal + (cartTotal * 0.1)).toFixed(2)}</p>
              </div>
              
              <button
                onClick={() => navigate('/checkout')}
                className="btn-primary mt-4 w-full py-3 text-base"
              >
                Proceed to Checkout
              </button>
              
              <div className="mt-6">
                <h3 className="mb-2 text-sm font-medium">We Accept</h3>
                <div className="flex space-x-2">
                  <div className="rounded bg-gray-100 px-2 py-1">
                    <span className="text-xs">Visa</span>
                  </div>
                  <div className="rounded bg-gray-100 px-2 py-1">
                    <span className="text-xs">Mastercard</span>
                  </div>
                  <div className="rounded bg-gray-100 px-2 py-1">
                    <span className="text-xs">PayPal</span>
                  </div>
                  <div className="rounded bg-gray-100 px-2 py-1">
                    <span className="text-xs">Apple Pay</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage