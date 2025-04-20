import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { orderApi } from '../../services/api'

const OrderConfirmationPage = () => {
  const { id } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Normally, we'd call an API like this:
        // const { data } = await orderApi.getById(id)
        
        // For demo purposes, using mock data
        await new Promise(resolve => setTimeout(resolve, 800))
        
        const mockOrder = {
          id: id,
          status: 'paid',
          total: 649.99,
          tax: 64.99,
          shipping: 0,
          items: [
            {
              id: 2,
              name: 'Smart AC Unit',
              price: 499.99,
              image: 'https://images.unsplash.com/photo-1615164769329-202683bb2526?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              color: '#FFFFFF',
              size: '1.5 Ton',
              quantity: 1,
            },
            {
              id: 4,
              name: 'Tower Fan',
              price: 79.99,
              image: 'https://images.unsplash.com/photo-1586182987320-4f376d39d787?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
              color: '#000000',
              quantity: 1,
            },
          ],
          shippingAddress: {
            fullName: 'John Doe',
            address: '123 Main St',
            city: 'San Francisco',
            state: 'CA',
            zipCode: '94107',
            country: 'United States',
          },
          paymentMethod: 'credit_card',
          createdAt: new Date().toISOString(),
          expectedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        }
        
        setOrder(mockOrder)
      } catch (err) {
        console.error('Failed to fetch order details:', err)
        setError('Failed to load order information. Please check your order history.')
      } finally {
        setLoading(false)
      }
    }

    fetchOrderDetails()
  }, [id])

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-8">
        <div className="flex flex-col items-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-t-2 border-primary-500"></div>
          <p className="text-lg font-medium">Loading order information...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <h1 className="mb-4 text-2xl font-bold text-red-700">Error</h1>
          <p className="mb-6 text-red-700">{error}</p>
          <Link to="/products" className="btn-primary px-6 py-2">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="rounded-lg bg-yellow-50 p-6 text-center">
          <h1 className="mb-4 text-2xl font-bold text-yellow-700">Order Not Found</h1>
          <p className="mb-6 text-yellow-700">We couldn't find the order you were looking for.</p>
          <Link to="/products" className="btn-primary px-6 py-2">
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-8 flex flex-col items-center border-b border-gray-200 pb-6 text-center">
          <CheckCircleIcon className="mb-4 h-16 w-16 text-success-500" />
          <h1 className="mb-2 text-3xl font-bold text-success-700">Order Confirmed!</h1>
          <p className="text-xl">Thank you for your purchase.</p>
          <p className="mt-2 text-gray-600">
            Your order <span className="font-medium">{order.id}</span> has been placed and is being processed.
          </p>
        </div>
        
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <h2 className="mb-3 text-lg font-bold">Order Details</h2>
            <p className="mb-1 text-sm">
              <span className="font-medium">Order Number:</span> {order.id}
            </p>
            <p className="mb-1 text-sm">
              <span className="font-medium">Date:</span> {formatDate(order.createdAt)}
            </p>
            <p className="mb-1 text-sm">
              <span className="font-medium">Status:</span>{' '}
              <span className="rounded-full bg-success-100 px-2 py-1 text-xs font-medium text-success-800">
                {order.status === 'paid' ? 'Payment Completed' : order.status}
              </span>
            </p>
            <p className="mb-1 text-sm">
              <span className="font-medium">Expected Delivery:</span> {formatDate(order.expectedDelivery)}
            </p>
          </div>
          
          <div>
            <h2 className="mb-3 text-lg font-bold">Shipping Address</h2>
            <p className="mb-1 text-sm font-medium">{order.shippingAddress.fullName}</p>
            <p className="mb-1 text-sm">{order.shippingAddress.address}</p>
            <p className="mb-1 text-sm">
              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
            </p>
            <p className="mb-1 text-sm">{order.shippingAddress.country}</p>
          </div>
        </div>
        
        <div className="mb-8">
          <h2 className="mb-3 text-lg font-bold">Order Summary</h2>
          <div className="rounded-lg border border-gray-200">
            <div className="hidden border-b border-gray-200 bg-gray-50 p-4 md:grid md:grid-cols-6">
              <div className="col-span-3 font-medium">Product</div>
              <div className="text-center font-medium">Price</div>
              <div className="text-center font-medium">Quantity</div>
              <div className="text-right font-medium">Total</div>
            </div>
            
            <div className="divide-y divide-gray-200">
              {order.items.map((item, index) => (
                <div key={index} className="p-4">
                  <div className="md:grid md:grid-cols-6 md:items-center">
                    <div className="col-span-3 flex items-center">
                      <div className="mr-4 h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg">
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
                    
                    <div className="hidden text-center md:block">
                      ${item.price.toFixed(2)}
                    </div>
                    
                    <div className="hidden text-center md:block">
                      {item.quantity}
                    </div>
                    
                    <div className="mt-2 text-right md:mt-0">
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mb-8 md:flex md:justify-end">
          <div className="w-full rounded-lg border border-gray-200 p-4 md:w-1/3">
            <div className="flex justify-between py-2">
              <p className="text-gray-600">Subtotal</p>
              <p className="font-medium">${(order.total - order.tax - order.shipping).toFixed(2)}</p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-gray-600">Shipping</p>
              <p className="font-medium">${order.shipping.toFixed(2)}</p>
            </div>
            <div className="flex justify-between py-2">
              <p className="text-gray-600">Tax</p>
              <p className="font-medium">${order.tax.toFixed(2)}</p>
            </div>
            <div className="mt-2 flex justify-between border-t border-gray-200 py-4">
              <p className="font-bold">Total</p>
              <p className="font-bold">${order.total.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex flex-col items-center justify-center space-y-4 border-t border-gray-200 pt-6 text-center">
          <p className="text-gray-600">
            We've sent a confirmation email to your registered email address.
          </p>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link to="/products" className="btn-primary px-6 py-2">
              Continue Shopping
            </Link>
            <Link to="/" className="btn-outline px-6 py-2">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderConfirmationPage