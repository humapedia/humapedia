'use client'

import { useState } from 'react'
import { GlobeAltIcon, MapPinIcon } from '@heroicons/react/24/outline'

const cultures = [
  {
    id: 1,
    name: 'Ancient Egypt',
    region: 'Africa',
    period: '3000 BCE - 30 BCE',
    description: 'One of the world\'s oldest civilizations, known for pyramids, pharaohs, and the Nile River.',
    achievements: ['Pyramids', 'Hieroglyphics', 'Mummification', 'Solar Calendar'],
    image: '/images/egypt.jpg',
  },
  {
    id: 2,
    name: 'Ancient Greece',
    region: 'Europe',
    period: '800 BCE - 146 BCE',
    description: 'The birthplace of democracy, philosophy, and Western civilization.',
    achievements: ['Democracy', 'Philosophy', 'Olympic Games', 'Classical Art'],
    image: '/images/greece.jpg',
  },
  {
    id: 3,
    name: 'Imperial China',
    region: 'Asia',
    period: '221 BCE - 1912 CE',
    description: 'One of the world\'s oldest continuous civilizations with rich cultural heritage.',
    achievements: ['Great Wall', 'Silk Road', 'Paper Making', 'Gunpowder'],
    image: '/images/china.jpg',
  },
  {
    id: 4,
    name: 'Roman Empire',
    region: 'Europe',
    period: '27 BCE - 476 CE',
    description: 'The ancient Roman state that dominated the Mediterranean world for centuries.',
    achievements: ['Roman Law', 'Aqueducts', 'Roads', 'Architecture'],
    image: '/images/rome.jpg',
  },
  {
    id: 5,
    name: 'Maya Civilization',
    region: 'Americas',
    period: '2000 BCE - 900 CE',
    description: 'Advanced pre-Columbian civilization known for mathematics and astronomy.',
    achievements: ['Calendar System', 'Mathematics', 'Astronomy', 'Architecture'],
    image: '/images/maya.jpg',
  },
  {
    id: 6,
    name: 'Islamic Golden Age',
    region: 'Asia',
    period: '750 CE - 1258 CE',
    description: 'Period of cultural, economic, and scientific flourishing in Islamic history.',
    achievements: ['Algebra', 'Medicine', 'Astronomy', 'Philosophy'],
    image: '/images/islamic.jpg',
  },
]

const regions = ['All', 'Africa', 'Asia', 'Europe', 'Americas', 'Oceania']

export default function CulturesPage() {
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCultures = cultures.filter(culture => {
    const matchesRegion = selectedRegion === 'All' || culture.region === selectedRegion
    const matchesSearch = searchQuery === '' || 
      culture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      culture.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesRegion && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            World Cultures
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Discover the diverse traditions, customs, and achievements of civilizations around the globe
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Region
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-primary-500"
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search cultures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Cultures Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCultures.map((culture) => (
            <div key={culture.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
              {/* Image placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 flex items-center justify-center">
                <GlobeAltIcon className="h-16 w-16 text-primary-600 dark:text-primary-400" />
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <MapPinIcon className="h-4 w-4 text-gray-500" />
                  <span className="inline-flex items-center rounded-full bg-secondary-100 dark:bg-secondary-900/30 px-2.5 py-0.5 text-xs font-medium text-secondary-800 dark:text-secondary-200">
                    {culture.region}
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {culture.period}
                  </span>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {culture.name}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {culture.description}
                </p>
                
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                    Key Achievements:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {culture.achievements.map((achievement, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-900/30 px-2 py-1 text-xs font-medium text-primary-800 dark:text-primary-200"
                      >
                        {achievement}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors">
                    Learn more
                  </button>
                  <button className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    Add to bookmarks
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCultures.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No cultures found for the selected criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 