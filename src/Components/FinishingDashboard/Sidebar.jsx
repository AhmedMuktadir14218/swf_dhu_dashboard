import { Home, BarChart3, Factory, ClipboardList, Calendar, Settings, Sparkles } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: 'Dashboard', active: true },
    { icon: BarChart3, label: 'Analytics', active: false },
    { icon: Factory, label: 'Production', active: false },
    { icon: ClipboardList, label: 'Reports', active: false },
    { icon: Calendar, label: 'Schedule', active: false },
    { icon: Settings, label: 'Settings', active: false },
  ];

  return (
    <div className="w-14 h-screen bg-dashboard-dark border-r border-neon-cyan/20 flex flex-col items-center py-3 fixed left-0 top-0 z-50">
      <div className="flex flex-col items-center gap-4 flex-1 w-full">
        {menuItems.map((item, idx) => (
          <button
            key={idx}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
              item.active
                ? 'bg-neon-cyan/20 text-neon-cyan shadow-glow-cyan'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
            title={item.label}
          >
            <item.icon size={20} />
          </button>
        ))}
      </div>
      <div className="mt-auto">
        <button
          className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-cyan/30 to-neon-blue/30 text-neon-cyan flex items-center justify-center shadow-glow-cyan hover:shadow-glow-green transition-all"
          title="AI Assistant"
        >
          <Sparkles size={20} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;