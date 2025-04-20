import { useAuth } from '../../hooks/useAuth'

const Header = () => {
  const { user } = useAuth()
  
  return (
    <header className="bg-white p-4 shadow">
      <div className="container mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-lg font-bold text-primary-600">CoolBreeze Rider</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-100 text-sm font-medium uppercase text-primary-700">
            {user?.name?.charAt(0) || 'R'}
          </div>
          <span className="text-sm font-medium">{user?.name || 'Rider'}</span>
        </div>
      </div>
    </header>
  )
}

export default Header