import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const defectData = [
  { name: 'Ironing Defect', value: 420, color: '#3B82F6' },
  { name: 'Spot/Stain', value: 310, color: '#EF4444' },
  { name: 'Measurement', value: 195, color: '#FACC15' },
  { name: 'Workmanship', value: 165, color: '#22C55E' },
  { name: 'Packing Error', value: 88, color: '#A855F7' },
  { name: 'Others', value: 52, color: '#64748B' },
];

const totalDefects = defectData.reduce((sum, item) => sum + item.value, 0);

const CustomLabel = ({ cx, cy }) => {
  return (
    <g>
      <text x={cx} y={cy - 10} textAnchor="middle" fill="#ffffff" fontSize="22" fontWeight="bold">
        15%
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="600">
        DHU%
      </text>
    </g>
  );
};

const ReworkDonut = () => {
  const miniStats = [
    { label: 'ManPower', value: '586' },
    { label: 'Utilization %', value: '95.44%' },
    { label: 'Working Hours', value: '278.25' },
    // { label: 'Avg Efficiency', value: '62.35%' },
  ];

  return (
    <div className="bg-card-dark border border-neon-cyan/20 rounded-lg overflow-hidden shadow-glow-cyan/20 max-h-[300px] ">
      <div className="px-4 py-3 border-b border-neon-cyan/20">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Top Defect List</h3>
      </div>
      <div className="p-3 flex items-center gap-4">
        <div className="w-40 h-40 flex-shrink-0 min-w-[160px] min-h-[160px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={defectData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                dataKey="value"
                strokeWidth={0}
                labelLine={false}
                label={CustomLabel}
              >
                {defectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex flex-col gap-1.5 flex-1">
          {defectData.map((item) => (
            <div key={item.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-slate-300">{item.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-white">{item.value}</span>
                <span className="text-xxs text-slate-500">({((item.value / totalDefects) * 100).toFixed(1)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-neon-cyan/10 p-3">
        <div className="grid grid-cols-3 gap-2">
          {miniStats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <p className="text-xxs font-semibold text-slate-300 uppercase">{stat.label}</p>
              <p className="text-sm font-bold text-neon-cyan">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReworkDonut;