import { ArrowUp, ArrowDown } from 'lucide-react';

const unitData = [
  { unit: 'Unit-F1', output: 36580, efficiency: 68.45, dhu: 2.18, rework: 1.95, rewash: 311, status: 'good' },
  { unit: 'Unit-F2', output: 34125, efficiency: 63.21, dhu: 2.94, rework: 2.41, rewash: 385, status: 'good' },
  { unit: 'Unit-F3', output: 29870, efficiency: 61.18, dhu: 2.23, rework: 1.81, rewash: 323, status: 'good' },
  { unit: 'Unit-F4', output: 28451, efficiency: 58.72, dhu: 4.28, rework: 2.89, rewash: 412, status: 'critical' },
];

const getStatusColor = (value, type) => {
  if (type === 'efficiency') {
    if (value >= 65) return 'text-status-green';
    if (value >= 60) return 'text-status-amber';
    return 'text-status-red';
  }
  if (type === 'dhu' || type === 'rework') {
    if (value <= 2.5) return 'text-status-green';
    if (value <= 3) return 'text-status-amber';
    return 'text-status-red';
  }
  return 'text-white';
};

const getStatusDot = (status) => {
  const statusConfig = {
    'good': 'bg-status-green shadow-glow-green',
    'warning': 'bg-status-amber',
    'critical': 'bg-status-red shadow-glow-red animate-pulse',
  };
  return statusConfig[status] || 'bg-slate-500';
};

const UnitPerformanceTable = () => {
  const totalOutput = unitData.reduce((sum, row) => sum + row.output, 0);
  const avgEfficiency = (unitData.reduce((sum, row) => sum + row.efficiency, 0) / unitData.length).toFixed(2);
  const avgDhu = (unitData.reduce((sum, row) => sum + row.dhu, 0) / unitData.length).toFixed(2);
  const avgRework = (unitData.reduce((sum, row) => sum + row.rework, 0) / unitData.length).toFixed(2);
  const avgRewash = (unitData.reduce((sum, row) => sum + row.rewash, 0) / unitData.length).toFixed(2);

  return (
    <div className="bg-card-dark border border-neon-cyan/20 rounded-lg overflow-hidden shadow-glow-cyan/20">
      <div className="px-4 py-3 border-b border-neon-cyan/20">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Finishing Unit Performance</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead className="bg-table-header border-b border-neon-cyan/20">
            <tr>
              <th className="px-3 py-2 text-left text-slate-400 font-semibold uppercase tracking-wider">Unit</th>
              <th className="px-3 py-2 text-right text-slate-400 font-semibold uppercase tracking-wider">Fin Qty</th>
              <th className="px-3 py-2 text-right text-slate-400 font-semibold uppercase tracking-wider">Pack Qty</th>
              <th className="px-3 py-2 text-right text-slate-400 font-semibold uppercase tracking-wider">Rewash</th><th className="px-3 py-2 text-right text-slate-400 font-semibold uppercase tracking-wider">Efficiency</th>
              <th className="px-3 py-2 text-right text-slate-400 font-semibold uppercase tracking-wider">DHU%</th>
              
            </tr>
          </thead>
          <tbody>
            {unitData.map((row) => (
              <tr key={row.unit} className="border-b border-neon-cyan/10 hover:bg-neon-cyan/5 transition-colors">
                <td className="px-3 py-2 text-white font-medium">{row.unit}</td>
                <td className="px-3 py-2 text-right text-white font-semibold">{row.output.toLocaleString()}</td>
                <td className="px-3 py-2 text-right text-white font-semibold">{row.output.toLocaleString()}</td>
                <td className="px-3 py-2 text-right font-semibold text-slate-300">
                  {row.rewash}
                </td>
                <td className={`px-3 py-2 text-right font-semibold ${getStatusColor(row.efficiency, 'efficiency')}`}>
                  {row.efficiency.toFixed(2)}%
                </td>
                <td className={`px-3 py-2 text-right font-semibold ${getStatusColor(row.dhu, 'dhu')}`}>
                  {row.dhu.toFixed(2)}%
                </td>
                
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-table-header border-t border-neon-cyan/20 font-semibold">
            <tr>
              <td className="px-3 py-2 text-white">Average</td>
              <td className="px-3 py-2 text-right text-white">{(totalOutput / unitData.length).toFixed(0).toLocaleString()}</td>
              <td className="px-3 py-2 text-right text-white">{(totalOutput / unitData.length).toFixed(0).toLocaleString()}</td>
              <td className="px-3 py-2 text-right text-slate-300">{avgRewash}</td><td className={`px-3 py-2 text-right ${getStatusColor(avgEfficiency, 'efficiency')}`}>{avgEfficiency}%</td>
              <td className={`px-3 py-2 text-right ${getStatusColor(avgDhu, 'dhu')}`}>{avgDhu}%</td>
              
              <td className="px-3 py-2"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default UnitPerformanceTable;