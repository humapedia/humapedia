import SearchHistory from '@/components/search-history';

export default function HistoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Search History
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            View and manage your search history, track your search patterns, and quickly repeat previous searches.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <SearchHistory />
        </div>
      </div>
    </div>
  );
} 