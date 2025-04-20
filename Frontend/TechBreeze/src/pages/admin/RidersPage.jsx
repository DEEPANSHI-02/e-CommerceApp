import { useState, useEffect } from 'react'
import { userApi } from '../../services/api'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

const RidersPage = () => {
  const [riders, setRiders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    const fetchRiders = async () => {
      try {
        // Normally, we'd call an API like this:
        // const { data } = await userApi.getRiders()
        
        // For demo purposes, using mock data
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const mockRiders = [
          {
            id: 'RID1',
            name: 'James Wilson',
            email: 'james@example.com',
            phone: '555-1234',
            activeOrders: 2,
            completedOrders: 47,
            rating: 4.8,
            status: 'active',
            joinDate: '2022-01-15',
            orders: [
              { id: 'ORD1230', status: 'shipped', customerName: 'David Wilson' },
              { id: 'ORD1226', status: 'shipped', customerName: 'Daniel Brown' },
            ],
          },
          {
            id: 'RID2',
            name: 'Alex Rivera',
            email: 'alex@example.com',
            phone: '555-5678',
            activeOrders: 1,
            completedOrders: 32,
            rating: 4.5,
            status: 'active',
            joinDate: '2022-03-20',
            orders: [
              { id: 'ORD1232', status: 'delivered', customerName: 'Michael Chen' },
            ],
          },
          {
            id: 'RID3',
            name: 'Maria Lopez',
            email: 'maria@example.com',
            phone: '555-9012',
            activeOrders: 1,
            completedOrders: 53,
            rating: 4.9,
            status: 'active',
            joinDate: '2021-11-05',
            orders: [
              { id: 'ORD1225', status: 'delivered', customerName: 'Jessica Martinez' },
            ],
          },
          {
            id: 'RID4',
            name: 'Jason Chen',
            email: 'jason@example.com',
            phone: '555-3456',
            activeOrders: 0,
            completedOrders: 28,
            rating: 4.6,
            status: 'inactive',
            joinDate: '2022-05-12',
            orders: [],
          },
        ]
        
        setRiders(mockRiders)
      } catch (err) {
        console.error('Failed to fetch riders:', err)
        setError('Failed to load riders. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchRiders()
  }, [])

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value)
  }

  // Filter riders
  const filteredRiders = riders.filter(rider => {
    // Status filter
    if (statusFilter !== 'all' && rider.status !== statusFilter) {
      return false
    }
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        rider.name.toLowerCase().includes(searchLower) ||
        rider.email.toLowerCase().includes(searchLower) ||
        rider.phone.includes(searchTerm)
      )
    }
    
    return true
  })

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(date)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <h1 className="text-2xl font-bold">Riders</h1>
        
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search riders..."
              className="input w-full pl-10 md:w-64"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="input"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="space-y-6">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="animate-pulse rounded-lg bg-white p-6 shadow">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="space-y-2">
                  <div className="h-4 w-24 rounded bg-gray-200"></div>
                  <div className="h-3 w-32 rounded bg-gray-200"></div>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-3 w-full rounded bg-gray-200"></div>
                <div className="h-3 w-full rounded bg-gray-200"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="rounded-lg bg-red-50 p-6 text-center">
          <h2 className="mb-4 text-xl font-bold text-red-700">Error</h2>
          <p className="text-red-700">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            Refresh Page
          </button>
        </div>
      ) : filteredRiders.length === 0 ? (
        <div className="rounded-lg bg-white p-6 text-center shadow">
          <h2 className="mb-4 text-xl font-medium text-gray-700">No riders found</h2>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredRiders.map((rider) => (
            <div key={rider.id} className="overflow-hidden rounded-lg bg-white shadow transition-transform hover:shadow-md">
              <div className="p-6">
                <div className="flex flex-col items-start justify-between space-y-4 md:flex-row md:space-y-0">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-100 text-xl font-bold uppercase text-primary-600">
                      {rider.name.charAt(0)}
                    </div>
                    <div>
                      <h2 className="text-lg font-bold">{rider.name}</h2>
                      <p className="text-sm text-gray-500">{rider.email} · {rider.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">Rating</p>
                      <div className="flex items-center">
                        <span className="text-lg font-bold">{rider.rating}</span>
                        <svg className="ml-1 h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">Completed</p>
                      <p className="text-lg font-bold">{rider.completedOrders}</p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-500">Active</p>
                      <p className="text-lg font-bold">{rider.activeOrders}</p>
                    </div>
                    
                    <div>
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(rider.status)}`}>
                        {rider.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Current Orders</h3>
                    <p className="text-xs text-gray-500">Joined {formatDate(rider.joinDate)}</p>
                  </div>
                  
                  {rider.orders.length === 0 ? (
                    <p className="mt-2 text-sm text-gray-500">No active orders</p>
                  ) : (
                    <div className="mt-2 overflow-hidden rounded-md border border-gray-200">
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
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                          {rider.orders.map((order) => (
                            <tr key={order.id}>
                              <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-primary-600">
                                {order.id}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                                {order.customerName}
                              </td>
                              <td className="whitespace-nowrap px-6 py-4 text-sm">
                                <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                  order.status === 'shipped' 
                                    ? 'bg-blue-100 text-blue-800' 
                                    : 'bg-green-100 text-green-800'
                                }`}>
                                  {order.status === 'shipped' ? 'Shipping' : 'Delivered'}
                                </span>
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
          ))}
        </div>
      )}
    </div>
  )
}

export default RidersPage