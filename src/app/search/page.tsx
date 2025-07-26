'use client';

import { useState } from 'react';
import { CameraIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import FaceSearch from '@/components/face-search';
import TextSearch from '@/components/text-search';

export default function SearchPage() {
  const [activeTab, setActiveTab] = useState<'face' | 'text'>('text');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Find People
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Humapedia offers two powerful search methods to find people. Choose the method that works best for you.
          </p>
        </div>

        {/* Search Method Tabs */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setActiveTab('text')}
                className={`flex items-center justify-center space-x-2 py-3 px-6 rounded-md font-medium transition-all ${
                  activeTab === 'text'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
                <span>Text Search</span>
              </button>
              <button
                onClick={() => setActiveTab('face')}
                className={`flex items-center justify-center space-x-2 py-3 px-6 rounded-md font-medium transition-all ${
                  activeTab === 'face'
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                <CameraIcon className="w-5 h-5" />
                <span>Face Search</span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Method Description */}
        <div className="max-w-4xl mx-auto mb-8">
          {activeTab === 'text' ? (
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Text Search
              </h2>
              <p className="text-blue-700 dark:text-blue-300">
                Search by name, company, or keywords. This method is completely free and provides instant results with advanced filtering options.
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-blue-700 dark:text-blue-300">Free to use</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-blue-700 dark:text-blue-300">Instant results</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  <span className="text-blue-700 dark:text-blue-300">Advanced filters</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-purple-900 dark:text-purple-100 mb-2">
                Face Search
              </h2>
              <p className="text-purple-700 dark:text-purple-300">
                Upload a photo to find matching profiles using AI analysis. This method costs 3 credits per search and provides high-accuracy results.
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  <span className="text-purple-700 dark:text-purple-300">AI-powered analysis</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  <span className="text-purple-700 dark:text-purple-300">High accuracy</span>
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  <span className="text-purple-700 dark:text-purple-300">3 credits per search</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Search Component */}
        <div className="max-w-6xl mx-auto">
          {activeTab === 'text' ? <TextSearch /> : <FaceSearch />}
        </div>

        {/* Additional Information */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              About Our Search Methods
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Text Search</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Search by name, company, or keywords</li>
                  <li>• Apply filters by location, profession, or company</li>
                  <li>• Completely free with no credit cost</li>
                  <li>• Instant results with pagination</li>
                  <li>• View detailed profiles and contact information</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Face Search</h4>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Upload photos with clear faces</li>
                  <li>• AI-powered facial recognition analysis</li>
                  <li>• Costs 3 credits per search</li>
                  <li>• High accuracy matching with confidence scores</li>
                  <li>• Apply additional filters for better results</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 