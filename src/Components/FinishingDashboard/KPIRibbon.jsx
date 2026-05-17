import {
  Target,
  Activity,
  RefreshCw,
  Package,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  TrendingUp,
  Clock,
} from 'lucide-react';

const kpiData = [
  { icon: Target, label: 'Today Target', value: '295,000', footer: 'Target: 100%', color: 'text-blue-400', iconBg: 'bg-blue-500/20' },
  { icon: Activity, label: 'Today Output', value: '178,450', footer: 'Target: 60.00%', color: 'text-brand-green', iconBg: 'bg-green-500/20' },
  { icon: Package, label: 'Total WIP', value: '45,230', footer: 'Balanced', color: 'text-yellow-400', iconBg: 'bg-yellow-500/20' },
  { icon: CheckCircle2, label: 'Finishing EFF%', value: '72.5%', footer: 'Target: 75.00%', color: 'text-brand-amber', iconBg: 'bg-amber-500/20' },
  { icon: AlertTriangle, label: 'DHU%', value: '4.82%', footer: 'Target: <5.00%', color: 'text-brand-green', iconBg: 'bg-green-500/20' },
  { icon: RefreshCw, label: 'Rework%', value: '2.15%', footer: 'Target: <3.00%', color: 'text-brand-green', iconBg: 'bg-green-500/20' },
  { icon: BarChart3, label: 'Ship Target', value: '260,000', footer: 'Target: 88.00%', color: 'text-purple-400', iconBg: 'bg-purple-500/20' },
  { icon: TrendingUp, label: 'Ship Done', value: '195,200', footer: 'Target: 75.08%', color: 'text-cyan-400', iconBg: 'bg-cyan-500/20' },
  { icon: Clock, label: 'Pending Order', value: '12', footer: '3 Critical', color: 'text-brand-red', iconBg: 'bg-red-500/20' },
];

const KPICard = ({ icon: Icon, label, value, footer, color, iconBg }) => {
  return (
    <div className="bg-card-bg border border-border-stroke rounded-lg p-3 hover:border-slate-600 transition-colors">
      <div className="flex items-center gap-1.5 mb-2">
        <div className={`w-5 h-5 ${iconBg} rounded flex items-center justify-center`}>
          <Icon size={10} className={color} />
        </div>
        <span className="text-xxs text-slate-400 font-medium uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-xl font-bold text-white text-center">{value}</div>
      <div className={`text-xxs text-center mt-1 font-medium ${color}`}>{footer}</div>
    </div>
  );
};

const KPIRibbon = () => {
  return (
    <div className="px-6 py-3">
      <div className="grid grid-cols-9 gap-3">
        {kpiData.map((kpi) => (
          <KPICard key={kpi.label} {...kpi} />
        ))}
      </div>
    </div>
  );
};

export default KPIRibbon;
