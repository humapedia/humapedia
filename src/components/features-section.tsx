import { 
  MagnifyingGlassIcon, 
  GlobeAltIcon, 
  ClockIcon, 
  AcademicCapIcon,
  UsersIcon,
  SparklesIcon,
  ChartBarIcon,
  BookOpenIcon
} from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Comprehensive Knowledge Base',
    description: 'Access millions of articles covering human history, culture, science, and achievements from ancient times to the present day.',
    icon: BookOpenIcon,
  },
  {
    name: 'Interactive Timeline Explorer',
    description: 'Navigate through history with our dynamic timeline, visualizing the connections between events, people, and civilizations.',
    icon: ClockIcon,
  },
  {
    name: 'Global Cultural Atlas',
    description: 'Explore world cultures through an interactive map, discovering traditions, languages, and customs from every corner of the globe.',
    icon: GlobeAltIcon,
  },
  {
    name: 'AI-Powered Search',
    description: 'Find exactly what you\'re looking for with our intelligent search that understands context and provides relevant suggestions.',
    icon: MagnifyingGlassIcon,
  },
  {
    name: 'Achievement Gallery',
    description: 'Celebrate human ingenuity through our curated collection of breakthroughs, inventions, and milestones that shaped civilization.',
    icon: AcademicCapIcon,
  },
  {
    name: 'Community Contributions',
    description: 'Join our global community of knowledge seekers and contributors, sharing insights and expanding our collective understanding.',
    icon: UsersIcon,
  },
  {
    name: 'Smart Recommendations',
    description: 'Discover new topics and connections with our AI-driven recommendation system that learns from your interests.',
    icon: SparklesIcon,
  },
  {
    name: 'Data Visualization',
    description: 'Understand complex historical data through beautiful charts, graphs, and interactive visualizations.',
    icon: ChartBarIcon,
  },
]

export function FeaturesSection() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-primary-600 dark:text-primary-400">
            Discover More
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Everything you need to explore human knowledge
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Humapedia provides comprehensive tools and features to help you discover, understand, and connect with the vast tapestry of human civilization.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <feature.icon className="h-5 w-5 flex-none text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 