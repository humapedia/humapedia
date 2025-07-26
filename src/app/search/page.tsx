'use client'

import { useState, useEffect } from 'react'
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline'

const searchResults = [
  {
    id: 1,
    title: 'Ancient Egypt',
    category: 'Civilization',
    period: '3000 BCE - 30 BCE',
    description: 'One of the world\'s oldest civilizations, known for pyramids, pharaohs, and the Nile River.',
    relevance: 95,
  },
  {
    id: 2,
    title: 'Roman Empire',
    category: 'Empire',
    period: '27 BCE - 476 CE',
    description: 'The ancient Roman state that dominated the Mediterranean world for centuries.',
    relevance: 92,
  },
  {
    id: 3,
    title: 'Great Wall of China',
    category: 'Architecture',
    period: '7th century BCE - 1644 CE',
    description: 'A series of fortifications built along the northern borders of China.',
    relevance: 88,
  },
  {
    id: 4,
    title: 'Renaissance',
    category: 'Cultural Movement',
    period: '14th - 17th century',
    description: 'A period of European cultural, artistic, political and scientific rebirth.',
    relevance: 85,
  },
]

const categories = [
  'All',
  'Civilization',
  'Empire',
  'Architecture',
  'Technology',
  'Science',
  'Art',
  'Politics',
  'Religion',
  'War',
]

const periods = [
  'All Periods',
  'Ancient (Before 500 CE)',
  'Medieval (500-1500)',
  'Early Modern (1500-1800)',
  'Modern (1800-Present)',
]

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPeriod, setSelectedPeriod] = useState('All Periods')
  const [showFilters, setShowFilters] = useState(false)

  // Get search query from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const query = urlParams.get('q')
    if (query) {
      setSearchQuery(query)
    }
  }, [])

  const filteredResults = searchResults.filter(result => {
    const matchesQuery = searchQuery === '' || 
      result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      result.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'All' || result.category === selectedCategory
    
    return matchesQuery && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Search Human Knowledge
          </h1>
          
          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              className="block w-full rounded-lg border-0 py-3 pl-10 pr-10 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white dark:bg-gray-800 shadow-sm"
              placeholder="Search civilizations, events, people, achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Filters
            </h2>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <FunnelIcon className="h-4 w-4" />
              {showFilters ? 'Hide' : 'Show'} Filters
            </button>
          </div>
          
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Period Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time Period
                </label>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                >
                  {periods.map((period) => (
                    <option key={period} value={period}>
                      {period}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Search Results
            </h2>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {filteredResults.length} results found
            </span>
          </div>
          
          <div className="space-y-6">
            {filteredResults.map((result) => (
              <div key={result.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-900/30 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:text-primary-200">
                        {result.category}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {result.period}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        • {result.relevance}% relevant
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {result.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {result.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-4">
                  <button className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors">
                    Read more
                  </button>
                  <button className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Add to bookmarks
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {filteredResults.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No results found for "{searchQuery}". Try adjusting your search terms or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 