import { FilterProvider } from '../../Components/SewingDashboard/FilterContext';
import Header from '../../Components/SewingDashboard/Header';
import FilterBar from '../../Components/SewingDashboard/FilterBar';
import KPIRibbon from '../../Components/SewingDashboard/KPIRibbon';
import HourlyProductionHeatmap from '../../Components/SewingDashboard/HourlyProductionHeatmap';
import LinePerformanceTable from '../../Components/SewingDashboard/LinePerformanceTable';
import ProductionSummary from '../../Components/SewingDashboard/ProductionSummary';
import ParetoChart from '../../Components/SewingDashboard/ParetoChart';
import DefectAnalysisTable from '../../Components/SewingDashboard/DefectAnalysisTable';
import AlertFeed from '../../Components/SewingDashboard/AlertFeed';

const SewingDashboard = () => {
  return (
    <FilterProvider>
      <div className="min-h-screen bg-[#071a33] text-white p-2 md:p-3 font-sans">
        <div className="max-w-[1800px] mx-auto space-y-3">
          
          {/* Top Header & Filters Box */}
          {/* Changed this div so it doesn't force flex conflict, Header handles the flex now */}
          <div className="rounded-xl border border-white/15 bg-[#0a1f3d] px-5 py-3 shadow-md">
            <Header>
              <FilterBar />
            </Header>
          </div>

          {/* KPI Ribbon (8 blocks) */}
          <KPIRibbon />

          {/* Matrix & Guages/Summary */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-2">
            <div className="xl:col-span-7 2xl:col-span-8">
              <LinePerformanceTable />
            </div>
            <div className="xl:col-span-5 2xl:col-span-4">
              <ProductionSummary />
            </div>
          </div>

          {/* Hourly Tracker */}
          <HourlyProductionHeatmap />

          {/* Bottom Row: Defects & Alerts */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-2">
            <div className="xl:col-span-4">
              <ParetoChart />
            </div>
            <div className="xl:col-span-5">
              <DefectAnalysisTable />
            </div>
            <div className="xl:col-span-3">
              <AlertFeed />
            </div>
          </div>

        </div>
      </div>
    </FilterProvider>
  );
};

export default SewingDashboard;