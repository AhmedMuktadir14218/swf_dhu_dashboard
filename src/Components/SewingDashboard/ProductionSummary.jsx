import { Users, Activity, Gauge as GaugeIcon, TrendingUp } from 'lucide-react';
import { useFilter } from './FilterContext';

const GaugeChart = ({ title, value, target, color, secondary }) => {
  const angle = Math.min(Math.max(value, 0), 100) * 3.6;
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="text-[14px] uppercase tracking-wider mb-1 text-white font-bold">{title}</div>
      <div className="relative w-24 h-24 rounded-full" style={{ background: `conic-gradient(${color} 0deg ${angle * 0.7}deg, ${secondary} ${angle * 0.7}deg ${angle}deg, rgba(255,255,255,0.1) ${angle}deg 360deg)` }}>
        <div className="absolute inset-[8px] rounded-full bg-[#0a1f3d] flex flex-col items-center justify-center">
          <div className="text-lg font-black text-white">{value.toFixed(2)}%</div>
          <div className="text-[10px] text-white/70 text-center leading-tight">{target}</div>
        </div>
      </div>
    </div>
  );
};

export default function ProductionSummary() {
  const { dashboardData } = useFilter();
  const c = dashboardData.cumulative;
  const lines = dashboardData.lineWiseDetails;

  const totalLines = lines.length;
  const activeLines = lines.filter(l => l.manPower > 0).length;
  const avgEff = lines.length > 0 ? lines.reduce((sum, l) => sum + l.actualEff, 0) / lines.length : 0;
  const bestLine = lines.length > 0 ? lines.reduce((best, l) => l.actualEff > best.actualEff ? l : best, lines[0]) : null;

  const achievement = c && c.targetQty > 0 ? (c.passQty / c.targetQty) * 100 : 0;
  const efficiency = c ? c.actualEff : 0;
  const dhu = c ? c.dhu : 0;

  const items = [
    { icon: Users, label: "Total Lines", value: String(totalLines), color: "text-sky-400" },
    { icon: Activity, label: "Active Lines", value: String(activeLines), color: "text-cyan-400" },
    { icon: GaugeIcon, label: "Avg Efficiency", value: `${avgEff.toFixed(2)}%`, color: "text-sky-400" },
    { icon: TrendingUp, label: "Best Line", value: bestLine ? `${bestLine.sewingLineName} (${bestLine.actualEff.toFixed(2)}%)` : "—", color: "text-green-400" },
  ];

  return (
    <div className="rounded-lg border border-white/15 bg-[#0a1f3d] overflow-hidden flex flex-col h-full">
      <div className="px-3 py-1 border-b border-white/10 text-sm font-extrabold uppercase text-white shrink-0">
        Production Summary
      </div>

      <div className="flex flex-row justify-around px-2 py-1 border-b border-white/10 gap-2 flex-1 min-h-0">
        <GaugeChart title="EFFICIENCY" value={efficiency} target={`Target ${c ? c.actualTargetEff.toFixed(2) : 0}%`} color="#2d8cff" secondary="#1a66cc" />
        <GaugeChart title="DHU" value={dhu} target="Target ≤ 8%" color="#ff8c1a" secondary="#cc6600" />
        <GaugeChart title="ACHIEVEMENT" value={achievement} target="vs Target" color="#6ad45d" secondary="#2cb34a" />
      </div>

      <div className="grid grid-cols-4 gap-x-1 px-2 py-4 bg-[#0c2340] shrink-0">
        {items.map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="flex items-center gap-2">
              <Icon className={`w-4 h-4 ${item.color}`} />
              <div className="min-w-0">
                <div className="text-[11px] text-white/70 font-semibold leading-tight truncate">{item.label}</div>
                <div className={`text-[14px] font-bold ${item.color} leading-none truncate`}>{item.value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// import { Users, Activity, Gauge as GaugeIcon, TrendingUp } from 'lucide-react';
// import { useFilter } from './FilterContext';

// const GaugeChart = ({ title, value, target, color, secondary }) => {
//   const safeValue = Number.isFinite(Number(value)) ? Number(value) : 0;
//   const angle = Math.min(Math.max(safeValue, 0), 100) * 3.6;

//   return (
//     <div className="production-gauge flex flex-col items-center justify-center h-full min-h-0 min-w-0 overflow-hidden">
//       <div className="production-gauge-title text-[14px] uppercase tracking-wider mb-1 text-white font-bold leading-none truncate">
//         {title}
//       </div>

//       <div
//         className="production-gauge-ring relative rounded-full shrink-0 aspect-square"
//         style={{
//           width: 'var(--production-gauge-size, 96px)',
//           height: 'var(--production-gauge-size, 96px)',
//           minWidth: 'var(--production-gauge-size, 96px)',
//           minHeight: 'var(--production-gauge-size, 96px)',
//           maxWidth: 'var(--production-gauge-size, 96px)',
//           maxHeight: 'var(--production-gauge-size, 96px)',
//           background: `conic-gradient(
//             ${color} 0deg ${angle * 0.7}deg,
//             ${secondary} ${angle * 0.7}deg ${angle}deg,
//             rgba(255,255,255,0.1) ${angle}deg 360deg
//           )`
//         }}
//       >
//         <div
//           className="absolute rounded-full bg-[#0a1f3d] flex flex-col items-center justify-center text-center overflow-hidden"
//           style={{
//             inset: 'var(--production-gauge-inset, 8px)'
//           }}
//         >
//           <div className="production-gauge-value text-lg font-black text-white leading-none">
//             {safeValue.toFixed(2)}%
//           </div>

//           <div className="production-gauge-target text-[10px] text-white/70 text-center leading-tight px-1 truncate max-w-full">
//             {target}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default function ProductionSummary() {
//   const { dashboardData } = useFilter();

//   const c = dashboardData?.cumulative;
//   const lines = dashboardData?.lineWiseDetails || [];

//   const totalLines = lines.length;
//   const activeLines = lines.filter(l => l.manPower > 0).length;

//   const avgEff =
//     lines.length > 0
//       ? lines.reduce((sum, line) => sum + Number(line.actualEff || 0), 0) /
//         lines.length
//       : 0;

//   const bestLine =
//     lines.length > 0
//       ? lines.reduce(
//           (best, line) =>
//             Number(line.actualEff || 0) > Number(best.actualEff || 0)
//               ? line
//               : best,
//           lines[0]
//         )
//       : null;

//   const achievement =
//     c && c.targetQty > 0 ? (Number(c.passQty || 0) / Number(c.targetQty || 1)) * 100 : 0;

//   const efficiency = c ? Number(c.actualEff || 0) : 0;
//   const dhu = c ? Number(c.dhu || 0) : 0;

//   const items = [
//     {
//       icon: Users,
//       label: 'Total Lines',
//       value: String(totalLines),
//       color: 'text-sky-400'
//     },
//     {
//       icon: Activity,
//       label: 'Active Lines',
//       value: String(activeLines),
//       color: 'text-cyan-400'
//     },
//     {
//       icon: GaugeIcon,
//       label: 'Avg Efficiency',
//       value: `${avgEff.toFixed(2)}%`,
//       color: 'text-sky-400'
//     },
//     {
//       icon: TrendingUp,
//       label: 'Best Line',
//       value: bestLine
//         ? `${bestLine.sewingLineName} (${Number(bestLine.actualEff || 0).toFixed(2)}%)`
//         : '—',
//       color: 'text-green-400'
//     }
//   ];

//   return (
//     <div className="production-summary-card rounded-lg border border-white/15 bg-[#0a1f3d] overflow-hidden flex flex-col h-full min-h-0">
//       <div className="production-summary-title px-3 py-1 border-b border-white/10 text-sm font-extrabold uppercase text-white shrink-0 truncate">
//         Production Summary
//       </div>

//       <div className="production-summary-gauge-row flex flex-row justify-around items-center px-2 py-1 border-b border-white/10 gap-2 flex-1 min-h-0 overflow-hidden">
//         <GaugeChart
//           title="Efficiency"
//           value={efficiency}
//           target={`Target ${c ? Number(c.actualTargetEff || 0).toFixed(2) : '0.00'}%`}
//           color="#2d8cff"
//           secondary="#1a66cc"
//         />

//         <GaugeChart
//           title="DHU"
//           value={dhu}
//           target="Target ≤ 8%"
//           color="#ff8c1a"
//           secondary="#cc6600"
//         />

//         <GaugeChart
//           title="Achievement"
//           value={achievement}
//           target="vs Target"
//           color="#6ad45d"
//           secondary="#2cb34a"
//         />
//       </div>

//       <div className="production-summary-stats grid grid-cols-4 gap-x-1 px-2 py-4 bg-[#0c2340] shrink-0">
//         {items.map((item, i) => {
//           const Icon = item.icon;

//           return (
//             <div
//               key={i}
//               className="production-summary-stat flex items-center gap-2 min-w-0"
//             >
//               <Icon
//                 className={`production-summary-stat-icon w-4 h-4 shrink-0 ${item.color}`}
//               />

//               <div className="min-w-0">
//                 <div className="production-summary-stat-label text-[11px] text-white/70 font-semibold leading-tight truncate">
//                   {item.label}
//                 </div>

//                 <div
//                   className={`production-summary-stat-value text-[14px] font-bold ${item.color} leading-none truncate`}
//                   title={item.value}
//                 >
//                   {item.value}
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }