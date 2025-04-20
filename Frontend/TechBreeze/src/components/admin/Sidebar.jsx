import { NavLink } from 'react-router-dom'
import { 
  HomeIcon, 
  ShoppingBagIcon, 
  TruckIcon, 
  UserGroupIcon,
  ArrowLeftOnRectangleIcon 
} from '@heroicons/react/24/outline'
import { useAuth } from '../../hooks/useAuth'

const Sidebar = () => {
  const { logout } = useAuth()

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: HomeIcon },
    { name: 'Orders', path: '/admin/orders', icon: ShoppingBagIcon },
    { name: 'Riders', path: '/admin/riders', icon: TruckIcon },
    { name: 'Customers', path: '/admin/customers', icon: UserGroupIcon },
  ]

  return (
    <div className="hidden w-64 flex-shrink-0 bg-gray-800 md:block">
      <div className="flex h-16 items-center justify-center border-b border-gray-700">
        <h1 className="text-xl font-bold text-white">CoolBreeze Admin</h1>
      </div>
      <nav className="mt-5 flex flex-col px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `mb-1 flex items-center rounded-md px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`
            }
            end={item.path === '/admin'}
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="mt-auto px-2 pb-5">
        <NavLink
          to="/"
          className="mb-2 flex items-center rounded-md px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <HomeIcon className="mr-3 h-5 w-5" />
          Visit Store
        </NavLink>
        <button
          onClick={logout}
          className="flex w-full items-center rounded-md px-4 py-3 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <ArrowLeftOnRectangleIcon className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Sidebar