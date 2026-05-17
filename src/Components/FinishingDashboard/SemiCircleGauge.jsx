import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const SemiCircleGauge = ({ value, target, label, color = '#4ade80' }) => {
  const cappedValue = Math.min(value, 100);
  const data = [
    { name: 'value', value: cappedValue },
    { name: 'remaining', value: 100 - cappedValue },
  ];

  return (
    <div className="bg-card-bg border border-border-stroke rounded-lg p-3 flex flex-col items-center">
      <div className="w-full h-[100px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="85%"
              startAngle={180}
              endAngle={0}
              innerRadius={38}
              outerRadius={48}
              dataKey="value"
              strokeWidth={0}
            >
              <Cell fill={color} />
              <Cell fill="#1e293b" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <span className="text-lg font-bold text-white">{value}%</span>
        </div>
      </div>
      <span className="text-xxs text-slate-400 font-medium uppercase tracking-wider mt-1">{label}</span>
      <span className="text-xxs text-slate-500 mt-0.5">Target: {target}%</span>
    </div>
  );
};

export default SemiCircleGauge;
