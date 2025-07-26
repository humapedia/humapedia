'use client';
import { useState, useEffect } from 'react';
import { ClockIcon, TrashIcon, ChartBarIcon, MagnifyingGlassIcon, CalendarIcon, EyeIcon } from '@heroicons/react/24/outline';
import { cn, formatDate, formatNumber } from '@/lib/utils';

interface SearchHistoryEntry {
  id: string;
  query: string;
  type: 'face' | 'text';
  timestamp: string;
  resultsCount: number;
  filters?: {
    location?: string;
    profession?: string;
    company?: string;
  };
}

interface SearchStats {
  totalSearches: number;
  faceSearches: number;
  textSearches: number;
  averageResults: number;
  mostSearchedQueries: Array<{ query: string; count: number }>;
  recentActivity: Array<{ date: string; count: number }>;
}

interface SearchHistoryProps {
  userId?: string;
  onSearchSelect?: (query: string, type: 'face' | 'text', filters?: any) => void;
  onClearHistory?: () => void;
}

export default function SearchHistory({ userId = 'user-1', onSearchSelect, onClearHistory }: SearchHistoryProps) {
  const [history, setHistory] = useState<SearchHistoryEntry[]>([]);
  const [stats, setStats] = useState<SearchStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [showStats, setShowStats] = useState(true);

  useEffect(() => {
    fetchSearchHistory();
  }, [userId]);

  const fetchSearchHistory = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/search-history?userId=${userId}&page=1&limit=50`);
      if (!response.ok) throw new Error('Failed to fetch search history');
      
      const data = await response.json();
      setHistory(data.history || []);
      setStats(data.stats || null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load search history');
    } finally {
      setIsLoading(false);
    }
  };

  const deleteEntry = async (entryId: string) => {
    try {
      const response = await fetch('/api/search-history', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, entryId }),
      });
      
      if (!response.ok) throw new Error('Failed to delete entry');
      
      setHistory(prev => prev.filter(entry => entry.id !== entryId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete entry');
    }
  };

  const clearAllHistory = async () => {
    try {
      const response = await fetch('/api/search-history', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, clearAll: true }),
      });
      
      if (!response.ok) throw new Error('Failed to clear history');
      
      setHistory([]);
      onClearHistory?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear history');
    }
  };

  const handleSearchSelect = (entry: SearchHistoryEntry) => {
    onSearchSelect?.(entry.query, entry.type, entry.filters);
  };

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={fetchSearchHistory}
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
        <div className="flex items-center space-x-2">
          <ClockIcon className="h-6 w-6 text-gray-600" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Search History</h2>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowStats(!showStats)}
            className={cn(
              "px-3 py-1 text-sm rounded-lg transition-colors",
              showStats 
                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300" 
                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
            )}
          >
            <ChartBarIcon className="h-4 w-4 inline mr-1" />
            Stats
          </button>
          {history.length > 0 && (
            <button
              onClick={clearAllHistory}
              className="px-3 py-1 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
            >
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Statistics */}
      {showStats && stats && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Search Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {formatNumber(stats.totalSearches)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Searches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatNumber(stats.faceSearches)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Face Searches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                {formatNumber(stats.textSearches)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Text Searches</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                {stats.averageResults.toFixed(1)}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Avg Results</div>
            </div>
          </div>
          
          {stats.mostSearchedQueries.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Most Searched</h4>
              <div className="flex flex-wrap gap-2">
                {stats.mostSearchedQueries.slice(0, 5).map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                  >
                    {item.query} ({item.count})
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Search History List */}
      {history.length === 0 ? (
        <div className="text-center py-12">
          <ClockIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No search history</h3>
          <p className="text-gray-600 dark:text-gray-400">Your search history will appear here once you start searching.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => (
            <div
              key={entry.id}
              className={cn(
                "bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700 transition-all hover:shadow-md cursor-pointer",
                selectedEntry === entry.id && "ring-2 ring-blue-500"
              )}
              onClick={() => setSelectedEntry(entry.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    {entry.type === 'face' ? (
                      <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <span className="text-xs text-blue-600 dark:text-blue-400">👤</span>
                      </div>
                    ) : (
                      <div className="w-6 h-6 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <span className="text-xs text-green-600 dark:text-green-400">🔍</span>
                      </div>
                    )}
                    <span className="font-medium text-gray-900 dark:text-white truncate">
                      {entry.query}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {entry.resultsCount} results
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="h-4 w-4" />
                      <span>{formatDate(entry.timestamp)}</span>
                    </div>
                    {entry.filters && Object.keys(entry.filters).length > 0 && (
                      <div className="flex items-center space-x-1">
                        <FunnelIcon className="h-4 w-4" />
                        <span>Filtered</span>
                      </div>
                    )}
                  </div>
                  
                  {entry.filters && Object.keys(entry.filters).length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {Object.entries(entry.filters).map(([key, value]) => (
                        value && (
                          <span
                            key={key}
                            className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                          >
                            {key}: {value}
                          </span>
                        )
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSearchSelect(entry);
                    }}
                    className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                    title="Repeat search"
                  >
                    <MagnifyingGlassIcon className="h-4 w-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteEntry(entry.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                    title="Delete entry"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 