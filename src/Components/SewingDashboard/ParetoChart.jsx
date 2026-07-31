import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useFilter } from './FilterContext';

export default function ParetoChart() {
  const { dashboardData } = useFilter();
  const issues = dashboardData.issueDetails;

  const issueAgg = {};
  issues.forEach(item => {
    const key = item.issueName;
    if (!issueAgg[key]) issueAgg[key] = { name: key, defects: 0 };
    issueAgg[key].defects += item.defectQty;
  });

  const sorted = Object.values(issueAgg).sort((a, b) => b.defects - a.defects).slice(0, 15);
  const totalDefects = sorted.reduce((s, d) => s + d.defects, 0);

  let cumulative = 0;
  const chartData = sorted.map(d => {
    cumulative += d.defects;
    return { ...d, cumulative: (totalDefects > 0 ? (cumulative / totalDefects) * 100 : 0).toFixed(2) };
  });

  

  return (
    <div className="rounded-lg border border-white/15 bg-[#0a1f3d] overflow-hidden flex flex-col h-full">
      
      <div className="px-3 py-1 border-b border-white/10 text-xs font-extrabold uppercase text-white shrink-0">
        Defect Analytics
      </div>
      <div className="p-1 flex-1 flex flex-col min-h-0">
        <div className="flex-1 min-h-0">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 2, right: 0, bottom: 10, left: -15 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#fff", fontSize: 7 }} angle={-45} textAnchor="end" height={30} interval={0} />
              <YAxis yAxisId="left" tick={{ fill: "#fff", fontSize: 7 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "#fff", fontSize: 7 }} domain={[0, 100]} />
              <Tooltip cursor={{ fill: "rgba(255,255,255,0.1)" }} contentStyle={{ backgroundColor: '#0a1f3d', borderColor: '#ffffff20', color: '#fff', fontSize: '9px' }} />
              <Bar yAxisId="left" dataKey="defects" fill="#2d8cff" radius={[2, 2, 0, 0]} barSize={10} />
              <Line yAxisId="right" type="monotone" dataKey="cumulative" stroke="#ffffff" strokeWidth={1.5} dot={{ r: 2, fill: '#fff' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-3 text-[7px] text-white/80 shrink-0">
          <div className="flex items-center gap-1"><span className="w-2.5 h-1.5 bg-[#2d8cff] rounded-sm"></span> Defects</div>
          <div className="flex items-center gap-1"><span className="w-2.5 h-[1.5px] bg-white"></span> Cumulative %</div>
        </div>
      </div>
    </div>
  );
}




// import { useEffect, useMemo, useState } from 'react';
// import {
//   ResponsiveContainer,
//   ComposedChart,
//   Bar,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid
// } from 'recharts';
// import { useFilter } from './FilterContext';

// const IPAD_LG_MIN_WIDTH = 800;
// const IPAD_LG_MAX_WIDTH = 1100;
// const IPAD_LG_MAX_HEIGHT = 820;

// const useIsIpadLgCompact = () => {
//   const [isIpadLgCompact, setIsIpadLgCompact] = useState(false);

//   useEffect(() => {
//     const updateView = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;

//       setIsIpadLgCompact(
//         width >= IPAD_LG_MIN_WIDTH &&
//           width <= IPAD_LG_MAX_WIDTH &&
//           height <= IPAD_LG_MAX_HEIGHT
//       );
//     };

//     updateView();

//     window.addEventListener('resize', updateView);
//     window.addEventListener('orientationchange', updateView);

//     return () => {
//       window.removeEventListener('resize', updateView);
//       window.removeEventListener('orientationchange', updateView);
//     };
//   }, []);

//   return isIpadLgCompact;
// };

// const formatNum = value => {
//   if (value === null || value === undefined || Number.isNaN(Number(value))) {
//     return '0';
//   }

//   return Number(value).toLocaleString('en-US');
// };

// const compactLabel = (value, maxLength) => {
//   const text = String(value || '');

//   if (text.length <= maxLength) return text;

//   return `${text.slice(0, maxLength)}…`;
// };

// export default function ParetoChart() {
//   const { dashboardData } = useFilter();
//   const issues = dashboardData?.issueDetails || [];
//   const isIpadLgCompact = useIsIpadLgCompact();

//   const chartData = useMemo(() => {
//     const issueAgg = {};

//     issues.forEach(item => {
//       const key = item.issueName || 'Unknown';

//       if (!issueAgg[key]) {
//         issueAgg[key] = {
//           name: key,
//           defects: 0
//         };
//       }

//       issueAgg[key].defects += Number(item.defectQty || 0);
//     });

//     const topLimit = isIpadLgCompact ? 8 : 15;

//     const sorted = Object.values(issueAgg)
//       .sort((a, b) => b.defects - a.defects)
//       .slice(0, topLimit);

//     const totalDefects = sorted.reduce((sum, item) => sum + item.defects, 0);

//     let cumulative = 0;

//     return sorted.map(item => {
//       cumulative += item.defects;

//       return {
//         ...item,
//         cumulative:
//           totalDefects > 0 ? Number(((cumulative / totalDefects) * 100).toFixed(1)) : 0
//       };
//     });
//   }, [issues, isIpadLgCompact]);

//   const chartMargin = isIpadLgCompact
//     ? { top: 2, right: -10, bottom: 0, left: -24 }
//     : { top: 2, right: 0, bottom: 10, left: -15 };

//   const axisFontSize = isIpadLgCompact ? 6 : 7;
//   const xAxisHeight = isIpadLgCompact ? 24 : 30;
//   const labelMaxLength = isIpadLgCompact ? 6 : 10;
//   const barSize = isIpadLgCompact ? 7 : 10;

//   return (
//     <div className="pareto-chart-card rounded-lg border border-white/15 bg-[#0a1f3d] overflow-hidden flex flex-col h-full min-h-0">
//       <div className="pareto-chart-title px-3 py-1 border-b border-white/10 text-xs font-extrabold uppercase text-white shrink-0">
//         Defect Analytics
//       </div>

//       <div className="pareto-chart-body p-1 flex-1 flex flex-col min-h-0">
//         <div className="pareto-chart-area flex-1 min-h-0">
//           {chartData.length === 0 ? (
//             <div className="pareto-empty h-full flex items-center justify-center text-white/50 text-[11px]">
//               No defect analytics available
//             </div>
//           ) : (
//             <ResponsiveContainer width="100%" height="100%">
//               <ComposedChart
//                 data={chartData}
//                 margin={chartMargin}
//                 barCategoryGap={isIpadLgCompact ? '18%' : '10%'}
//               >
//                 <CartesianGrid
//                   stroke="rgba(255,255,255,0.05)"
//                   vertical={false}
//                 />

//                 <XAxis
//                   dataKey="name"
//                   tick={{
//                     fill: '#fff',
//                     fontSize: axisFontSize
//                   }}
//                   tickFormatter={value => compactLabel(value, labelMaxLength)}
//                   angle={isIpadLgCompact ? -35 : -45}
//                   textAnchor="end"
//                   height={xAxisHeight}
//                   interval={0}
//                   tickMargin={isIpadLgCompact ? 1 : 2}
//                   axisLine={false}
//                   tickLine={false}
//                 />

//                 <YAxis
//                   yAxisId="left"
//                   width={isIpadLgCompact ? 22 : 30}
//                   tick={{
//                     fill: '#fff',
//                     fontSize: axisFontSize
//                   }}
//                   tickFormatter={value => formatNum(value)}
//                   tickCount={isIpadLgCompact ? 3 : 5}
//                   allowDecimals={false}
//                   axisLine={false}
//                   tickLine={false}
//                 />

//                 <YAxis
//                   yAxisId="right"
//                   orientation="right"
//                   width={isIpadLgCompact ? 22 : 30}
//                   tick={{
//                     fill: '#fff',
//                     fontSize: axisFontSize
//                   }}
//                   tickFormatter={value => `${value}%`}
//                   domain={[0, 100]}
//                   ticks={isIpadLgCompact ? [0, 50, 100] : undefined}
//                   axisLine={false}
//                   tickLine={false}
//                 />

//                 <Tooltip
//                   cursor={{ fill: 'rgba(255,255,255,0.1)' }}
//                   formatter={(value, name) => {
//                     if (name === 'cumulative') {
//                       return [`${Number(value).toFixed(1)}%`, 'Cumulative %'];
//                     }

//                     return [formatNum(value), 'Defects'];
//                   }}
//                   labelFormatter={label => `Issue: ${label}`}
//                   contentStyle={{
//                     backgroundColor: '#0a1f3d',
//                     borderColor: '#ffffff20',
//                     color: '#fff',
//                     fontSize: isIpadLgCompact ? '8px' : '9px',
//                     padding: isIpadLgCompact ? '4px 6px' : '6px 8px'
//                   }}
//                   itemStyle={{
//                     color: '#fff',
//                     fontSize: isIpadLgCompact ? '8px' : '9px',
//                     padding: 0
//                   }}
//                   labelStyle={{
//                     color: '#fff',
//                     fontSize: isIpadLgCompact ? '8px' : '9px',
//                     marginBottom: 2
//                   }}
//                 />

//                 <Bar
//                   yAxisId="left"
//                   dataKey="defects"
//                   fill="#2d8cff"
//                   radius={[2, 2, 0, 0]}
//                   barSize={barSize}
//                   isAnimationActive={false}
//                 />

//                 <Line
//                   yAxisId="right"
//                   type="monotone"
//                   dataKey="cumulative"
//                   stroke="#ffffff"
//                   strokeWidth={isIpadLgCompact ? 1 : 1.5}
//                   dot={isIpadLgCompact ? false : { r: 2, fill: '#fff' }}
//                   activeDot={{
//                     r: isIpadLgCompact ? 2 : 3,
//                     fill: '#fff'
//                   }}
//                   isAnimationActive={false}
//                 />
//               </ComposedChart>
//             </ResponsiveContainer>
//           )}
//         </div>

//         <div className="pareto-chart-legend flex items-center justify-center gap-3 text-[7px] text-white/80 shrink-0">
//           <div className="flex items-center gap-1">
//             <span className="pareto-bar-legend w-2.5 h-1.5 bg-[#2d8cff] rounded-sm" />
//             <span>Defects</span>
//           </div>

//           <div className="flex items-center gap-1">
//             <span className="pareto-line-legend w-2.5 h-[1.5px] bg-white" />
//             <span>Cumulative %</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
