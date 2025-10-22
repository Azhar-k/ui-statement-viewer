// API service functions for bank statement operations

const API_BASE_URL = 'http://localhost:8080';

export interface Transaction {
  id: number;
  date: string;
  description: string;
  debit: number | null;
  credit: number | null;
  balance: number;
  txnHash: string;
}

export interface PageResponse {
  content: Transaction[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

export interface TransactionFilters {
  page?: number;
  size?: number;
  sortBy?: 'date' | 'description' | 'debit' | 'credit' | 'balance';
  sortDir?: 'asc' | 'desc';
  fromDate?: string;
  toDate?: string;
  keyword?: string;
  minDebit?: number;
  maxDebit?: number;
  minCredit?: number;
  maxCredit?: number;
  minBalance?: number;
  maxBalance?: number;
}

export interface UploadResponse {
  message: string;
}

/**
 * Upload a PDF file to the server
 */
export async function uploadPdf(file: File): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/statements/upload`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Upload failed: ${errorText}`);
  }

  return response.json();
}

/**
 * Fetch transactions with optional filters
 */
export async function getTransactions(filters: TransactionFilters = {}): Promise<PageResponse> {
  const params = new URLSearchParams();
  
  // Add all non-undefined filter parameters
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, value.toString());
    }
  });

  const url = `${API_BASE_URL}/api/statements/transactions?${params.toString()}`;
  
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch transactions: ${errorText}`);
  }

  return response.json();
}
