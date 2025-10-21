import React from 'react';
import { Category, Status } from '../types';
import FilterIcon from './icons/FilterIcon';
import XIcon from './icons/XIcon';

interface FilterControlsProps {
  categoryFilter: Category | 'ALL';
  onCategoryFilterChange: (value: Category | 'ALL') => void;
  statusFilter: Status | 'ALL';
  onStatusFilterChange: (value: Status | 'ALL') => void;
  searchQuery: string;
  onSearchQueryChange: (value: string) => void;
  startDateFilter: string;
  onStartDateFilterChange: (value: string) => void;
  endDateFilter: string;
  onEndDateFilterChange: (value: string) => void;
  prFilter: string;
  onPrFilterChange: (value: string) => void;
  onClearFilters: () => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  categoryFilter,
  onCategoryFilterChange,
  statusFilter,
  onStatusFilterChange,
  searchQuery,
  onSearchQueryChange,
  startDateFilter,
  onStartDateFilterChange,
  endDateFilter,
  onEndDateFilterChange,
  prFilter,
  onPrFilterChange,
  onClearFilters
}) => {
  return (
    <div className="mt-6 p-4 bg-slate-50/80 backdrop-blur-sm border border-slate-200/80 rounded-xl animate-fadeInUp" style={{ animationDelay: '300ms'}}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-end">
            {/* Category Filter */}
            <div>
                <label htmlFor="categoryFilter" className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                <select 
                    id="categoryFilter" 
                    value={categoryFilter}
                    onChange={(e) => onCategoryFilterChange(e.target.value as Category | 'ALL')}
                    className="w-full px-3 py-2 border border-slate-300 bg-white/70 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow"
                >
                    <option value="ALL">Semua Kategori</option>
                    <option value={Category.REIMBURSE}>REIMBURSE</option>
                    <option value={Category.UM}>UM</option>
                    <option value={Category.TTDS}>TTDS</option>
                </select>
            </div>
            
            {/* Status Filter */}
            <div>
                <label htmlFor="statusFilter" className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                <select 
                    id="statusFilter"
                    value={statusFilter}
                    onChange={(e) => onStatusFilterChange(e.target.value as Status | 'ALL')}
                    className="w-full px-3 py-2 border border-slate-300 bg-white/70 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow"
                >
                    <option value="ALL">Semua Status</option>
                    <option value={Status.PENDING}>Pending</option>
                    <option value={Status.ACCEPTED}>Diterima</option>
                    <option value={Status.REJECTED}>Ditolak</option>
                </select>
            </div>
            
            {/* Date Filters */}
            <div>
                <label htmlFor="startDateFilter" className="block text-sm font-medium text-slate-700 mb-1">Tanggal Mulai</label>
                <input 
                    type="date" 
                    id="startDateFilter"
                    value={startDateFilter}
                    onChange={(e) => onStartDateFilterChange(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 bg-white/70 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow"
                />
            </div>
            <div>
                <label htmlFor="endDateFilter" className="block text-sm font-medium text-slate-700 mb-1">Tanggal Selesai</label>
                <input 
                    type="date" 
                    id="endDateFilter"
                    value={endDateFilter}
                    onChange={(e) => onEndDateFilterChange(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 bg-white/70 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow"
                />
            </div>

            {/* PR Filter */}
            <div>
                <label htmlFor="prFilter" className="block text-sm font-medium text-slate-700 mb-1">Cari No PR</label>
                <input 
                    type="text" 
                    id="prFilter"
                    placeholder="Ketik untuk mencari..."
                    value={prFilter}
                    onChange={(e) => onPrFilterChange(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 bg-white/70 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow"
                />
            </div>
            
            {/* Search Filter */}
            <div className="lg:col-span-3">
                <label htmlFor="searchQuery" className="block text-sm font-medium text-slate-700 mb-1">Cari Deskripsi / Vendor</label>
                <div className="flex gap-2">
                    <input 
                        type="text" 
                        id="searchQuery"
                        placeholder="Ketik untuk mencari..."
                        value={searchQuery}
                        onChange={(e) => onSearchQueryChange(e.target.value)}
                        className="w-full px-3 py-2 border border-slate-300 bg-white/70 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow"
                    />
                    <button
                        onClick={onClearFilters}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-slate-700 bg-slate-200 rounded-md shadow-sm hover:bg-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 transition-all"
                        aria-label="Reset Filter"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default FilterControls;