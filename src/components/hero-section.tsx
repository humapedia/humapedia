'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MagnifyingGlassIcon, GlobeAltIcon, ClockIcon, AcademicCapIcon } from '@heroicons/react/24/outline'

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const stats = [
    { id: 1, name: 'Civilizations', value: '10,000+' },
    { id: 2, name: 'Historical Events', value: '50,000+' },
    { id: 3, name: 'Cultural Artifacts', value: '100,000+' },
    { id: 4, name: 'Languages', value: '7,000+' },
  ]

  return (
    <div className="relative isolate overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background decoration */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary-600 to-secondary-600 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <Link href="/about" className="inline-flex space-x-6">
              <span className="rounded-full bg-primary-600/10 px-3 py-1 text-sm font-semibold leading-6 text-primary-600 ring-1 ring-inset ring-primary-600/20">
                What's new
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600 dark:text-gray-400">
                <span>Just launched v2.0</span>
                <span>→</span>
              </span>
            </Link>
          </div>
          <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            The Ultimate{' '}
            <span className="gradient-text">Human Knowledge</span>{' '}
            Encyclopedia
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Explore the vast tapestry of human civilization, from ancient wonders to modern innovations. 
            Discover cultures, achievements, and the stories that shaped our world across all time periods.
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-10 flex max-w-md gap-x-4">
            <label htmlFor="search" className="sr-only">
              Search knowledge
            </label>
            <div className="relative flex-auto">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                id="search"
                name="search"
                type="text"
                required
                className="block w-full rounded-md border-0 py-3 pl-10 pr-3 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                placeholder="Search civilizations, events, achievements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="flex-none rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
            >
              Search
            </button>
          </form>

          {/* Quick Actions */}
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/timeline"
              className="inline-flex items-center gap-2 rounded-lg bg-white/80 dark:bg-gray-800/80 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300/50 dark:ring-gray-600/50 hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              <ClockIcon className="h-4 w-4" />
              Explore Timeline
            </Link>
            <Link
              href="/cultures"
              className="inline-flex items-center gap-2 rounded-lg bg-white/80 dark:bg-gray-800/80 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300/50 dark:ring-gray-600/50 hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              <GlobeAltIcon className="h-4 w-4" />
              World Cultures
            </Link>
            <Link
              href="/achievements"
              className="inline-flex items-center gap-2 rounded-lg bg-white/80 dark:bg-gray-800/80 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300/50 dark:ring-gray-600/50 hover:bg-white dark:hover:bg-gray-700 transition-colors"
            >
              <AcademicCapIcon className="h-4 w-4" />
              Human Achievements
            </Link>
          </div>
        </div>
        
        {/* Stats */}
        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.id} className="text-center">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom decoration */}
      <div className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-secondary-600 to-primary-600 opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  )
} 