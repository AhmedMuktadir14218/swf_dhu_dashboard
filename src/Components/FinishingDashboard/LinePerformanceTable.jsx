import { ArrowUp, ArrowDown } from 'lucide-react';

const lineData = [
  { line: 'Line-1', style: 'ST-2401', target: 1500, output: 1420, efficiency: 94.7, dhu: 3.2, status: 'on-track' },
  { line: 'Line-2', style: 'ST-2402', target: 1200, output: 1180, efficiency: 98.3, dhu: 4.5, status: 'on-track' },
  { line: 'Line-3', style: 'ST-2401', target: 1500, output: 1050, efficiency: 70.0, dhu: 8.2, status: 'critical' },
  { line: 'Line-4', style: 'ST-2403', target: 1000, output: 920, efficiency: 92.0, dhu: 3.8, status: 'on-track' },
  { line: 'Line-5', style: 'ST-2402', target: 1200, output: 1080, efficiency: 90.0, dhu: 5.1, status: 'warning' },
  { line: 'Line-6', style: 'ST-2401', target: 1500, output: 1350, efficiency: 90.0, dhu: 4.2, status: 'on-track' },
  { line: 'Line-7', style: 'ST-2403', target: 1000, output: 890, efficiency: 89.0, dhu: 5.5, status: 'warning' },
  { line: 'Line-8', style: 'ST-2402', target: 1200, output: 1200, efficiency: 100.0, dhu: 2.8, status: 'on-track' },
];

const statusConfig = {
  'on-track': { dot: 'bg-brand-green', label: 'On Track' },
  'warning': { dot: 'bg-brand-amber', label: 'Warning' },
  'critical': { dot: 'bg-brand-red', label: 'Critical' },
};

const LinePerformanceTable = () => {
  return (
    <div className="bg-card-bg border border-border-stroke rounded-lg overflow-hidden flex flex-col">
      <div className="px-4 py-3 border-b border-border-stroke">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Line Performance</h3>
      </div>
      <div className="overflow-y-auto flex-1 max-h-[300px]">
        <table className="w-full text-xs">
          <thead className="sticky top-0 z-10">
            <tr className="bg-dashboard-dark border-b border-border-stroke">
              <th className="px-3 py-2 text-left text-slate-400 font-medium uppercase tracking-wider">Line</th>
              <th className="px-3 py-2 text-left text-slate-400 font-medium uppercase tracking-wider">Style</th>
              <th className="px-3 py-2 text-right text-slate-400 font-medium uppercase tracking-wider">Target</th>
              <th className="px-3 py-2 text-right text-slate-400 font-medium uppercase tracking-wider">Output</th>
              <th className="px-3 py-2 text-right text-slate-400 font-medium uppercase tracking-wider">EFF%</th>
              <th className="px-3 py-2 text-right text-slate-400 font-medium uppercase tracking-wider">DHU%</th>
              <th className="px-3 py-2 text-center text-slate-400 font-medium uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {lineData.map((row) => {
              const status = statusConfig[row.status];
              return (
                <tr
                  key={row.line}
                  className="border-b border-border-stroke/50 hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-3 py-2 text-white font-medium">{row.line}</td>
                  <td className="px-3 py-2 text-slate-400">{row.style}</td>
                  <td className="px-3 py-2 text-right text-slate-300">{row.target.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right text-white font-semibold">{row.output.toLocaleString()}</td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {row.efficiency >= 95 ? (
                        <ArrowUp size={10} className="text-brand-green" />
                      ) : (
                        <ArrowDown size={10} className="text-brand-red" />
                      )}
                      <span className={row.efficiency >= 90 ? 'text-brand-green' : row.efficiency >= 80 ? 'text-brand-amber' : 'text-brand-red'}>
                        {row.efficiency.toFixed(1)}%
                      </span>
                    </div>
                  </td>
                  <td className={`px-3 py-2 text-right font-semibold ${row.dhu > 5 ? 'text-brand-red' : row.dhu > 4 ? 'text-brand-amber' : 'text-brand-green'}`}>
                    {row.dhu.toFixed(1)}%
                  </td>
                  <td className="px-3 py-2 text-center">
                    <div className="flex items-center justify-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                      <span className="text-xxs text-slate-400">{status.label}</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LinePerformanceTable;
