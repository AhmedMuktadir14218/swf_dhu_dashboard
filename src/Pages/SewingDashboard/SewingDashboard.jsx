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

const TABLET_BREAKPOINT = 800;

const IPAD_LG_MIN_WIDTH = 800;
const IPAD_LG_MAX_WIDTH = 1100;
const IPAD_LG_MAX_HEIGHT = 820;

const useIsTabletView = (breakpoint = TABLET_BREAKPOINT) => {
  const [isTabletView, setIsTabletView] = useState(false);

  useEffect(() => {
    const updateView = () => {
      setIsTabletView(window.innerWidth < breakpoint);
    };

    updateView();
    window.addEventListener('resize', updateView);
    window.addEventListener('orientationchange', updateView);

    return () => {
      window.removeEventListener('resize', updateView);
      window.removeEventListener('orientationchange', updateView);
    };
  }, [breakpoint]);

  return isTabletView;
};

const useIsIpadLgCompact = () => {
  const [isIpadLgCompact, setIsIpadLgCompact] = useState(false);

  useEffect(() => {
    const updateView = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setIsIpadLgCompact(
        width >= IPAD_LG_MIN_WIDTH &&
        width <= IPAD_LG_MAX_WIDTH &&
        height <= IPAD_LG_MAX_HEIGHT
      );
    };

    updateView();
    window.addEventListener('resize', updateView);
    window.addEventListener('orientationchange', updateView);

    return () => {
      window.removeEventListener('resize', updateView);
      window.removeEventListener('orientationchange', updateView);
    };
  }, []);

  return isIpadLgCompact;
};

const Spinner = () => (
  <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/20 pointer-events-none">
    <div className="flex flex-col items-center gap-3">
      <div className="w-10 h-10 border-[3px] border-white/20 border-t-sky-400 rounded-full animate-spin" />
      <span className="text-white/80 text-sm font-semibold tracking-wide">Loading...</span>
    </div>
  </div>
);

const HeaderShell = ({ isTabletView, isIpadLgCompact }) => (
  <div
    className={
      isTabletView
        ? 'sticky top-0 z-30 max-w-[800px] mx-auto w-full px-2 pt-2 mb-2 bg-[#071a33]/95 backdrop-blur'
        : `shrink-0 mx-auto w-full ${
            isIpadLgCompact
              ? 'max-w-[1100px] px-[2px] pt-[2px] mb-[2px]'
              : 'max-w-[1800px] px-1 pt-1 mb-1'
          }`
    }
  >
    <div
      className={
        isTabletView
          ? 'rounded-xl border border-white/15 bg-[#0a1f3d] px-3 py-2 shadow-lg overflow-hidden'
          : `border border-white/15 bg-[#0a1f3d] shadow-md overflow-hidden ${
              isIpadLgCompact
                ? 'rounded-md px-2 py-0.5'
                : 'rounded-lg px-3 py-1'
            }`
      }
    >
      <Header isCompact={isIpadLgCompact}>
        <FilterBar isMediumView={isTabletView || isIpadLgCompact} />
      </Header>
    </div>
  </div>
);
const DesktopLayout = ({ dataLoading, isIpadLgCompact }) => (
  <div
    className={`relative mx-auto w-full flex-1 min-h-0 transition-all duration-300 ${
      isIpadLgCompact
        ? 'max-w-[1100px] px-[2px] pb-[2px]'
        : 'max-w-[1800px] px-1 pb-1'
    } ${dataLoading ? 'blur-[2px] pointer-events-none' : ''}`}
  >
    <div
      className={
        isIpadLgCompact
          ? 'grid grid-rows-[auto_minmax(0,1fr)_minmax(0,0.85fr)_minmax(0,1fr)] gap-[4px] h-full min-h-0 overflow-hidden'
          : 'flex flex-col gap-[2px] h-full min-h-0 overflow-hidden'
      }
    >
      <div className="shrink-0 min-h-0">
        <KPIRibbon />
      </div>

      <div
        className={`${
          isIpadLgCompact ? '' : 'flex-1'
        } grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 ${
          isIpadLgCompact ? 'gap-[4px]' : 'gap-[8px]'
        } min-h-0`}
      >
        <div className="md:col-span-1 lg:col-span-7 2xl:col-span-8 min-h-0">
          <LinePerformanceTable />
        </div>
        <div className="md:col-span-1 lg:col-span-5 2xl:col-span-4 min-h-0">
          <ProductionSummary />
        </div>
      </div>

      {/* <div className={`${isIpadLgCompact ? '' : 'flex-1'} min-h-0`}> */}
      <div className="flex-1 min-h-0 min-w-0">
        <HourlyProductionHeatmap />
      </div>

<div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-[8px] min-h-0 min-w-0 overflow-hidden">
  <div className="md:col-span-1 lg:col-span-4 min-h-0 min-w-0 overflow-hidden">
    <ParetoChart />
  </div>

  <div className="md:col-span-1 lg:col-span-5 min-h-0 min-w-0 overflow-hidden">
    <DefectAnalysisTable />
  </div>

  <div className="md:col-span-1 lg:col-span-3 min-h-0 min-w-0 overflow-hidden">
    <AlertFeed />
  </div>
</div>

      {/* <div
        className={`${
          isIpadLgCompact ? '' : 'flex-1'
        } grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 ${
          isIpadLgCompact ? 'gap-[4px]' : 'gap-[8px]'
        } min-h-0`}
      >
        <div className="md:col-span-1 lg:col-span-4 min-h-0">
          <ParetoChart />
        </div>
        <div className="md:col-span-1 lg:col-span-5 min-h-0">
          <DefectAnalysisTable />
        </div>
        <div className="md:col-span-1 lg:col-span-3 min-h-0">
          <AlertFeed />
        </div>
      </div> */}
    </div>
  </div>
);

const TabletLayout = ({ dataLoading }) => (
  <div className={`relative max-w-[800px] mx-auto w-full px-2 pb-4 transition-all duration-300 ${dataLoading ? 'blur-[2px]' : ''}`}>
    <div className="flex flex-col gap-2">
      <section className="shrink-0">
        <KPIRibbon />
      </section>

      <section className="h-[340px] min-h-[320px]">
        <LinePerformanceTable />
      </section>

      <section className="grid grid-cols-1 min-[650px]:grid-cols-2 gap-2">
        <div className="h-[310px] min-h-[290px]">
          <ParetoChart />
        </div>
        <div className="h-[310px] min-h-[290px]">
          <ProductionSummary />
        </div>
      </section>

      <section className="h-[330px] min-h-[300px]">
        <HourlyProductionHeatmap />
      </section>

      <section className="grid grid-cols-1 min-[650px]:grid-cols-2 gap-2">
        <div className="h-[430px] min-h-[380px]">
          <DefectAnalysisTable />
        </div>
        <div className="h-[430px] min-h-[380px]">
          <AlertFeed />
        </div>
      </section>
    </div>
  </div>
);

const DashboardContent = () => {
  const { dataLoading, fetchTrigger, fetchDashboardData } = useFilter();
  const isTabletView = useIsTabletView();
  const isIpadLgCompact = useIsIpadLgCompact();

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
    <div
      className={`${
        isTabletView
          ? 'min-h-screen overflow-y-auto overflow-x-hidden'
          : 'h-screen overflow-hidden flex flex-col'
      } bg-[#071a33] text-white font-sans relative ${
        isIpadLgCompact ? 'dashboard-ipad-lg-compact' : ''
      }`}
    >
      <HeaderShell
        isTabletView={isTabletView}
        isIpadLgCompact={isIpadLgCompact}
      />

      {isTabletView ? (
        <TabletLayout dataLoading={dataLoading} />
      ) : (
        <DesktopLayout
          dataLoading={dataLoading}
          isIpadLgCompact={isIpadLgCompact}
        />
      )}

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
