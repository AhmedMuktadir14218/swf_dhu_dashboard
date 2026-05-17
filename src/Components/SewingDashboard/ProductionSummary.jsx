import { Users, Activity, Gauge as GaugeIcon, TrendingUp, Briefcase, Clock3, Percent, TrendingDown } from 'lucide-react';

const GaugeChart = ({ title, value, target, color, secondary }) => {
  const angle = Math.min(Math.max(value, 0), 100) * 3.6;
  return (
    <div className="flex flex-col items-center justify-center relative">
      <div className="text-sm uppercase tracking-wider mb-3 text-white font-semibold">{title}</div>
      <div className="relative w-32 h-32 rounded-full" style={{ background: `conic-gradient(${color} 0deg ${angle * 0.7}deg, ${secondary} ${angle * 0.7}deg ${angle}deg, rgba(255,255,255,0.1) ${angle}deg 360deg)` }}>
        <div className="absolute inset-[12px] rounded-full bg-[#0a1f3d] flex flex-col items-center justify-center">
          <div className="text-2xl font-extrabold text-white">{value.toFixed(2)}%</div>
          <div className="text-[10px] mt-1 text-white/70 text-center leading-tight">{target}</div>
        </div>
      </div>
    </div>
  );
};

const items = [
  { icon: Users, label: "Total Lines", value: "13", color: "text-sky-400" },
  { icon: Activity, label: "Active Lines", value: "13", color: "text-cyan-400" },
  { icon: GaugeIcon, label: "Avg Efficiency", value: "32.98%", color: "text-sky-400" },
  { icon: TrendingUp, label: "Best Line", value: "Line-A2 (70.07%)", color: "text-green-400" },
  // { icon: Briefcase, label: "Total Man Power", value: "1,148", color: "text-sky-400" },
  // { icon: Clock3, label: "Total Working Hours", value: "306.50", color: "text-blue-400" },
  // { icon: Percent, label: "Avg DHU", value: "10.42%", color: "text-cyan-400" },
  // { icon: TrendingDown, label: "Worst Line", value: "Line-D (7.30%)", color: "text-red-400" },
];

export default function ProductionSummary() {
  return (
    <div className="rounded-xl border border-white/15 bg-[#0a1f3d] overflow-hidden flex flex-col h-full">
      <div className="flex flex-col md:flex-row justify-around p-6 border-b border-white/10 gap-6">
        <GaugeChart title="EFFICIENCY" value={8.11} target="Target 60.15%" color="#2d8cff" secondary="#1a66cc" />
        <GaugeChart title="DHU" value={11.45} target="Target ≤ 8%" color="#ff8c1a" secondary="#cc6600" />
        <GaugeChart title="ACHIEVEMENT" value={81.21} target="vs Target" color="#6ad45d" secondary="#2cb34a" />
      </div>
      
      <div className="px-4 py-1 border-b border-white/10 text-lg font-extrabold uppercase text-white">
        Production Summary
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-2 px-5 py-1 flex-1 content-center bg-[#0c2340]">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center gap-3">
              <Icon className={`w-6 h-6 ${item.color}`} />
              <div>
                <div className="text-xs text-white/70 font-semibold">{item.label}</div>
                <div className={`text-lg font-bold ${item.color}`}>{item.value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}