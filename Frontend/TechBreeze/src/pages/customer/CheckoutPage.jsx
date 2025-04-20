import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import { orderApi } from '../../services/api'

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  })
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [step, setStep] = useState(1) // 1: Contact & Shipping, 2: Payment

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleNextStep = (e) => {
    e.preventDefault()
    // Form validation for step 1
    if (!formData.fullName || !formData.email || !formData.address || 
        !formData.city || !formData.state || !formData.zipCode) {
      setError('Please fill in all required fields')
      return
    }
    setError(null)
    setStep(2)
  }

  const handlePreviousStep = () => {
    setStep(1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Form validation for step 2
    if (!formData.cardNumber || !formData.cardName || !formData.expiryDate || !formData.cvv) {
      setError('Please fill in all payment fields')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Normally, we'd call an API like this:
      // const response = await orderApi.create({
      //   userId: user.id,
      //   items: cartItems,
      //   total: cartTotal + (cartTotal * 0.1),
      //   shippingAddress: {
      //     fullName: formData.fullName,
      //     address: formData.address,
      //     city: formData.city,
      //     state: formData.state,
      //     zipCode: formData.zipCode,
      //     country: formData.country,
      //   },
      //   paymentMethod: 'credit_card',
      // })
      
      // For demo, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock response
      const mockResponse = {
        id: 'ORD' + Math.floor(Math.random() * 10000),
        status: 'paid',
      }
      
      // Clear cart and redirect to confirmation
      clearCart()
      navigate(`/order-confirmation/${mockResponse.id}`)
    } catch (err) {
      console.error('Checkout failed:', err)
      setError('Failed to process your order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (cartItems.length === 0) {
    navigate('/cart')
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Checkout</h1>
      
      {/* Checkout Steps */}
      <div className="mb-8">
        <ol className="flex items-center">
          <li className={`relative w-full text-center ${step === 1 ? 'text-primary-600' : 'text-gray-500'}`}>
            <div className="flex items-center justify-center">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                step === 1 ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-500 bg-white text-gray-500'
              }`}>
                1
              </div>
            </div>
            <div className="mt-2 text-xs font-medium">Shipping</div>
          </li>
          <li className="relative w-full border-t-2 border-gray-300">
            <span className="sr-only">Line</span>
          </li>
          <li className={`relative w-full text-center ${step === 2 ? 'text-primary-600' : 'text-gray-500'}`}>
            <div className="flex items-center justify-center">
              <div className={`flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                step === 2 ? 'border-primary-600 bg-primary-600 text-white' : 'border-gray-500 bg-white text-gray-500'
              }`}>
                2
              </div>
            </div>
            <div className="mt-2 text-xs font-medium">Payment</div>
          </li>
          <li className="relative w-full border-t-2 border-gray-300">
            <span className="sr-only">Line</span>
          </li>
          <li className="relative w-full text-center text-gray-500">
            <div className="flex items-center justify-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-gray-500 bg-white text-gray-500">
                3
              </div>
            </div>
            <div className="mt-2 text-xs font-medium">Confirmation</div>
          </li>
        </ol>
      </div>
      
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Form Area */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white p-6 shadow">
            {step === 1 ? (
              <form onSubmit={handleNextStep}>
                <h2 className="mb-6 text-xl font-bold">Contact & Shipping Information</h2>
                
                {error && (
                  <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
                    {error}
                  </div>
                )}
                
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className="label">Full Name</label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="input w-full"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="label">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input w-full"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="address" className="label">Street Address</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="input w-full"
                    required
                  />
                </div>
                
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="city" className="label">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="input w-full"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="state" className="label">State / Province</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="input w-full"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="zipCode" className="label">ZIP / Postal Code</label>
                    <input
                      type="text"
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="input w-full"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="country" className="label">Country</label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="input w-full"
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="Mexico">Mexico</option>
                      <option value="United Kingdom">United Kingdom</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    className="btn-primary px-6 py-2"
                  >
                    Continue to Payment
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSubmit}>
                <h2 className="mb-6 text-xl font-bold">Payment Information</h2>
                
                {error && (
                  <div className="mb-4 rounded-md bg-red-50 p-4 text-sm text-red-700">
                    {error}
                  </div>
                )}
                
                <div className="mb-4">
                  <label htmlFor="cardNumber" className="label">Card Number</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    placeholder="1234 5678 9012 3456"
                    className="input w-full"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label htmlFor="cardName" className="label">Name on Card</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleChange}
                    className="input w-full"
                    required
                  />
                </div>
                
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="expiryDate" className="label">Expiry Date (MM/YY)</label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      placeholder="MM/YY"
                      className="input w-full"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="cvv" className="label">CVV</label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      placeholder="123"
                      className="input w-full"
                      required
                    />
                  </div>
                </div>
                
                <div className="mt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="btn-outline px-6 py-2"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary px-6 py-2"
                  >
                    {loading ? 'Processing...' : 'Place Order'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="rounded-lg bg-white p-6 shadow">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
            
            <div className="max-h-60 overflow-y-auto">
              {cartItems.map((item, index) => (
                <div key={index} className="mb-4 flex items-center">
                  <div className="mr-3 h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-sm font-medium">{item.name}</h3>
                    <p className="flex items-center text-xs text-gray-500">
                      {item.color && (
                        <span className="mr-2 flex items-center">
                          Color: 
                          <span 
                            className="ml-1 inline-block h-3 w-3 rounded-full border border-gray-300" 
                            style={{ backgroundColor: item.color }}
                          ></span>
                        </span>
                      )}
                      {item.size && <span className="mr-2">Size: {item.size}</span>}
                      <span>Qty: {item.quantity}</span>
                    </p>
                  </div>
                  <p className="flex-shrink-0 text-sm font-medium">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 border-t border-gray-200 pt-4">
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
              <div className="mt-2 flex justify-between border-t border-gray-200 py-4">
                <p className="text-lg font-bold">Total</p>
                <p className="text-lg font-bold">${(cartTotal + (cartTotal * 0.1)).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage