import { Target, TrendingUp, RefreshCw, Package, ShieldAlert, RotateCcw, Award, Activity, PercentCircle } from 'lucide-react';

const kpiData = [
  { icon: Target, label: 'Target Qty', value: '295,000', target: null, color: 'text-neon-cyan', iconBg: 'bg-neon-cyan/20' },
   { icon: Award, label: 'Input QTY', value: '591,125', target: 'Target ≥ 95%', color: 'text-status-green', iconBg: 'bg-status-green/20' },
   { icon: Award, label: 'Shade OK', value: '4,125', target: 'Target ≥ 95%', color: 'text-status-green', iconBg: 'bg-status-green/20' },
   { icon: TrendingUp, label: 'Finishing Qty', value: '182,746', target: null, color: 'text-neon-cyan', iconBg: 'bg-neon-cyan/20' }, 
   { icon: TrendingUp, label: 'Pack Qty', value: '182,746', target: null, color: 'text-neon-cyan', iconBg: 'bg-neon-cyan/20' }, 

  { icon: PercentCircle, label: 'Efficiency %', value: '62.35%', target: 'Target 60.00%', color: 'text-status-green', iconBg: 'bg-status-green/20' },
  { icon: ShieldAlert, label: 'DHU % (Final)', value: '2.62%', target: 'Target ≤ 3%', color: 'text-status-green', iconBg: 'bg-status-green/20' },

  { icon: Package, label: 'Rewash Qty', value: '48,350', target: '3.62% of Output', color: 'text-neon-blue', iconBg: 'bg-neon-blue/20' },
  { icon: Package, label: 'Reject Qty', value: '48,350', target: '3.62% of Output', color: 'text-neon-blue', iconBg: 'bg-red' },

  // { icon: Activity, label: 'Achievement', value: '91.75%', target: 'Target ≥ 97%', color: 'text-status-amber', iconBg: 'bg-status-amber/20' },
  { icon: Target, label: 'Remaining TGT', value: '112,254', target: '37.98% Pending', color: 'text-slate-400', iconBg: 'bg-slate-600/20' },
];

const KPICard = ({ icon: Icon, label, value, target, color, iconBg }) => {
  return (
    <div className="bg-card-dark border border-neon-cyan/20 rounded-lg p-3 hover:border-neon-cyan/40 transition-all shadow-glow-cyan/20">
      <div className="flex items-center gap-4 mb-2">
        <div className={`w-8 h-8 ${iconBg} rounded flex items-center justify-center`}>
          <Icon size={14} className={color} />
        </div>
        <span className="text-sm text-slate-300 font-bold uppercase tracking-wider ">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white text-center mb-1">{value}</div>
      {/* {target && (
        <div className={`text-xxs text-center font-medium ${color}`}>{target}</div>
      )} */}
    </div>
  );
};

const KPIRibbon = () => {
  return (
    <div className="px-6 py-1 bg-card-dark/50">
      <div className="grid grid-cols-10 gap-3">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>
    </div>
  );
};

export default KPIRibbon;