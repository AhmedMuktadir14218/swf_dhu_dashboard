import { CalendarDays, ChevronDown } from 'lucide-react';
import { useFilter } from './FilterContext';

const SelectBox = ({ label, value }) => (
  <div className="min-w-[130px] flex flex-col">
    <div className="text-[11px] text-white/90 mb-1 font-bold">{label}</div>
    <div className="h-8 rounded border border-white/20 bg-transparent px-2.5 flex items-center justify-between text-xs text-white cursor-pointer hover:bg-white/5 transition-colors">
      <span>{value}</span>
      <ChevronDown className="w-3.5 h-3.5 text-white/70 ml-2" />
    </div>
  </div>
);

export default function FilterBar() {
  const { filters } = useFilter();

  return (
    <div className="flex flex-nowrap items-end gap-4 w-full">
      {/* Date Picker */}
      <div className="min-w-[200px] flex flex-col">
        <div className="text-[11px] text-white/90 mb-1 font-bold">Date</div>
        <div className="h-8 rounded border border-white/20 bg-transparent px-2.5 flex items-center justify-between text-xs text-white cursor-pointer hover:bg-white/5 transition-colors">
          <span>{filters.date}</span>
          <CalendarDays className="w-3.5 h-3.5 text-white/70 ml-2" />
        </div>
      </div>
      
      <SelectBox label="Plant" value={filters.plant} />
      <SelectBox label="Unit" value={filters.unit} />
      <SelectBox label="Floor" value={filters.floor} />
      <SelectBox label="Buyer" value={filters.buyer} />
      <SelectBox label="Style" value={filters.style} />
    </div>
  );
}