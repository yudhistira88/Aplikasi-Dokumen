import React from 'react';
import { Status, Category } from '../types';
// FIX: Import DisplayDocumentItem from central types file.
import type { DisplayDocumentItem } from '../types';
import PencilIcon from './icons/PencilIcon';

interface DocumentRowProps {
  item: DisplayDocumentItem;
  displayIndex: number;
  onUpdateStatus: (id: number, status: Status, keterangan?: string) => void;
  onEdit: (item: DisplayDocumentItem) => void;
  onStartReject: (item: DisplayDocumentItem) => void;
  animationDelay: number;
}

const DocumentRow: React.FC<DocumentRowProps> = ({ item, displayIndex, onUpdateStatus, onEdit, onStartReject, animationDelay }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('id-ID').format(value);
  };

  const getRowClass = () => {
    switch (item.status) {
      case Status.ACCEPTED:
        return 'bg-emerald-50 hover:bg-emerald-100/70';
      case Status.REJECTED:
        return 'bg-rose-50 hover:bg-rose-100/70';
      default:
        return 'bg-white/50 hover:bg-sky-100/60';
    }
  };

  const renderActionCell = () => {
    return (
        <div className="flex justify-center items-center gap-2">
            <button
                onClick={() => onEdit(item)}
                className="p-1.5 text-slate-500 hover:text-sky-600 bg-slate-100 hover:bg-sky-100 rounded-md transition-all transform hover:scale-110"
                aria-label={`Edit dokumen ${item.description}`}
            >
                <PencilIcon />
            </button>
            {item.status === Status.PENDING && (
                <>
                    <button
                        onClick={() => onUpdateStatus(item.id, Status.ACCEPTED)}
                        className="px-3 py-1 text-xs font-medium text-white bg-emerald-500 rounded-md shadow-sm hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 transition-all transform hover:scale-110"
                        aria-label={`Terima dokumen ${item.description}`}
                    >
                        Diterima
                    </button>
                    <button
                        onClick={() => onStartReject(item)}
                        className="px-3 py-1 text-xs font-medium text-white bg-rose-500 rounded-md shadow-sm hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400 transition-all transform hover:scale-110"
                        aria-label={`Tolak dokumen ${item.description}`}
                    >
                        Ditolak
                    </button>
                </>
            )}
            {item.status === Status.ACCEPTED && (
                <>
                    <span className="px-3 py-1 text-xs font-bold text-emerald-800 bg-emerald-200/80 rounded-full">
                        Diterima
                    </span>
                    <button onClick={() => onUpdateStatus(item.id, Status.PENDING)} className="text-xs text-slate-600 hover:underline">
                        Ubah Status
                    </button>
                </>
            )}
            {item.status === Status.REJECTED && (
                 <>
                    <span className="px-3 py-1 text-xs font-bold text-rose-800 bg-rose-200/80 rounded-full">
                        Ditolak
                    </span>
                    <button onClick={() => onUpdateStatus(item.id, Status.PENDING)} className="text-xs text-slate-600 hover:underline">
                        Ubah Status
                    </button>
                </>
            )}
        </div>
    );
  };


  return (
    <tr 
      className={`border-b border-slate-200/80 transition-all duration-300 ease-in-out hover:shadow-md hover:scale-[1.015] hover:z-10 relative animate-fadeInUp ${getRowClass()}`}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <td className="px-4 py-3 font-medium text-slate-900 text-center">{displayIndex}</td>
      <td className="px-4 py-3 font-semibold">{item.category}</td>
      <td className="px-4 py-3">{item.tanggal}</td>
      <td className="px-4 py-3">{item.dueDate || '-'}</td>
      <td className="px-4 py-3">{item.description}</td>
      <td className="px-4 py-3">{item.vendor}</td>
      <td className="px-4 py-3">{item.prNumber}</td>
      <td className="px-4 py-3 text-right font-mono font-semibold">{formatCurrency(item.amount)}</td>
      <td className="px-4 py-3">{item.tanggalDiterima || '-'}</td>
      <td className="px-4 py-3 text-center">
        {renderActionCell()}
      </td>
      <td className="px-4 py-3 text-rose-800">{item.status === Status.REJECTED ? item.keterangan : '-'}</td>
    </tr>
  );
};

export default DocumentRow;