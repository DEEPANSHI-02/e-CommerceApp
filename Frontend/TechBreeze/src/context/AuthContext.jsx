import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authApi } from '../services/api'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('token')
    if (token) {
      fetchUser()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async () => {
    try {
      const { data } = await authApi.getProfile()
      setUser(data)
    } catch (err) {
      console.error('Failed to fetch user profile:', err)
      localStorage.removeItem('token')
      setError('Session expired. Please login again.')
    } finally {
      setLoading(false)
    }
  }

  const login = async (token) => {
    setLoading(true)
    try {
      const { data } = await authApi.login(token)
      localStorage.setItem('token', data.token)
      setUser(data.user)
      
      // Redirect based on user role
      if (data.user.role === 'admin') {
        navigate('/admin')
      } else if (data.user.role === 'rider') {
        navigate('/rider')
      } else {
        navigate('/')
      }
    } catch (err) {
      console.error('Login failed:', err)
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    await authApi.logout()
    setUser(null)
    navigate('/login')
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}