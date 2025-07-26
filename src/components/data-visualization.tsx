'use client';
import { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  TrendingUpIcon, 
  UsersIcon, 
  GlobeAltIcon,
  CalendarIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import { cn, formatNumber, formatDate } from '@/lib/utils';

interface ChartData {
  labels: string[];
  datasets: Array<{
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
  }>;
}

interface AnalyticsMetrics {
  totalSearches: number;
  faceSearches: number;
  textSearches: number;
  uniqueUsers: number;
  averageResults: number;
  topLocations: Array<{ location: string; count: number }>;
  searchTrends: Array<{ date: string; searches: number; users: number }>;
  userGrowth: Array<{ month: string; users: number; growth: number }>;
  searchDistribution: Array<{ type: string; count: number; percentage: number }>;
}

interface DataVisualizationProps {
  timeRange?: '7d' | '30d' | '90d' | '1y';
  onTimeRangeChange?: (range: '7d' | '30d' | '90d' | '1y') => void;
}

export default function DataVisualization({ 
  timeRange = '30d', 
  onTimeRangeChange 
}: DataVisualizationProps) {
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedChart, setSelectedChart] = useState<'trends' | 'distribution' | 'locations' | 'growth'>('trends');

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setIsLoading(true);
      // Mock API call - in real app, this would fetch from /api/analytics/visualization
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockMetrics: AnalyticsMetrics = {
        totalSearches: 15420,
        faceSearches: 5234,
        textSearches: 10186,
        uniqueUsers: 3421,
        averageResults: 8.7,
        topLocations: [
          { location: 'New York, NY', count: 2341 },
          { location: 'Los Angeles, CA', count: 1987 },
          { location: 'Chicago, IL', count: 1456 },
          { location: 'Houston, TX', count: 1234 },
          { location: 'Phoenix, AZ', count: 987 },
          { location: 'Philadelphia, PA', count: 876 },
          { location: 'San Antonio, TX', count: 765 },
          { location: 'San Diego, CA', count: 654 }
        ],
        searchTrends: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          searches: Math.floor(Math.random() * 200) + 300,
          users: Math.floor(Math.random() * 50) + 80
        })),
        userGrowth: [
          { month: 'Jan', users: 2800, growth: 12.5 },
          { month: 'Feb', users: 2950, growth: 5.4 },
          { month: 'Mar', users: 3120, growth: 5.8 },
          { month: 'Apr', users: 3280, growth: 5.1 },
          { month: 'May', users: 3450, growth: 5.2 },
          { month: 'Jun', users: 3620, growth: 4.9 },
          { month: 'Jul', users: 3780, growth: 4.4 },
          { month: 'Aug', users: 3950, growth: 4.5 },
          { month: 'Sep', users: 4120, growth: 4.3 },
          { month: 'Oct', users: 4280, growth: 3.9 },
          { month: 'Nov', users: 4450, growth: 4.0 },
          { month: 'Dec', users: 4620, growth: 3.8 }
        ],
        searchDistribution: [
          { type: 'Face Search', count: 5234, percentage: 34.0 },
          { type: 'Text Search', count: 10186, percentage: 66.0 }
        ]
      };
      
      setMetrics(mockMetrics);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics data');
    } finally {
      setIsLoading(false);
    }
  };

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' }
  ];

  const chartOptions = [
    { id: 'trends', label: 'Search Trends', icon: TrendingUpIcon },
    { id: 'distribution', label: 'Search Distribution', icon: ChartBarIcon },
    { id: 'locations', label: 'Top Locations', icon: GlobeAltIcon },
    { id: 'growth', label: 'User Growth', icon: UsersIcon }
  ];

  const renderSearchTrendsChart = () => {
    if (!metrics) return null;

    const maxSearches = Math.max(...metrics.searchTrends.map(d => d.searches));
    const maxUsers = Math.max(...metrics.searchTrends.map(d => d.users));

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Daily Search Activity</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Searches</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span className="text-gray-600 dark:text-gray-400">Users</span>
            </div>
          </div>
        </div>
        
        <div className="h-64 flex items-end justify-between space-x-1">
          {metrics.searchTrends.map((day, index) => {
            const searchHeight = (day.searches / maxSearches) * 100;
            const userHeight = (day.users / maxUsers) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center space-y-1">
                <div className="w-full flex flex-col space-y-1">
                  <div 
                    className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                    style={{ height: `${searchHeight}%` }}
                    title={`${day.date}: ${day.searches} searches`}
                  ></div>
                  <div 
                    className="w-full bg-green-500 rounded-t transition-all hover:bg-green-600"
                    style={{ height: `${userHeight}%` }}
                    title={`${day.date}: ${day.users} users`}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(day.date).getDate()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSearchDistributionChart = () => {
    if (!metrics) return null;

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Search Type Distribution</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="relative h-64 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              {metrics.searchDistribution.map((item, index) => {
                const radius = 40;
                const circumference = 2 * Math.PI * radius;
                const strokeDasharray = (item.percentage / 100) * circumference;
                const strokeDashoffset = index === 0 ? 0 : 
                  -metrics.searchDistribution.slice(0, index).reduce((sum, d) => sum + (d.percentage / 100) * circumference, 0);
                
                return (
                  <circle
                    key={item.type}
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke={index === 0 ? "#3B82F6" : "#10B981"}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    transform="rotate(-90 50 50)"
                  />
                );
              })}
            </svg>
            <div className="absolute text-center">
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(metrics.totalSearches)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Searches</div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-3">
            {metrics.searchDistribution.map((item, index) => (
              <div key={item.type} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: index === 0 ? "#3B82F6" : "#10B981" }}
                  ></div>
                  <span className="font-medium text-gray-900 dark:text-white">{item.type}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium text-gray-900 dark:text-white">
                    {formatNumber(item.count)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {item.percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderTopLocationsChart = () => {
    if (!metrics) return null;

    const maxCount = Math.max(...metrics.topLocations.map(l => l.count));

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Top Search Locations</h3>
        
        <div className="space-y-3">
          {metrics.topLocations.map((location, index) => {
            const percentage = (location.count / maxCount) * 100;
            return (
              <div key={location.location} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400">
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">{location.location}</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {formatNumber(location.count)} searches
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderUserGrowthChart = () => {
    if (!metrics) return null;

    const maxUsers = Math.max(...metrics.userGrowth.map(u => u.users));

    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Monthly User Growth</h3>
        
        <div className="h-64 flex items-end justify-between space-x-2">
          {metrics.userGrowth.map((month, index) => {
            const height = (month.users / maxUsers) * 100;
            return (
              <div key={month.month} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-purple-500 rounded-t transition-all hover:bg-purple-600"
                  style={{ height: `${height}%` }}
                  title={`${month.month}: ${formatNumber(month.users)} users (+${month.growth}%)`}
                ></div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {month.month}
                </span>
                <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                  +{month.growth}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
        <div className="h-64 bg-gray-200 rounded-lg"></div>
      </div>
    );
  }

  if (error || !metrics) {
    return (
      <div className="text-center py-12">
        <ChartBarIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Failed to load data</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <button
          onClick={fetchAnalyticsData}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Data Visualization</h2>
          <p className="text-gray-600 dark:text-gray-400">Interactive charts and analytics insights</p>
        </div>
        <div className="flex items-center space-x-2">
          {timeRangeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onTimeRangeChange?.(option.value as any)}
              className={cn(
                "px-3 py-1 text-sm rounded-lg transition-colors",
                timeRange === option.value
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Searches</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(metrics.totalSearches)}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Face Searches</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(metrics.faceSearches)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <UsersIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Unique Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(metrics.uniqueUsers)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <UsersIcon className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Results</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {metrics.averageResults.toFixed(1)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <TrendingUpIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Chart Navigation */}
      <div className="flex justify-center">
        <nav className="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {chartOptions.map((option) => {
            const Icon = option.icon;
            return (
              <button
                key={option.id}
                onClick={() => setSelectedChart(option.id as any)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  selectedChart === option.id
                    ? "bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{option.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Chart Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        {selectedChart === 'trends' && renderSearchTrendsChart()}
        {selectedChart === 'distribution' && renderSearchDistributionChart()}
        {selectedChart === 'locations' && renderTopLocationsChart()}
        {selectedChart === 'growth' && renderUserGrowthChart()}
      </div>
    </div>
  );
} 