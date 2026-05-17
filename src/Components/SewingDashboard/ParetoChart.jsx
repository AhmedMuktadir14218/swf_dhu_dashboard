import { ResponsiveContainer, ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: "LINE-C", defects: 730, cumulative: 3 },
  { name: "LINE-A", defects: 601, cumulative: 5 },
  { name: "LINE-B", defects: 528, cumulative: 6.5 },
  { name: "LINE-D", defects: 411, cumulative: 7.3 },
  { name: "Line-D1", defects: 319, cumulative: 7.9 },
  { name: "Line-B1", defects: 298, cumulative: 8.2 },
  { name: "Line-D2", defects: 294, cumulative: 8.6 },
  { name: "Line-F", defects: 269, cumulative: 8.9 },
  { name: "Line-F2", defects: 260, cumulative: 9.2 },
  { name: "Line-G", defects: 255, cumulative: 9.4 },
];

export default function ParetoChart() {
  return (
    <div className="rounded-xl border border-white/15 bg-[#0a1f3d] overflow-hidden flex flex-col h-full">
      <div className="px-4 py-3 border-b border-white/10 text-lg font-extrabold uppercase text-white">
        Defect Analytics
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="text-xs font-semibold mb-2 text-white/80 uppercase">Defects By Sewing Line (Top 20)</div>
        <div className="flex-1 min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 0, bottom: 20, left: -20 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: "#fff", fontSize: 10 }} angle={-45} textAnchor="end" height={60} interval={0} />
              <YAxis yAxisId="left" tick={{ fill: "#fff", fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fill: "#fff", fontSize: 10 }} />
              <Tooltip cursor={{ fill: "rgba(255,255,255,0.1)" }} contentStyle={{ backgroundColor: '#0a1f3d', borderColor: '#ffffff20', color: '#fff' }} />
              <Bar yAxisId="left" dataKey="defects" fill="#2d8cff" radius={[2, 2, 0, 0]} barSize={16} />
              <Line yAxisId="right" type="monotone" dataKey="cumulative" stroke="#ffffff" strokeWidth={2} dot={{ r: 3, fill: '#fff' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center gap-6 text-xs mt-2 text-white/80">
          <div className="flex items-center gap-2"><span className="w-4 h-3 bg-[#2d8cff] rounded-sm"></span> Defects</div>
          <div className="flex items-center gap-2"><span className="w-4 h-[2px] bg-white"></span> Cumulative %</div>
        </div>
      </div>
    </div>
  );
}