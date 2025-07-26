export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              About Humapedia
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The Ultimate Human Knowledge Encyclopedia
            </p>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Humapedia is a comprehensive platform dedicated to preserving, organizing, and making accessible 
              the vast wealth of human knowledge, achievements, and cultural heritage from ancient times to the present day.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              We believe that knowledge is humanity's greatest asset. Our mission is to create a living, 
              breathing encyclopedia that captures the incredible story of human civilization - from the 
              first tools crafted by our ancestors to the latest technological breakthroughs that shape our future.
            </p>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
              What We Offer
            </h2>
            <ul className="list-disc pl-6 text-gray-700 dark:text-gray-300 mb-6 space-y-2">
              <li><strong>Comprehensive Coverage:</strong> From ancient civilizations to modern innovations</li>
              <li><strong>Interactive Learning:</strong> Engaging multimedia content and interactive timelines</li>
              <li><strong>Global Perspective:</strong> Multilingual support and diverse cultural viewpoints</li>
              <li><strong>Community-Driven:</strong> Open contribution system for knowledge sharing</li>
              <li><strong>AI-Powered:</strong> Intelligent search and content recommendations</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Accuracy</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We are committed to providing accurate, well-researched information from reliable sources.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Accessibility</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Knowledge should be accessible to everyone, regardless of background or location.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Diversity</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We celebrate the rich diversity of human cultures, perspectives, and achievements.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Innovation</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We continuously innovate to provide the best possible learning experience.
                </p>
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-12 mb-6">
              Join Our Community
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Humapedia is more than just a website - it's a global community of knowledge seekers, 
              researchers, educators, and curious minds. Whether you're a student, teacher, researcher, 
              or simply someone who loves to learn, you're welcome here.
            </p>
            
            <div className="bg-primary-50 dark:bg-primary-900/20 p-6 rounded-lg mt-8">
              <h3 className="text-lg font-semibold text-primary-900 dark:text-primary-100 mb-2">
                Get Involved
              </h3>
              <p className="text-primary-800 dark:text-primary-200">
                Help us build the world's most comprehensive human knowledge encyclopedia. 
                Contribute articles, suggest improvements, or simply explore and learn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 