// API service functions for bank statement operations

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

// Basic authentication credentials
const BASIC_AUTH_USERNAME = 'klmdev';
const BASIC_AUTH_PASSWORD = 'klm@2025';

// Helper function to create Authorization header
function getAuthHeader(): string {
  const credentials = btoa(`${BASIC_AUTH_USERNAME}:${BASIC_AUTH_PASSWORD}`);
  const authHeader = `Basic ${credentials}`;
  console.log('Authorization header:', authHeader);
  return authHeader;
}

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

export type UploadResponse = string;

/**
 * Upload a PDF file to the server with progress tracking
 */
export async function uploadPdf(
  file: File, 
  onProgress?: (progress: number) => void
): Promise<UploadResponse> {
  const formData = new FormData();
  formData.append('file', file);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = Math.round((event.loaded / event.total) * 100);
        onProgress(progress);
      }
    });

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.responseText);
      } else {
        reject(new Error(`Upload failed: ${xhr.statusText}`));
      }
    });

    xhr.addEventListener('error', () => {
      reject(new Error('Upload failed: Network error'));
    });

    xhr.addEventListener('abort', () => {
      reject(new Error('Upload cancelled'));
    });

    xhr.open('POST', `${API_BASE_URL}/api/statements/upload`);
    const authHeader = getAuthHeader();
    console.log('Upload Authorization header:', authHeader);
    xhr.setRequestHeader('Authorization', authHeader);
    console.log('Upload URL:', `${API_BASE_URL}/api/statements/upload`);
    xhr.send(formData);
  });
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
  
  console.log('Fetching URL:', url);
  const headers = {
    'Authorization': getAuthHeader(),
    'Content-Type': 'application/json',
  };
  console.log('Request headers:', headers);
  
  const response = await fetch(url, { headers });
  
  console.log('Response status:', response.status);
  console.log('Response headers:', Object.fromEntries(response.headers.entries()));
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Error response:', errorText);
    throw new Error(`Failed to fetch transactions: ${errorText}`);
  }

  return response.json();
}
