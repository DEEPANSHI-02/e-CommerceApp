import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const Header = () => {
  const { user, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)

  return (
    <header className="bg-white shadow">
      <div className="flex h-16 items-center justify-between px-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-md p-2 text-gray-500 hover:bg-gray-100 md:hidden"
        >
          {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
        </button>

        <div className="flex items-center md:ml-auto">
          {/* Notifications */}
          <div className="relative ml-3">
            <button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen)
                setIsProfileOpen(false)
              }}
              className="rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <BellIcon className="h-6 w-6" />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">
                3
              </span>
            </button>
            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-900">Notifications</h3>
                  <div className="mt-2 space-y-2">
                    <div className="rounded-md bg-gray-50 p-2 text-sm">
                      <p className="font-medium text-gray-900">New Order #12345</p>
                      <p className="text-gray-500">From John Doe, pending approval</p>
                      <p className="mt-1 text-xs text-gray-400">2 minutes ago</p>
                    </div>
                    <div className="rounded-md bg-gray-50 p-2 text-sm">
                      <p className="font-medium text-gray-900">Order #12344 Shipped</p>
                      <p className="text-gray-500">Rider has picked up the package</p>
                      <p className="mt-1 text-xs text-gray-400">1 hour ago</p>
                    </div>
                    <div className="rounded-md bg-gray-50 p-2 text-sm">
                      <p className="font-medium text-gray-900">Low Stock Alert</p>
                      <p className="text-gray-500">Premium AC model running low</p>
                      <p className="mt-1 text-xs text-gray-400">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative ml-3">
            <button
              onClick={() => {
                setIsProfileOpen(!isProfileOpen)
                setIsNotificationsOpen(false)
              }}
              className="flex items-center rounded-full text-sm text-gray-500 hover:text-gray-900"
            >
              <span className="sr-only">Open user menu</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium uppercase">
                {user?.name?.charAt(0) || 'A'}
              </div>
              <span className="ml-2 hidden md:block">{user?.name || 'Admin'}</span>
            </button>
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="border-b border-gray-100 px-4 py-2">
                  <p className="text-sm font-medium text-gray-900">{user?.name || 'Admin'}</p>
                  <p className="text-xs text-gray-500">{user?.email || 'admin@example.com'}</p>
                </div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Your Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </a>
                <button
                  onClick={logout}
                  className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile sidebar */}
      {isOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <a
              href="/admin"
              className="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
            >
              Dashboard
            </a>
            <a
              href="/admin/orders"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Orders
            </a>
            <a
              href="/admin/riders"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Riders
            </a>
            <a
              href="/admin/customers"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              Customers
            </a>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header