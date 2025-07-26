import DataVisualization from '@/components/data-visualization';

export default function VisualizationPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Data Visualization
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Explore interactive charts and analytics insights for search patterns and user behavior.
          </p>
        </div>
        
        <DataVisualization />
      </div>
    </div>
  );
} 