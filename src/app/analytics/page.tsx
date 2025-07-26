import AnalyticsDashboard from '@/components/analytics-dashboard';

export default function AnalyticsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Analytics
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Comprehensive insights into search patterns, user behavior, and platform performance.
          </p>
        </div>
        
        <AnalyticsDashboard />
      </div>
    </div>
  );
} 