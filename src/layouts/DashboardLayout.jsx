import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Users,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Factory
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, adminOnly: false },  
  { to: '/po-details', label: 'PO Details', icon: Factory, adminOnly: false },
  { to: '/admin/users', label: 'User Management', icon: Users, adminOnly: true },

];

export default function DashboardLayout() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredNav = navItems.filter(item => !item.adminOnly || isAdmin);

  return (
    <div className="flex h-screen bg-[#071a33] text-white overflow-hidden">
      <aside className={`${collapsed ? 'w-16' : 'w-56'} bg-[#0a1f3d] border-r border-white/10 flex flex-col transition-all duration-300 shrink-0`}>
        <div className="flex items-center justify-between px-3 py-3 border-b border-white/10">
          {!collapsed && <span className="text-xs font-bold uppercase text-white/80 truncate">SWF DHU</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="text-white/50 hover:text-white p-1 rounded transition-colors">
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="flex-1 py-2 space-y-1 px-2">
          {filteredNav.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2 px-2 py-2 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30'
                    : 'text-white/60 hover:bg-white/5 hover:text-white border border-transparent'
                } ${collapsed ? 'justify-center' : ''}`
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-white/10 p-2">
          {!collapsed && (
            <div className="px-2 py-2 mb-2">
              <p className="text-xs font-semibold text-white truncate">{user?.fullName}</p>
              <p className="text-[10px] text-white/40 truncate">{user?.userTypeName}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 w-full px-2 py-2 rounded-md text-xs text-red-400 hover:bg-red-500/10 transition-colors ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
