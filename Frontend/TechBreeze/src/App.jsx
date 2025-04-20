import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'

// Layouts
import CustomerLayout from './layouts/CustomerLayout'
import AdminLayout from './layouts/AdminLayout'
import RiderLayout from './layouts/RiderLayout'

// Customer Pages
import HomePage from './pages/customer/HomePage'
import ProductsPage from './pages/customer/ProductsPage'
import ProductDetailPage from './pages/customer/ProductDetailPage'
import CartPage from './pages/customer/CartPage'
import CheckoutPage from './pages/customer/CheckoutPage'
import OrderConfirmationPage from './pages/customer/OrderConfirmationPage'

// Admin Pages
import AdminDashboard from './pages/admin/DashboardPage'
import AdminOrdersPage from './pages/admin/OrdersPage'
import AdminRidersPage from './pages/admin/RidersPage'

// Rider Pages
import RiderDashboard from './pages/rider/DashboardPage'
import RiderOrdersPage from './pages/rider/OrdersPage'

// Auth Pages
import LoginPage from './pages/auth/LoginPage'

function App() {
  const { user, loading } = useAuth()
  
  // Wait for auth to initialize
  if (loading) {
    return <div className="flex h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
    </div>
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginPage />} />

      {/* Customer Routes */}
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<ProductsPage />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={
          user ? <CheckoutPage /> : <Navigate to="/login" replace />
        } />
        <Route path="order-confirmation/:id" element={
          user ? <OrderConfirmationPage /> : <Navigate to="/login" replace />
        } />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={
        user && user.role === 'admin' ? <AdminLayout /> : <Navigate to="/login" replace />
      }>
        <Route index element={<AdminDashboard />} />
        <Route path="orders" element={<AdminOrdersPage />} />
        <Route path="riders" element={<AdminRidersPage />} />
      </Route>

      {/* Rider Routes */}
      <Route path="/rider" element={
        user && user.role === 'rider' ? <RiderLayout /> : <Navigate to="/login" replace />
      }>
        <Route index element={<RiderDashboard />} />
        <Route path="orders" element={<RiderOrdersPage />} />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App