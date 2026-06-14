import { Trophy, Medal, Award, Target } from 'lucide-react';

const performances = [
  { icon: Trophy, label: 'Best Unit', value: 'Unit-F2', subvalue: '68.45%', color: 'text-neon-cyan' },
  { icon: Medal, label: 'Lowest DHU', value: 'Unit-F4', subvalue: '1.72%', color: 'text-status-green' },
  { icon: Award, label: 'Lowest Rewash', value: 'Unit-F3', subvalue: '1.81%', color: 'text-status-green' },
  // { icon: Target, label: 'Highest Output', value: 'Unit-F1', subvalue: '36,580', color: 'text-neon-cyan' },
];

const TopPerformance = () => {
  return (
    <div className="bg-card-dark border border-neon-cyan/20 rounded-lg overflow-hidden shadow-glow-cyan/20">
      <div className="px-4 py-3 border-b border-neon-cyan/20">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Top UNiT</h3>
      </div>
      <div className="p-3 space-y-3">
        {performances.map((perf, idx) => (
          <div key={idx} className="flex items-center gap-3 bg-card-dark/50 border border-neon-cyan/10 rounded-lg p-3 hover:border-neon-cyan/30 transition-all">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${idx === 0 ? 'bg-status-amber/20' : 'bg-neon-cyan/10'}`}>
              <perf.icon size={20} className={idx === 0 ? 'text-status-amber' : 'text-neon-cyan'} />
            </div>
            <div className="flex-1">
              <p className="text-xxs text-slate-400 uppercase tracking-wider">{perf.label}</p>
              <p className="text-sm font-semibold text-white">{perf.value}</p>
            </div>
            <div className={`text-base font-bold ${perf.color}`}>{perf.subvalue}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPerformance;