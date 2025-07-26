'use client';
import { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  UsersIcon, 
  MagnifyingGlassIcon, 
  CameraIcon, 
  TrendingUpIcon, 
  CalendarIcon,
  GlobeAltIcon,
  BuildingOfficeIcon
} from '@heroicons/react/24/outline';
import { cn, formatNumber, formatDate } from '@/lib/utils';

interface AnalyticsData {
  totalSearches: number;
  faceSearches: number;
  textSearches: number;
  uniqueUsers: number;
  averageResults: number;
  topSearchedQueries: Array<{ query: string; count: number }>;
  topLocations: Array<{ location: string; count: number }>;
  topProfessions: Array<{ profession: string; count: number }>;
  topCompanies: Array<{ company: string; count: number }>;
  dailyStats: Array<{ date: string; searches: number; users: number }>;
  monthlyGrowth: {
    searches: number;
    users: number;
    faceSearches: number;
    textSearches: number;
  };
}

interface AnalyticsDashboardProps {
  timeRange?: '7d' | '30d' | '90d' | '1y';
  onTimeRangeChange?: (range: '7d' | '30d' | '90d' | '1y') => void;
}

export default function AnalyticsDashboard({ 
  timeRange = '30d', 
  onTimeRangeChange 
}: AnalyticsDashboardProps) {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMetric, setSelectedMetric] = useState<'searches' | 'users' | 'results'>('searches');

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setIsLoading(true);
      // Mock API call - in real app, this would fetch from /api/analytics
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockData: AnalyticsData = {
        totalSearches: 15420,
        faceSearches: 5234,
        textSearches: 10186,
        uniqueUsers: 3421,
        averageResults: 8.7,
        topSearchedQueries: [
          { query: 'John Smith', count: 156 },
          { query: 'Sarah Johnson', count: 134 },
          { query: 'Michael Brown', count: 98 },
          { query: 'Emily Davis', count: 87 },
          { query: 'David Wilson', count: 76 }
        ],
        topLocations: [
          { location: 'New York, NY', count: 2341 },
          { location: 'Los Angeles, CA', count: 1987 },
          { location: 'Chicago, IL', count: 1456 },
          { location: 'Houston, TX', count: 1234 },
          { location: 'Phoenix, AZ', count: 987 }
        ],
        topProfessions: [
          { profession: 'Software Engineer', count: 2341 },
          { profession: 'Marketing Manager', count: 1876 },
          { profession: 'Sales Representative', count: 1654 },
          { profession: 'Product Manager', count: 1432 },
          { profession: 'Data Analyst', count: 1234 }
        ],
        topCompanies: [
          { company: 'Google', count: 456 },
          { company: 'Microsoft', count: 398 },
          { company: 'Apple', count: 345 },
          { company: 'Amazon', count: 312 },
          { company: 'Meta', count: 287 }
        ],
        dailyStats: Array.from({ length: 30 }, (_, i) => ({
          date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          searches: Math.floor(Math.random() * 200) + 300,
          users: Math.floor(Math.random() * 50) + 80
        })),
        monthlyGrowth: {
          searches: 23.4,
          users: 18.7,
          faceSearches: 31.2,
          textSearches: 19.8
        }
      };
      
      setData(mockData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load analytics');
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

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-8 bg-gray-200 rounded w-1/3"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center py-12">
        <ChartBarIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Failed to load analytics</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <button
          onClick={fetchAnalytics}
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
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h2>
          <p className="text-gray-600 dark:text-gray-400">Search activity and user insights</p>
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
                {formatNumber(data.totalSearches)}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="h-4 w-4 mr-1" />
                +{data.monthlyGrowth.searches}%
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <MagnifyingGlassIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Face Searches</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(data.faceSearches)}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="h-4 w-4 mr-1" />
                +{data.monthlyGrowth.faceSearches}%
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <CameraIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Unique Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {formatNumber(data.uniqueUsers)}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400 flex items-center">
                <TrendingUpIcon className="h-4 w-4 mr-1" />
                +{data.monthlyGrowth.users}%
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
                {data.averageResults.toFixed(1)}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">per search</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center">
              <ChartBarIcon className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Searched Queries */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Searched Queries</h3>
          <div className="space-y-3">
            {data.topSearchedQueries.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 dark:text-gray-400">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.query}</span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.count} searches</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Locations */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
            <GlobeAltIcon className="h-5 w-5 mr-2" />
            Top Locations
          </h3>
          <div className="space-y-3">
            {data.topLocations.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-xs font-medium text-blue-600 dark:text-blue-400">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.location}</span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.count} searches</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Professions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Top Professions</h3>
          <div className="space-y-3">
            {data.topProfessions.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-xs font-medium text-green-600 dark:text-green-400">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.profession}</span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.count} searches</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Companies */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
            <BuildingOfficeIcon className="h-5 w-5 mr-2" />
            Top Companies
          </h3>
          <div className="space-y-3">
            {data.topCompanies.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="w-6 h-6 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-xs font-medium text-purple-600 dark:text-purple-400">
                    {index + 1}
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">{item.company}</span>
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">{item.count} searches</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Activity Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2" />
          Daily Search Activity
        </h3>
        <div className="h-64 flex items-end justify-between space-x-1">
          {data.dailyStats.map((day, index) => {
            const maxSearches = Math.max(...data.dailyStats.map(d => d.searches));
            const height = (day.searches / maxSearches) * 100;
            return (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-blue-500 rounded-t transition-all hover:bg-blue-600"
                  style={{ height: `${height}%` }}
                  title={`${day.date}: ${day.searches} searches`}
                ></div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {new Date(day.date).getDate()}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
} 