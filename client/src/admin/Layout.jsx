import { useState } from 'react';
import { Link, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogoutIcon, LayoutIcon, UserIcon, ImageIcon, BellIcon, MenuIcon, CloseIcon, PhoneIcon, StarIcon, EditIcon, PlusIcon } from '../components/Icons';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: <LayoutIcon /> },
  { to: '/admin/leads', label: 'Leads', icon: <PhoneIcon className="w-5 h-5" /> },
  { to: '/admin/messages', label: 'Messages', icon: <BellIcon /> },
  { to: '/admin/gallery', label: 'Gallery', icon: <ImageIcon /> },
  { to: '/admin/testimonials', label: 'Testimonials', icon: <StarIcon className="w-5 h-5" /> },
  { to: '/admin/blog', label: 'Blog', icon: <EditIcon className="w-5 h-5" /> },
  { to: '/admin/team', label: 'Team', icon: <UserIcon /> },
  { to: '/admin/services', label: 'Services', icon: <PlusIcon /> },
  { to: '/admin/settings', label: 'Settings', icon: <EditIcon className="w-5 h-5" /> },
];

export default function AdminLayout({ children }) {
  const { admin, logout, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (loading) return <div className="min-h-screen hero-gradient flex items-center justify-center"><div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin" /></div>;
  if (!admin) return <Navigate to="/admin/login" />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full z-30 bg-navy-900 transition-transform duration-300 w-64 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-crimson-600 rounded-lg flex items-center justify-center font-black text-white text-sm">DS</div>
            <div>
              <div className="text-white font-black text-sm">DEBT SERVICE</div>
              <div className="text-gray-500 text-xs">Admin Panel</div>
            </div>
          </div>
        </div>
        <nav className="p-3 space-y-0.5 flex-1 overflow-y-auto">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                location.pathname === item.to
                  ? 'bg-crimson-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {item.icon}{item.label}
            </Link>
          ))}
        </nav>
        <div className="p-3 border-t border-white/10">
          <a href="/" target="_blank" className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-white text-sm rounded-lg hover:bg-white/10 transition-colors mb-1">
            <LayoutIcon />View Website
          </a>
          <button onClick={logout} className="flex items-center gap-3 px-3 py-2 text-gray-400 hover:text-crimson-400 text-sm rounded-lg hover:bg-white/10 transition-colors w-full">
            <LogoutIcon />Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-gray-200 h-14 flex items-center px-4 gap-4 sticky top-0 z-10">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden text-gray-600">
            <MenuIcon />
          </button>
          <div className="text-sm font-semibold text-navy-900 capitalize">
            {location.pathname.split('/').filter(Boolean).slice(-1)[0]?.replace('-', ' ') || 'Dashboard'}
          </div>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-gray-500 hidden sm:block">Admin: {admin.username}</span>
            <div className="w-8 h-8 bg-navy-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
              {admin.username?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
