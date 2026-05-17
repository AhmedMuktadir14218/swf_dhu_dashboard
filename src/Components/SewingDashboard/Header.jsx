import { Building2, RefreshCcw } from 'lucide-react';

export default function Header({ children }) {
  return (
    <div className="flex flex-col 2xl:flex-row 2xl:items-center justify-between gap-6 w-full">
      
      {/* LEFT: Logo & Title */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-12 h-12 flex items-center justify-center shrink-0">
          <Building2 className="w-10 h-10 text-sky-200 opacity-90" />
        </div>
        <div>
          <h1 className="text-[1.3rem] font-extrabold tracking-wide uppercase leading-tight text-white m-0">
            Sewing Performance Dashboard
          </h1>
          <p className="text-white/80 text-sm m-0">
            Sewing Performance Dashboard | DHU & Efficiency Monitor
          </p>
        </div>
      </div>

      {/* MIDDLE: Filters (Passed as children) */}
      <div className="flex-1 flex justify-start 2xl:justify-center overflow-x-auto pb-2 2xl:pb-0">
        {children}
      </div>

      {/* RIGHT: Last Refresh */}
      <div className="flex items-center gap-3 shrink-0">
        <RefreshCcw className="w-6 h-6 text-sky-400" />
        <div>
          <div className="text-xs font-bold text-white leading-tight">Last Refresh</div>
          <div className="text-xs text-white/80 mt-0.5">5/13/2026 11:35 AM</div>
        </div>
      </div>
      
    </div>
  );
}