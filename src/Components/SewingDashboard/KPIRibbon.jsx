// import { Target, PackageCheck, Percent, ShieldAlert, CircleX, Crosshair } from 'lucide-react';
// import { useFilter } from './FilterContext';

// const formatNum = (n) => {
//   if (n === null || n === undefined) return '0';
//   return n.toLocaleString('en-US');
// };

// export default function KPIRibbon() {
//   const { dashboardData } = useFilter();
//   const c = dashboardData.cumulative;

//   const remaining = c ? c.targetQty - c.passQty : 0;

//   const kpis = [
//     { title: "TARGET QTY", value: c ? formatNum(c.targetQty) : "—", color: "text-red-400", icon: <Target />, ring: "from-red-500 to-red-700" },
//     { title: "ACTUAL QTY", value: c ? formatNum(c.passQty) : "—", color: "text-green-400", icon: <PackageCheck />, ring: "from-green-500 to-green-700" },
//     { title: "DHU %", value: c ? `${c.dhu.toFixed(2)}%` : "—", subtitle: `Target: ≤ 8%`, color: "text-orange-400", icon: <Percent />, ring: "from-orange-500 to-red-500" },
//     { title: "DEFECT QTY", value: c ? formatNum(c.defectQty) : "—", color: "text-yellow-400", icon: <ShieldAlert />, ring: "from-yellow-500 to-amber-600" },
//     { title: "REJECT QTY", value: c ? formatNum(c.rejectQty) : "—", color: "text-red-400", icon: <CircleX />, ring: "from-red-500 to-pink-600" },
//     { title: "REMAINING", value: formatNum(remaining), subtitle: "To Target", color: "text-blue-400", icon: <Crosshair />, ring: "from-blue-500 to-sky-600" },
//   ];

//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 lg:gap-3 h-full">
//       {kpis.map((kpi, idx) => (
//         <div key={idx} className="rounded-lg border border-white/15 bg-[#0b2344] p-2 shadow-md flex items-center gap-2 lg:gap-3 min-h-[78px] h-full">
//           <div className={`w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br ${kpi.ring} p-[2px] shrink-0`}>
//             <div className="w-full h-full rounded-full bg-[#0b2344] flex items-center justify-center text-white [&>svg]:w-4 [&>svg]:h-4 lg:[&>svg]:w-5 lg:[&>svg]:h-5">
//               {kpi.icon}
//             </div>
//           </div>
//           <div className="min-w-0">
//             <div className="text-[10px] lg:text-[11px] font-bold uppercase tracking-wide text-white/80 truncate">{kpi.title}</div>
//             <div className="text-lg lg:text-xl leading-none font-extrabold text-white truncate">{kpi.value}</div>
//             {kpi.subtitle && <div className={`text-[10px] lg:text-[11px] mt-0.5 font-semibold ${kpi.color} truncate`}>{kpi.subtitle}</div>}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
import {
  Target,
  PackageCheck,
  Percent,
  ShieldAlert,
  CircleX,
  Crosshair,
  Users
} from 'lucide-react';
import { useFilter } from './FilterContext';

const formatNum = n => {
  if (n === null || n === undefined) return '0';
  return n.toLocaleString('en-US');
};

export default function KPIRibbon() {
  const { dashboardData, filters } = useFilter();
  const c = dashboardData?.cumulative;
  const lines = dashboardData?.lineWiseDetails || [];

  const remaining = c ? c.targetQty - c.passQty : 0;
  const totalManPower = lines.reduce((sum, line) => sum + (line.manPower || 0), 0);

  const calculateDayCount = () => {
    if (!filters.dateFrom || !filters.dateTo) return 1;
    const from = new Date(filters.dateFrom);
    const to = new Date(filters.dateTo);
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const dayCount = calculateDayCount();
  const shouldAverage = dayCount > 1;

  const kpis = [
    {
      title: 'TARGET QTY',
      value: c ? formatNum(c.targetQty) : '—',
      color: 'text-red-400',
      Icon: Target,
      ring: 'from-red-500 to-red-700'
    },
    {
      title: 'ACTUAL QTY',
      value: c ? formatNum(c.passQty) : '—',
      color: 'text-green-400',
      Icon: PackageCheck,
      ring: 'from-green-500 to-green-700'
    },
    {
      title: 'DHU %',
      value: c ? `${c.dhu.toFixed(2)}%` : '—',
      subtitle: 'Target: ≤ 8%',
      color: 'text-orange-400',
      Icon: Percent,
      ring: 'from-orange-500 to-red-500'
    },
    {
      title: 'DEFECT QTY',
      value: c ? formatNum(c.defectQty) : '—',
      color: 'text-yellow-400',
      Icon: ShieldAlert,
      ring: 'from-yellow-500 to-amber-600'
    },
    {
      title: 'REJECT QTY',
      value: c ? formatNum(c.rejectQty) : '—',
      color: 'text-red-400',
      Icon: CircleX,
      ring: 'from-red-500 to-pink-600'
    },
    {
      title: 'REMAINING',
      value: formatNum(remaining),
      subtitle: 'To Target',
      color: 'text-blue-400',
      Icon: Crosshair,
      ring: 'from-blue-500 to-sky-600'
    },
    {
      title: 'MANPOWER',
      value: formatNum(shouldAverage ? Math.round(totalManPower / dayCount) : totalManPower),
      subtitle: lines.length > 0 ? `${lines.length} Line${lines.length > 1 ? 's' : ''}${shouldAverage ? ` (${dayCount} days)` : ''}` : '—',
      color: 'text-purple-400',
      Icon: Users,
      ring: 'from-purple-500 to-indigo-600'
    }
  ];

  return (
    <div className="kpi-ribbon grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 lg:gap-3 h-full min-h-0">
      {kpis.map((kpi, idx) => {
        const Icon = kpi.Icon;

        return (
          <div
            key={idx}
            className="kpi-card rounded-lg border border-white/15 bg-[#0b2344] p-2 shadow-md flex items-center gap-2 lg:gap-3 min-h-[78px] h-full min-w-0"
          >
            <div
              className={`kpi-icon-ring w-9 h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br ${kpi.ring} p-[2px] shrink-0`}
            >
              <div className="kpi-icon-inner w-full h-full rounded-full bg-[#0b2344] flex items-center justify-center text-white">
                <Icon className="kpi-icon w-4 h-4 lg:w-5 lg:h-5" />
              </div>
            </div>

            <div className="kpi-content min-w-0 flex-1">
              <div className="kpi-title text-[10px] lg:text-[11px] font-bold uppercase tracking-wide text-white/80 truncate">
                {kpi.title}
              </div>

              <div className="kpi-value text-lg lg:text-xl leading-none font-extrabold text-white truncate">
                {kpi.value}
              </div>

              {kpi.subtitle && (
                <div
                  className={`kpi-subtitle text-[10px] lg:text-[11px] mt-0.5 font-semibold ${kpi.color} truncate`}
                >
                  {kpi.subtitle}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}