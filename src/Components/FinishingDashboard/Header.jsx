import { useState, useEffect } from 'react';
import { Clock, Radio } from 'lucide-react';

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
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="flex items-center justify-between px-6 py-3 bg-card-bg border-b border-border-stroke">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
          <Radio size={16} className="text-white" />
        </div>
        <h1 className="text-lg font-bold tracking-wide uppercase text-white">
          Finishing Control Tower
        </h1>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse-dot" />
          <span className="text-brand-green text-xs font-semibold uppercase tracking-wider">Live</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <Clock size={14} />
          <span className="text-xs">{formattedDate}</span>
          <span className="text-sm font-semibold text-white">{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
