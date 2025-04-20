import { NavLink } from 'react-router-dom'
import { 
  HomeIcon, 
  ClipboardDocumentListIcon, 
  UserIcon 
} from '@heroicons/react/24/outline'
import { useAuth } from '../../hooks/useAuth'

const Navbar = () => {
  const { logout } = useAuth()
  
  return (
    <nav className="fixed bottom-0 left-0 z-10 w-full border-t border-gray-200 bg-white shadow-lg">
      <div className="container mx-auto flex items-center justify-around">
        <NavLink
          to="/rider"
          className={({ isActive }) =>
            `flex flex-col items-center px-4 py-2 text-xs font-medium ${
              isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'
            }`
          }
          end
        >
          <HomeIcon className="mb-1 h-6 w-6" />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/rider/orders"
          className={({ isActive }) =>
            `flex flex-col items-center px-4 py-2 text-xs font-medium ${
              isActive ? 'text-primary-600' : 'text-gray-500 hover:text-gray-900'
            }`
          }
        >
          <ClipboardDocumentListIcon className="mb-1 h-6 w-6" />
          <span>Orders</span>
        </NavLink>
        <button
          onClick={() => {
            if (confirm('Are you sure you want to log out?')) {
              logout()
            }
          }}
          className="flex flex-col items-center px-4 py-2 text-xs font-medium text-gray-500 hover:text-gray-900"
        >
          <UserIcon className="mb-1 h-6 w-6" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar