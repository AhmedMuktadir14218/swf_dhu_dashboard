// import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

// const hourlyData = [
//   { hour: '08:00 - 09:00', target: 24583, output: 18560, efficiency: 61.21, dhu: 2.89, rework: 2.38, rewash: 1120, trend: 'up' },
//   { hour: '09:00 - 10:00', target: 24583, output: 19845, efficiency: 64.87, dhu: 2.75, rework: 2.26, rewash: 1250, trend: 'up' },
//   { hour: '10:00 - 11:00', target: 24583, output: 24583, efficiency: 65.78, dhu: 2.61, rework: 2.18, rewash: 1230, trend: 'up' },
//   { hour: '11:00 - 12:00', target: 24583, output: 21320, efficiency: 69.17, dhu: 2.40, rework: 2.05, rewash: 1180, trend: 'up' },
//   { hour: '12:00 - 13:00', target: 24583, output: 18930, efficiency: 61.35, dhu: 2.68, rework: 2.68, rewash: 1320, trend: 'down' },
//   { hour: '13:00 - 14:00', target: 24583, output: 19875, efficiency: 64.35, dhu: 2.55, rework: 2.28, rewash: 1210, trend: 'up' },
//   // { hour: '14:00 - 15:00', target: 24583, output: 20340, efficiency: 65.86, dhu: 2.48, rework: 2.21, rewash: 1180, trend: 'up' },
//  ];

// const getStatusColor = (value, type) => {
//   if (type === 'efficiency') {
//     if (value >= 65) return 'text-status-green';
//     if (value >= 60) return 'text-status-amber';
//     return 'text-status-red';
//   }
//   if (type === 'dhu' || type === 'rework') {
//     if (value <= 2.5) return 'text-status-green';
//     if (value <= 3) return 'text-status-amber';
//     return 'text-status-red';
//   }
//   return 'text-white';
// };

// const getTrendIcon = (trend) => {
//   if (trend === 'up') return <TrendingUp size={10} className="text-status-green" />;
//   if (trend === 'down') return <TrendingDown size={10} className="text-status-red" />;
//   return <Minus size={10} className="text-slate-400" />;
// };

// const getStatusDot = (efficiency) => {
//   if (efficiency >= 65) return 'bg-status-green';
//   if (efficiency >= 60) return 'bg-status-amber';
//   return 'bg-status-red';
// };

// const HourlyFinishingTable = () => {
//   const totalTarget = hourlyData.reduce((sum, row) => sum + row.target, 0);
//   const totalOutput = hourlyData.reduce((sum, row) => sum + row.output, 0);
//   const avgEfficiency = (hourlyData.reduce((sum, row) => sum + row.efficiency, 0) / hourlyData.length).toFixed(2);
//   const avgDhu = (hourlyData.reduce((sum, row) => sum + row.dhu, 0) / hourlyData.length).toFixed(2);
//   const avgRework = (hourlyData.reduce((sum, row) => sum + row.rework, 0) / hourlyData.length).toFixed(2);
//   const totalRewash = hourlyData.reduce((sum, row) => sum + row.rewash, 0);

//   return (
//     <div className="bg-card-dark border border-neon-cyan/20 rounded-lg overflow-hidden shadow-glow-cyan/20">
//       <div className="px-4 py-3 border-b border-neon-cyan/20">
//         <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Hourly Finishing Output & Trends</h3>
//       </div>
//       <div className="overflow-x-auto max-h-[340px] overflow-y-auto">
//         <table className="w-full text-[11px]">
//           <thead className="sticky top-0 z-10">
//             <tr className="bg-table-header border-b border-neon-cyan/20">
//               <th className="px-3 py-2 text-left text-slate-400 font-semibold uppercase tracking-wider">Hour</th>
//               <th className="px-3 py-2 text-right text-slate-400 font-semibold uppercase tracking-wider">Target</th>
//               <th className="px-3 py-2 text-right text-slate-400 font-semibold uppercase tracking-wider">Output</th>
//               <th className="px-3 py-2 text-right text-slate-400 font-semibold uppercase tracking-wider">Efficiency</th>
//               <th className="px-3 py-2 text-right text-slate-400 font-semibold uppercase tracking-wider">DHU%</th>
//               <th className="px-3 py-2 text-right text-slate-400 font-semibold uppercase tracking-wider">Rework%</th>
//               <th className="px-3 py-2 text-right text-slate-400 font-semibold uppercase tracking-wider">Rewash</th>
//               <th className="px-3 py-2 text-center text-slate-400 font-semibold uppercase tracking-wider">Trend</th>
//               <th className="px-3 py-2 text-center text-slate-400 font-semibold uppercase tracking-wider">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {hourlyData.map((row, idx) => (
//               <tr
//                 key={idx}
//                 className="border-b border-neon-cyan/10 hover:bg-neon-cyan/5 transition-colors"
//               >
//                 <td className="px-3 py-2 text-white font-medium">{row.hour}</td>
//                 <td className="px-3 py-2 text-right text-slate-300">{row.target.toLocaleString()}</td>
//                 <td className={`px-3 py-2 text-right font-semibold ${row.output >= row.target ? 'text-status-green' : 'text-white'}`}>
//                   {row.output.toLocaleString()}
//                 </td>
//                 <td className={`px-3 py-2 text-right font-semibold ${getStatusColor(row.efficiency, 'efficiency')}`}>
//                   {row.efficiency.toFixed(2)}%
//                 </td>
//                 <td className={`px-3 py-2 text-right font-semibold ${getStatusColor(row.dhu, 'dhu')}`}>
//                   {row.dhu.toFixed(2)}%
//                 </td>
//                 <td className={`px-3 py-2 text-right font-semibold ${getStatusColor(row.rework, 'rework')}`}>
//                   {row.rework.toFixed(2)}%
//                 </td>
//                 <td className="px-3 py-2 text-right text-slate-300">{row.rewash.toLocaleString()}</td>
//                 <td className="px-3 py-2 text-center">{getTrendIcon(row.trend)}</td>
//                 <td className="px-3 py-2 text-center">
//                   <span className={`inline-flex items-center w-2 h-2 rounded-full ${getStatusDot(row.efficiency)}`} />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot className="sticky bottom-0 z-10">
//             <tr className="bg-table-header border-t border-neon-cyan/20 font-semibold">
//               <td className="px-3 py-2 text-white">Total</td>
//               <td className="px-3 py-2 text-right text-slate-300">{totalTarget.toLocaleString()}</td>
//               <td className="px-3 py-2 text-right text-white">{totalOutput.toLocaleString()}</td>
//               <td className={`px-3 py-2 text-right ${getStatusColor(avgEfficiency, 'efficiency')}`}>{avgEfficiency}%</td>
//               <td className={`px-3 py-2 text-right ${getStatusColor(avgDhu, 'dhu')}`}>{avgDhu}%</td>
//               <td className={`px-3 py-2 text-right ${getStatusColor(avgRework, 'rework')}`}>{avgRework}%</td>
//               <td className="px-3 py-2 text-right text-slate-300">{totalRewash.toLocaleString()}</td>
//               <td className="px-3 py-2" colSpan="2"></td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default HourlyFinishingTable;
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const hourlyData = [
  {
    hour: "1st Hour",
    output: 12450,
    target: 15000,
    dhu: 3.2,
    rework: 1.1,
    rewash: 120,
    defect: 398,
    cumOutput: 12450,
    status: "running",
  },
  {
    hour: "2nd Hour",
    output: 14200,
    target: 15000,
    dhu: 4.5,
    rework: 1.8,
    rewash: 180,
    defect: 639,
    cumOutput: 26650,
    status: "running",
  },
  {
    hour: "3rd Hour",
    output: 15800,
    target: 15000,
    dhu: 5.1,
    rework: 2.3,
    rewash: 210,
    defect: 806,
    cumOutput: 42450,
    status: "running",
  },
  {
    hour: "4th Hour",
    output: 13600,
    target: 15000,
    dhu: 4.8,
    rework: 2.0,
    rewash: 195,
    defect: 653,
    cumOutput: 56050,
    status: "running",
  },
  {
    hour: "5th Hour",
    output: 9200,
    target: 12000,
    dhu: 3.9,
    rework: 1.5,
    rewash: 140,
    defect: 359,
    cumOutput: 65250,
    status: "break",
  },
  {
    hour: "6th Hour",
    output: 14500,
    target: 15000,
    dhu: 4.2,
    rework: 1.9,
    rewash: 165,
    defect: 609,
    cumOutput: 79750,
    status: "running",
  },
  {
    hour: "7th Hour",
    output: 16200,
    target: 15000,
    dhu: 5.8,
    rework: 2.8,
    rewash: 230,
    defect: 940,
    cumOutput: 95950,
    status: "running",
  },
  {
    hour: "8th Hour",
    output: 15100,
    target: 15000,
    dhu: 4.1,
    rework: 1.7,
    rewash: 155,
    defect: 619,
    cumOutput: 111050,
    status: "running",
  },
  {
    hour: "9th Hour",
    output: 14800,
    target: 15000,
    dhu: 3.5,
    rework: 1.4,
    rewash: 130,
    defect: 518,
    cumOutput: 125850,
    status: "running",
  },
  {
    hour: "10th Hour",
    output: 13400,
    target: 15000,
    dhu: 6.2,
    rework: 3.1,
    rewash: 250,
    defect: 831,
    cumOutput: 139250,
    status: "running",
  },
  {
    hour: "11th Hour",
    output: 12100,
    target: 15000,
    dhu: 4.7,
    rework: 2.1,
    rewash: 175,
    defect: 569,
    cumOutput: 151350,
    status: "running",
  },
  {
    hour: "12th Hour",
    output: 8100,
    target: 15000,
    dhu: 5.5,
    rework: 2.5,
    rewash: 200,
    defect: 446,
    cumOutput: 159450,
    status: "overtime",
  },
];

const sparklineData = [
  120, 180, 210, 195, 140, 165, 230, 155, 130, 250, 175, 200,
];

const MiniSparkline = ({ data, color = "#22C55E" }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 60;
  const height = 20;

  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={width} height={height} className="inline-block">
      <polyline fill="none" stroke={color} strokeWidth="1.5" points={points} />
    </svg>
  );
};

const getStatusColor = (dhu, rework) => {
  if (dhu > 5 || rework > 2.5) return "text-status-red";
  if (dhu > 4 || rework > 1.5) return "text-status-amber";
  return "text-status-green";
};

const getTrendIcon = (current, target) => {
  if (current > target * 0.95)
    return <TrendingUp size={12} className="text-status-green" />;
  if (current < target * 0.85)
    return <TrendingDown size={12} className="text-status-red" />;
  return <Minus size={12} className="text-status-amber" />;
};

const HourlyFinishingTable = () => {
  const totalOutput = hourlyData.reduce((sum, row) => sum + row.output, 0);
  const totalTarget = hourlyData.reduce((sum, row) => sum + row.target, 0);
  const avgDhu = (
    hourlyData.reduce((sum, row) => sum + row.dhu, 0) / hourlyData.length
  ).toFixed(2);
  const avgRework = (
    hourlyData.reduce((sum, row) => sum + row.rework, 0) / hourlyData.length
  ).toFixed(2);
  const totalRewash = hourlyData.reduce((sum, row) => sum + row.rewash, 0);

  return (
    <div className="bg-card-dark border border-neon-cyan/20 rounded-lg overflow-hidden shadow-glow-cyan/20">
      <div className="flex items-center justify-between px-4 py-3 border-b border-neon-cyan/20">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">
          Hourly Finishing Report
        </h3>
        <span className="text-xxs text-slate-400">Last Updated: 2 min ago</span>
      </div>
      <div className="overflow-x-auto max-h-[250px] overflow-y-auto">
        <table className="w-full text-xs">
          <thead className="sticky top-0 z-10">
            <tr className="bg-table-header border-b border-neon-cyan/20">
              <th className="px-3 py-2 text-left text-slate-400 font-medium uppercase tracking-wider">
                Hour
              </th>
              <th className="px-3 py-2 text-center text-slate-400 font-medium uppercase tracking-wider">
                Target
              </th>
              <th className="px-3 py-2 text-center text-slate-400 font-medium uppercase tracking-wider">
                Shade OK
              </th>
              <th className="px-3 py-2 text-center text-slate-400 font-medium uppercase tracking-wider">
                Fin qty
              </th>
              <th className="px-3 py-2 text-center text-slate-400 font-medium uppercase tracking-wider">
                pack qty
              </th>
              <th className="px-3 py-2 text-center text-slate-400 font-medium uppercase tracking-wider">
                Rewash QTY
              </th>
              <th className="px-3 py-2 text-center text-slate-400 font-medium uppercase tracking-wider">
                Defects
              </th>
              <th className="px-3 py-2 text-center text-slate-400 font-medium uppercase tracking-wider">
                Efficiency
              </th>

              <th className="px-3 py-2 text-center text-slate-400 font-medium uppercase tracking-wider">
                DHU%
              </th>
              {/* <th className="px-3 py-2 text-right text-slate-400 font-medium uppercase tracking-wider">Rework%</th> */}

              {/* <th className="px-3 py-2 text-center text-slate-400 font-medium uppercase tracking-wider">Status</th> */}
            </tr>
          </thead>
          <tbody>
            {hourlyData.map((row, idx) => (
              <tr
                key={row.hour}
                className="border-b border-neon-cyan/10 hover:bg-neon-cyan/5 transition-colors"
              >
                <td className="px-3 py-2 text-white font-medium">{row.hour}</td>
                <td className="px-3 py-2 text-right text-slate-300">
                  {row.target.toLocaleString()}
                </td>
                <td
                  className={`px-3 py-2 text-right font-semibold ${row.output >= row.target ? "text-status-green" : "text-white"}`}
                >
                  {row.output.toLocaleString()}
                </td>
                <td
                  className={`px-3 py-2 text-right font-semibold ${row.output >= row.target ? "text-status-green" : "text-white"}`}
                >
                  {row.output.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-center">{row.rewash} </td>
                <td className="px-3 py-2">
                  <div>{row.defect.toLocaleString()}</div>
                </td>

                <td
                  className={`px-3 py-2 text-center font-semibold ${getStatusColor(row.dhu, 0)}`}
                >
                  {row.dhu.toFixed(1)}%
                </td>
                <td
                  className={`px-3 py-2 text-center font-semibold ${getStatusColor(0, row.rework)}`}
                >
                  {row.rework.toFixed(1)}%
                </td>

                <td className="px-3 py-2 text-center text-slate-300">
                  <div className="flex items-center gap-2">
                    <MiniSparkline
                      data={sparklineData}
                      color={row.rewash > 200 ? "#EF4444" : "#22C55E"}
                    />
                    <span className="text-slate-300 w-8 text-right">
                      {row.rewash}
                    </span>
                  </div>
                </td>

                {/* <td className="px-3 py-2 text-center">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xxs font-medium ${
                    row.status === 'running'
                      ? 'bg-status-green/20 text-status-green'
                      : row.status === 'break'
                      ? 'bg-status-amber/20 text-status-amber'
                      : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {row.status}
                  </span>
                </td> */}
              </tr>
            ))}
          </tbody>
          <tfoot className="sticky bottom-0 z-10">
            <tr className="bg-table-header border-t border-neon-cyan/20 font-semibold">
              <td className="px-3 py-2 text-white">Total</td>
              <td className="px-3 py-2 text-right text-slate-300">
                {totalTarget.toLocaleString()}
              </td>
              <td className="px-3 py-2 text-right text-white">
                {totalOutput.toLocaleString()}
              </td>
              <td className="px-3 py-2 text-center">
                {getTrendIcon(totalOutput, totalTarget)}
              </td>
              <td className="px-3 py-2 text-right text-slate-300">—</td>
              <td
                className={`px-3 py-2 text-right ${Number(avgDhu) > 5 ? "text-status-red" : "text-status-amber"}`}
              >
                {avgDhu}%
              </td>
              <td
                className={`px-3 py-2 text-right ${Number(avgRework) > 2.5 ? "text-status-red" : "text-status-amber"}`}
              >
                {avgRework}%
              </td>
              <td className="px-3 py-2 text-right text-slate-300">—</td>
              <td className="px-3 py-2 text-slate-300">{totalRewash}</td>
              <td className="px-3 py-2"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default HourlyFinishingTable;
