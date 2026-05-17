import SemiCircleGauge from './SemiCircleGauge';

const gauges = [
  { value: 60.5, target: 75, label: 'Finishing Efficiency', color: '#fbbf24' },
  { value: 72.3, target: 70, label: 'On-Time Delivery', color: '#4ade80' },
  { value: 48.1, target: 60, label: 'First Pass Yield', color: '#3b82f6' },
  { value: 85.0, target: 80, label: 'RFT Rate', color: '#4ade80' },
];

const GaugesSection = () => {
  return (
    <div className="bg-card-bg border border-border-stroke rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-border-stroke">
        <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Performance Gauges</h3>
      </div>
      <div className="grid grid-cols-4 gap-3 p-3">
        {gauges.map((gauge) => (
          <SemiCircleGauge key={gauge.label} {...gauge} />
        ))}
      </div>
    </div>
  );
};

export default GaugesSection;
