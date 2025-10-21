import React, { useState, useCallback, useMemo } from 'react';
import HeaderBar from './components/HeaderBar';
import DashboardPage from './components/DashboardPage';
import TablePage from './components/TablePage';
import AddDocumentModal from './components/AddDocumentModal';
import RejectReasonModal from './components/RejectReasonModal';
import { initialData } from './constants';
import { Category, Status } from './types';
import type { DocumentData, DocumentItem, NewDocumentData, DisplayDocumentItem, User } from './types';

// Declare XLSX from CDN to be globally available for TypeScript
declare const XLSX: any;

interface MainAppProps {
    user: User;
    onLogout: () => void;
}

const MainApp: React.FC<MainAppProps> = ({ user, onLogout }) => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'table'>('dashboard');
  const [documentData, setDocumentData] = useState<DocumentData>(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<DisplayDocumentItem | null>(null);
  
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectingDoc, setRejectingDoc] = useState<DisplayDocumentItem | null>(null);

  const [statusFilter, setStatusFilter] = useState<Status | 'ALL'>('ALL');
  const [categoryFilter, setCategoryFilter] = useState<Category | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [startDateFilter, setStartDateFilter] = useState('');
  const [endDateFilter, setEndDateFilter] = useState('');
  const [prFilter, setPrFilter] = useState('');

  const handleUpdateStatus = useCallback((id: number, status: Status, keterangan: string | null = null) => {
    setDocumentData(prevData => {
      let categoryToUpdate: Category | null = null;
      const today = new Date().toISOString().split('T')[0];

      for (const cat of Object.keys(prevData) as Category[]) {
        if (prevData[cat].some(item => item.id === id)) {
          categoryToUpdate = cat;
          break;
        }
      }
      
      if (!categoryToUpdate) {
        console.warn(`Document with id ${id} not found.`);
        return prevData;
      }

      const updatedCategoryItems = prevData[categoryToUpdate].map(item => {
        if (item.id === id) {
          const isAcceptedOrRejected = status === Status.ACCEPTED || status === Status.REJECTED;
          return { 
            ...item, 
            status: status,
            tanggalDiterima: isAcceptedOrRejected ? today : null,
            keterangan: status === Status.REJECTED ? keterangan : (status === Status.PENDING ? null : item.keterangan)
          };
        }
        return item;
      });

      return {
        ...prevData,
        [categoryToUpdate]: updatedCategoryItems,
      };
    });
  }, []);

  const handleAddOrUpdateDocument = useCallback((docData: NewDocumentData & { id?: number }) => {
    setDocumentData(prevData => {
      const { category } = docData;
      
      if (docData.id) {
        const updatedCategoryItems = prevData[category].map(item =>
          item.id === docData.id ? { ...item, ...docData } : item
        );
        return { ...prevData, [category]: updatedCategoryItems };
      } 
      else {
        const allIds = Object.values(prevData).flat().map(item => item.id);
        const newId = allIds.length > 0 ? Math.max(...allIds) + 1 : 1;

        const newDocument: DocumentItem = {
          ...docData,
          id: newId,
          status: Status.PENDING,
          tanggalDiterima: null,
          keterangan: null,
        };
        
        const categoryItems = prevData[category];
        const updatedCategoryItems = [...categoryItems, newDocument];
        
        return {
          ...prevData,
          [category]: updatedCategoryItems,
        };
      }
    });
    setIsModalOpen(false);
    setEditingDocument(null);
  }, []);

  const handleStartEdit = (doc: DisplayDocumentItem) => {
    setEditingDocument(doc);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
      setIsModalOpen(false);
      setEditingDocument(null);
  }

  const handleAddNew = () => {
    setEditingDocument(null);
    setIsModalOpen(true);
  };

  const handleStartReject = (doc: DisplayDocumentItem) => {
    setRejectingDoc(doc);
    setIsRejectModalOpen(true);
  };

  const handleCloseRejectModal = () => {
    setIsRejectModalOpen(false);
    setRejectingDoc(null);
  };

  const handleSubmitRejectReason = (reason: string) => {
    if (rejectingDoc) {
      handleUpdateStatus(rejectingDoc.id, Status.REJECTED, reason);
    }
    handleCloseRejectModal();
  };


  const filteredData = useMemo(() => {
    const filterItems = (items: DocumentItem[]) => {
      return items.filter(item => {
        const searchMatch = searchQuery
          ? item.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
            item.vendor.toLowerCase().includes(searchQuery.toLowerCase())
          : true;
        
        const statusMatch = statusFilter !== 'ALL'
          ? item.status === statusFilter
          : true;
          
        const dateMatch = (() => {
          if (!startDateFilter && !endDateFilter) return true;
          if (startDateFilter && item.tanggal < startDateFilter) return false;
          if (endDateFilter && item.tanggal > endDateFilter) return false;
          return true;
        })();

        const prMatch = prFilter
            ? item.prNumber.toLowerCase().includes(prFilter.toLowerCase())
            : true;

        return searchMatch && statusMatch && dateMatch && prMatch;
      });
    };

    const dataToReturn: DocumentData = {
      [Category.REIMBURSE]: [],
      [Category.UM]: [],
      [Category.TTDS]: [],
    };

    if (categoryFilter === 'ALL' || categoryFilter === Category.REIMBURSE) {
      dataToReturn[Category.REIMBURSE] = filterItems(documentData.REIMBURSE);
    }
    if (categoryFilter === 'ALL' || categoryFilter === Category.UM) {
      dataToReturn[Category.UM] = filterItems(documentData.UM);
    }
    if (categoryFilter === 'ALL' || categoryFilter === Category.TTDS) {
      dataToReturn[Category.TTDS] = filterItems(documentData.TTDS);
    }

    return dataToReturn;
  }, [documentData, searchQuery, statusFilter, categoryFilter, startDateFilter, endDateFilter, prFilter]);
  
  const displayData: DisplayDocumentItem[] = useMemo(() => {
    const flattened = Object.entries(filteredData).flatMap(([category, items]) => 
      items.map(item => ({ ...item, category: category as Category }))
    );
    
    flattened.sort((a, b) => {
        const categoryOrder = [Category.REIMBURSE, Category.UM, Category.TTDS];
        const aIndex = categoryOrder.indexOf(a.category);
        const bIndex = categoryOrder.indexOf(b.category);
        if (aIndex !== bIndex) return aIndex - bIndex;
        return a.no - b.no;
    });

    return flattened;
  }, [filteredData]);

  const handleExportToExcel = useCallback(() => {
    const excelData = displayData.map((item, index) => ({
        'No.': index + 1,
        'Kategori': item.category,
        'Tanggal': item.tanggal,
        'Due Date': item.dueDate || '-',
        'Deskripsi': item.description,
        'Vendor': item.vendor,
        'No PR': item.prNumber,
        'Amount': item.amount,
        'Tanggal Diterima': item.tanggalDiterima || '-',
        'Status': item.status,
        'Keterangan': item.keterangan || '-',
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    worksheet['!cols'] = [
      { wch: 5 },  // No.
      { wch: 15 }, // Kategori
      { wch: 12 }, // Tanggal
      { wch: 12 }, // Due Date
      { wch: 50 }, // Deskripsi
      { wch: 30 }, // Vendor
      { wch: 15 }, // No PR
      { wch: 15 }, // Amount
      { wch: 15 }, // Tanggal Diterima
      { wch: 12 }, // Status
      { wch: 40 }, // Keterangan
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Dokumen Penagihan');
    XLSX.writeFile(workbook, 'Serah_Terima_Dokumen.xlsx');
  }, [displayData]);
  
  const handleClearFilters = () => {
    setCategoryFilter('ALL');
    setStatusFilter('ALL');
    setSearchQuery('');
    setStartDateFilter('');
    setEndDateFilter('');
    setPrFilter('');
  };

  return (
    <div className="min-h-screen text-slate-800">
       <AddDocumentModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleAddOrUpdateDocument}
        editingDocument={editingDocument}
      />
      <RejectReasonModal
        isOpen={isRejectModalOpen}
        onClose={handleCloseRejectModal}
        onSubmit={handleSubmitRejectReason}
      />
      <HeaderBar 
        user={user} 
        onLogout={onLogout}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        {currentPage === 'dashboard' && (
          <DashboardPage data={filteredData} />
        )}
        {currentPage === 'table' && (
          <TablePage 
            displayData={displayData}
            categoryFilter={categoryFilter}
            onCategoryFilterChange={setCategoryFilter}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            searchQuery={searchQuery}
            onSearchQueryChange={setSearchQuery}
            startDateFilter={startDateFilter}
            onStartDateFilterChange={setStartDateFilter}
            endDateFilter={endDateFilter}
            onEndDateFilterChange={setEndDateFilter}
            prFilter={prFilter}
            onPrFilterChange={setPrFilter}
            onClearFilters={handleClearFilters}
            onUpdateStatus={handleUpdateStatus}
            onEdit={handleStartEdit}
            onStartReject={handleStartReject}
            onExport={handleExportToExcel}
            onAddNew={handleAddNew}
          />
        )}
      </main>
    </div>
  );
};

export default MainApp;