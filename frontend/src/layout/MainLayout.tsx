import {
    Home,
    LogOut,
    MapPin,
    Package,
    User,
    Users,
    Wallet
} from 'lucide-react';
import React, { ReactNode, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

interface MainLayoutProps {
  children?: ReactNode;
}

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const [userRole] = useState<'customer' | 'employee' | 'admin'>('employee'); // Changed to 'employee' to display Payments

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard', roles: ['customer', 'employee', 'admin'] },
    { path: '/courier', icon: Package, label: 'Couriers', roles: ['customer', 'employee', 'admin'] },
    { path: '/customers', icon: Users, label: 'Customers', roles: ['employee', 'admin'] },
    { path: '/Payments', icon: Wallet, label: 'Payments', roles: ['employee', 'admin'], className: 'text-red-500' },
    { path: '/track', icon: MapPin, label: 'Track Package', roles: ['customer'] },
    { path: '/Profile', icon: User, label: 'Profile', roles: ['customer', 'employee', 'admin'] },
    { path: '/logout', icon: LogOut, label: 'Logout', roles: ['customer', 'employee', 'admin'], className: 'text-red-500', onClick: () => console.log('Logging out...') },
  ];

  const managementItems = [
    { path: '/branches', label: 'Branches', roles: ['admin'] },
    { path: '/employees', label: 'Employees', roles: ['admin'] },
    { path: '/delivery-agents', label: 'Delivery Agents', roles: ['admin'] },
  ];

  return (
    <div className={`${isCollapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-white shadow-lg h-screen`}>
      <div className="p-4 flex justify-between items-center border-b">
        {!isCollapsed && <h2 className="text-xl font-bold text-blue-600">TrackXpress</h2>}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 rounded-full hover:bg-gray-100">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      <nav className="mt-4">
        {navItems
          .filter(item => item.roles.includes(userRole))
          .map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={item.onClick}
              className={`flex items-center p-4 text-gray-700 hover:bg-gray-100 ${item.className || ''} ${isCollapsed ? 'justify-center' : 'justify-start'} ${location.pathname === item.path ? 'bg-blue-50 text-blue-600' : ''} ${isCollapsed && 'w-12'}`}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </Link>
          ))}
        {userRole === 'admin' && !isCollapsed && (
          <div className="mt-4">
            <div className="px-4 py-2 text-gray-600 font-medium">Management</div>
            {managementItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center p-4 pl-10 text-gray-700 hover:bg-gray-100 ${location.pathname === item.path ? 'bg-blue-50 text-blue-600' : ''}`}
              >
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden ml-20"> {/* Adjusted ml-20 for sidebar width */}
        {/* Top Navigation */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              {location.pathname === '/' ? 'Dashboard' : 
               location.pathname.split('/').filter(Boolean).map(path => 
                 path.charAt(0).toUpperCase() + path.slice(1)
               ).join(' / ')}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="flex items-center gap-2">
                  <span className="hidden md:inline-block font-medium text-gray-700">John Doe</span>
                  <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    JD
                  </div>
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100">
          {children || <Outlet />}
        </main>

        {/* Footer */}
        <footer className="bg-white p-4 border-t border-gray-200">
          <div className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} TrackXpress. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;