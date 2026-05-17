import { Target, PackageCheck, Medal, Percent, Gauge, ShieldAlert, CircleX, Crosshair } from 'lucide-react';

const kpis = [
  { title: "TARGET QTY", value: "94,769", color: "text-red-400", icon: <Target />, ring: "from-red-500 to-red-700" },
  { title: "ACTUAL QTY", value: "77,054", color: "text-green-400", icon: <PackageCheck />, ring: "from-green-500 to-green-700" },
  // { title: "ACHIEVEMENT", value: "81.21%", subtitle: "vs Target", color: "text-lime-400", icon: <Medal />, ring: "from-yellow-400 to-orange-500" },
  { title: "DHU %", value: "11.45%", subtitle: "Target: ≤ 8%", color: "text-orange-400", icon: <Percent />, ring: "from-orange-500 to-red-500" },
  // { title: "EFFICIENCY %", value: "8.11%", subtitle: "Target: 60.15%", color: "text-cyan-400", icon: <Gauge />, ring: "from-cyan-500 to-blue-600" },
  { title: "DEFECT QTY", value: "9,334", color: "text-yellow-400", icon: <ShieldAlert />, ring: "from-yellow-500 to-amber-600" },
  { title: "REJECT QTY", value: "29", color: "text-red-400", icon: <CircleX />, ring: "from-red-500 to-pink-600" },
  { title: "REMAINING", value: "17,715", subtitle: "To Target", color: "text-blue-400", icon: <Crosshair />, ring: "from-blue-500 to-sky-600" },
];

export default function KPIRibbon() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-3">
      {kpis.map((kpi, idx) => (
        <div key={idx} className="rounded-xl border border-white/15 bg-[#0b2344] p-3 shadow-md min-h-[110px] flex flex-col justify-center">
          <div className="flex items-start gap-3">
            <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${kpi.ring} p-[2px] shrink-0`}>
              <div className="w-full h-full rounded-full bg-[#0b2344] flex items-center justify-center text-white [&>svg]:w-6 [&>svg]:h-6">
                {kpi.icon}
              </div>
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wide text-white/80">{kpi.title}</div>
              <div className="text-2xl leading-none font-extrabold mt-1 text-white">{kpi.value}</div>
              {kpi.subtitle && <div className={`text-xs mt-1 font-semibold ${kpi.color}`}>{kpi.subtitle}</div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}