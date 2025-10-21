import React from 'react';
import FilterControls from './FilterControls';
import DocumentTable from './DocumentTable';
import DownloadIcon from './icons/DownloadIcon';
import { Category, Status, DisplayDocumentItem } from '../types';

interface TablePageProps {
  displayData: DisplayDocumentItem[];
  // Filters
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
  
  // Handlers
  onUpdateStatus: (id: number, status: Status, keterangan?: string) => void;
  onEdit: (item: DisplayDocumentItem) => void;
  onStartReject: (item: DisplayDocumentItem) => void;
  onExport: () => void;
  onAddNew: () => void;
}

const TablePage: React.FC<TablePageProps> = ({
  displayData,
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
  onClearFilters,
  onUpdateStatus,
  onEdit,
  onStartReject,
  onExport,
  onAddNew
}) => {
  return (
    <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl shadow-sky-200/50 p-6 md:p-8 relative animate-fadeInUp">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-slate-800">Manajemen Dokumen</h2>
        </div>

        <FilterControls 
            categoryFilter={categoryFilter}
            onCategoryFilterChange={onCategoryFilterChange}
            statusFilter={statusFilter}
            onStatusFilterChange={onStatusFilterChange}
            searchQuery={searchQuery}
            onSearchQueryChange={onSearchQueryChange}
            startDateFilter={startDateFilter}
            onStartDateFilterChange={onStartDateFilterChange}
            endDateFilter={endDateFilter}
            onEndDateFilterChange={onEndDateFilterChange}
            prFilter={prFilter}
            onPrFilterChange={onPrFilterChange}
            onClearFilters={onClearFilters}
        />

        <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={onExport}
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-teal-600 rounded-lg shadow-lg shadow-teal-500/30 hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <DownloadIcon />
                Export Excel
              </button>
              <button 
                onClick={onAddNew}
                className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-sky-600 rounded-lg shadow-lg shadow-sky-500/30 hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Tambah Dokumen
              </button>
        </div>

        <main className="mt-4">
            {displayData.length > 0 ? (
              <DocumentTable 
                items={displayData}
                onUpdateStatus={onUpdateStatus}
                onEdit={onEdit}
                onStartReject={onStartReject}
              />
            ) : (
              <div className="text-center py-20 text-slate-500 bg-slate-50/50 rounded-xl">
                <h3 className="text-lg font-semibold">Tidak Ada Dokumen</h3>
                <p className="mt-1">Tidak ada dokumen yang cocok dengan filter yang Anda pilih.</p>
              </div>
            )}
        </main>
    </div>
  );
};

export default TablePage;
