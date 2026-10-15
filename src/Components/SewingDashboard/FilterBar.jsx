import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check, Search } from 'lucide-react';
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
      className="rounded-md border border-[color:var(--border-soft)] bg-[var(--bg-menu)] shadow-2xl shadow-black/50 py-1"
    >
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-[color:var(--border-soft)]">
        <button
          type="button"
          onClick={() => { onSelectAll(); onClose(); }}
          className={`flex-1 text-center text-[11px] px-2 py-1 rounded transition-colors ${allSelected ? 'text-[color:var(--accent)] bg-[var(--accent-soft)]' : 'text-white/70 hover:bg-white/10'}`}
        >
          Select All
        </button>
        <button
          type="button"
          onClick={() => { onClear(); onClose(); }}
          className={`flex-1 text-center text-[11px] px-2 py-1 rounded transition-colors ${selected.length === 0 ? 'text-[color:var(--accent)] bg-[var(--accent-soft)]' : 'text-white/70 hover:bg-white/10'}`}
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
              <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 transition-colors ${isChecked ? 'bg-[var(--accent-strong)] border-[color:var(--accent-strong)]' : 'border-white/30 bg-transparent'}`}>
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

const MultiSelectDropdown = ({
  label,
  selected,
  options,
  onToggleAll,
  onClear,
  onToggle,
  loading,
  isMediumView = false
}) => {
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
      setAnchorRect({
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width
      });
      setOpen(true);
    }
  };

  const allSelected = options.length > 0 && selected.length === options.length;

  const displayText =
    selected.length === 0
      ? 'All'
      : selected.length === options.length
        ? 'All'
        : selected.length === 1
          ? options.find(o => String(o.id) === selected[0])?.name || '1 selected'
          : `${selected.length} selected`;

  return (
    <div className={`${isMediumView ? 'min-w-[86px]' : 'min-w-[110px]'} flex flex-col`}>
      <div
        className={`text-white/70 font-semibold tracking-wide uppercase ${
          isMediumView ? 'text-[9px] mb-0.5' : 'text-[11px] mb-1'
        }`}
      >
        {label}
      </div>

      <button
        ref={btnRef}
        type="button"
        disabled={loading}
        onClick={toggle}
        className={`${
          isMediumView ? 'h-6 px-1.5 text-[10px]' : 'h-7 px-2.5 text-[12px]'
        } rounded-md border border-[color:var(--border-soft)] bg-[var(--bg-inset)] flex items-center justify-between text-white/90 cursor-pointer hover:bg-[#1e0f3a] hover:border-[color:var(--accent-border)] transition-all duration-150 disabled:opacity-50`}
      >
        <span className="truncate">{displayText}</span>
        <ChevronDown
          className={`text-white/50 shrink-0 transition-transform duration-200 ${
            isMediumView ? 'w-2.5 h-2.5 ml-1' : 'w-3 h-3 ml-1.5'
          } ${open ? 'rotate-180' : ''}`}
        />
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

const DateInput = ({ label, value, onChange, isMediumView = false }) => (
  <div className={`${isMediumView ? 'min-w-[96px]' : 'min-w-[130px]'} flex flex-col`}>
    <div
      className={`text-white/70 font-semibold tracking-wide uppercase ${
        isMediumView ? 'text-[9px] mb-0.5' : 'text-[11px] mb-1'
      }`}
    >
      {label}
    </div>

    <div className="relative">
      <input
        type="date"
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`${
          isMediumView ? 'h-6 px-1.5 text-[10px]' : 'h-7 px-2.5 text-[12px]'
        } w-full rounded-md border border-[color:var(--border-soft)] bg-[var(--bg-inset)] pr-1 text-white/90 cursor-pointer hover:bg-[#1e0f3a] hover:border-[color:var(--accent-border)] transition-all duration-150 outline-none focus:border-[color:var(--accent-strong)] [color-scheme:dark]`}
      />
    </div>
  </div>
);

export default function FilterBar({ isMediumView, showSearch = false }) {
  const { filters, setFilters, filterOptions, loading, handleApply } = useFilter();

  const handleSearch = () => {
    handleApply();
  };

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
  <div
    className={`flex flex-nowrap items-end justify-center w-full ${
      isMediumView ? 'gap-6' : 'gap-8'
    }`}
  >
    <DateInput
      label="From"
      value={filters.dateFrom}
      onChange={v => setFilters(prev => ({ ...prev, dateFrom: v }))}
      isMediumView={isMediumView}
    />

    <div className="flex flex-col justify-end">
      <div
        className={`flex items-center text-white/40 font-medium ${
          isMediumView ? 'h-6 text-[10px]' : 'h-7 text-[12px]'
        }`}
      >
        to
      </div>
    </div>

    <DateInput
      label="To"
      value={filters.dateTo}
      onChange={v => setFilters(prev => ({ ...prev, dateTo: v }))}
      isMediumView={isMediumView}
    />

    <MultiSelectDropdown
      label="Plant"
      selected={filters.plant}
      options={filterOptions.plants}
      onToggle={togglePlant}
      onToggleAll={toggleAllPlants}
      onClear={clearPlants}
      loading={loading}
      isMediumView={isMediumView}
    />

    <MultiSelectDropdown
      label="Unit"
      selected={filters.unit}
      options={filteredUnits}
      onToggle={toggleUnit}
      onToggleAll={toggleAllUnits}
      onClear={clearUnits}
      loading={loading}
      isMediumView={isMediumView}
    />

    <MultiSelectDropdown
      label="Line"
      selected={filters.sewingLine}
      options={filteredLines}
      onToggle={toggleLine}
      onToggleAll={toggleAllLines}
      onClear={clearLines}
      loading={loading}
      isMediumView={isMediumView}
    />

    {showSearch && (
    <div className={`${isMediumView ? 'min-w-[100px]' : 'min-w-[140px]'} flex flex-col`}>
      <div
        className={`text-white/70 font-semibold tracking-wide uppercase ${
          isMediumView ? 'text-[9px] mb-0.5' : 'text-[11px] mb-1'
        }`}
      >
        Search
      </div>
      <input
        type="text"
        value={filters.search}
        onChange={e => setFilters(prev => ({ ...prev, search: e.target.value }))}
        placeholder="PO / Style..."
        className={`${
          isMediumView ? 'h-6 px-1.5 text-[10px]' : 'h-7 px-2.5 text-[12px]'
        } w-full rounded-md border border-[color:var(--border-soft)] bg-[var(--bg-inset)] text-white/90 placeholder:text-white/30 cursor-text hover:bg-[#1e0f3a] hover:border-[color:var(--accent-border)] transition-all duration-150 outline-none focus:border-[color:var(--accent-strong)]`}
      />
    </div>
    )}

    <div className="flex flex-col justify-end">
      <button
        onClick={handleSearch}
        className={`${
          isMediumView ? 'h-6 px-2' : 'h-7 px-3'
        } rounded-md border border-[color:var(--border-soft)] bg-[var(--bg-inset)] text-white/90 hover:bg-[#1e0f3a] hover:border-[color:var(--accent-border)] transition-all duration-150 cursor-pointer flex items-center gap-1`}
        title="Apply filter"
      >
        <Search
          className={`text-[color:var(--accent)] ${
            isMediumView ? 'w-3 h-3' : 'w-3.5 h-3.5'
          }`}
        />
        <span className={isMediumView ? 'text-[10px]' : 'text-[12px]'}>
          Apply
        </span>
      </button>
    </div>
  </div>
);
}
