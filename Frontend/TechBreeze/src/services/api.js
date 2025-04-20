import axios from 'axios'

const API_URL =  'http://localhost:5000/api'

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add a request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Product API
export const productApi = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
  getFeatured: () => api.get('/products/featured'),
}

// Order API
export const orderApi = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  create: (orderData) => api.post('/orders', orderData),
  update: (id, orderData) => api.put(`/orders/${id}`, orderData),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  getByRider: (riderId) => api.get(`/orders/rider/${riderId}`),
  assignRider: (orderId, riderId) => api.post(`/orders/${orderId}/assign`, { riderId }),
}

// Auth API
export const authApi = {
  login: (token) => api.post('/auth/google', { token }),
  getProfile: () => api.get('/auth/profile'),
  logout: () => {
    localStorage.removeItem('token')
    return Promise.resolve()
  }
}

// User API
export const userApi = {
  getRiders: () => api.get('/users/riders'),
}

// Rider API
export const riderApi = {
  getOrders: () => api.get('/rider/orders'),
  updateOrderStatus: (orderId, status) => api.patch(`/rider/orders/${orderId}/status`, { status }),
}

export default api