import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const cultures = [
  {
    id: 1,
    name: 'Ancient Greece',
    region: 'Mediterranean',
    description: 'The birthplace of democracy, philosophy, and Western civilization.',
    image: '/images/greece.jpg',
  },
  {
    id: 2,
    name: 'Imperial China',
    region: 'East Asia',
    description: 'One of the world\'s oldest continuous civilizations with rich cultural heritage.',
    image: '/images/china.jpg',
  },
  {
    id: 3,
    name: 'Maya Civilization',
    region: 'Mesoamerica',
    description: 'Advanced pre-Columbian civilization known for mathematics and astronomy.',
    image: '/images/maya.jpg',
  },
  {
    id: 4,
    name: 'Islamic Golden Age',
    region: 'Middle East',
    description: 'Period of cultural, economic, and scientific flourishing in Islamic history.',
    image: '/images/islamic.jpg',
  },
]

export function CulturesSection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              World Cultures
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Discover the diverse traditions, customs, and achievements of civilizations around the globe
            </p>
          </div>
          
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {cultures.map((culture) => (
                <div key={culture.id} className="card hover:shadow-xl transition-shadow">
                  <div className="aspect-w-16 aspect-h-9 mb-4">
                    <div className="w-full h-48 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-lg flex items-center justify-center">
                      <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                        {culture.name}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="inline-flex items-center rounded-full bg-secondary-100 dark:bg-secondary-900/30 px-2.5 py-0.5 text-xs font-medium text-secondary-800 dark:text-secondary-200">
                        {culture.region}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {culture.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {culture.description}
                    </p>
                    <Link
                      href={`/cultures/${culture.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-500 transition-colors"
                    >
                      Learn more
                      <ArrowRightIcon className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link
              href="/cultures"
              className="inline-flex items-center gap-2 rounded-lg bg-secondary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-secondary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-600 transition-colors"
            >
              Explore All Cultures
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 