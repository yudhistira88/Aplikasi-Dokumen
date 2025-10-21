import { Category, Status } from './types';
import type { DocumentData } from './types';

export const initialData: DocumentData = {
    [Category.REIMBURSE]: [
        { id: 1, no: 1, tanggal: '2025-09-26', dueDate: null, description: 'Event Raker Dir ProdEP tgl 25 - 26 Sept 2025', vendor: 'GA-GAF', prNumber: '1900941587', amount: 14000000, status: Status.PENDING, tanggalDiterima: null, keterangan: null },
        { id: 2, no: 2, tanggal: '2025-09-27', dueDate: null, description: 'ENT IBU RR RINA LISTIANI DGN BP KUSNADI (RELASI)', vendor: 'GA-GAF', prNumber: '1900941553', amount: 1329500, status: Status.PENDING, tanggalDiterima: null, keterangan: null },
    ],
    [Category.UM]: [
        { id: 3, no: 1, tanggal: '2025-10-01', dueDate: null, description: 'UM KONSUMSI KUNJUNGAN INDUSTRI ASTRA TECH 15/10/25', vendor: 'GA-GAF', prNumber: '8600023827', amount: 14400000, status: Status.ACCEPTED, tanggalDiterima: '2025-10-01', keterangan: null },
        { id: 4, no: 2, tanggal: '2025-10-02', dueDate: null, description: 'UM MEAL EVENT BENCHMARK - LAYANAN HOSPITALITY 28-31/10/25', vendor: 'GA-GAF', prNumber: '8600023828', amount: 18000000, status: Status.PENDING, tanggalDiterima: null, keterangan: null },
        { id: 5, no: 3, tanggal: '2025-10-03', dueDate: null, description: 'UM JAMUAN MAKAN 2 TEMA SELESAI', vendor: 'GA-GAF', prNumber: '8600023820', amount: 41580000, status: Status.PENDING, tanggalDiterima: null, keterangan: null },
    ],
    [Category.TTDS]: [
        { id: 6, no: 1, tanggal: '2025-10-05', dueDate: '22-Oct', description: 'OVERTIME DRIVER STR, AGST 2025', vendor: 'PT HADICO PERSADA', prNumber: '1900939054', amount: 22839056, status: Status.PENDING, tanggalDiterima: null, keterangan: null },
        { id: 7, no: 2, tanggal: '2025-10-06', dueDate: '22-Oct', description: 'BY TIKET INTERNATIONAL', vendor: 'PT BET OBAJA INTERNATIONAL', prNumber: '1900938255', amount: 17437424, status: Status.ACCEPTED, tanggalDiterima: '2025-10-06', keterangan: null },
        { id: 8, no: 3, tanggal: '2025-10-07', dueDate: '29-Oct', description: 'SEWA TRUK DOUBLE ENGKEL "MANDALIKA RACING SERIES"', vendor: 'ANUGERAHCATUR PUTRASANTC', prNumber: '1900940140', amount: 32340000, status: Status.PENDING, tanggalDiterima: null, keterangan: null },
        { id: 9, no: 4, tanggal: '2025-10-08', dueDate: '08-Oct', description: 'PENGIRIMAN DOKUMEN PERIODE AGST 25', vendor: 'PT CITRA VAN TITIPAN KILAT', prNumber: '1900939073', amount: 25848793, status: Status.PENDING, tanggalDiterima: null, keterangan: null },
        { id: 10, no: 5, tanggal: '2025-10-09', dueDate: '22-Oct', description: 'BY HOTEL & TIKET INTERNATIONAL', vendor: 'PT BET OBAJA INTERNATIONAL', prNumber: '1900938258', amount: 30382991, status: Status.ACCEPTED, tanggalDiterima: '2025-10-09', keterangan: null },
        { id: 11, no: 6, tanggal: '2025-10-10', dueDate: '22-Oct', description: 'BY TIKET DOMESTIK', vendor: 'PT BET OBAJA INTERNATIONAL', prNumber: '1900938270', amount: 11755470, status: Status.PENDING, tanggalDiterima: null, keterangan: null },
        { id: 12, no: 7, tanggal: '2025-10-11', dueDate: '22-Oct', description: 'BY HOTEL DOMESTIK, TIKET INTERNATIONAL & VISA', vendor: 'PT BET OBAJA INTERNATIONAL', prNumber: '1900938397', amount: 25297731, status: Status.PENDING, tanggalDiterima: null, keterangan: null },
        { id: 13, no: 8, tanggal: '2025-10-12', dueDate: '22-Oct', description: 'BY TIKET INTERNATIONAL', vendor: 'PT BET OBAJA INTERNATIONAL', prNumber: '1900938281', amount: 12950426, status: Status.PENDING, tanggalDiterima: null, keterangan: null },
        { id: 14, no: 9, tanggal: '2025-10-13', dueDate: '29-Oct', description: 'BIAYA TRAINING TAHAP LXXXVII PERIODE DES 2025', vendor: 'PT SIGAP PRIMA ASTREA', prNumber: '1900940305', amount: 72671484, status: Status.ACCEPTED, tanggalDiterima: '2025-10-13', keterangan: null },
        { id: 15, no: 10, tanggal: '2025-10-14', dueDate: '29-Oct', description: 'BIAYA TRAINING TAHAP LXXXVI PERIODE NOV 2025', vendor: 'PT SIGAP PRIMA ASTREA', prNumber: '1900940304', amount: 71671484, status: Status.PENDING, tanggalDiterima: null, keterangan: null },
        { id: 16, no: 11, tanggal: '2025-10-15', dueDate: '29-Oct', description: 'BIAYA TRAINING TAHAP LXXXV PERIODE OKT 2025', vendor: 'PT SIGAP PRIMA ASTREA', prNumber: '1900940303', amount: 71671484, status: Status.PENDING, tanggalDiterima: null, keterangan: null },
        { id: 17, no: 12, tanggal: '2025-10-16', dueDate: '29-Oct', description: 'SEWA BUS "SR SEMINAR SEPT SRP23/09/25"', vendor: 'PT BIG BIRD PUSAKA', prNumber: '1900940753', amount: 11292000, status: Status.PENDING, tanggalDiterima: null, keterangan: null },
        { id: 18, no: 13, tanggal: '2025-10-17', dueDate: '08-Oct', description: 'BY HOTEL DOMESTIK & TIKET INTERNATIONAL', vendor: 'PT BET OBAJA INTERNATIONAL', prNumber: '1900936120', amount: 18427978, status: Status.PENDING, tanggalDiterima: null, keterangan: null },
        { id: 19, no: 14, tanggal: '2025-09-03', dueDate: '03-Sep', description: 'HOTEL DOMESTIK', vendor: 'PT BET OBAJA INTERNATIONAL', prNumber: '1900930455', amount: 87906451, status: Status.PENDING, tanggalDiterima: null, keterangan: null },
        { id: 20, no: 15, tanggal: '2025-10-20', dueDate: '29-Oct', description: 'SEWA BUS "SALESMAN TRAINING BATCH SEPT 25"', vendor: 'PT BIG BIRD PUSAKA', prNumber: '1900940751', amount: 2170000, status: Status.ACCEPTED, tanggalDiterima: '2025-10-20', keterangan: null },
    ],
};