import { useState, useEffect } from 'react';
import { FilterProvider, useFilter } from '../../Components/SewingDashboard/FilterContext';
import Header from '../../Components/SewingDashboard/Header';
import FilterBar from '../../Components/SewingDashboard/FilterBar';
import KPIRibbon from '../../Components/SewingDashboard/KPIRibbon';
import HourlyProductionHeatmap from '../../Components/SewingDashboard/HourlyProductionHeatmap';
import LinePerformanceTable from '../../Components/SewingDashboard/LinePerformanceTable';
import ProductionSummary from '../../Components/SewingDashboard/ProductionSummary';
import ParetoChart from '../../Components/SewingDashboard/ParetoChart';
import DefectAnalysisTable from '../../Components/SewingDashboard/DefectAnalysisTable';
import AlertFeed from '../../Components/SewingDashboard/AlertFeed';

const Spinner = () => (
  <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/20 pointer-events-auto">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-[3px] border-white/20 border-t-sky-400 rounded-full animate-spin" />
      <span className="text-white/80 text-sm font-semibold tracking-wide">Loading...</span>
    </div>
  </div>
);

const DashboardContent = () => {
  const { dataLoading, fetchTrigger, fetchDashboardData } = useFilter();

  useEffect(() => {
    if (fetchTrigger === 0) return;
    fetchDashboardData();
  }, [fetchTrigger, fetchDashboardData]);

  useEffect(() => {
    if (fetchTrigger === 0) return;
    const interval = setInterval(() => {
      fetchDashboardData(true);
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchTrigger, fetchDashboardData]);

  return (
    <div className="h-screen overflow-hidden bg-[#071a33] text-white font-sans relative">

      <div className="h-[7%] shrink-0 max-w-[1800px] mx-auto w-full px-1 pt-1 mb-1 ">
        <div className="rounded-lg border border-white/15 bg-[#0a1f3d] px-3 py-1 shadow-md overflow-hidden h-full">
          <Header>
            <FilterBar />
          </Header>
        </div>
      </div>

      <div className={`relative max-w-[1800px] mx-auto w-full flex-1 px-1 pb-1 transition-all duration-300 ${dataLoading ? 'blur-[2px] pointer-events-none' : ''}`}>
        <div className="flex flex-col gap-[2px] h-[calc(100vh-6vh)]">

          <div className="h-[10%] shrink-0 mb-1">
            <KPIRibbon />
          </div>

          <div className="h-[30%] grid grid-cols-1 xl:grid-cols-12 gap-[8px] shrink-0 overflow-hidden mb-1">
            <div className="xl:col-span-7 2xl:col-span-8 overflow-hidden">
              <LinePerformanceTable />
            </div>
            <div className="xl:col-span-5 2xl:col-span-4 overflow-hidden">
              <ProductionSummary />
            </div>
          </div>

          <div className="h-[27%] shrink-0 overflow-hidden mb-1">
            <HourlyProductionHeatmap />
          </div>

          <div className="h-[26%] grid grid-cols-1 xl:grid-cols-12 gap-[8px] shrink-0 overflow-hidden mb-1">
            <div className="xl:col-span-4 overflow-hidden">
              <ParetoChart />
            </div>
            <div className="xl:col-span-5 overflow-hidden">
              <DefectAnalysisTable />
            </div>
            <div className="xl:col-span-3 overflow-hidden">
              <AlertFeed />
            </div>
          </div>

        </div>
      </div>

      {dataLoading && <Spinner />}
    </div>
  );
};

const SewingDashboard = () => {
  return (
    <FilterProvider>
      <DashboardContent />
    </FilterProvider>
  );
};

export default SewingDashboard;
