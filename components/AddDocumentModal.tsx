import React, { useState, FormEvent, useEffect } from 'react';
import { Category } from '../types';
// FIX: Import DisplayDocumentItem for better type safety.
import type { NewDocumentData, DisplayDocumentItem } from '../types';
import XIcon from './icons/XIcon';

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: NewDocumentData & { id?: number }) => void;
  // FIX: Use the more specific DisplayDocumentItem type for the editing document prop.
  editingDocument: DisplayDocumentItem | null;
}

const AddDocumentModal: React.FC<AddDocumentModalProps> = ({ isOpen, onClose, onSave, editingDocument }) => {
  const isEditing = !!editingDocument;
  const initialFormState = {
    category: Category.REIMBURSE,
    no: '',
    tanggal: '',
    dueDate: '',
    description: '',
    vendor: '',
    prNumber: '',
    amount: '',
  };

  const [formData, setFormData] = useState(initialFormState);
  
  useEffect(() => {
    if (isOpen) {
      if (isEditing) {
        // Populate form with editing data
        setFormData({
          // FIX: Correctly use the category from the editing document. The previous comparison between Category and Status was invalid.
          category: editingDocument.category,
          no: String(editingDocument.no),
          tanggal: editingDocument.tanggal,
          dueDate: editingDocument.dueDate || '',
          description: editingDocument.description,
          vendor: editingDocument.vendor,
          prNumber: editingDocument.prNumber,
          amount: String(editingDocument.amount),
        });
      } else {
        // Reset form for new entry
        setFormData(initialFormState);
      }
    }
  }, [isOpen, editingDocument, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.vendor || !formData.prNumber || !formData.amount || !formData.no || !formData.tanggal) {
      alert('Mohon lengkapi semua field yang wajib diisi.');
      return;
    }
    
    const saveData = {
        ...formData,
        amount: parseFloat(formData.amount) || 0,
        no: parseInt(formData.no, 10) || 0,
        dueDate: formData.dueDate || null,
        id: isEditing ? editingDocument.id : undefined,
    };
    onSave(saveData);
  };

  return (
    <div 
      className={`fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      aria-modal="true" 
      role="dialog" 
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-2xl shadow-xl w-full max-w-xl transform transition-all duration-300 ease-in-out ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`} 
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center p-6 border-b border-slate-200">
            <h3 className="text-xl font-bold text-slate-800">{isEditing ? 'Edit Dokumen' : 'Tambah Dokumen Baru'}</h3>
            <button type="button" onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors">
              <XIcon />
            </button>
          </div>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                  <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                  <select id="category" name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow">
                    <option value={Category.REIMBURSE}>REIMBURSE</option>
                    <option value={Category.UM}>UM</option>
                    <option value={Category.TTDS}>TTDS</option>
                  </select>
               </div>
               <div>
                  <label htmlFor="no" className="block text-sm font-medium text-slate-700 mb-1">No. Urut Kategori</label>
                  <input type="number" id="no" name="no" value={formData.no} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow" required />
               </div>
            </div>
             <div>
                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">Deskripsi</label>
                <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow" required />
             </div>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                  <label htmlFor="vendor" className="block text-sm font-medium text-slate-700 mb-1">Vendor</label>
                  <input type="text" id="vendor" name="vendor" value={formData.vendor} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow" required />
               </div>
               <div>
                  <label htmlFor="prNumber" className="block text-sm font-medium text-slate-700 mb-1">No PR</label>
                  <input type="text" id="prNumber" name="prNumber" value={formData.prNumber} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow" required />
               </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-slate-700 mb-1">Amount</label>
                  <input type="number" step="any" id="amount" name="amount" value={formData.amount} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow" required />
               </div>
                <div>
                  <label htmlFor="tanggal" className="block text-sm font-medium text-slate-700 mb-1">Tanggal</label>
                  <input type="date" id="tanggal" name="tanggal" value={formData.tanggal} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow" required />
               </div>
            </div>
             <div>
                <label htmlFor="dueDate" className="block text-sm font-medium text-slate-700 mb-1">Due Date <span className="text-slate-400">(Optional)</span></label>
                <input type="text" id="dueDate" name="dueDate" placeholder="e.g., 25-Nov" value={formData.dueDate || ''} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-shadow" />
             </div>
          </div>
          <div className="flex justify-end items-center p-6 border-t border-slate-200 bg-slate-50 rounded-b-2xl">
            <button type="button" onClick={onClose} className="px-5 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg shadow-sm hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 mr-3 transition-all">
              Batal
            </button>
            <button type="submit" className="px-5 py-2 text-sm font-semibold text-white bg-sky-600 border border-transparent rounded-lg shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transition-all">
              {isEditing ? 'Simpan Perubahan' : 'Simpan Dokumen'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDocumentModal;