import { AlertTriangle, ArrowRight, Bell, Clock } from 'lucide-react';

const alerts = [
  { severity: 'critical', message: 'Line-3 DHU at 8.2% — Exceeds limit by 3.2%', time: '2 min ago', line: 'Line-3' },
  { severity: 'critical', message: 'Rewash batch #1247 pending >30 min', time: '8 min ago', line: 'Line-1' },
  { severity: 'high', message: 'Iron section output 15% below hourly target', time: '15 min ago', line: 'Line-5' },
  { severity: 'high', message: 'Stain defect spike detected — 42 units in last hour', time: '22 min ago', line: 'Line-2' },
  { severity: 'medium', message: 'Line-4 operator shortage — 2 absentees today', time: '45 min ago', line: 'Line-4' },
  { severity: 'low', message: 'Packaging material running low for Order #ORD-1002', time: '1 hr ago', line: 'Common' },
];

const severityColors = {
  critical: 'border-l-red-500 bg-red-500/5',
  high: 'border-l-orange-500 bg-orange-500/5',
  medium: 'border-l-yellow-500 bg-yellow-500/5',
  low: 'border-l-blue-500 bg-blue-500/5',
};

const severityBadge = {
  critical: 'bg-red-500/20 text-red-400',
  high: 'bg-orange-500/20 text-orange-400',
  medium: 'bg-yellow-500/20 text-yellow-400',
  low: 'bg-blue-500/20 text-blue-400',
};

const ActionCenter = () => {
  return (
    <div className="bg-card-bg border border-border-stroke rounded-lg overflow-hidden flex flex-col">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border-stroke">
        <div className="flex items-center gap-2">
          <Bell size={14} className="text-brand-red" />
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Action Center</h3>
        </div>
        <span className="text-xxs bg-red-500/20 text-brand-red px-2 py-0.5 rounded-full font-semibold">
          {alerts.length} Alerts
        </span>
      </div>
      <div className="overflow-y-auto flex-1 max-h-[300px] p-2 flex flex-col gap-2">
        {alerts.map((alert, idx) => (
          <div
            key={idx}
            className={`border-l-2 ${severityColors[alert.severity]} rounded-r-md p-3 hover:bg-opacity-10 transition-colors cursor-pointer`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xxs px-1.5 py-0.5 rounded font-medium uppercase ${severityBadge[alert.severity]}`}>
                    {alert.severity}
                  </span>
                  <span className="text-xxs text-slate-500">{alert.line}</span>
                </div>
                <p className="text-xs text-slate-200 leading-relaxed">{alert.message}</p>
              </div>
              <div className="flex items-center gap-1 text-slate-500 flex-shrink-0">
                <Clock size={10} />
                <span className="text-xxs">{alert.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActionCenter;
