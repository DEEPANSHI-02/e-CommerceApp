import { Outlet } from 'react-router-dom'
import RiderHeader from '../components/rider/Header'
import RiderNavbar from '../components/rider/Navbar'

const RiderLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <RiderHeader />
      <main className="flex-grow px-4 py-6">
        <Outlet />
      </main>
      <RiderNavbar />
    </div>
  )
}

export default RiderLayout