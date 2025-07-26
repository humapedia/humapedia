import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const achievements = [
  {
    id: 1,
    title: 'The Great Wall of China',
    category: 'Architecture',
    period: '7th century BCE - 1644 CE',
    description: 'One of the most impressive architectural feats in human history, spanning over 13,000 miles.',
  },
  {
    id: 2,
    title: 'The Printing Press',
    category: 'Technology',
    period: '1440 CE',
    description: 'Johannes Gutenberg\'s invention revolutionized the spread of knowledge and information.',
  },
  {
    id: 3,
    title: 'The Internet',
    category: 'Technology',
    period: '1960s - Present',
    description: 'The global network that transformed communication and information sharing worldwide.',
  },
  {
    id: 4,
    title: 'Space Exploration',
    category: 'Science',
    period: '1957 - Present',
    description: 'Humanity\'s journey beyond Earth, from Sputnik to Mars rovers and beyond.',
  },
]

export function AchievementsSection() {
  return (
    <div className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-800/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Human Achievements
            </h2>
            <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Celebrate the incredible accomplishments that have shaped our world
            </p>
          </div>
          
          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {achievements.map((achievement) => (
                <div key={achievement.id} className="card hover:shadow-xl transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center rounded-full bg-accent-100 dark:bg-accent-900/30 px-2.5 py-0.5 text-xs font-medium text-accent-800 dark:text-accent-200">
                          {achievement.category}
                        </span>
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          {achievement.period}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <Link
                      href={`/achievements/${achievement.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-accent-600 dark:text-accent-400 hover:text-accent-500 transition-colors"
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
              href="/achievements"
              className="inline-flex items-center gap-2 rounded-lg bg-accent-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-accent-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-600 transition-colors"
            >
              View All Achievements
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 