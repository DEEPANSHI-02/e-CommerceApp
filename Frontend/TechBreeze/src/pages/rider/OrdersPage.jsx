import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { riderApi } from '../../services/api'
import { 
  MapPinIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Normally, we'd call an API like this:
        // const { data } = await riderApi.getOrders()
        
        // For demo purposes, using mock data
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockOrders = [
          {
            id: 'ORD1234',
            customer: {
              name: 'John Doe',
              phone: '555-1234',
              address: '123 Main St, Apt 4B, San Francisco, CA 94107',
            },
            date: '2023-05-10T14:23:54Z',
            items: [
              { name: 'Premium Ceiling Fan', quantity: 1 },
              { name: 'Smart AC Unit', quantity: 1 },
            ],
            status: 'assigned',
            total: 579.98,
          },
          {
            id: 'ORD1232',
            customer: {
              name: 'Sarah Johnson',
              phone: '555-5678',
              address: '456 Market St, San Francisco, CA 94105',
            },
            date: '2023-05-10T09:45:12Z',
            items: [
              { name: 'Tower Fan', quantity: 1 },
            ],
            status: 'in_transit',
            total: 79.99,
          },
          {
            id: 'ORD1230',
            customer: {
              name: 'Michael Chen',
              phone: '555-9012',
              address: '789 Mission St, San Francisco, CA 94103',
            },
            date: '2023-05-09T16:32:08Z',
            items: [
              { name: 'Portable Air Cooler', quantity: 2 },
            ],
            status: 'assigned',
            total: 179.98,
          },
          {
            id: 'ORD1228',
            customer: {
              name: 'Emily Rodriguez',
              phone: '555-3456',
              address: '321 Valencia St, San Francisco, CA 94103',
            },
            date: '2023-05-09T11:18:36Z',
            items: [
              { name: 'Desk Fan', quantity: 1 },
              { name: 'Tower Fan', quantity: 1 },
            ],
            status: 'delivered',
            deliveredAt: '2023-05-09T14:25:42Z',
            total: 129.98,
          },
          {
            id: 'ORD1225',
            customer: {
              name: 'David Wilson',
              phone: '555-7890',
              address: '987 Howard St, San Francisco, CA 94105',
            },
            date: '2023-05-08T15:52:19Z',
            items: [
              { name: 'Smart AC Unit', quantity: 1 },
            ],
            status: 'delivered',
            deliveredAt: '2023-05-08T18:34:10Z',
            total: 499.99,
          },
          {
            id: 'ORD1223',
            customer: {
              name: 'Jennifer Thompson',
              phone: '555-2345',
              address: '654 Folsom St, San Francisco, CA 94107',
            },
            date: '2023-05-08T10:27:43Z',
            items: [
              { name: 'Portable Air Cooler', quantity: 1 },
            ],
            status: 'failed',
            failureReason: 'Customer not available',
            total: 89.99,
          },
        ]
        
        setOrders(mockOrders)
      } catch (err) {
        console.error('Failed to fetch orders:', err)
        setError('Failed to load your orders. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchOrders()
  }, [])

  const handleStatusChange = async (orderId, newStatus, failureReason = null) => {
    try {
      // Normally, we'd call an API like this:
      // await riderApi.updateOrderStatus(orderId, newStatus, failureReason)
      
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update the order in our local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId
            ? { 
                ...order, 
                status: newStatus,
                ...(newStatus === 'delivered' ? { deliveredAt: new Date().toISOString() } : {}),
                ...(newStatus === 'failed' ? { failureReason } : {})
              }
            : order
        )
      )
    } catch (err) {
      console.error('Failed to update order status:', err)
      alert('Failed to update order status. Please try again.')
    }
  }

  // Filter orders by status
  const filteredOrders = statusFilter === 'all'
    ? orders
    : orders.filter(order => order.status === statusFilter)

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'assigned':
        return 'Pickup Pending'
      case 'in_transit':
        return 'In Transit'
      case 'delivered':
        return 'Delivered'
      case 'failed':
        return 'Delivery Failed'
      default:
        return status.replace('_', ' ')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'assigned':
        return 'bg-yellow-100 text-yellow-800'
      case 'in_transit':
        return 'bg-blue-100 text-blue-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const openFailureReasonModal = (orderId) => {
    const reason = prompt('Please provide a reason for the failed delivery:')
    if (reason) {
      handleStatusChange(orderId, 'failed', reason)
    }
  }

  return (
    <div className="pb-20">
      <div className="mb-6 flex flex-col justify-between md:flex-row md:items-center">
        <h1 className="mb-4 text-2xl font-bold md:mb-0">Orders</h1>
        
        <div className="flex">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="input"
          >
            <option value="all">All Orders</option>
            <option value="assigned">Pickup Pending</option>
            <option value="in_transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse rounded-lg bg-white p-4 shadow">
              <div className="h-6 w-1/4 rounded bg-gray-200"></div>
              <div className="mt-4 space-y-2">
                <div className="h-4 w-3/4 rounded bg-gray-200"></div>
                <div className="h-4 w-1/2 rounded bg-gray-200"></div>
              </div>
              <div className="mt-4 h-8 w-full rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <ExclamationTriangleIcon className="mx-auto mb-4 h-12 w-12 text-red-500" />
          <h2 className="mb-2 text-xl font-bold text-red-700">Error</h2>
          <p className="mb-4 text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Refresh Data
          </button>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="rounded-lg bg-white p-6 text-center shadow">
          <h3 className="mb-2 text-lg font-medium">No Orders Found</h3>
          <p className="text-gray-500">
            {statusFilter === 'all' 
              ? "You don't have any orders yet."
              : `You don't have any ${statusFilter} orders.`}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="overflow-hidden rounded-lg bg-white shadow">
              <div className="border-b border-gray-200 bg-gray-50 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900">Order {order.id}</h3>
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}>
                      {getStatusText(order.status)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Customer</h4>
                    <p className="font-medium">{order.customer.name}</p>
                  </div>
                  
                  <a 
                    href={`tel:${order.customer.phone}`}
                    className="flex items-center rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800"
                  >
                    <PhoneIcon className="mr-1 h-4 w-4" />
                    {order.customer.phone}
                  </a>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-start">
                    <MapPinIcon className="mr-1 mt-1 h-4 w-4 shrink-0 text-gray-500" />
                    <p className="text-sm">{order.customer.address}</p>
                  </div>
                </div>
                
                <div className="mb-4 rounded-md bg-gray-50 p-3">
                  <h4 className="mb-2 text-sm font-medium text-gray-500">Order Summary</h4>
                  <ul className="text-sm">
                    {order.items.map((item, index) => (
                      <li key={index} className="flex justify-between pb-1">
                        <span>{item.name}</span>
                        <span>x{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 border-t border-gray-200 pt-2 text-right">
                    <span className="font-medium">{formatCurrency(order.total)}</span>
                  </div>
                </div>
                
                {order.status === 'delivered' && (
                  <div className="mb-4 flex items-center rounded-md bg-green-50 p-3 text-green-800">
                    <CheckCircleIcon className="mr-2 h-5 w-5" />
                    <div>
                      <p className="font-medium">Delivered Successfully</p>
                      <p className="text-sm">Completed at {formatDate(order.deliveredAt)}</p>
                    </div>
                  </div>
                )}
                
                {order.status === 'failed' && (
                  <div className="mb-4 flex items-center rounded-md bg-red-50 p-3 text-red-800">
                    <ExclamationTriangleIcon className="mr-2 h-5 w-5" />
                    <div>
                      <p className="font-medium">Delivery Failed</p>
                      <p className="text-sm">Reason: {order.failureReason}</p>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-end space-x-2">
                  {order.status === 'assigned' && (
                    <button
                      onClick={() => handleStatusChange(order.id, 'in_transit')}
                      className="btn-primary text-xs"
                    >
                      Start Delivery
                    </button>
                  )}
                  
                  {order.status === 'in_transit' && (
                    <>
                      <button
                        onClick={() => openFailureReasonModal(order.id)}
                        className="btn-outline text-xs"
                      >
                        Mark as Failed
                      </button>
                      <button
                        onClick={() => handleStatusChange(order.id, 'delivered')}
                        className="btn-primary text-xs"
                      >
                        Mark as Delivered
                      </button>
                    </>
                  )}
                  
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(order.customer.address)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline flex items-center text-xs"
                  >
                    <MapPinIcon className="mr-1 h-4 w-4" />
                    View on Map
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersPage