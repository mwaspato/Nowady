import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home, Building2, BedDouble, Calendar, CreditCard, 
  TrendingUp, Users, Settings, Shield, Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Sidebar() {
  const { user } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home, roles: ['admin', 'property_manager', 'front_desk'] },
    { name: 'Properties', href: '/properties', icon: Building2, roles: ['admin', 'property_manager'] },
    { name: 'Rooms', href: '/rooms', icon: BedDouble, roles: ['admin', 'property_manager', 'front_desk'] },
    { name: 'Bookings', href: '/bookings', icon: Calendar, roles: ['admin', 'property_manager', 'front_desk'] },
    { name: 'Payments', href: '/payments', icon: CreditCard, roles: ['admin', 'property_manager', 'front_desk'] },
    { name: 'Commissions', href: '/commissions', icon: TrendingUp, roles: ['admin', 'property_manager'] },
    { name: 'Front Desk', href: '/front-desk', icon: Users, roles: ['property_manager', 'front_desk'] },
    { name: 'Website', href: '/website', icon: Globe, roles: ['property_manager'] },
    { name: 'Chalet Site', href: '/chalet', icon: Globe, roles: ['property_manager', 'admin'] },
    { name: 'Admin Panel', href: '/admin', icon: Shield, roles: ['admin'] },
  ];

  const filteredNavigation = navigation.filter(item => 
    item.roles.includes(user?.role || '')
  );

  return (
    <div className="flex flex-col w-64 bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 px-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">N</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Nomady</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-2">
        {filteredNavigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="text-xs text-gray-500 text-center">
          © 2025 Nomady Platform
        </div>
      </div>
    </div>
  );
}

export default Sidebar;