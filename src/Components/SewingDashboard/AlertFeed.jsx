import { AlertTriangle, Siren, CircleAlert, Eye } from 'lucide-react';
import { useFilter } from './FilterContext';

export default function AlertFeed() {
  const { dashboardData, dataLoading } = useFilter();
  const { cumulative: c, lineWiseDetails: lines } = dashboardData;

  const alerts = [];

  if (c) {
    if (c.actualEff < c.actualTargetEff * 0.7) {
      alerts.push({
        icon: Siren,
        title: "Overall Efficiency Below Target",
        desc: `Current: ${c.actualEff.toFixed(2)}% | Target: ${c.actualTargetEff.toFixed(2)}%`,
        badge: "Critical",
        badgeColor: "bg-red-500",
        iconColor: "text-red-400"
      });
    }

    if (c.dhu > 8) {
      alerts.push({
        icon: AlertTriangle,
        title: `Overall DHU ${c.dhu.toFixed(2)}% > 8%`,
        desc: `Total Defects: ${c.defectQty.toLocaleString()} | Total Checked: ${c.passQty.toLocaleString()}`,
        badge: "High",
        badgeColor: "bg-orange-500",
        iconColor: "text-orange-400"
      });
    }
  }

  if (lines.length > 0) {
    lines.forEach(line => {
      if (line.actualEff < line.targetEff * 0.5 && line.targetEff > 0) {
        alerts.push({
          icon: Siren,
          title: `${line.sewingLineName} Efficiency Critical`,
          desc: `Efficiency: ${line.actualEff.toFixed(2)}% | Target: ${line.targetEff.toFixed(2)}%`,
          badge: "Critical",
          badgeColor: "bg-red-500",
          iconColor: "text-red-400"
        });
      } else if (line.dhu > 15) {
        alerts.push({
          icon: AlertTriangle,
          title: `${line.sewingLineName} DHU > 15%`,
          desc: `Current DHU: ${line.dhu.toFixed(2)}% | Target: ≤ 8%`,
          badge: "High",
          badgeColor: "bg-orange-500",
          iconColor: "text-orange-400"
        });
      } else if (line.dhu > 8) {
        alerts.push({
          icon: CircleAlert,
          title: `${line.sewingLineName} DHU Elevated`,
          desc: `Current DHU: ${line.dhu.toFixed(2)}% | Defects: ${line.defectQty}`,
          badge: "Medium",
          badgeColor: "bg-yellow-500",
          iconColor: "text-yellow-400"
        });
      }
    });

    const worstLine = [...lines].sort((a, b) => a.actualEff - b.actualEff)[0];
    if (worstLine && worstLine.targetEff > 0) {
      alerts.push({
        icon: Eye,
        title: `Lowest Efficiency: ${worstLine.sewingLineName}`,
        desc: `Efficiency: ${worstLine.actualEff.toFixed(2)}% | Man Power: ${worstLine.manPower}`,
        badge: "Monitor",
        badgeColor: "bg-blue-500",
        iconColor: "text-blue-400"
      });
    }
  }

  if (alerts.length === 0 && !dataLoading) {
    alerts.push({
      icon: Eye,
      title: "All Clear",
      desc: "No critical alerts at this time",
      badge: "OK",
      badgeColor: "bg-green-500",
      iconColor: "text-green-400" 
    });
  }

  return (
    <div className="rounded-lg border border-white/15 bg-[#0a1f3d] overflow-hidden flex flex-col h-full">
      <div className="px-3 py-1 border-b border-white/10 flex justify-between items-center bg-[#0a1f3d] shrink-0">
        <div className="text-xs font-extrabold uppercase text-white">Alerts & Actions</div>
        <div className="text-[10px] text-white/70 font-semibold">{alerts.length} alert{alerts.length !== 1 ? 's' : ''}</div>
      </div>
      <div className="p-1 space-y-1 overflow-y-auto flex-1 bg-[#0c2340]">
        {dataLoading && alerts.length === 0 ? (
          <div className="px-4 py-6 text-center text-white/50 text-[11px]">Loading alerts...</div>
        ) : (
          alerts.map((alert, i) => {
            const Icon = alert.icon;
            return (
              <div key={i} className="rounded border border-white/10 bg-[#0b2344] px-2 py-1.5 flex items-center justify-between gap-2 hover:border-white/20 transition-colors">
                <div className="flex items-start gap-2 min-w-0">
                  <Icon className={`w-4 h-4 mt-0.5 shrink-0 ${alert.iconColor}`} />
                  <div className="min-w-0">
                    <div className="text-[11px] font-bold text-white truncate">{alert.title}</div>
                    <div className="text-[9px] text-white/70 truncate">{alert.desc}</div>
                  </div>
                </div>
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold text-white uppercase tracking-wider shrink-0 ${alert.badgeColor}`}>
                  {alert.badge}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
