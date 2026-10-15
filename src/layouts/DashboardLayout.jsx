import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../theme/ThemeContext';
import {
  LayoutDashboard,
  Users,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Factory,
  PackageCheck,
  Palette
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, adminOnly: false },
  { to: '/po-details', label: 'PO Details', icon: Factory, adminOnly: false },
  // { to: '/finishing', label: 'Finishing Dashboard', icon: PackageCheck, adminOnly: false },
  { to: '/admin/users', label: 'User Management', icon: Users, adminOnly: true },

];

export default function DashboardLayout() {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [collapsed, setCollapsed] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredNav = navItems.filter(item => !item.adminOnly || isAdmin);

  return (
    <div className="flex h-screen bg-[var(--bg-page)] text-white overflow-hidden">
      <aside className={`${collapsed ? 'w-16' : 'w-56'} bg-[var(--bg-sidebar)] border-r border-[color:var(--border-soft)] flex flex-col transition-all duration-300 shrink-0`}>
        <div className={`flex ${collapsed ? 'flex-col items-center gap-2' : 'items-center gap-2'} px-3 py-3 border-b border-[color:var(--border-soft)]`}>
          <img
            src="/sewignLogo.png"
            alt="SWF DHU logo"
            className="w-9 h-9 rounded-lg bg-black object-contain shrink-0 ring-1 ring-white/10"
          />
          {!collapsed && <span className="flex-1 text-xs font-bold uppercase text-white/80 truncate">SWF DHU</span>}
          <button onClick={() => setCollapsed(!collapsed)} className="text-white/50 hover:text-white p-1 rounded transition-colors shrink-0">
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
                    ? 'bg-[var(--accent-soft)] text-[color:var(--accent)] border border-[color:var(--accent-border)]'
                    : 'text-white/60 hover:bg-[var(--accent-soft2)] hover:text-white border border-transparent'
                } ${collapsed ? 'justify-center' : ''}`
              }
            >
              <item.icon className="w-4 h-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-[color:var(--border-soft)] p-2">
          {!collapsed && (
            <div className="px-2 py-2 mb-2">
              <p className="text-xs font-semibold text-white truncate">{user?.fullName}</p>
              <p className="text-[10px] text-white/40 truncate">{user?.userTypeName}</p>
            </div>
          )}
          <button
            onClick={toggleTheme}
            title={theme === 'purple' ? 'Switch to default (blue) theme' : 'Switch to purple theme'}
            className={`flex items-center gap-2 w-full px-2 py-2 rounded-md text-xs text-white/60 hover:text-white hover:bg-white/5 transition-colors ${collapsed ? 'justify-center' : ''}`}
          >
            <Palette className="w-4 h-4 shrink-0 text-[color:var(--accent)]" />
            {!collapsed && <span>{theme === 'purple' ? 'Theme: Purple' : 'Theme: Blue'}</span>}
          </button>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-2 w-full px-2 py-2 rounded-md text-xs text-red-400 hover:bg-red-500/10 transition-colors ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
