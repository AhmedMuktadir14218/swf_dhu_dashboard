import Sidebar from '../../Components/FinishingDashboard/Sidebar';
import Header from '../../Components/FinishingDashboard/Header';
import FilterBar from '../../Components/FinishingDashboard/FilterBar';
import KPIRibbon from '../../Components/FinishingDashboard/KPIRibbon';
import HourlyFinishingTable from '../../Components/FinishingDashboard/HourlyFinishingTable';
import ReworkDonut from '../../Components/FinishingDashboard/ReworkDonut';
import TopPerformance from '../../Components/FinishingDashboard/TopPerformance';
import RunningPO from '../../Components/FinishingDashboard/RunningPO';
import POWiseSummary from '../../Components/FinishingDashboard/POWiseSummary';
import UnitPerformanceTable from '../../Components/FinishingDashboard/UnitPerformanceTable';
import AlertsAndActions from '../../Components/FinishingDashboard/AlertsAndActions';

const FinishingDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020b14] to-[#061b2d] font-inter">
      <Sidebar />
      
      <div className="ml-14">
        <Header />
        {/* <FilterBar /> */}
        <KPIRibbon />

        <div className="px-6 py-1 space-y-3">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-7">
              <HourlyFinishingTable />
            </div>
            <div className="col-span-3">
              <ReworkDonut />
            </div>
            <div className="col-span-2">
              <TopPerformance />
            </div>
          </div>
<div className="grid grid-cols-12 gap-3">
            <div className="col-span-5">
              <POWiseSummary />
            </div>
            <div className="col-span-4">
              <UnitPerformanceTable />
            </div>
            <div className="col-span-3">
              <AlertsAndActions />
            </div>
          </div>
          <RunningPO />

          
        </div>
      </div>
    </div>
  );
};

export default FinishingDashboard;