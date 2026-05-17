import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Gauge = ({ value, target, label, color, subLabel }) => {
  const data = [{ value: value }, { value: Math.max(0, 100 - value) }];
  return (
    <div className="bg-panel-bg rounded-lg p-4 flex flex-col items-center border border-border-stroke">
      <h4 className="text-xs font-bold uppercase tracking-widest mb-2">{label}</h4>
      <div className="h-32 w-full relative">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} innerRadius={35} outerRadius={48} startAngle={90} endAngle={450} paddingAngle={0} dataKey="value">
              <Cell fill={color} />
              <Cell fill="#1F2937" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black text-white">{value}%</span>
        </div>
      </div>
      <div className="text-center mt-2">
        <p className="text-xxs text-slate-400 font-semibold">{subLabel}</p>
        <p className="text-[10px] text-slate-500">Target: {target}%</p>
      </div>
    </div>
  );
};

const ProductionGauges = () => (
  <div className="grid grid-cols-3 gap-2 h-full">
    <Gauge label="Efficiency" value={8.11} target={60.15} color="#3B82F6" subLabel="Target Met" />
    <Gauge label="DHU" value={11.45} target={8} color="#F97316" subLabel="Target: ≤ 8%" />
    <Gauge label="Achievement" value={81.21} target={100} color="#22C55E" subLabel="vs Target" />
  </div>
);

export default ProductionGauges;