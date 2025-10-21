import React, { useState, FormEvent, useEffect } from 'react';
import XIcon from './icons/XIcon';

interface RejectReasonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (reason: string) => void;
}

const RejectReasonModal: React.FC<RejectReasonModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [reason, setReason] = useState('');

  useEffect(() => {
    // Reset reason when modal becomes visible
    if (isOpen) {
      setReason('');
    }
  }, [isOpen]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) {
      alert('Alasan penolakan tidak boleh kosong.');
      return;
    }
    onSubmit(reason);
  };

  return (
    <div 
      className={`fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      aria-modal="true" 
      role="dialog" 
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-2xl shadow-xl w-full max-w-lg transform transition-all duration-300 ease-in-out ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-800">Alasan Penolakan</h3>
            <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
              <XIcon />
            </button>
          </div>
          <div className="p-6">
            <label htmlFor="rejectionReason" className="block text-sm font-medium text-slate-700 mb-2">
              Mohon berikan alasan mengapa dokumen ini ditolak.
            </label>
            <textarea
              id="rejectionReason"
              name="rejectionReason"
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-shadow"
              placeholder="Ketik alasan di sini..."
              required
            />
          </div>
          <div className="flex justify-end items-center p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
            <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 mr-3 transition-all">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 text-sm font-semibold text-white bg-rose-600 border border-transparent rounded-lg shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-all">
              Tolak Dokumen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RejectReasonModal;