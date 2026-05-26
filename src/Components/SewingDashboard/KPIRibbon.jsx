import { Target, PackageCheck, Percent, ShieldAlert, CircleX, Crosshair } from 'lucide-react';
import { useFilter } from './FilterContext';

const formatNum = (n) => {
  if (n === null || n === undefined) return '0';
  return n.toLocaleString('en-US');
};

export default function KPIRibbon() {
  const { dashboardData } = useFilter();
  const c = dashboardData.cumulative;

  const remaining = c ? c.targetQty - c.passQty : 0;

  const kpis = [
    { title: "TARGET QTY", value: c ? formatNum(c.targetQty) : "—", color: "text-red-400", icon: <Target />, ring: "from-red-500 to-red-700" },
    { title: "ACTUAL QTY", value: c ? formatNum(c.passQty) : "—", color: "text-green-400", icon: <PackageCheck />, ring: "from-green-500 to-green-700" },
    { title: "DHU %", value: c ? `${c.dhu.toFixed(2)}%` : "—", subtitle: `Target: ≤ 8%`, color: "text-orange-400", icon: <Percent />, ring: "from-orange-500 to-red-500" },
    { title: "DEFECT QTY", value: c ? formatNum(c.defectQty) : "—", color: "text-yellow-400", icon: <ShieldAlert />, ring: "from-yellow-500 to-amber-600" },
    { title: "REJECT QTY", value: c ? formatNum(c.rejectQty) : "—", color: "text-red-400", icon: <CircleX />, ring: "from-red-500 to-pink-600" },
    { title: "REMAINING", value: formatNum(remaining), subtitle: "To Target", color: "text-blue-400", icon: <Crosshair />, ring: "from-blue-500 to-sky-600" },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-3 h-full">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="rounded-lg border border-white/15 bg-[#0b2344] p-2 shadow-md flex items-center gap-3 h-full">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${kpi.ring} p-[2px] shrink-0`}>
            <div className="w-full h-full rounded-full bg-[#0b2344] flex items-center justify-center text-white [&>svg]:w-5 [&>svg]:h-5">
              {kpi.icon}
            </div>
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold uppercase tracking-wide text-white/80 truncate">{kpi.title}</div>
            <div className="text-xl leading-none font-extrabold text-white">{kpi.value}</div>
            {kpi.subtitle && <div className={`text-[11px] mt-0.5 font-semibold ${kpi.color}`}>{kpi.subtitle}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
