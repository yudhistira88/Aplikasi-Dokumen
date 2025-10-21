export enum Category {
    REIMBURSE = 'REIMBURSE',
    UM = 'UM',
    TTDS = 'TTDS',
}

export enum Status {
    PENDING = 'PENDING',
    ACCEPTED = 'ACCEPTED',
    REJECTED = 'REJECTED',
}

export interface User {
    name: string;
    email: string;
}

export interface DocumentItem {
    id: number;
    no: number;
    tanggal: string;
    dueDate: string | null;
    description: string;
    vendor: string;
    prNumber: string;
    amount: number;
    status: Status;
    tanggalDiterima: string | null;
    keterangan: string | null;
}

// FIX: Add DisplayDocumentItem to be used across components.
export type DisplayDocumentItem = DocumentItem & { category: Category };

export interface DocumentData {
    [Category.REIMBURSE]: DocumentItem[];
    [Category.UM]: DocumentItem[];
    [Category.TTDS]: DocumentItem[];
}

export interface NewDocumentData {
    category: Category;
    no: number;
    tanggal: string;
    dueDate: string | null;
    description: string;
    vendor: string;
    prNumber: string;
    amount: number;
}