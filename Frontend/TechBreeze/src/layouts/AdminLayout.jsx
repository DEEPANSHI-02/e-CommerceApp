import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/admin/Sidebar'
import AdminHeader from '../components/admin/Header'

const AdminLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout