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
    return { ...d, cumulative: totalDefects > 0 ? (cumulative / totalDefects) * 100 : 0 };
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
