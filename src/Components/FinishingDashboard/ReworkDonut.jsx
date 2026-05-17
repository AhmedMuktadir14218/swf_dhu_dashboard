import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const reworkData = [
  { name: 'Ironing Defect', value: 420, color: '#3b82f6' },
  { name: 'Spot/Stain', value: 310, color: '#f87171' },
  { name: 'Measurement', value: 195, color: '#fbbf24' },
  { name: 'Workmanship', value: 165, color: '#4ade80' },
  { name: 'Packing Error', value: 88, color: '#a78bfa' },
  { name: 'Others', value: 52, color: '#64748b' },
];

const totalRework = reworkData.reduce((sum, item) => sum + item.value, 0);

const CustomLabel = ({ cx, cy }) => {
  return (
    <g>
      <text x={cx} y={cy - 8} textAnchor="middle" fill="#ffffff" fontSize="18" fontWeight="bold">
        {totalRework.toLocaleString()}
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" fill="#94a3b8" fontSize="10">
        Total Rework
      </text>
    </g>
  );
};

const ReworkDonut = () => {
  return (
    <div className="bg-card-bg border border-border-stroke rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-border-stroke">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Rework Analysis</h3>
      </div>
      <div className="p-3 flex items-center gap-4">
        <div style={{ width: 180, height: 180 }} className="flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={reworkData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                dataKey="value"
                strokeWidth={0}
                labelLine={false}
                label={CustomLabel}
              >
                {reworkData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          {reworkData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-slate-300">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white">{item.value}</span>
                <span className="text-xxs text-slate-500">({((item.value / totalRework) * 100).toFixed(1)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReworkDonut;
