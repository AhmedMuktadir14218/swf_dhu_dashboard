import { AlertTriangle, Clock, ChevronRight } from 'lucide-react';

const alerts = [
  {
    alert: 'Line-F4 DHU above target',
    details: 'DHU: 4.28% | Target: ≤ 3%',
    severity: 'Critical',
    icon: AlertTriangle,
  },
  {
    alert: 'Line-F2 Rework increasing',
    details: 'Rework: 3.62% (↑ last 2 hrs)',
    severity: 'High',
    icon: AlertTriangle,
  },
  {
    alert: 'Packing delay risk',
    details: '15,426 pcs pending packing',
    severity: 'High',
    icon: AlertTriangle,
  },
  // {
  //   alert: 'Audit score below target',
  //   details: 'Audit: 93.10% | Target: ≥ 95%',
  //   severity: 'Medium',
  //   icon: AlertTriangle,
  // },
];

const getSeverityConfig = (severity) => {
  const config = {
    'Critical': { bg: 'bg-status-red/20', text: 'text-status-red', border: 'border-status-red/30' },
    'High': { bg: 'bg-status-amber/20', text: 'text-status-amber', border: 'border-status-amber/30' },
    'Medium': { bg: 'bg-status-amber/10', text: 'text-status-amber', border: 'border-status-amber/20' },
    'Low': { bg: 'bg-neon-cyan/20', text: 'text-neon-cyan', border: 'border-neon-cyan/20' },
  };
  return config[severity] || config['Low'];
};

const AlertsAndActions = () => {
  return (
    <div className="bg-card-dark border border-neon-cyan/20 rounded-lg overflow-hidden shadow-glow-cyan/20">
      <div className="px-4 py-3 border-b border-neon-cyan/20 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Alerts & Actions</h3>
        <span className="text-xxs bg-status-red/20 text-status-red px-2 py-0.5 rounded-full font-semibold uppercase">
          {alerts.length} Active
        </span>
      </div>
      <div className="divide-y divide-neon-cyan/10">
        {alerts.map((alert, idx) => {
          const severity = getSeverityConfig(alert.severity);
          return (
            <div
              key={idx}
              className={`p-2 border-l-4 ${severity.border} hover:bg-neon-cyan/5 transition-colors cursor-pointer`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 ${severity.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <alert.icon size={16} className={severity.text} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 ">
                    <span className={`text-xxs px-1.5 py-0.5 rounded font-semibold uppercase ${severity.bg} ${severity.text}`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-xs text-white font-semibold  truncate">{alert.alert}</p>
                  <p className="text-xxs text-slate-400 truncate">{alert.details}</p>
                </div>
                <ChevronRight size={14} className="text-slate-500 flex-shrink-0 mt-4" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertsAndActions;