import React from 'react';
import DocumentRow from './DocumentRow';
import { Category, Status } from '../types';
// FIX: Import DisplayDocumentItem from central types file.
import type { DisplayDocumentItem } from '../types';

interface DocumentTableProps {
  items: DisplayDocumentItem[];
  onUpdateStatus: (id: number, status: Status, keterangan?: string) => void;
  // FIX: Update onEdit to expect the more specific DisplayDocumentItem type.
  onEdit: (item: DisplayDocumentItem) => void;
  onStartReject: (item: DisplayDocumentItem) => void; // Add new prop
}

const DocumentTable: React.FC<DocumentTableProps> = ({ items, onUpdateStatus, onEdit, onStartReject }) => {
  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value);
  };

  return (
    <section>
      <div className="overflow-x-auto rounded-xl border border-slate-200/80 shadow-lg shadow-slate-200/50">
        <table className="w-full text-sm text-left text-slate-600">
          <thead className="text-xs text-slate-700 uppercase bg-slate-100/80 backdrop-blur-sm sticky top-0 z-10">
            <tr>
              <th scope="col" className="px-4 py-3 w-16 text-center">NO</th>
              <th scope="col" className="px-4 py-3 w-32">KATEGORI</th>
              <th scope="col" className="px-4 py-3 w-32">TANGGAL</th>
              <th scope="col" className="px-4 py-3 w-32">DUE DATE</th>
              <th scope="col" className="px-4 py-3">DESKRIPSI</th>
              <th scope="col" className="px-4 py-3">VENDOR</th>
              <th scope="col" className="px-4 py-3 w-32">NO PR</th>
              <th scope="col" className="px-4 py-3 w-40 text-right">AMOUNT</th>
              <th scope="col" className="px-4 py-3 w-32">TANGGAL DITERIMA</th>
              <th scope="col" className="px-4 py-3 w-48 text-center">AKSI</th>
              <th scope="col" className="px-4 py-3">KETERANGAN</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <DocumentRow 
                key={item.id} 
                item={item} 
                displayIndex={index + 1}
                onUpdateStatus={onUpdateStatus} 
                onEdit={onEdit}
                onStartReject={onStartReject} // Pass prop down
                animationDelay={index * 30}
              />
            ))}
          </tbody>
          <tfoot>
            <tr className="font-semibold text-slate-800 bg-slate-100/80">
              <td colSpan={7} className="px-4 py-3 text-right font-bold text-base">TOTAL</td>
              <td className="px-4 py-3 text-right font-bold text-base">{formatCurrency(totalAmount)}</td>
              <td colSpan={3} className="px-4 py-3"></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
};

export default DocumentTable;