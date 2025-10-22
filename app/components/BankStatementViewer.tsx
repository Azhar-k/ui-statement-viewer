import { useState } from 'react';
import { PdfUpload } from './PdfUpload';
import { TransactionList } from './TransactionList';
import { TransactionFiltersComponent } from './TransactionFilters';
import type { TransactionFilters } from '../services/api';

export function BankStatementViewer() {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [filters, setFilters] = useState<TransactionFilters>({
    page: 0,
    size: 40,
    sortBy: 'date',
    sortDir: 'desc'
  });

  const handleUploadSuccess = (message: string) => {
    setUploadMessage(message);
    setUploadError(null);
    // Trigger refresh of transaction list
    setRefreshTrigger(prev => prev + 1);
  };

  const handleUploadError = (error: string) => {
    setUploadError(error);
    setUploadMessage(null);
  };

  const handleFiltersChange = (newFilters: TransactionFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Bank Statement Viewer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Upload your bank statement PDF and view transactions with advanced filtering
          </p>
        </div>

        {/* Upload Section */}
        <div className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Upload Bank Statement
            </h2>
            <PdfUpload
              onUploadSuccess={handleUploadSuccess}
              onUploadError={handleUploadError}
            />
            
            {/* Upload Messages */}
            {uploadMessage && (
              <div className="mt-4 p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      {uploadMessage}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {uploadError && (
              <div className="mt-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-red-800 dark:text-red-200">
                      {uploadError}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Filters Section */}
        <TransactionFiltersComponent
          onFiltersChange={handleFiltersChange}
          currentFilters={filters}
        />

        {/* Transactions Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Transactions
          </h2>
          <TransactionList 
            refreshTrigger={refreshTrigger}
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </div>
      </div>
    </div>
  );
}
