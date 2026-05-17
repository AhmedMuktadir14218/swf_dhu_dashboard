import Header from '../../Components/FinishingDashboard/Header';
import FilterBar from '../../Components/FinishingDashboard/FilterBar';
import KPIRibbon from '../../Components/FinishingDashboard/KPIRibbon';
import HourlyFinishingTable from '../../Components/FinishingDashboard/HourlyFinishingTable';
import GaugesSection from '../../Components/FinishingDashboard/GaugesSection';
import ParetoChart from '../../Components/FinishingDashboard/ParetoChart';
import ReworkDonut from '../../Components/FinishingDashboard/ReworkDonut';
import ActionCenter from '../../Components/FinishingDashboard/ActionCenter';
import LinePerformanceTable from '../../Components/FinishingDashboard/LinePerformanceTable';
import SummaryComponent from '../../Components/FinishingDashboard/SummaryComponent';

const FinishingDashboard = () => {
  return (
    <div className="min-h-screen bg-dashboard-dark font-inter">
      <Header />
      <FilterBar />
      <KPIRibbon />

      <div className="px-6 py-3 space-y-4">
        <div className='grid grid-cols-2 gap-2'>
          <div className="col-span-1">
          <HourlyFinishingTable />
          </div>
          <div className="col-span-1">
            <SummaryComponent />
          </div>
        </div> 

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5">
            <GaugesSection />
          </div>
          <div className="col-span-7">
            <ParetoChart />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-5">
            <ReworkDonut />
          </div>
          <div className="col-span-3">
            <ActionCenter />
          </div>
          <div className="col-span-4">
            <LinePerformanceTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinishingDashboard;
