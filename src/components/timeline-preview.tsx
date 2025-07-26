import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const timelineEvents = [
  {
    id: 1,
    year: '3000 BCE',
    title: 'Ancient Egypt',
    description: 'The first dynasty of Egypt begins, marking the start of one of the world\'s most influential civilizations.',
    category: 'Civilization',
  },
  {
    id: 2,
    year: '776 BCE',
    title: 'First Olympic Games',
    description: 'The ancient Olympic Games are held in Olympia, Greece, establishing a tradition that continues today.',
    category: 'Sports',
  },
  {
    id: 3,
    year: '44 BCE',
    title: 'Julius Caesar',
    description: 'The assassination of Julius Caesar marks a turning point in Roman history and world politics.',
    category: 'Politics',
  },
  {
    id: 4,
    year: '1455',
    title: 'Gutenberg Bible',
    description: 'Johannes Gutenberg prints the first book using movable type, revolutionizing information sharing.',
    category: 'Technology',
  },
]

export function TimelinePreview() {
  return (
    <div className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Journey Through Time
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Explore the pivotal moments that shaped human civilization
            </p>
          </div>
          
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {timelineEvents.map((event, index) => (
                <div key={event.id} className="timeline-item">
                  <div className="card hover:shadow-xl transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center rounded-full bg-primary-100 dark:bg-primary-900/30 px-2.5 py-0.5 text-xs font-medium text-primary-800 dark:text-primary-200">
                            {event.category}
                          </span>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {event.year}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {event.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Link
              href="/timeline"
              className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 transition-colors"
            >
              Explore Full Timeline
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 