'use client'

import { useState } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

const timelineEvents = [
  {
    id: 1,
    year: '3000 BCE',
    title: 'Ancient Egypt Begins',
    description: 'The first dynasty of Egypt begins, marking the start of one of the world\'s most influential civilizations.',
    category: 'Civilization',
    region: 'Africa',
  },
  {
    id: 2,
    year: '2500 BCE',
    title: 'Great Pyramid of Giza',
    description: 'Construction of the Great Pyramid of Giza, one of the Seven Wonders of the Ancient World.',
    category: 'Architecture',
    region: 'Africa',
  },
  {
    id: 3,
    year: '776 BCE',
    title: 'First Olympic Games',
    description: 'The ancient Olympic Games are held in Olympia, Greece, establishing a tradition that continues today.',
    category: 'Sports',
    region: 'Europe',
  },
  {
    id: 4,
    year: '551 BCE',
    title: 'Confucius Born',
    description: 'Birth of Confucius, whose teachings would shape Chinese philosophy and culture for millennia.',
    category: 'Philosophy',
    region: 'Asia',
  },
  {
    id: 5,
    year: '44 BCE',
    title: 'Julius Caesar Assassinated',
    description: 'The assassination of Julius Caesar marks a turning point in Roman history and world politics.',
    category: 'Politics',
    region: 'Europe',
  },
  {
    id: 6,
    year: '30 BCE',
    title: 'Roman Empire Established',
    description: 'Augustus becomes the first Roman Emperor, beginning the Roman Empire.',
    category: 'Empire',
    region: 'Europe',
  },
  {
    id: 7,
    year: '570 CE',
    title: 'Muhammad Born',
    description: 'Birth of Muhammad, the founder of Islam and one of history\'s most influential figures.',
    category: 'Religion',
    region: 'Asia',
  },
  {
    id: 8,
    year: '800 CE',
    title: 'Charlemagne Crowned',
    description: 'Charlemagne is crowned Holy Roman Emperor, uniting much of Western Europe.',
    category: 'Politics',
    region: 'Europe',
  },
  {
    id: 9,
    year: '1066 CE',
    title: 'Norman Conquest',
    description: 'William the Conqueror invades England, changing the course of English history.',
    category: 'War',
    region: 'Europe',
  },
  {
    id: 10,
    year: '1455 CE',
    title: 'Gutenberg Bible',
    description: 'Johannes Gutenberg prints the first book using movable type, revolutionizing information sharing.',
    category: 'Technology',
    region: 'Europe',
  },
]

const categories = ['All', 'Civilization', 'Architecture', 'Sports', 'Philosophy', 'Politics', 'Empire', 'Religion', 'War', 'Technology']
const regions = ['All', 'Africa', 'Asia', 'Europe', 'Americas', 'Oceania']

export default function TimelinePage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [currentPeriod, setCurrentPeriod] = useState('Ancient')

  const filteredEvents = timelineEvents.filter(event => {
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory
    const matchesRegion = selectedRegion === 'All' || event.region === selectedRegion
    return matchesCategory && matchesRegion
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Interactive Timeline
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Explore the pivotal moments that shaped human civilization
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-primary-500"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
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
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600"></div>
          
          <div className="space-y-8">
            {filteredEvents.map((event, index) => (
              <div key={event.id} className="relative flex items-start">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary-500 rounded-full border-4 border-white dark:border-gray-800 -translate-x-1/2"></div>
                
                {/* Content */}
                <div className="ml-16 flex-1">
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-900/30 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:text-primary-200">
                            {event.category}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-secondary-100 dark:bg-secondary-900/30 px-2.5 py-0.5 text-xs font-medium text-secondary-800 dark:text-secondary-200">
                            {event.region}
                          </span>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {event.year}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {event.description}
                        </p>
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
              </div>
            ))}
          </div>
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No events found for the selected filters. Try adjusting your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 