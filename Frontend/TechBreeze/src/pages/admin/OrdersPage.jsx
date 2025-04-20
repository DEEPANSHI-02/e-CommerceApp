import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { orderApi, userApi } from '../../services/api'
import { 
  ChevronDownIcon, 
  ChevronUpIcon, 
  ArrowPathIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

const OrdersPage = () => {
  const [orders, setOrders] = useState([])
  const [riders, setRiders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Filtering and sorting
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortField, setSortField] = useState('date')
  const [sortDirection, setSortDirection] = useState('desc')
  
  // For assigning riders
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showAssignModal, setShowAssignModal] = useState(false)
  const [selectedRider, setSelectedRider] = useState('')
  const [assignLoading, setAssignLoading] = useState(false)
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage] = useState(10)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch orders and riders in parallel
        const fetchOrders = async () => {
          // Normally, we'd call an API like this:
          // const { data } = await orderApi.getAll()
          
          // For demo purposes, using mock data
          await new Promise(resolve => setTimeout(resolve, 1000))
          
          return [
            {
              id: 'ORD1234',
              customer: { name: 'John Doe', email: 'john@example.com' },
              date: '2023-05-10T14:23:54Z',
              total: 579.98,
              status: 'shipped',
              items: 2,
              rider: null,
            },
            {
              id: 'ORD1233',
              customer: { name: 'Sarah Johnson', email: 'sarah@example.com' },
              date: '2023-05-10T09:45:12Z',
              total: 129.99,
              status: 'paid',
              items: 1,
              rider: null,
            },
            {
              id: 'ORD1232',
              customer: { name: 'Michael Chen', email: 'michael@example.com' },
              date: '2023-05-09T16:32:08Z',
              total: 849.97,
              status: 'delivered',
              items: 3,
              rider: { id: 'RID2', name: 'Alex Rivera' },
            },
            {
              id: 'ORD1231',
              customer: { name: 'Emily Rodriguez', email: 'emily@example.com' },
              date: '2023-05-09T11:18:36Z',
              total: 229.98,
              status: 'paid',
              items: 2,
              rider: null,
            },
            {
              id: 'ORD1230',
              customer: { name: 'David Wilson', email: 'david@example.com' },
              date: '2023-05-08T15:52:19Z',
              total: 499.99,
              status: 'shipped',
              items: 1,
              rider: { id: 'RID1', name: 'James Wilson' },
            },
            {
              id: 'ORD1229',
              customer: { name: 'Jennifer Thompson', email: 'jennifer@example.com' },
              date: '2023-05-08T10:27:43Z',
              total: 89.99,
              status: 'cancelled',
              items: 1,
              rider: null,
            },
            {
              id: 'ORD1228',
              customer: { name: 'Robert Garcia', email: 'robert@example.com' },
              date: '2023-05-07T16:45:21Z',
              total: 399.97,
              status: 'delivered',
              items: 2,
              rider: { id: 'RID3', name: 'Maria Lopez' },
            },
            {
              id: 'ORD1227',
              customer: { name: 'Michelle Lee', email: 'michelle@example.com' },
              date: '2023-05-07T11:12:38Z',
              total: 259.99,
              status: 'paid',
              items: 1,
              rider: null,
            },
            {
              id: 'ORD1226',
              customer: { name: 'Daniel Brown', email: 'daniel@example.com' },
              date: '2023-05-06T15:39:02Z',
              total: 729.98,
              status: 'shipped',
              items: 3,
              rider: { id: 'RID1', name: 'James Wilson' },
            },
            {
              id: 'ORD1225',
              customer: { name: 'Jessica Martinez', email: 'jessica@example.com' },
              date: '2023-05-06T09:56:19Z',
              total: 179.99,
              status: 'delivered',
              items: 1,
              rider: { id: 'RID3', name: 'Maria Lopez' },
            },
            {
              id: 'ORD1224',
              customer: { name: 'Christopher Taylor', email: 'chris@example.com' },
              date: '2023-05-05T14:08:45Z',
              total: 349.98,
              status: 'paid',
              items: 2,
              rider: null,
            },
            {
              id: 'ORD1223',
              customer: { name: 'Amanda White', email: 'amanda@example.com' },
              date: '2023-05-05T10:22:31Z',
              total: 599.99,
              status: 'delivered',
              items: 1,
              rider: { id: 'RID2', name: 'Alex Rivera' },
            },
          ]
        }
        
        const fetchRiders = async () => {
          // Normally, we'd call an API like this:
          // const { data } = await userApi.getRiders()
          
          // For demo purposes, using mock data
          await new Promise(resolve => setTimeout(resolve, 800))
          
          return [
            {
              id: 'RID1',
              name: 'James Wilson',
              email: 'james@example.com',
              phone: '555-1234',
              activeOrders: 2,
              status: 'active',
            },
            {
              id: 'RID2',
              name: 'Alex Rivera',
              email: 'alex@example.com',
              phone: '555-5678',
              activeOrders: 1,
              status: 'active',
            },
            {
              id: 'RID3',
              name: 'Maria Lopez',
              email: 'maria@example.com',
              phone: '555-9012',
              activeOrders: 1,
              status: 'active',
            },
            {
              id: 'RID4',
              name: 'Jason Chen',
              email: 'jason@example.com',
              phone: '555-3456',
              activeOrders: 0,
              status: 'active',
            },
          ]
        }
        
        const [ordersData, ridersData] = await Promise.all([
          fetchOrders(),
          fetchRiders(),
        ])
        
        setOrders(ordersData)
        setRiders(ridersData)
      } catch (err) {
        console.error('Failed to fetch data:', err)
        setError('Failed to load orders. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1) // Reset to first page on search
  }

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value)
    setCurrentPage(1) // Reset to first page on filter change
  }

  const openAssignModal = (order) => {
    setSelectedOrder(order)
    setSelectedRider('')
    setShowAssignModal(true)
  }

  const closeAssignModal = () => {
    setShowAssignModal(false)
    setSelectedOrder(null)
    setSelectedRider('')
  }

  const handleAssignRider = async () => {
    if (!selectedRider || !selectedOrder) {
      return
    }
    
    setAssignLoading(true)
    
    try {
      // Normally, we'd call an API like this:
      // await orderApi.assignRider(selectedOrder.id, selectedRider)
      
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Update the order in our local state
      const selectedRiderObj = riders.find(r => r.id === selectedRider)
      
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === selectedOrder.id
            ? { ...order, status: 'shipped', rider: { id: selectedRider, name: selectedRiderObj.name } }
            : order
        )
      )
      
      closeAssignModal()
    } catch (err) {
      console.error('Failed to assign rider:', err)
      alert('Failed to assign rider. Please try again.')
    } finally {
      setAssignLoading(false)
    }
  }

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // Normally, we'd call an API like this:
      // await orderApi.updateStatus(orderId, newStatus)
      
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Update the order in our local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      )
    } catch (err) {
      console.error('Failed to update order status:', err)
      alert('Failed to update order status. Please try again.')
    }
  }

  // Filter and sort orders
  const filteredOrders = orders.filter(order => {
    // Status filter
    if (statusFilter !== 'all' && order.status !== statusFilter) {
      return false
    }
    
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase()
      return (
        order.id.toLowerCase().includes(searchLower) ||
        order.customer.name.toLowerCase().includes(searchLower) ||
        order.customer.email.toLowerCase().includes(searchLower)
      )
    }
    
    return true
  }).sort((a, b) => {
    // Sort based on selected field and direction
    switch (sortField) {
      case 'date':
        return sortDirection === 'asc'
          ? new Date(a.date) - new Date(b.date)
          : new Date(b.date) - new Date(a.date)
      case 'total':
        return sortDirection === 'asc'
          ? a.total - b.total
          : b.total - a.total
      case 'customer':
        return sortDirection === 'asc'
          ? a.customer.name.localeCompare(b.customer.name)
          : b.customer.name.localeCompare(a.customer.name)
      default:
        return 0
    }
  })

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

  const paginate = (pageNumber) => setCurrentPage(pageNumber)

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
      case 'paid':
        return 'bg-yellow-100 text-yellow-800'
      case 'shipped':
        return 'bg-blue-100 text-blue-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatStatus = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div>
      <div className="mb-6 flex flex-col justify-between space-y-4 md:flex-row md:items-center md:space-y-0">
        <h1 className="text-2xl font-bold">Orders</h1>
        
        <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="search"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search orders..."
              className="input w-full pl-10 md:w-64"
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="input"
          >
            <option value="all">All Statuses</option>
            <option value="paid">Paid</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>
      
      {loading ? (
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-full rounded bg-gray-200"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-4">
                {[...Array(6)].map((_, j) => (
                  <div key={j} className="h-6 rounded bg-gray-200"></div>
                ))}
              </div>
            ))}
          </div>
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
      ) : (
        <>
          <div className="overflow-hidden rounded-lg bg-white shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      <button 
                        onClick={() => handleSort('date')}
                        className="flex items-center"
                      >
                        Date/Time
                        {sortField === 'date' && (
                          sortDirection === 'asc' ? 
                            <ChevronUpIcon className="ml-1 h-4 w-4" /> :
                            <ChevronDownIcon className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Order ID
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      <button 
                        onClick={() => handleSort('customer')}
                        className="flex items-center"
                      >
                        Customer
                        {sortField === 'customer' && (
                          sortDirection === 'asc' ? 
                            <ChevronUpIcon className="ml-1 h-4 w-4" /> :
                            <ChevronDownIcon className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      <button 
                        onClick={() => handleSort('total')}
                        className="flex items-center"
                      >
                        Total
                        {sortField === 'total' && (
                          sortDirection === 'asc' ? 
                            <ChevronUpIcon className="ml-1 h-4 w-4" /> :
                            <ChevronDownIcon className="ml-1 h-4 w-4" />
                        )}
                      </button>
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Status
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Rider
                    </th>
                    <th 
                      scope="col" 
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {currentOrders.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="px-6 py-4 text-center text-sm text-gray-500">
                        No orders found
                      </td>
                    </tr>
                  ) : (
                    currentOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {formatDate(order.date)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-primary-600">
                          <Link to={`/admin/orders/${order.id}`}>
                            {order.id}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                          <div>{order.customer.name}</div>
                          <div className="text-gray-500">{order.customer.email}</div>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                          {formatCurrency(order.total)}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <span className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}>
                            {formatStatus(order.status)}
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                          {order.rider ? order.rider.name : '-'}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-sm">
                          <div className="flex space-x-2">
                            <Link
                              to={`/admin/orders/${order.id}`}
                              className="text-primary-600 hover:text-primary-900"
                            >
                              View
                            </Link>
                            
                            {order.status === 'paid' && (
                              <button
                                onClick={() => openAssignModal(order)}
                                className="text-secondary-600 hover:text-secondary-900"
                              >
                                Assign Rider
                              </button>
                            )}
                            
                            {order.status === 'shipped' && (
                              <button
                                onClick={() => updateOrderStatus(order.id, 'delivered')}
                                className="text-success-600 hover:text-success-900"
                              >
                                Mark Delivered
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="border-t border-gray-200 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Showing <span className="font-medium">{indexOfFirstOrder + 1}</span> to{' '}
                    <span className="font-medium">
                      {Math.min(indexOfLastOrder, filteredOrders.length)}
                    </span>{' '}
                    of <span className="font-medium">{filteredOrders.length}</span> orders
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => paginate(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className={`rounded-md px-3 py-1 text-sm ${
                        currentPage === 1
                          ? 'cursor-not-allowed text-gray-400'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Previous
                    </button>
                    {[...Array(totalPages).keys()].map(page => (
                      <button
                        key={page}
                        onClick={() => paginate(page + 1)}
                        className={`rounded-md px-3 py-1 text-sm ${
                          currentPage === page + 1
                            ? 'bg-primary-100 text-primary-700'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {page + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className={`rounded-md px-3 py-1 text-sm ${
                        currentPage === totalPages
                          ? 'cursor-not-allowed text-gray-400'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Assign Rider Modal */}
          {showAssignModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
              <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
                <h2 className="mb-4 text-xl font-bold">Assign Rider to Order</h2>
                <p className="mb-4">
                  Assign a rider to order <span className="font-medium">{selectedOrder.id}</span>
                </p>
                
                <div className="mb-4">
                  <label htmlFor="rider" className="mb-1 block text-sm font-medium text-gray-700">
                    Select Rider
                  </label>
                  <select
                    id="rider"
                    value={selectedRider}
                    onChange={(e) => setSelectedRider(e.target.value)}
                    className="input w-full"
                    required
                  >
                    <option value="">-- Select a rider --</option>
                    {riders.map((rider) => (
                      <option key={rider.id} value={rider.id}>
                        {rider.name} ({rider.activeOrders} active orders)
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={closeAssignModal}
                    className="btn-outline px-4 py-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAssignRider}
                    disabled={!selectedRider || assignLoading}
                    className="btn-primary flex items-center px-4 py-2"
                  >
                    {assignLoading ? (
                      <>
                        <ArrowPathIcon className="mr-2 h-4 w-4 animate-spin" />
                        Assigning...
                      </>
                    ) : (
                      'Assign & Ship Order'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default OrdersPage