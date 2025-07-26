import Link from 'next/link'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

export function CTASection() {
  return (
    <div className="bg-primary-600 dark:bg-primary-700">
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to explore human knowledge?
            <br />
            Start your journey today.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-primary-100">
            Join millions of learners, researchers, and curious minds who are discovering the incredible story of human civilization.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/explore"
              className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-primary-600 shadow-sm hover:bg-primary-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
            >
              Start Exploring
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold leading-6 text-white flex items-center gap-1 hover:text-primary-100 transition-colors"
            >
              Learn more <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 