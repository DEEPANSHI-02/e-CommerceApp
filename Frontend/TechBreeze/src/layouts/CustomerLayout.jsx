import { Outlet } from 'react-router-dom'
import Navbar from '../components/customer/Navbar'
import Footer from '../components/customer/Footer'

const CustomerLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default CustomerLayout