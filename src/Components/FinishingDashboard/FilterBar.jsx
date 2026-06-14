import { ChevronDown } from 'lucide-react';

const filters = [
  { label: 'Date Range', options: ['05/12/2026 - 05/12/2026', 'Yesterday', 'Last 7 Days', 'This Month'], default: '05/12/2026 - 05/12/2026' },
  { label: 'Factory', options: ['TJL', 'Unit-1', 'Unit-2', 'All'], default: 'TJL' },
  { label: 'Unit', options: ['1', '2', '3', 'All'], default: '1' },
  { label: 'Floor', options: ['1st Floor', '2nd Floor', '3rd Floor', 'All'], default: 'All' },
  { label: 'Line', options: ['Line-1', 'Line-2', 'Line-3', 'All'], default: 'All' },
  { label: 'Buyer', options: ['H&M', 'Uniqlo', 'M&S', 'Zara', 'Next', 'All'], default: 'All' },
  { label: 'Style', options: ['SH-5520', 'SH-5522', 'HM-7721', 'All'], default: 'All' },
];

const FilterBar = () => {
  return (
    <div className="flex flex-wrap items-center gap-3 px-6 py-3 bg-card-bg border-b border-neon-cyan/10">
      {filters.map((filter) => (
        <div key={filter.label} className="relative">
          <p className="text-xxs text-slate-400 uppercase mb-1">{filter.label}</p>
          <select
            className="appearance-none bg-card-dark border border-neon-cyan/20 text-slate-300 text-xs rounded-md px-3 py-2 pr-7 focus:outline-none focus:border-neon-cyan cursor-pointer hover:border-neon-cyan/50 transition-colors w-28"
            defaultValue={filter.default}
          >
            {filter.options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ChevronDown
            size={12}
            className="absolute right-2 bottom-3 text-slate-400 pointer-events-none"
          />
        </div>
      ))}
    </div>
  );
};

export default FilterBar;