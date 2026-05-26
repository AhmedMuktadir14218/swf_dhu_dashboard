import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';
import { useFilter } from './FilterContext';

const CheckboxDropdownMenu = ({ anchorRect, options, selected, onToggle, onSelectAll, onClear, onClose, allSelected }) => {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) onClose();
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  useEffect(() => {
    const handleScroll = () => onClose();
    window.addEventListener('scroll', handleScroll, true);
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [onClose]);

  return createPortal(
    <div
      ref={menuRef}
      style={{
        position: 'fixed',
        top: anchorRect.bottom + 4,
        left: anchorRect.left,
        minWidth: Math.max(anchorRect.width, 160),
        zIndex: 99999
      }}
      className="rounded-md border border-white/10 bg-[#0f1d36] shadow-2xl shadow-black/50 py-1"
    >
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-white/10">
        <button
          type="button"
          onClick={() => { onSelectAll(); onClose(); }}
          className={`flex-1 text-center text-[11px] px-2 py-1 rounded transition-colors ${allSelected ? 'text-sky-400 bg-sky-500/10' : 'text-white/70 hover:bg-white/10'}`}
        >
          Select All
        </button>
        <button
          type="button"
          onClick={() => { onClear(); onClose(); }}
          className={`flex-1 text-center text-[11px] px-2 py-1 rounded transition-colors ${selected.length === 0 ? 'text-sky-400 bg-sky-500/10' : 'text-white/70 hover:bg-white/10'}`}
        >
          Clear
        </button>
      </div>
      <div className="max-h-[200px] overflow-y-auto">
        {options.map((option) => {
          const isChecked = selected.includes(String(option.id));
          return (
            <label
              key={option.id}
              className="flex items-center gap-2 px-3 py-1.5 text-[12px] cursor-pointer hover:bg-white/10 transition-colors"
            >
              <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors ${isChecked ? 'bg-sky-500 border-sky-500' : 'border-white/30 bg-transparent'}`}>
                {isChecked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
              </span>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => onToggle(String(option.id))}
                className="sr-only"
              />
              <span className={isChecked ? 'text-white' : 'text-white/70'}>{option.name}</span>
            </label>
          );
        })}
        {options.length === 0 && (
          <div className="px-3 py-3 text-[11px] text-white/40 text-center">No options available</div>
        )}
      </div>
    </div>,
    document.body
  );
};

const MultiSelectDropdown = ({ label, selected, options, onToggleAll, onClear, onToggle, loading }) => {
  const [open, setOpen] = useState(false);
  const [anchorRect, setAnchorRect] = useState(null);
  const btnRef = useRef(null);

  const handleClose = useCallback(() => {
    setOpen(false);
    setAnchorRect(null);
  }, []);

  const toggle = () => {
    if (open) {
      handleClose();
    } else {
      const rect = btnRef.current.getBoundingClientRect();
      setAnchorRect({ bottom: rect.bottom, left: rect.left, width: rect.width });
      setOpen(true);
    }
  };

  const allSelected = options.length > 0 && selected.length === options.length;

  const displayText = selected.length === 0
    ? 'All'
    : selected.length === options.length
      ? 'All'
      : selected.length === 1
        ? (options.find(o => String(o.id) === selected[0])?.name || '1 selected')
        : `${selected.length} selected`;

  return (
    <div className="min-w-[110px] flex flex-col">
      <div className="text-[11px] text-white/70 mb-1 font-semibold tracking-wide uppercase">{label}</div>
      <button
        ref={btnRef}
        type="button"
        disabled={loading}
        onClick={toggle}
        className="h-7 rounded-md border border-white/15 bg-[#0f1d36] px-2.5 flex items-center justify-between text-[12px] text-white/90 cursor-pointer hover:bg-[#142244] hover:border-white/25 transition-all duration-150 disabled:opacity-50"
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown className={`w-3 h-3 text-white/50 ml-1.5 shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && anchorRect && (
        <CheckboxDropdownMenu
          anchorRect={anchorRect}
          options={options}
          selected={selected}
          onToggle={onToggle}
          onSelectAll={onToggleAll}
          onClear={onClear}
          onClose={handleClose}
          allSelected={allSelected}
        />
      )}
    </div>
  );
};

const DateInput = ({ label, value, onChange }) => (
  <div className="min-w-[130px] flex flex-col">
    <div className="text-[11px] text-white/70 mb-1 font-semibold tracking-wide uppercase">{label}</div>
    <div className="relative">
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-7 w-full rounded-md border border-white/15 bg-[#0f1d36] px-2.5 pr-2 text-[12px] text-white/90 cursor-pointer hover:bg-[#142244] hover:border-white/25 transition-all duration-150 outline-none focus:border-sky-500/50 [color-scheme:dark]"
      />
      {/* <CalendarDays className="w-3.5 h-3.5 text-white/40 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" /> */}
    </div>
  </div>
);

export default function FilterBar() {
  const { filters, setFilters, filterOptions, loading } = useFilter();

  const togglePlant = (id) => {
    setFilters(prev => {
      const next = prev.plant.includes(id)
        ? prev.plant.filter(v => v !== id)
        : [...prev.plant, id];
      return { ...prev, plant: next, unit: [], sewingLine: [] };
    });
  };

  const toggleAllPlants = () => {
    setFilters(prev => ({
      ...prev,
      plant: filterOptions.plants.map(p => String(p.id)),
      unit: [],
      sewingLine: []
    }));
  };

  const clearPlants = () => {
    setFilters(prev => ({ ...prev, plant: [], unit: [], sewingLine: [] }));
  };

  const filteredUnits = filters.plant.length === 0
    ? filterOptions.units
    : filterOptions.units.filter(u => filters.plant.includes(String(u.factoryId)));

  const toggleUnit = (id) => {
    setFilters(prev => {
      const next = prev.unit.includes(id)
        ? prev.unit.filter(v => v !== id)
        : [...prev.unit, id];
      return { ...prev, unit: next, sewingLine: [] };
    });
  };

  const toggleAllUnits = () => {
    setFilters(prev => ({
      ...prev,
      unit: filteredUnits.map(u => String(u.id)),
      sewingLine: []
    }));
  };

  const clearUnits = () => {
    setFilters(prev => ({ ...prev, unit: [], sewingLine: [] }));
  };

  const filteredLines = filters.unit.length === 0
    ? filterOptions.sewingLines.filter(l => {
        if (filters.plant.length === 0) return true;
        return filters.plant.includes(String(l.factoryId));
      })
    : filterOptions.sewingLines.filter(l => filters.unit.includes(String(l.unitId)));

  const toggleLine = (id) => {
    setFilters(prev => {
      const next = prev.sewingLine.includes(id)
        ? prev.sewingLine.filter(v => v !== id)
        : [...prev.sewingLine, id];
      return { ...prev, sewingLine: next };
    });
  };

  const toggleAllLines = () => {
    setFilters(prev => ({
      ...prev,
      sewingLine: filteredLines.map(l => String(l.id))
    }));
  };

  const clearLines = () => {
    setFilters(prev => ({ ...prev, sewingLine: [] }));
  };

  return (
    <div className="flex flex-nowrap items-end justify-center gap-3 w-full">
      <DateInput
        label="From"
        value={filters.dateFrom}
        onChange={(v) => setFilters(prev => ({ ...prev, dateFrom: v }))}
      />
      <div className="flex flex-col justify-end">
        <div className="h-7 flex items-center text-white/40 text-[12px] font-medium">to</div>
      </div>
      <DateInput
        label="To"
        value={filters.dateTo}
        onChange={(v) => setFilters(prev => ({ ...prev, dateTo: v }))}
      />
      <MultiSelectDropdown
        label="Plant"
        selected={filters.plant}
        options={filterOptions.plants}
        onToggle={togglePlant}
        onToggleAll={toggleAllPlants}
        onClear={clearPlants}
        loading={loading}
      />
      <MultiSelectDropdown
        label="Unit"
        selected={filters.unit}
        options={filteredUnits}
        onToggle={toggleUnit}
        onToggleAll={toggleAllUnits}
        onClear={clearUnits}
        loading={loading}
      />
      <MultiSelectDropdown
        label="Line"
        selected={filters.sewingLine}
        options={filteredLines}
        onToggle={toggleLine}
        onToggleAll={toggleAllLines}
        onClear={clearLines}
        loading={loading}
      />
    </div>
  );
}
