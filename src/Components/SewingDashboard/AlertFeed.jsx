import { AlertTriangle, Siren, CircleAlert, Eye } from 'lucide-react';

const alerts = [
  { icon: Siren, title: "Line-D Efficiency < Target -10%", desc: "Current Efficiency: 7.30% | Target: 45.22%", badge: "Critical", badgeColor: "bg-red-500", iconColor: "text-red-400" },
  { icon: AlertTriangle, title: "Line-A2 DHU > 15%", desc: "Current DHU: 17.09% | Target: ≤ 8%", badge: "High", badgeColor: "bg-orange-500", iconColor: "text-orange-400" },
  { icon: AlertTriangle, title: "High Defect on LINE-C", desc: "Total Defects: 730 | Defect Rate: 8.41%", badge: "Medium", badgeColor: "bg-yellow-500", iconColor: "text-yellow-400" },
  { icon: CircleAlert, title: "Achievement below 85%", desc: "Overall Achievement: 81.21%", badge: "Monitor", badgeColor: "bg-blue-500", iconColor: "text-blue-400" },
  { icon: Eye, title: "Line-D Lowest Hour (Hour 12)", desc: "Efficiency: 0.9% | DHU: 150.0%", badge: "Monitor", badgeColor: "bg-blue-500", iconColor: "text-blue-400" },
];

export default function AlertFeed() {
  return (
    <div className="rounded-xl border border-white/15 bg-[#0a1f3d] overflow-hidden flex flex-col h-full">
      <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center bg-[#0a1f3d]">
        <div className="text-lg font-extrabold uppercase text-white">Alerts & Actions</div>
        <div className="text-xs text-white/70 font-semibold">Status</div>
      </div>
      <div className="p-3 space-y-3 overflow-y-auto flex-1 bg-[#0c2340]">
        {alerts.map((alert, i) => {
          const Icon = alert.icon;
          return (
            <div key={i} className="rounded-lg border border-white/10 bg-[#0b2344] px-3 py-3 flex items-center justify-between gap-3 shadow-sm hover:border-white/20 transition-colors">
              <div className="flex items-start gap-3">
                <Icon className={`w-7 h-7 mt-0.5 shrink-0 ${alert.iconColor}`} />
                <div>
                  <div className="text-sm font-bold text-white">{alert.title}</div>
                  <div className="text-xs text-white/70 mt-0.5">{alert.desc}</div>
                </div>
              </div>
              <span className={`px-3 py-1.5 rounded text-[10px] font-bold text-white uppercase tracking-wider ${alert.badgeColor}`}>
                {alert.badge}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}