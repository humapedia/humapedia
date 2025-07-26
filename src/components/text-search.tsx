'use client';

import { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

interface TextSearchResult {
  id: string;
  name: string;
  profession: string;
  company: string;
  location: string;
  imageUrl: string;
  bio: string;
  email: string;
  phone: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
  skills: string[];
  experience: Array<{
    title: string;
    company: string;
    duration: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
}

interface TextSearchProps {
  onResults?: (results: TextSearchResult[]) => void;
  onError?: (error: string) => void;
}

export default function TextSearch({ onResults, onError }: TextSearchProps) {
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    profession: '',
    company: '',
  });
  const [results, setResults] = useState<TextSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    total: 0,
    totalPages: 0,
    hasNext: false,
    hasPrev: false,
  });

  const handleSearch = async (page = 1) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        q: query,
        page: page.toString(),
        limit: '20',
        ...Object.fromEntries(
          Object.entries(filters).filter(([_, value]) => value.trim() !== '')
        ),
      });

      const response = await fetch(`/api/text-search?${params}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Search failed');
      }

      setResults(data.results);
      setPagination(data.pagination);
      onResults?.(data.results);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed';
      setError(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination(prev => ({ ...prev, page: 1 }));
    handleSearch(1);
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ location: '', profession: '', company: '' });
  };

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }));
    handleSearch(newPage);
  };

  const hasActiveFilters = Object.values(filters).some(value => value.trim() !== '');

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Text Search
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Search by name, company, or keywords with advanced filtering
        </p>
        <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-500">
          <span className="flex items-center">
            <CheckCircleIcon className="w-4 h-4 mr-1 text-green-500" />
            Free Search
          </span>
          <span className="flex items-center">
            <CheckCircleIcon className="w-4 h-4 mr-1 text-green-500" />
            Advanced Filters
          </span>
          <span className="flex items-center">
            <CheckCircleIcon className="w-4 h-4 mr-1 text-green-500" />
            Real-time Results
          </span>
        </div>
      </div>

      {/* Search Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, company, or keywords..."
              className="input-field pl-10 pr-20"
              disabled={isSearching}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                type="button"
                onClick={() => setShowFilters(!showFilters)}
                className="btn-secondary flex items-center text-sm"
              >
                <FunnelIcon className="w-4 h-4 mr-1" />
                Filters
                {hasActiveFilters && (
                  <span className="ml-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {Object.values(filters).filter(v => v.trim() !== '').length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => handleFilterChange('location', e.target.value)}
                  placeholder="e.g., San Francisco, CA"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Profession
                </label>
                <input
                  type="text"
                  value={filters.profession}
                  onChange={(e) => handleFilterChange('profession', e.target.value)}
                  placeholder="e.g., Software Engineer"
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  value={filters.company}
                  onChange={(e) => handleFilterChange('company', e.target.value)}
                  placeholder="e.g., Tech Corp"
                  className="input-field"
                />
              </div>
              {hasActiveFilters && (
                <div className="md:col-span-3 flex justify-end">
                  <button
                    type="button"
                    onClick={handleClearFilters}
                    className="btn-secondary flex items-center text-sm"
                  >
                    <XMarkIcon className="w-4 h-4 mr-1" />
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Search Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isSearching || !query.trim()}
              className="btn-primary flex items-center"
            >
              <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center">
            <span className="text-red-700 dark:text-red-300">{error}</span>
          </div>
        </div>
      )}

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Search Results ({pagination.total} matches)
            </h3>
            <div className="text-sm text-gray-500">
              Page {pagination.page} of {pagination.totalPages}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {results.map((result) => (
              <div
                key={result.id}
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <img
                    src={result.imageUrl}
                    alt={result.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {result.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {result.profession} at {result.company}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      {result.location}
                    </p>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {result.bio}
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Email:</span>
                      <a
                        href={`mailto:${result.email}`}
                        className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {result.email}
                      </a>
                    </div>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                      <a
                        href={`tel:${result.phone}`}
                        className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        {result.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                {result.skills.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Skills
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {result.skills.slice(0, 4).map((skill, index) => (
                        <span
                          key={index}
                          className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                      {result.skills.length > 4 && (
                        <span className="text-xs text-gray-500">
                          +{result.skills.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Social Links */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex space-x-3">
                    {result.socialLinks.linkedin && (
                      <a
                        href={result.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                      >
                        LinkedIn
                      </a>
                    )}
                    {result.socialLinks.twitter && (
                      <a
                        href={result.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                      >
                        Twitter
                      </a>
                    )}
                    {result.socialLinks.github && (
                      <a
                        href={result.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={!pagination.hasPrev}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span className="text-gray-600 dark:text-gray-400">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={!pagination.hasNext}
                className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {!isSearching && query && results.length === 0 && !error && (
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4">
            <MagnifyingGlassIcon className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No results found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your search terms or filters to find what you're looking for.
          </p>
        </div>
      )}
    </div>
  );
} 