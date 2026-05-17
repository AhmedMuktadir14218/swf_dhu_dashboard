import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const hourlyData = [
  { hour: '08:00', output: 12450, target: 15000, dhu: 3.2, rework: 1.1, rewash: 120, defect: 398, cumOutput: 12450, status: 'running' },
  { hour: '09:00', output: 14200, target: 15000, dhu: 4.5, rework: 1.8, rewash: 180, defect: 639, cumOutput: 26650, status: 'running' },
  { hour: '10:00', output: 15800, target: 15000, dhu: 5.1, rework: 2.3, rewash: 210, defect: 806, cumOutput: 42450, status: 'running' },
  { hour: '11:00', output: 13600, target: 15000, dhu: 4.8, rework: 2.0, rewash: 195, defect: 653, cumOutput: 56050, status: 'running' },
  { hour: '12:00', output: 9200, target: 12000, dhu: 3.9, rework: 1.5, rewash: 140, defect: 359, cumOutput: 65250, status: 'break' },
  { hour: '13:00', output: 14500, target: 15000, dhu: 4.2, rework: 1.9, rewash: 165, defect: 609, cumOutput: 79750, status: 'running' },
  { hour: '14:00', output: 16200, target: 15000, dhu: 5.8, rework: 2.8, rewash: 230, defect: 940, cumOutput: 95950, status: 'running' },
  { hour: '15:00', output: 15100, target: 15000, dhu: 4.1, rework: 1.7, rewash: 155, defect: 619, cumOutput: 111050, status: 'running' },
  { hour: '16:00', output: 14800, target: 15000, dhu: 3.5, rework: 1.4, rewash: 130, defect: 518, cumOutput: 125850, status: 'running' },
  { hour: '17:00', output: 13400, target: 15000, dhu: 6.2, rework: 3.1, rewash: 250, defect: 831, cumOutput: 139250, status: 'running' },
  { hour: '18:00', output: 12100, target: 15000, dhu: 4.7, rework: 2.1, rewash: 175, defect: 569, cumOutput: 151350, status: 'running' },
  { hour: '19:00', output: 8100, target: 15000, dhu: 5.5, rework: 2.5, rewash: 200, defect: 446, cumOutput: 159450, status: 'overtime' },
];

const sparklineData = [120, 180, 210, 195, 140, 165, 230, 155, 130, 250, 175, 200];

const MiniSparkline = ({ data, color = '#4ade80' }) => {
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
    .join(' ');

  return (
    <svg width={width} height={height} className="inline-block">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        points={points}
      />
    </svg>
  );
};

const getStatusColor = (dhu, rework) => {
  if (dhu > 5 || rework > 2.5) return 'text-brand-red';
  if (dhu > 4 || rework > 1.5) return 'text-brand-amber';
  return 'text-brand-green';
};

const getTrendIcon = (current, target) => {
  if (current > target * 0.95) return <TrendingUp size={12} className="text-brand-green" />;
  if (current < target * 0.85) return <TrendingDown size={12} className="text-brand-red" />;
  return <Minus size={12} className="text-brand-amber" />;
};

const HourlyFinishingTable = () => {
  const totalOutput = hourlyData.reduce((sum, row) => sum + row.output, 0);
  const totalTarget = hourlyData.reduce((sum, row) => sum + row.target, 0);
  const avgDhu = (hourlyData.reduce((sum, row) => sum + row.dhu, 0) / hourlyData.length).toFixed(2);
  const avgRework = (hourlyData.reduce((sum, row) => sum + row.rework, 0) / hourlyData.length).toFixed(2);
  const totalRewash = hourlyData.reduce((sum, row) => sum + row.rewash, 0);

  return (
    <div className="bg-card-bg border border-border-stroke rounded-lg overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-stroke">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Hourly Finishing Report</h3>
        <span className="text-xxs text-slate-400">Last Updated: 2 min ago</span>
      </div>
      <div className="overflow-x-auto max-h-[320px] overflow-y-auto">
        <table className="w-full text-xs">
          <thead className="sticky top-0 z-10">
            <tr className="bg-dashboard-dark border-b border-border-stroke">
              <th className="px-3 py-2 text-left text-slate-400 font-medium uppercase tracking-wider">Hour</th>
              <th className="px-3 py-2 text-right text-slate-400 font-medium uppercase tracking-wider">Target</th>
              <th className="px-3 py-2 text-right text-slate-400 font-medium uppercase tracking-wider">Output</th>
              <th className="px-3 py-2 text-center text-slate-400 font-medium uppercase tracking-wider">Trend</th>
              <th className="px-3 py-2 text-right text-slate-400 font-medium uppercase tracking-wider">Cum. Output</th>
              <th className="px-3 py-2 text-right text-slate-400 font-medium uppercase tracking-wider">DHU%</th>
              <th className="px-3 py-2 text-right text-slate-400 font-medium uppercase tracking-wider">Rework%</th>
              <th className="px-3 py-2 text-right text-slate-400 font-medium uppercase tracking-wider">Defects</th>
              <th className="px-3 py-2 text-left text-slate-400 font-medium uppercase tracking-wider">Rewash QTY</th>
              <th className="px-3 py-2 text-center text-slate-400 font-medium uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {hourlyData.map((row, idx) => (
              <tr
                key={row.hour}
                className="border-b border-border-stroke/50 hover:bg-slate-800/30 transition-colors"
              >
                <td className="px-3 py-2 text-white font-medium">{row.hour}</td>
                <td className="px-3 py-2 text-right text-slate-300">{row.target.toLocaleString()}</td>
                <td className={`px-3 py-2 text-right font-semibold ${row.output >= row.target ? 'text-brand-green' : 'text-white'}`}>
                  {row.output.toLocaleString()}
                </td>
                <td className="px-3 py-2 text-center">{getTrendIcon(row.output, row.target)}</td>
                <td className="px-3 py-2 text-right text-slate-300">{row.cumOutput.toLocaleString()}</td>
                <td className={`px-3 py-2 text-right font-semibold ${getStatusColor(row.dhu, 0)}`}>
                  {row.dhu.toFixed(1)}%
                </td>
                <td className={`px-3 py-2 text-right font-semibold ${getStatusColor(0, row.rework)}`}>
                  {row.rework.toFixed(1)}%
                </td>
                <td className="px-3 py-2 text-right text-slate-300">{row.defect.toLocaleString()}</td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <MiniSparkline data={sparklineData.slice(0, idx + 1)} color={row.rewash > 200 ? '#f87171' : '#4ade80'} />
                    <span className="text-slate-300 w-8 text-right">{row.rewash}</span>
                  </div>
                </td>
                <td className="px-3 py-2 text-center">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xxs font-medium ${
                    row.status === 'running'
                      ? 'bg-green-500/20 text-brand-green'
                      : row.status === 'break'
                      ? 'bg-yellow-500/20 text-brand-amber'
                      : 'bg-purple-500/20 text-purple-400'
                  }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="sticky bottom-0 z-10">
            <tr className="bg-dashboard-dark border-t border-border-stroke font-semibold">
              <td className="px-3 py-2 text-white">Total</td>
              <td className="px-3 py-2 text-right text-slate-300">{totalTarget.toLocaleString()}</td>
              <td className="px-3 py-2 text-right text-white">{totalOutput.toLocaleString()}</td>
              <td className="px-3 py-2 text-center">{getTrendIcon(totalOutput, totalTarget)}</td>
              <td className="px-3 py-2 text-right text-slate-300">—</td>
              <td className={`px-3 py-2 text-right ${Number(avgDhu) > 5 ? 'text-brand-red' : 'text-brand-amber'}`}>{avgDhu}%</td>
              <td className={`px-3 py-2 text-right ${Number(avgRework) > 2.5 ? 'text-brand-red' : 'text-brand-amber'}`}>{avgRework}%</td>
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
