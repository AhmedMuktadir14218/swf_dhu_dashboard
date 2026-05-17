import React from 'react';
import { User, Activity, Users, Zap, Clock, TrendingUp, ShieldAlert, RotateCcw, Award } from 'lucide-react';

const SummaryComponent = () => {
  const gauges = [
    { label: "FINISHING EFFICIENCY %", value: "62.35%", target: "Target 60.00%", color: "border-blue-400" },
    { label: "DHU % (FINAL)", value: "2.62%", target: "Target ≤ 3%", color: "border-green-400" },
    { label: "REWORK %", value: "2.38%", target: "Target ≤ 3%", color: "border-orange-400" },
    { label: "REWASH %", value: "3.62%", target: "of Output", color: "border-purple-500" },
  ];

  const stats = [
    { label: "Total Lines", value: "6", icon: <User size={18} className="text-blue-400" /> },
    { label: "Active Lines", value: "6", icon: <Activity size={18} className="text-blue-400" /> },
    { label: "Total Man Power", value: "586", icon: <Users size={18} className="text-blue-400" /> },
    { label: "Utilization %", value: "95.44%", icon: <Zap size={18} className="text-green-400" /> },
    { label: "Total Hours", value: "278.25", icon: <Clock size={18} className="text-blue-400" /> },
    { label: "Avg Efficiency", value: "62.35%", icon: <TrendingUp size={18} className="text-blue-400" /> },
    { label: "Avg Rework %", value: "2.38%", icon: <RotateCcw size={18} className="text-red-400" /> },
    { label: "Avg Rewash %", value: "3.62%", icon: <Award size={18} className="text-yellow-500" /> },
  ];

  const performances = [
    { label: "Best Line", value: "Line-F2 (68.45%)" },
    { label: "Lowest DHU", value: "Line-F4 (1.72%)" },
    { label: "Lowest Rework", value: "Line-F3 (1.81%)" },
    { label: "Highest Output", value: "Line-F1 (36,580)" },
  ];

  return (
    /* h-[370px] matches your dashboard row height requirement */
    <div className="bg-card-bg border border-border-stroke text-white p-4 font-sans h-[370px] rounded-lg overflow-hidden flex flex-col">
      
      {/* Top Gauge Section - Flex grow to take space */}
      <div className="grid grid-cols-4 gap-2 border-b border-gray-800 pb-4 mb-4">
        {gauges.map((gauge, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <h3 className="text-[9px] font-bold text-gray-400 mb-2 text-center h-6">{gauge.label}</h3>
            <div className="relative w-24 h-12 overflow-hidden">
              <div className="absolute top-0 left-0 w-24 h-24 border-[8px] border-gray-700 rounded-full"></div>
              <div 
                className={`absolute top-0 left-0 w-24 h-24 border-[8px] ${gauge.color} rounded-full border-t-transparent border-r-transparent`}
                style={{ transform: 'rotate(45deg)' }}
              ></div>
              <div className="absolute inset-0 flex flex-col items-center justify-end pb-0.5">
                <span className="text-sm font-bold leading-none">{gauge.value}</span>
                <span className="text-[8px] text-gray-500 mt-0.5">{gauge.target}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section - Flex container to fill remaining height */}
      <div className="grid grid-cols-3 gap-4 flex-grow overflow-hidden">
        
        {/* Finishing Summary */}
        <div className="col-span-2 bg-[#041428]/50 rounded-md border border-gray-800 p-3 flex flex-col">
          <h3 className="text-xs font-bold mb-3 tracking-tight text-gray-300 uppercase">Finishing Summary</h3>
          <div className="grid grid-cols-4 gap-x-2 gap-y-4 flex-grow content-center">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-start">
                <div className="flex items-center gap-1.5 mb-0.5">
                  {stat.icon}
                  <p className="text-[9px] text-gray-400 leading-tight uppercase">{stat.label}</p>
                </div>
                <p className="text-sm font-bold pl-6">{stat.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performance */}
        <div className="col-span-1 bg-[#041428]/50 rounded-md border border-gray-800 p-3 flex flex-col">
          <h3 className="text-xs font-bold mb-3 tracking-tight text-gray-300 uppercase">Top Performance</h3>
          <div className="space-y-3 flex-grow flex flex-col justify-center">
            {performances.map((perf, idx) => (
              <div key={idx} className="flex flex-col border-l-2 border-yellow-600/50 pl-2">
                <span className="text-[9px] text-gray-500 uppercase">{perf.label}</span>
                <span className="text-[11px] text-brand-green font-bold truncate">{perf.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SummaryComponent;