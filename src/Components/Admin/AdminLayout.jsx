import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LayoutDashboard, PlusCircle, LogOut, Package } from 'lucide-react';

const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white shadow-sm z-20 px-4 py-3 flex justify-between items-center">
        <h2 className="text-xl font-bold text-blue-600">Admin Panel</h2>
        <button onClick={toggleMobileMenu} className="p-2 text-gray-600">
          {isMobileMenuOpen ? <Package size={24} /> : <div className="space-y-1.5"><span className="block w-6 h-0.5 bg-gray-600"></span><span className="block w-6 h-0.5 bg-gray-600"></span><span className="block w-6 h-0.5 bg-gray-600"></span></div>}
        </button>
      </div>

      {/* Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 md:hidden" onClick={closeMobileMenu}></div>
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 w-64 bg-white shadow-md flex flex-col z-40 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 pt-16 md:pt-0`}>
        <div className="p-6 border-b hidden md:block">
          <h2 className="text-2xl font-bold text-blue-600">Admin Panel</h2>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link
            to="/admin/dashboard"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          >
            <LayoutDashboard size={20} />
            Dashboard
          </Link>
          <Link
            to="/admin/add-product"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          >
            <PlusCircle size={20} />
            Add Product
          </Link>
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors"
          >
            <Package size={20} />
            View Store
          </Link>
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto pt-16 md:pt-0 w-full">
        <div className="p-4 md:p-8">
            <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
