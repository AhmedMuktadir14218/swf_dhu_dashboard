import { useState, useEffect } from 'react';
import { Radio, RefreshCw } from 'lucide-react';

const Header = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const formattedDate = time.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  return (
    <div className="flex items-center justify-between px-6 py-2 bg-card-bg border-b border-neon-cyan/20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-neon-cyan/30 to-neon-blue/30 rounded-lg flex items-center justify-center shadow-glow-cyan">
          <Radio size={20} className="text-neon-cyan" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-wide text-white uppercase">
            Finishing Dashboard
          </h1>
          <p className="text-xxs text-slate-400 uppercase tracking-wide">
            Finishing Performance Dashboard | DHU & Efficiency Monitor
          </p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 bg-card-dark border border-neon-cyan/20 rounded-lg px-4 py-2 shadow-glow-cyan">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-status-green animate-pulse-dot" />
            <span className="text-xs font-semibold text-status-green uppercase tracking-wider">LIVE</span>
          </div>
          <div className="h-4 w-px bg-slate-600" />
          <span className="text-sm font-semibold text-white font-mono">{formattedTime}</span>
        </div>
        <div className="flex items-center gap-2 bg-card-dark border border-neon-cyan/20 rounded-lg px-4 py-2">
          <RefreshCw size={14} className="text-slate-400" />
          <div className="text-right">
            <p className="text-xxs text-slate-400 uppercase">Last Refresh</p>
            <p className="text-xs text-white font-mono">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;