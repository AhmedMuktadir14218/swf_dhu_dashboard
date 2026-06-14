import { Building2, RefreshCcw } from 'lucide-react';
import { useFilter } from './FilterContext';

export default function Header({ children }) {
  const { dataLoading, fetchDashboardData } = useFilter();

  const now = new Date();
  const lastRefresh = now.toLocaleDateString('en-US', { month: 'numeric', day: 'numeric', year: 'numeric' })
    + ' ' + now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

  return (
    <div className="flex items-center justify-between gap-4 w-full h-full">

      <div className="flex items-center gap-2 shrink-0">
        <div className="w-8 h-8 flex items-center justify-center shrink-0">
          <Building2 className="w-7 h-7 text-sky-200 opacity-90" />
        </div>
        <div>
          <h1 className="text-base font-extrabold tracking-wide uppercase leading-tight text-white m-0">
            Sewing Performance Dashboard
          </h1>
          <p className="text-white/80 text-[10px] m-0">
            Sewing Performance Dashboard | DHU & Efficiency Monitor
          </p>
        </div>
      </div>

      <div className="flex-1 flex justify-center items-center overflow-x-auto min-w-0">
        {children}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={fetchDashboardData}
          disabled={dataLoading}
          className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
          title="Refresh dashboard"
        >
          <RefreshCcw className={`w-4 h-4 text-sky-400 ${dataLoading ? 'animate-spin' : ''}`} />
        </button>
      
        <div>
          <div className="text-[10px] font-bold text-white leading-tight">Last Refresh</div>
          <div className="text-[10px] text-white/80">{lastRefresh}</div>
        </div>
      </div>

    </div>
  );
}
