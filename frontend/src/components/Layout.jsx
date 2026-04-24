import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Package, Bell, Map, Calendar, Truck, BarChart2, Search } from 'lucide-react';

const Layout = () => {
  const navLinks = [
    { to: '/', label: 'Dashboard', icon: Package },
    { to: '/book', label: 'Book Cargo', icon: Calendar },
    { to: '/bookings', label: 'Bookings', icon: Search },
    { to: '/fleet', label: 'Fleet', icon: Truck },
    { to: '/analytics', label: 'Analytics', icon: BarChart2 },
    { to: '/tracking', label: 'Tracking', icon: Map },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="bg-white border-b border-pageBorder px-6 py-3 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 rounded bg-darkGreen items-center justify-center">
            <Package className="text-lightGreen w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight text-darkGreen">
            Cargo<span className="text-lightGreen">Flow</span>
          </span>
        </div>

        <div className="flex gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-colors ${
                    isActive 
                      ? 'bg-[#e4f5ee] text-darkGreen font-medium' 
                      : 'text-textSecondary hover:bg-gray-50'
                  }`
                }
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </NavLink>
            );
          })}
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-textSecondary hover:bg-gray-50 rounded-full transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full border border-white"></span>
          </button>
          <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm cursor-pointer">
            AD
          </div>
        </div>
      </nav>
      
      <main className="p-6 max-w-7xl mx-auto animate-in fade-in duration-300">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
