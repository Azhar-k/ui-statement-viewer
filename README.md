# Bank Statement Viewer

A modern React application for uploading and viewing bank statement transactions with advanced filtering capabilities.

## Features

- 📄 **PDF Upload**: Drag and drop or click to upload bank statement PDFs
- 🔍 **Advanced Filtering**: Filter transactions by date range, amounts, keywords, and more
- 📊 **Transaction Viewing**: View transactions in a clean, sortable table format
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🌙 **Dark Mode**: Built-in dark mode support
- ⚡ **Real-time Updates**: Automatic refresh after successful uploads
- 🔄 **Pagination**: Efficient pagination for large transaction lists

## API Integration

This application integrates with the Bank Statement Viewer API:

- **Upload Endpoint**: `POST /api/statements/upload` - Upload PDF files
- **Transactions Endpoint**: `GET /api/statements/transactions` - Fetch paginated transactions with filters

### Supported Filters

- Date range filtering (from/to dates)
- Keyword search in descriptions
- Amount range filtering (debit, credit, balance)
- Sorting by date, description, debit, credit, or balance
- Pagination with configurable page sizes

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Bank Statement Viewer API running on `http://localhost:8080`

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

### Building for Production

Create a production build:

```bash
npm run build
```

Start the production server:

```bash
npm run start
```

## Docker Deployment

Build and run using Docker:

```bash
docker build -t bank-statement-viewer .

# Run the container
docker run -p 3000:3000 bank-statement-viewer
```

## Usage

1. **Upload a Bank Statement**:
   - Drag and drop a PDF file onto the upload area, or click to browse
   - The system will process the PDF and extract transaction data
   - Success/error messages will be displayed

2. **View Transactions**:
   - Transactions are automatically displayed in a table format
   - Use the sorting headers to sort by different columns
   - Navigate through pages using the pagination controls

3. **Filter Transactions**:
   - Click "Expand Filters" to access advanced filtering options
   - Set date ranges, amount ranges, or search keywords
   - Click "Apply Filters" to update the results
   - Use "Clear All" to reset all filters

## Technology Stack

- **React Router 7**: Modern React framework with SSR
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React 19**: Latest React features

## Project Structure

```
app/
├── components/
│   ├── BankStatementViewer.tsx    # Main application component
│   ├── PdfUpload.tsx              # PDF upload component
│   ├── TransactionList.tsx        # Transaction table with pagination
│   └── TransactionFilters.tsx    # Advanced filtering component
├── services/
│   └── api.ts                     # API service functions
└── routes/
    └── home.tsx                   # Main route component
```

## API Configuration

The API base URL is configured in `app/services/api.ts`. To change the API endpoint:

```typescript
const API_BASE_URL = 'http://localhost:8080'; // Change this to your API URL
```

---

Built with ❤️ using React Router and modern web technologies.
