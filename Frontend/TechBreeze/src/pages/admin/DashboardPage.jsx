import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  ShoppingBagIcon, 
  TruckIcon, 
  UserIcon, 
  CurrencyDollarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline'

const DashboardPage = () => {
  const [stats, setStats] = useState(null)
  const [recentOrders, setRecentOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Mock data
        const mockStats = {
          totalOrders: 158,
          totalOrdersChange: 12.5,
          pendingOrders: 24,
          pendingOrdersChange: -8.3,
          totalRevenue: 42589.75,
          totalRevenueChange: 18.2,
          activeRiders: 7,
          activeRidersChange: 0,
        }
        
        const mockRecentOrders = [
          {
            id: 'ORD1234',
            customer: 'John Doe',
            date: '2023-05-10T14:23:54Z',
            total: 579.98,
            status: 'Shipped',
            items: 2,
          },
          {
            id: 'ORD1233',
            customer: 'Sarah Johnson',
            date: '2023-05-10T09:45:12Z',
            total: 129.99,
            status: 'Paid',
            items: 1,
          },
          {
            id: 'ORD1232',
            customer: 'Michael Chen',
            date: '2023-05-09T16:32:08Z',
            total: 849.97,
            status: 'Delivered',
            items: 3,
          },
          {
            id: 'ORD1231',
            customer: 'Emily Rodriguez',
            date: '2023-05-09T11:18:36Z',
            total: 229.98,
            status: 'Paid',
            items: 2,
          },
          {
            id: 'ORD1230',
            customer: 'David Wilson',
            date: '2023-05-08T15:52:19Z',
            total: 499.99,
            status: 'Shipped',
            items: 1,
          },
        ]
        
        setStats(mockStats)
        setRecentOrders(mockRecentOrders)
      } catch (error) {
        console.error('Failed to fetch dashboard data:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchDashboardData()
  }, [])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }
  
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).format(date)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-yellow-100 text-yellow-800'
      case 'Shipped':
        return 'bg-blue-100 text-blue-800'
      case 'Delivered':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse rounded-lg bg-white p-6 shadow">
              <div className="h-8 w-24 rounded bg-gray-200"></div>
              <div className="mt-2 h-10 w-32 rounded bg-gray-200"></div>
              <div className="mt-4 h-4 w-full rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {/* Total Orders */}
          <div className="rounded-lg bg-white p-6 shadow transition-transform hover:scale-105">
            <div className="flex items-center">
              <div className="rounded-full bg-primary-100 p-3">
                <ShoppingBagIcon className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Orders</p>
                <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stats.totalOrdersChange > 0 ? (
                <ArrowUpIcon className="h-4 w-4 text-success-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-error-500" />
              )}
              <span className={`ml-1 text-sm font-medium ${
                stats.totalOrdersChange > 0 ? 'text-success-500' : 'text-error-500'
              }`}>
                {Math.abs(stats.totalOrdersChange)}% from last month
              </span>
            </div>
          </div>
          
          {/* Pending Orders */}
          <div className="rounded-lg bg-white p-6 shadow transition-transform hover:scale-105">
            <div className="flex items-center">
              <div className="rounded-full bg-yellow-100 p-3">
                <ShoppingBagIcon className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Pending Orders</p>
                <h3 className="text-2xl font-bold">{stats.pendingOrders}</h3>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stats.pendingOrdersChange < 0 ? (
                <ArrowDownIcon className="h-4 w-4 text-success-500" />
              ) : (
                <ArrowUpIcon className="h-4 w-4 text-error-500" />
              )}
              <span className={`ml-1 text-sm font-medium ${
                stats.pendingOrdersChange < 0 ? 'text-success-500' : 'text-error-500'
              }`}>
                {Math.abs(stats.pendingOrdersChange)}% from last month
              </span>
            </div>
          </div>
          
          {/* Total Revenue */}
          <div className="rounded-lg bg-white p-6 shadow transition-transform hover:scale-105">
            <div className="flex items-center">
              <div className="rounded-full bg-success-100 p-3">
                <CurrencyDollarIcon className="h-6 w-6 text-success-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total Revenue</p>
                <h3 className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</h3>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stats.totalRevenueChange > 0 ? (
                <ArrowUpIcon className="h-4 w-4 text-success-500" />
              ) : (
                <ArrowDownIcon className="h-4 w-4 text-error-500" />
              )}
              <span className={`ml-1 text-sm font-medium ${
                stats.totalRevenueChange > 0 ? 'text-success-500' : 'text-error-500'
              }`}>
                {Math.abs(stats.totalRevenueChange)}% from last month
              </span>
            </div>
          </div>
          
          {/* Active Riders */}
          <div className="rounded-lg bg-white p-6 shadow transition-transform hover:scale-105">
            <div className="flex items-center">
              <div className="rounded-full bg-secondary-100 p-3">
                <TruckIcon className="h-6 w-6 text-secondary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Active Riders</p>
                <h3 className="text-2xl font-bold">{stats.activeRiders}</h3>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stats.activeRidersChange > 0 ? (
                <ArrowUpIcon className="h-4 w-4 text-success-500" />
              ) : stats.activeRidersChange < 0 ? (
                <ArrowDownIcon className="h-4 w-4 text-error-500" />
              ) : (
                <span className="h-4 w-4"></span>
              )}
              <span className={`ml-1 text-sm font-medium ${
                stats.activeRidersChange > 0 ? 'text-success-500' : 
                stats.activeRidersChange < 0 ? 'text-error-500' : 'text-gray-500'
              }`}>
                {stats.activeRidersChange === 0 
                  ? 'No change from last month' 
                  : `${Math.abs(stats.activeRidersChange)}% from last month`}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Recent Orders */}
      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm font-medium text-primary-600 hover:text-primary-700">
            View all orders
          </Link>
        </div>
        
        <div className="overflow-hidden rounded-lg bg-white shadow">
          {loading ? (
            <div className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-8 w-full rounded bg-gray-200"></div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="grid grid-cols-5 gap-4">
                    <div className="h-6 rounded bg-gray-200"></div>
                    <div className="h-6 rounded bg-gray-200"></div>
                    <div className="h-6 rounded bg-gray-200"></div>
                    <div className="h-6 rounded bg-gray-200"></div>
                    <div className="h-6 rounded bg-gray-200"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Order ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Total
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Items
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-primary-600">
                        <Link to={`/admin/orders/${order.id}`}>
                          {order.id}
                        </Link>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        {order.customer}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {formatDate(order.date)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                        {formatCurrency(order.total)}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                        {order.items}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm">
                        <Link 
                          to={`/admin/orders/${order.id}`}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage