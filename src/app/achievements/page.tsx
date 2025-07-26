'use client'

import { useState } from 'react'
import { AcademicCapIcon, ClockIcon } from '@heroicons/react/24/outline'

const achievements = [
  {
    id: 1,
    title: 'The Great Wall of China',
    category: 'Architecture',
    period: '7th century BCE - 1644 CE',
    description: 'One of the most impressive architectural feats in human history, spanning over 13,000 miles.',
    impact: 'Defense, Trade, Cultural Symbol',
    region: 'Asia',
  },
  {
    id: 2,
    title: 'The Printing Press',
    category: 'Technology',
    period: '1440 CE',
    description: 'Johannes Gutenberg\'s invention revolutionized the spread of knowledge and information.',
    impact: 'Education, Communication, Information Sharing',
    region: 'Europe',
  },
  {
    id: 3,
    title: 'The Internet',
    category: 'Technology',
    period: '1960s - Present',
    description: 'The global network that transformed communication and information sharing worldwide.',
    impact: 'Communication, Information, Globalization',
    region: 'Global',
  },
  {
    id: 4,
    title: 'Space Exploration',
    category: 'Science',
    period: '1957 - Present',
    description: 'Humanity\'s journey beyond Earth, from Sputnik to Mars rovers and beyond.',
    impact: 'Scientific Discovery, Technology, Inspiration',
    region: 'Global',
  },
  {
    id: 5,
    title: 'Democracy',
    category: 'Politics',
    period: '5th century BCE - Present',
    description: 'A system of government where power comes from the people, first developed in ancient Athens.',
    impact: 'Governance, Human Rights, Freedom',
    region: 'Global',
  },
  {
    id: 6,
    title: 'The Scientific Method',
    category: 'Science',
    period: '17th century - Present',
    description: 'A systematic approach to research and discovery that revolutionized human understanding.',
    impact: 'Scientific Progress, Innovation, Knowledge',
    region: 'Global',
  },
  {
    id: 7,
    title: 'Electricity',
    category: 'Technology',
    period: '19th century - Present',
    description: 'The discovery and harnessing of electrical power transformed human civilization.',
    impact: 'Industry, Communication, Modern Life',
    region: 'Global',
  },
  {
    id: 8,
    title: 'The Wheel',
    category: 'Technology',
    period: '3500 BCE',
    description: 'One of the most fundamental inventions that enabled transportation and machinery.',
    impact: 'Transportation, Industry, Civilization',
    region: 'Global',
  },
]

const categories = ['All', 'Architecture', 'Technology', 'Science', 'Politics', 'Art', 'Medicine', 'Transportation']
const periods = ['All', 'Ancient', 'Medieval', 'Early Modern', 'Modern', 'Contemporary']

export default function AchievementsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedPeriod, setSelectedPeriod] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = selectedCategory === 'All' || achievement.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      achievement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      achievement.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Human Achievements
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Celebrate the incredible accomplishments that have shaped our world
          </p>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4 justify-center items-center">
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
                Period
              </label>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-primary-500"
              >
                {periods.map((period) => (
                  <option key={period} value={period}>
                    {period}
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
                placeholder="Search achievements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredAchievements.map((achievement) => (
            <div key={achievement.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center rounded-full bg-accent-100 dark:bg-accent-900/30 px-2.5 py-0.5 text-xs font-medium text-accent-800 dark:text-accent-200">
                      {achievement.category}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {achievement.period}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      • {achievement.region}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {achievement.description}
                  </p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Impact:
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.impact}
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="text-sm font-medium text-accent-600 dark:text-accent-400 hover:text-accent-500 transition-colors">
                  Learn more
                </button>
                <button className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  Add to bookmarks
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredAchievements.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No achievements found for the selected criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 