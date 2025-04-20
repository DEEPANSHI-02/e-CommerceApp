import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { riderApi } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'
import { 
  TruckIcon, 
  CheckCircleIcon, 
  ClipboardDocumentListIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline'

const DashboardPage = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState(null)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Normally, we'd call an API like this:
        // const { data } = await riderApi.getOrders()
        
        // For demo purposes, using mock data
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockStats = {
          pendingOrders: 3,
          deliveredToday: 2,
          totalDelivered: 47,
          canceledOrders: 1,
        }
        
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
        ]
        
        setStats(mockStats)
        setOrders(mockOrders)
      } catch (err) {
        console.error('Failed to fetch rider data:', err)
        setError('Failed to load your orders. Please try again later.')
      } finally {
        setLoading(false)
      }
    }
    
    fetchDashboardData()
  }, [])

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

  return (
    <div className="pb-20">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Welcome, {user?.name || 'Rider'}</h1>
        <p className="text-gray-600">Here's your delivery overview for today</p>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse rounded-lg bg-white p-4 shadow">
              <div className="h-8 w-24 rounded bg-gray-200"></div>
              <div className="mt-2 h-10 w-16 rounded bg-gray-200"></div>
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
      ) : (
        <>
          <div className="mb-6 grid grid-cols-2 gap-4">
            <div className="rounded-lg bg-white p-4 shadow transition-transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                  <h3 className="text-2xl font-bold">{stats.pendingOrders}</h3>
                </div>
                <div className="rounded-full bg-blue-100 p-3">
                  <TruckIcon className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-white p-4 shadow transition-transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Delivered Today</p>
                  <h3 className="text-2xl font-bold">{stats.deliveredToday}</h3>
                </div>
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircleIcon className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-white p-4 shadow transition-transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Delivered</p>
                  <h3 className="text-2xl font-bold">{stats.totalDelivered}</h3>
                </div>
                <div className="rounded-full bg-primary-100 p-3">
                  <ClipboardDocumentListIcon className="h-6 w-6 text-primary-600" />
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-white p-4 shadow transition-transform hover:scale-105">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Failed Deliveries</p>
                  <h3 className="text-2xl font-bold">{stats.canceledOrders}</h3>
                </div>
                <div className="rounded-full bg-red-100 p-3">
                  <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Your Current Orders</h2>
            <Link to="/rider/orders" className="text-sm font-medium text-primary-600">
              View all orders
            </Link>
          </div>
          
          {orders.length === 0 ? (
            <div className="rounded-lg bg-white p-6 text-center shadow">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <ClipboardDocumentListIcon className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="mb-2 text-lg font-medium">No Orders Assigned</h3>
              <p className="text-gray-500">You don't have any orders assigned to you right now.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
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
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500">Customer</h4>
                      <p className="font-medium">{order.customer.name}</p>
                      <p className="text-sm">{order.customer.phone}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500">Delivery Address</h4>
                      <p className="text-sm">{order.customer.address}</p>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-500">Items</h4>
                      <ul className="mt-1 text-sm">
                        {order.items.map((item, index) => (
                          <li key={index} className="flex justify-between">
                            <span>{item.name}</span>
                            <span>x{item.quantity}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                      <div>
                        <span className="text-sm text-gray-500">Total:</span>
                        <span className="ml-2 font-bold">{formatCurrency(order.total)}</span>
                      </div>
                      
                      <div className="space-x-2">
                        {order.status === 'assigned' && (
                          <Link 
                            to={`/rider/orders/${order.id}`}
                            className="btn-primary text-xs"
                          >
                            Start Delivery
                          </Link>
                        )}
                        
                        {order.status === 'in_transit' && (
                          <Link 
                            to={`/rider/orders/${order.id}`}
                            className="btn-primary text-xs"
                          >
                            Complete Delivery
                          </Link>
                        )}
                        
                        {(order.status === 'delivered' || order.status === 'failed') && (
                          <Link 
                            to={`/rider/orders/${order.id}`}
                            className="btn-outline text-xs"
                          >
                            View Details
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default DashboardPage