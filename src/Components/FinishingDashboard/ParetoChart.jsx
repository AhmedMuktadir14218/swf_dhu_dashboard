import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const paretoData = [
  { defect: 'Iron Shine', count: 245, cumulative: 24.5 },
  { defect: 'Stain', count: 198, cumulative: 44.3 },
  { defect: 'Oil Spot', count: 156, cumulative: 59.9 },
  { defect: 'Un-even', count: 112, cumulative: 71.1 },
  { defect: 'Shade Var', count: 89, cumulative: 80.0 },
  { defect: 'Crease Mark', count: 67, cumulative: 86.7 },
  { defect: 'Pocket Def', count: 54, cumulative: 92.1 },
  { defect: 'Button Hole', count: 42, cumulative: 96.3 },
  { defect: 'Needle Cut', count: 23, cumulative: 98.6 },
  { defect: 'Others', count: 14, cumulative: 100.0 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dashboard-dark border border-border-stroke rounded-lg px-3 py-2 shadow-xl">
        <p className="text-white text-xs font-semibold">{label}</p>
        <p className="text-blue-400 text-xs">Count: {payload[0]?.value}</p>
        <p className="text-brand-amber text-xs">Cumulative: {payload[1]?.value}%</p>
      </div>
    );
  }
  return null;
};

const ParetoChart = () => {
  return (
    <div className="bg-card-bg border border-border-stroke rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-border-stroke">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Defect Pareto Analysis</h3>
      </div>
      <div className="p-3" style={{ height: 280 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={paretoData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
            <XAxis
              dataKey="defect"
              tick={{ fill: '#94a3b8', fontSize: 9 }}
              axisLine={{ stroke: '#1e293b' }}
              tickLine={{ stroke: '#1e293b' }}
              angle={-25}
              textAnchor="end"
              height={60}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              axisLine={{ stroke: '#1e293b' }}
              tickLine={{ stroke: '#1e293b' }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              domain={[0, 100]}
              tick={{ fill: '#94a3b8', fontSize: 10 }}
              axisLine={{ stroke: '#1e293b' }}
              tickLine={{ stroke: '#1e293b' }}
              unit="%"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '10px' }}
              formatter={(value) => <span style={{ color: '#94a3b8' }}>{value}</span>}
            />
            <Bar
              yAxisId="left"
              dataKey="count"
              name="Defect Count"
              fill="#3b82f6"
              radius={[2, 2, 0, 0]}
              barSize={28}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="cumulative"
              name="Cumulative %"
              stroke="#fbbf24"
              strokeWidth={2}
              dot={{ fill: '#fbbf24', r: 3 }}
              activeDot={{ r: 5 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ParetoChart;
