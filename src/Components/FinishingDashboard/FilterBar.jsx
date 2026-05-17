import { ChevronDown } from 'lucide-react';

const filters = [
  { label: 'Unit', options: ['Unit-1', 'Unit-2', 'Unit-3', 'All Units'] },
  { label: 'Floor', options: ['1st Floor', '2nd Floor', '3rd Floor', 'All Floors'] },
  { label: 'Line', options: ['Line-1', 'Line-2', 'Line-3', 'Line-4', 'Line-5', 'All Lines'] },
  { label: 'Buyer', options: ['H&M', 'Zara', 'Primark', 'C&A', 'All Buyers'] },
  { label: 'Style', options: ['ST-2401', 'ST-2402', 'ST-2403', 'All Styles'] },
  { label: 'Order', options: ['ORD-1001', 'ORD-1002', 'ORD-1003', 'All Orders'] },
  { label: 'Color', options: ['Black', 'Navy', 'Red', 'White', 'All Colors'] },
  { label: 'Date', options: ['Today', 'Yesterday', 'Last 7 Days', 'This Month'] },
];

const FilterBar = () => {
  return (
    <div className="flex flex-wrap items-center gap-2 px-6 py-3 bg-card-bg border-b border-border-stroke">
      {filters.map((filter) => (
        <div key={filter.label} className="relative">
          <select
            className="appearance-none bg-dashboard-dark border border-border-stroke text-slate-300 text-xs rounded-md px-3 py-1.5 pr-7 focus:outline-none focus:border-blue-500 cursor-pointer hover:border-slate-500 transition-colors"
            defaultValue={filter.options[filter.options.length - 1]}
          >
            {filter.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            size={12}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
          />
        </div>
      ))}
    </div>
  );
};

export default FilterBar;
