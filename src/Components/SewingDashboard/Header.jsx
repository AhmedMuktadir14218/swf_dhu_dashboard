import { Building2, RefreshCcw } from 'lucide-react';
import { useFilter } from './FilterContext';

export default function Header({ children, isCompact = false }) {
  const { dataLoading, fetchDashboardData } = useFilter();

  const now = new Date();
  const lastRefresh =
    now.toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric'
    }) +
    ' ' +
    now.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });

  return (
    <div
      className={`flex items-center justify-between w-full h-full max-[799px]:flex-col max-[799px]:items-stretch ${
        isCompact ? 'gap-2 max-[799px]:gap-2' : 'gap-4 max-[799px]:gap-2'
      }`}
    >
      {/* <div className="flex items-center gap-2 shrink-0 max-[799px]:justify-between">
        <div className={`flex items-center min-w-0 ${isCompact ? 'gap-1.5' : 'gap-2'}`}>
          <div
            className={`flex items-center justify-center shrink-0 ${
              isCompact ? 'w-6 h-6' : 'w-8 h-8'
            }`}
          >
            <Building2
              className={`text-sky-200 opacity-90 ${
                isCompact ? 'w-5 h-5' : 'w-7 h-7'
              }`}
            />
          </div>

          <div className="min-w-0">
            <h1
              className={`font-extrabold tracking-wide uppercase leading-tight text-white m-0 truncate max-[799px]:text-sm ${
                isCompact ? 'text-[13px]' : 'text-base'
              }`}
            >
              Sewing Dashboard
            </h1>
            <p
              className={`text-white/80 m-0 truncate ${
                isCompact ? 'text-[9px]' : 'text-[10px]'
              }`}
            >
              DHU & Efficiency Monitor
            </p>
          </div>
        </div>

        <button
          onClick={fetchDashboardData}
          disabled={dataLoading}
          className="hidden max-[799px]:flex items-center justify-center w-8 h-8 rounded-lg border border-white/10 bg-white/5 text-white/80 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
          title="Refresh dashboard"
        >
          <RefreshCcw
            className={`w-4 h-4 text-sky-400 ${dataLoading ? 'animate-spin' : ''}`}
          />
        </button>
      </div> */}

      <div className="flex-1 flex justify-center items-center overflow-x-auto min-w-0 max-[799px]:justify-start max-[799px]:w-full max-[799px]:pb-1">
        {children}
      </div>

      {/* <div className="flex items-center gap-2 shrink-0 max-[799px]:hidden">
        <button
          onClick={fetchDashboardData}
          disabled={dataLoading}
          className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors disabled:opacity-50 cursor-pointer"
          title="Refresh dashboard"
        >
          <RefreshCcw
            className={`text-sky-400 ${isCompact ? 'w-3.5 h-3.5' : 'w-4 h-4'} ${
              dataLoading ? 'animate-spin' : ''
            }`}
          />
        </button>

        <div className={isCompact ? 'hidden' : ''}>
          <div className="text-[10px] font-bold text-white leading-tight">
            Last Refresh
          </div>
          <div className="text-[10px] text-white/80">{lastRefresh}</div>
        </div>
      </div> */}
    </div>
  );
}